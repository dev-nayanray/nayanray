import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "./models/index.js";
import projectRoutes from "./routes/projects.js";
import blogRoutes from "./routes/blog.js";
import contactRoutes from "./routes/contact.js";
import serviceRoutes from "./routes/services.js";
import proposalRoutes from "./routes/proposals.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import seedDatabase from "./seeders/seed.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

/* ------------------------------------------------------------------ */
/*  SECURITY: Fail-closed startup checks                               */
/*                                                                    */
/*  Previously, if JWT_SECRET or FRONTEND_URL were unset, the server  */
/*  silently started in an insecure state — JWTs were signed with     */
/*  `undefined` (forgeable by anyone), and CORS reflected every       */
/*  origin. Now we refuse to start in production unless these are     */
/*  explicitly set. In development we fall back to safe defaults.    */
/* ------------------------------------------------------------------ */
const isProd = process.env.NODE_ENV === "production";

if (isProd && !process.env.JWT_SECRET) {
  console.error(
    "FATAL: JWT_SECRET environment variable is not set. " +
      "Refusing to start in production without a secure JWT secret. " +
      "Set JWT_SECRET to a strong random string (min 32 chars)."
  );
  process.exit(1);
}

if (isProd && !process.env.FRONTEND_URL) {
  console.error(
    "FATAL: FRONTEND_URL environment variable is not set. " +
      "Refusing to start in production with open CORS. " +
      "Set FRONTEND_URL to your frontend origin (e.g. https://nayanray.com)."
  );
  process.exit(1);
}

// Middleware
app.use(
  helmet({
    // Allow images served from /uploads to be embedded cross-origin (admin panel on a
    // different port/domain during development and in most production setups).
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(
  cors({
    // Fail closed: in production, FRONTEND_URL must be set (checked above).
    // In development, fall back to localhost:5173 (Vite dev server) and
    // localhost:5174 (admin Vite dev server). Never reflect arbitrary origins.
    origin: process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
      : ["http://localhost:5173", "http://localhost:5174"],
    // credentials: true is required for the browser to send and accept
    // httpOnly cookies cross-origin (admin frontend on a different port).
    credentials: true,
  })
);
app.use(express.json());
// Parse cookies so req.cookies.adminToken is available in auth middleware
app.use(cookieParser());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ------------------------------------------------------------------ */
/*  Rate limiting                                                      */
/*                                                                    */
/*  Two tiers:                                                        */
/*  1. Global limiter — 100 req / 15 min per IP (general abuse)      */
/*  2. Login limiter — 5 attempts / 15 min per IP (brute-force)      */
/*                                                                    */
/*  Previously only the global limiter existed, which allowed        */
/*  9,600 login attempts per day per IP — enough to brute-force     */
/*  weak passwords (especially given the old admin123 default).     */
/* ------------------------------------------------------------------ */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: "Too many requests, please try again later." },
});
app.use(globalLimiter);

// Stricter limiter for the login endpoint — applied per-route, not globally.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per 15 minutes
  message: {
    error: "Too many login attempts. Please try again in 15 minutes.",
  },
  skipSuccessfulRequests: true, // don't count successful logins against the limit
});

// Apply the login limiter only to POST /api/auth/login
app.use("/api/auth/login", loginLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/proposals", proposalRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
// Error handling middleware — preserves HTTP status codes from
// Joi validation errors (400) and Sequelize errors, instead of
// lumping everything into a 500. Logs the full stack server-side
// for debugging, but returns only a generic message to the client
// (no internal details leaked).
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Joi validation errors — return 400 with field-level detail
  if (err.isJoi) {
    return res.status(400).json({
      error: err.details[0]?.message || "Validation error",
    });
  }

  // Sequelize validation errors — return 400 with field details
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      error: err.errors?.map((e) => e.message).join(", ") || "Validation error",
    });
  }

  // If the error already has a status (e.g. from http-errors), use it
  if (err.status) {
    return res.status(err.status).json({ error: err.message || "Request failed" });
  }

  // Fallback — 500 with generic message (no internal details)
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // sync() creates tables if they don't exist, but does NOT alter
    // existing tables (no { alter: true }). This means new columns
    // added to models won't appear in the DB until you run a migration
    // or drop the table manually.
    //
    // For production, use Sequelize migrations (umzug). For now, we
    // use sync() in dev only, and warn in production.
    if (isProd) {
      console.log(
        "[db] Production mode — skipping sync(). Run migrations manually: " +
          "npx sequelize-cli db:migrate"
      );
    } else {
      await sequelize.sync();
      console.log("Database synchronized (dev mode).");
    }

    // Seed database
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
