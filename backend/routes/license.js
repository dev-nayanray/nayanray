import express from "express";
import crypto from "crypto";
import Joi from "joi";
import License from "../models/License.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

const activateSchema = Joi.object({
  license_key: Joi.string().required(),
  email: Joi.string().email().allow(""),
  site_url: Joi.string().uri().required(),
}).options({ stripUnknown: true });

const deactivateSchema = Joi.object({
  license_key: Joi.string().required(),
  activation_id: Joi.string().required(),
}).options({ stripUnknown: true });

/* ------------------------------------------------------------------ */
/*  License API — called by the premium WooCommerce plugin              */
/*                                                                    */
/*  The premium plugin (woo-telegram-manager-premium) calls these      */
/*  endpoints from WordPress to activate, deactivate, and verify       */
/*  licenses. The store URL is configurable in the plugin:             */
/*    const DEFAULT_STORE_URL = 'https://wootelegram.com';             */
/*  (or 'https://nayanray.com' for our deployment)                    */
/*                                                                    */
/*  Endpoints:                                                         */
/*  - POST /api/license/activate   { license_key, email, site_url }    */
/*  - POST /api/license/deactivate { license_key, activation_id }     */
/*  - GET  /api/license/verify?key=XXXX                               */
/*  - POST /api/license/create     (admin only — create new license)  */
/* ------------------------------------------------------------------ */

// Helper: generate a license key in WTM-XXXX-XXXX-XXXX-XXXX format
function generateLicenseKey() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I,O,0,1 to avoid confusion
  const segment = (len) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `WTM-${segment(4)}-${segment(4)}-${segment(4)}-${segment(4)}`;
}

// Helper: generate a unique activation ID
function generateActivationId() {
  return crypto.randomBytes(8).toString("hex");
}

// Helper: get max activations for a plan
function getMaxActivations(plan) {
  const limits = { personal: 1, business: 3, agency: 10 };
  return limits[plan] || 3;
}

/* POST /api/license/activate
 * Called by the premium plugin when the user enters their license key.
 * Body: { license_key, email, site_url }
 * Response: { success, activation_id, license_key, expires_on } */
router.post("/activate", async (req, res) => {
  try {
    const { error, value } = activateSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, error: error.details[0].message });
    const { license_key, site_url } = value;

    if (!license_key || !site_url) {
      return res.status(400).json({
        success: false,
        error: "license_key and site_url are required",
      });
    }

    const license = await License.findOne({ where: { licenseKey: license_key } });

    if (!license) {
      return res.status(404).json({
        success: false,
        error: "License key not found. Please check your key or purchase a license.",
      });
    }

    if (license.status !== "active") {
      return res.status(403).json({
        success: false,
        error: `License is ${license.status}. Please contact support.`,
      });
    }

    // Check if this site is already activated
    const existingActivation = license.activations.find(
      (a) => a.site === site_url
    );

    if (existingActivation) {
      return res.json({
        success: true,
        activation_id: existingActivation.activationId,
        license_key: license.licenseKey,
        plan: license.plan,
        expires_on: license.expiresOn,
        message: "This site is already activated.",
      });
    }

    // Check if we've hit the activation limit
    if (license.activations.length >= license.maxActivations) {
      return res.status(403).json({
        success: false,
        error: `Activation limit reached (${license.maxActivations} site(s)). Deactivate a site or upgrade your plan.`,
        max_activations: license.maxActivations,
        current_activations: license.activations.length,
      });
    }

    // Activate the new site
    const activationId = generateActivationId();
    const newActivations = [
      ...license.activations,
      {
        site: site_url,
        activationId,
        activatedOn: new Date().toISOString().split("T")[0],
      },
    ];

    await license.update({ activations: newActivations });

    console.log(
      `[license] Activated: key=${license_key} site=${site_url} plan=${license.plan} (${newActivations.length}/${license.maxActivations})`
    );

    res.json({
      success: true,
      activation_id: activationId,
      license_key: license.licenseKey,
      plan: license.plan,
      expires_on: license.expiresOn,
      activations_remaining: license.maxActivations - newActivations.length,
    });
  } catch (error) {
    console.error("[license] Activation error:", error.message);
    res.status(500).json({ success: false, error: "Activation failed" });
  }
});

/* POST /api/license/deactivate
 * Called by the premium plugin when the user deactivates a site.
 * Body: { license_key, activation_id }
 * Response: { success, message } */
