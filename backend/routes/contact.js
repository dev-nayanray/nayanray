import express from "express";
import Joi from "joi";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(2).max(150).required(),
  message: Joi.string().min(5).max(2000).required(),
});

// POST /api/contact - Submit contact form
router.post("/", async (req, res) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newMessage = await ContactMessage.create(value);
    res.status(201).json({ message: "Contact message received", data: newMessage });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: "Failed to save contact message" });
  }
});

export default router;
