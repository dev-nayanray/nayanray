import express from "express";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { sequelize } from "../models/index.js";
import User from "../models/User.js";

const router = express.Router();

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Validation schema for registration — enforces strong passwords.
const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(12)
    .max(128)
    .pattern(/[A-Z]/, "uppercase")
    .pattern(/[a-z]/, "lowercase")
    .pattern(/[0-9]/, "number")
    .pattern(/[^A-Za-z0-9]/, "symbol")
    .required(),
});

/* ------------------------------------------------------------------ */
/*  Cookie configuration                                               */
/*                                                                    */
/*  JWT is now stored in an HttpOnly, Secure, SameSite=Strict cookie  */
/*  instead of localStorage. This means:                             */
/*  1. JavaScript can't read the token → XSS can't steal it           */
/*  2. Browser auto-attaches it to every request to the same origin   */
/*  3. SameSite=Strict prevents CSRF (cross-site requests don't       */
/*     include the cookie)                                            */
/*                                                                    */
/*  In production, secure: true is enforced. In dev (HTTP localhost), */
/*  secure is false so the cookie actually gets set.                  */
/* ------------------------------------------------------------------ */
const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true, // JS can't read it → XSS can't steal it
  secure: isProd, // HTTPS only in production
  sameSite: "strict", // CSRF protection — no cross-site cookie
  maxAge: 24 * 60 * 60 * 1000, // 24 hours (matches JWT expiry)
  path: "/",
};

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = value;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT — payload is { id } only.
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Set JWT as httpOnly cookie — NOT returned in JSON.
    // The admin frontend no longer needs to handle the token at all;
    // the browser auto-attaches it via credentials: 'include'.
    res.cookie("adminToken", token, cookieOptions);

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// GET /api/auth/me — fetch current user from the JWT cookie.
// The admin app calls this on mount to populate the user object
// after a page reload (previously the user object was lost on
// reload because it was only in React state).
router.get("/me", async (req, res) => {
  try {
    const token = req.cookies?.adminToken;
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // jwt.verify returns a string | JwtPayload — cast to extract the id.
    // In plain JS we can't use `as`, so we access the property directly.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = typeof decoded === "object" && decoded !== null ? decoded.id : null;
    if (!userId) {
      res.clearCookie("adminToken", { path: "/" });
      return res.status(401).json({ error: "Invalid token payload" });
    }

    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email", "role"],
    });

    if (!user) {
      // Token is valid but user was deleted — clear the cookie
      res.clearCookie("adminToken", { path: "/" });
      return res.status(401).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    // Invalid or expired token — clear the cookie
    res.clearCookie("adminToken", { path: "/" });
    return res.status(401).json({ error: "Invalid or expired session" });
  }
});

// POST /api/auth/logout — clear the JWT cookie
router.post("/logout", (req, res) => {
  res.clearCookie("adminToken", { path: "/" });
  res.json({ message: "Logged out successfully" });
});

// POST /api/auth/register
//
// SECURITY: This endpoint is now locked down. Previously it created
// admin accounts with no authentication, no validation, and a hardcoded
// role — anyone could mint an admin account at any time.
router.post("/register", async (req, res) => {
  try {
    if (process.env.ENABLE_REGISTER !== "1") {
      return res.status(403).json({
        error:
          "Public registration is disabled. Admin accounts are created via the seeder or by an existing admin.",
      });
    }

    const userCount = await User.count();
    if (userCount > 0) {
      return res.status(403).json({
        error:
          "An admin account already exists. Use the admin panel to create additional users.",
      });
    }

    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email, password } = value;

    const existingUser = await User.findOne({
      where: { [sequelize.Op.or]: [{ email }, { username }] },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
      role: "admin",
    });

    console.log(`[register] Bootstrap admin created: id=${user.id} username=${user.username}`);

    res.status(201).json({
      message: "Admin user created successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

export default router;
