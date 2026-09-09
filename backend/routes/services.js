import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

// GET /api/services - Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.findAll({
      order: [["id", "ASC"]],
    });
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

export default router;
