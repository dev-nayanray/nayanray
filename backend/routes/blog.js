import express from "express";
import BlogPost from "../models/BlogPost.js";

const router = express.Router();

// GET /api/blog - Get all blog posts
router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      order: [["id", "ASC"]],
    });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// GET /api/blog/:id - Get single blog post
router.get("/:id", async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

export default router;
