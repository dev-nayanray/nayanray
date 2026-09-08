import express from "express";
import Joi from "joi";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(2).max(150).required(),
  message: Joi.string().min(1).max(2000).required(),
});

// POST /api/contact - Submit contact form
//
// SECURITY: Previously logged the full req.body (name, email, message)
// and the full newMessage record to stdout. That's PII leaking into
// server logs (GDPR/CCPA risk). Now we log only metadata — never
// the user's name, email, or message content.
router.post("/", async (req, res) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newMessage = await ContactMessage.create(value);

    // Log only the record ID + timestamp — no PII.
    console.log(
      `[contact] New message received (id=${newMessage.id}, subject="${newMessage.subject}")`
    );

    res.status(201).json({
      message: "Contact message received",
      data: newMessage,
    });
  } catch (error) {
    // Log only the error type, not the request body (which contains PII).
    console.error("[contact] Error saving contact message:", error.message);
    res.status(500).json({ error: "Failed to save contact message" });
  }
});

export default router;
