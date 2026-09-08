import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ------------------------------------------------------------------ */
/*  authenticateToken — reads JWT from httpOnly cookie                */
/*                                                                    */
/*  Previously read the token from the Authorization header (Bearer    */
/*  token stored in localStorage by the admin frontend). Now reads    */
/*  from the adminToken httpOnly cookie set by /auth/login.           */
/*                                                                    */
/*  The cookie approach is more secure because:                       */
/*  1. JavaScript can't read the token (httpOnly) → XSS can't steal it*/
/*  2. The browser auto-attaches it to every same-origin request      */
/*  3. SameSite=Strict prevents CSRF                                  */
/*                                                                    */
/*  For backward compatibility, also checks the Authorization header   */
/*  so API clients (curl, Postman, scripts) can still use Bearer.    */
/* ------------------------------------------------------------------ */
export const authenticateToken = async (req, res, next) => {
  // Try cookie first (admin frontend), fall back to Bearer header (API clients)
  const token = req.cookies?.adminToken ||
    (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user's current role from the DB on each request.
    // Previously the role was baked into the JWT, which meant a
    // demoted admin kept admin access until their token expired (24h).
    // Now we fetch the role fresh, so role changes take effect immediately.
    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "username", "email", "role"],
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};