router.post("/deactivate", async (req, res) => {
  try {
    const { license_key, activation_id } = req.body;

    if (!license_key || !activation_id) {
      return res.status(400).json({
        success: false,
        error: "license_key and activation_id are required",
      });
    }

    const license = await License.findOne({ where: { licenseKey: license_key } });

    if (!license) {
      return res.status(404).json({
        success: false,
        error: "License key not found",
      });
    }

    const newActivations = license.activations.filter(
      (a) => a.activationId !== activation_id
    );

    if (newActivations.length === license.activations.length) {
      return res.status(404).json({
        success: false,
        error: "Activation ID not found for this license",
      });
    }

    await license.update({ activations: newActivations });

    console.log(
      `[license] Deactivated: key=${license_key} activation=${activation_id} (${newActivations.length}/${license.maxActivations} remaining)`
    );

    res.json({
      success: true,
      message: "Site deactivated successfully",
      activations_remaining: license.maxActivations - newActivations.length,
    });
  } catch (error) {
    console.error("[license] Deactivation error:", error.message);
    res.status(500).json({ success: false, error: "Deactivation failed" });
  }
});

/* GET /api/license/verify?key=XXXX
 * Called by the premium plugin's daily cron check.
 * Response: { success, valid, plan, expires_on, activations } */
router.get("/verify", async (req, res) => {
  try {
    const { key } = req.query;

    if (!key) {
      return res.status(400).json({
        success: false,
        error: "License key is required (use ?key=XXXX)",
      });
    }

    const license = await License.findOne({ where: { licenseKey: key } });

    if (!license) {
      return res.status(404).json({
        success: false,
        valid: false,
        error: "License key not found",
      });
    }

    // Check if license has expired
    if (license.expiresOn) {
      const expiry = new Date(license.expiresOn);
      const now = new Date();
      if (now > expiry) {
        if (license.status !== "expired") {
          await license.update({ status: "expired" });
        }
        return res.json({
          success: true,
          valid: false,
          error: "License has expired. Please renew to continue using premium features.",
          expires_on: license.expiresOn,
        });
      }
    }

    console.log(
      `[license] Verified: key=${key} status=${license.status} (${license.activations.length}/${license.maxActivations} sites)`
    );

    res.json({
      success: true,
      valid: license.status === "active",
      plan: license.plan,
      expires_on: license.expiresOn,
      max_activations: license.maxActivations,
      current_activations: license.activations.length,
      activations: license.activations.map((a) => ({
        site: a.site,
        activated_on: a.activatedOn,
      })),
    });
  } catch (error) {
    console.error("[license] Verification error:", error.message);
    res.status(500).json({ success: false, error: "Verification failed" });
  }
});

/* POST /api/license/create (admin only — requires authentication)
 * Protected by authenticateToken + requireAdmin middleware.
 * Called by the admin panel when creating a new license manually,
 * or by the checkout flow after a successful payment.
 * Body: { email, plan, billingCycle, customerName }
 * Response: { success, license_key } */
router.post("/create", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { email, plan, billingCycle, customerName } = req.body;

    if (!email || !plan) {
      return res.status(400).json({
        success: false,
        error: "email and plan are required",
      });
    }

    const maxActivations = getMaxActivations(plan);
    const licenseKey = generateLicenseKey();
    const now = new Date();
    const expiresOn = billingCycle === "yearly"
      ? new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      : new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const license = await License.create({
      licenseKey,
      email,
      customerName: customerName || null,
      plan,
      status: "active",
      maxActivations,
      activations: [],
      billingCycle: billingCycle || "yearly",
      purchasedOn: now.toISOString().split("T")[0],
      expiresOn,
    });

    console.log(
      `[license] Created: key=${licenseKey} email=${email} plan=${plan} cycle=${billingCycle}`
    );

    res.status(201).json({
      success: true,
      license_key: licenseKey,
      plan,
      max_activations: maxActivations,
      expires_on: expiresOn,
    });
  } catch (error) {
    console.error("[license] Creation error:", error.message);
    res.status(500).json({ success: false, error: "Failed to create license" });
  }
});

/* GET /api/license/list (admin only — requires authentication)
 * Protected by authenticateToken + requireAdmin middleware.
 * Response: { licenses: [...] } */
router.get("/list", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const licenses = await License.findAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: [] },
    });

    res.json({
      success: true,
      licenses: licenses.map((l) => ({
        id: l.id,
        licenseKey: l.licenseKey,
        email: l.email,
        customerName: l.customerName,
        plan: l.plan,
        status: l.status,
        maxActivations: l.maxActivations,
        activationsCount: l.activations.length,
        activations: l.activations,
        billingCycle: l.billingCycle,
        purchasedOn: l.purchasedOn,
        expiresOn: l.expiresOn,
      })),
    });
  } catch (error) {
    console.error("[license] List error:", error.message);
    res.status(500).json({ success: false, error: "Failed to list licenses" });
  }
});

export default router;
