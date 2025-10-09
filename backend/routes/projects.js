import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET /api/projects - Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["id", "ASC"]],
    });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// GET /api/projects/:id - Get single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

export default router;
