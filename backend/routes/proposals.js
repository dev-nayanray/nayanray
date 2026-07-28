import express from "express";
import Joi from "joi";
import Proposal, { BUDGET_RANGES, TIMELINES } from "../models/Proposal.js";

const router = express.Router();

const proposalSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(30).allow(null, ""),
  company: Joi.string().max(150).allow(null, ""),
  serviceId: Joi.number().integer().allow(null),
  serviceName: Joi.string().max(255).allow(null, ""),
  projectType: Joi.string().max(150).allow(null, ""),
  budgetRange: Joi.string().valid(...BUDGET_RANGES).required(),
  timeline: Joi.string().valid(...TIMELINES).required(),
  description: Joi.string().min(10).max(4000).required(),
});

// POST /api/proposals - Submit a project proposal
router.post("/", async (req, res) => {
  try {
    const { error, value } = proposalSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const proposal = await Proposal.create(value);
    res.status(201).json({ message: "Proposal received", data: proposal });
  } catch (error) {
    console.error("Error saving proposal:", error);
    res.status(500).json({ error: "Failed to save proposal" });
  }
});

export default router;
