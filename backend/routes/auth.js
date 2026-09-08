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
// Previously /register accepted any string as a password (even 1 char).
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

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = value;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT — payload is { id } only.
    // Previously included email + role, which leaks PII (JWT is base64,
    // not encrypted) and prevents server-side role revocation for the
    // token's lifetime. Role is now fetched from DB on each protected
    // request via the requireAuth middleware.
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
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

// POST /api/auth/register
//
// SECURITY: This endpoint is now locked down. Previously it created
// admin accounts with no authentication, no validation, and a hardcoded
// role — anyone could mint an admin account at any time.
//
// The endpoint now ONLY works when:
//   1. The env var ENABLE_REGISTER=1 is set (off by default)
//   2. AND zero users exist in the database (first-boot bootstrap only)
//
// In production, admin users should be created via the admin panel
// (which requires an existing authenticated admin) or via the seeder
// with a strong ADMIN_SEED_PASSWORD env var.
router.post("/register", async (req, res) => {
  try {
    // Guard 1: Registration must be explicitly enabled via env var.
    // Default is disabled. This prevents the endpoint from ever
    // being reachable on a production deploy that forgot to set it.
    if (process.env.ENABLE_REGISTER !== "1") {
      return res.status(403).json({
        error:
          "Public registration is disabled. Admin accounts are created via the seeder or by an existing admin.",
      });
    }

    // Guard 2: Only allow registration when the database has zero users.
    // This makes the endpoint a one-time bootstrap — once the first
    // admin exists, it can never be used again, even if ENABLE_REGISTER=1.
    const userCount = await User.count();
    if (userCount > 0) {
      return res.status(403).json({
        error:
          "An admin account already exists. Use the admin panel to create additional users.",
      });
    }

    // Validate input — previously accepted any string, including 1-char passwords.
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email, password } = value;

    // Check if user already exists (email OR username collision)
    const existingUser = await User.findOne({
      where: { [sequelize.Op.or]: [{ email }, { username }] },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create the first admin user (only reachable when userCount === 0)
    const user = await User.create({
      username,
      email,
      password,
      role: "admin",
    });

    // Log only metadata — never log the password or full user object.
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
