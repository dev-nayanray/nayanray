import express from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";
import Project from "../models/Project.js";
import BlogPost from "../models/BlogPost.js";
import Service from "../models/Service.js";
import ContactMessage from "../models/ContactMessage.js";
import User from "../models/User.js";

const router = express.Router();

// Apply auth middleware to all admin routes
router.use(authenticateToken);
router.use(requireAdmin);

// Project CRUD
const projectSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().min(1).required(),
  image: Joi.string().uri().required(),
  liveLink: Joi.string().uri().allow(null, ""),
  githubLink: Joi.string().uri().allow(null, ""),
  technologies: Joi.array().items(Joi.string()).required(),
  category: Joi.string().required(),
  icon: Joi.string().required(),
  gradient: Joi.string().required(),
  featured: Joi.boolean().default(false),
});

// GET /api/admin/projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [["id", "DESC"]] });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST /api/admin/projects
router.post("/projects", async (req, res) => {
  try {
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const project = await Project.create(value);
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// PUT /api/admin/projects/:id
router.put("/projects/:id", async (req, res) => {
  try {
    const { error, value } = projectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const [updated] = await Project.update(value, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({ error: "Project not found" });
    }
    const project = await Project.findByPk(req.params.id);
    res.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// DELETE /api/admin/projects/:id
router.delete("/projects/:id", async (req, res) => {
  try {
    const deleted = await Project.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// Blog CRUD
const blogSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  date: Joi.string().required(),
  author: Joi.string().required(),
  excerpt: Joi.string().required(),
  image: Joi.string().uri().required(),
  readTime: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

// GET /api/admin/blog
router.get("/blog", async (req, res) => {
  try {
    const posts = await BlogPost.findAll({ order: [["id", "DESC"]] });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// POST /api/admin/blog
router.post("/blog", async (req, res) => {
  try {
    const { error, value } = blogSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const post = await BlogPost.create(value);
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
});

// PUT /api/admin/blog/:id
router.put("/blog/:id", async (req, res) => {
  try {
    const { error, value } = blogSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const [updated] = await BlogPost.update(value, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    const post = await BlogPost.findByPk(req.params.id);
    res.json(post);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Failed to update blog post" });
  }
});

// DELETE /api/admin/blog/:id
router.delete("/blog/:id", async (req, res) => {
  try {
    const deleted = await BlogPost.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
});

// Services CRUD
const serviceSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().required(),
  icon: Joi.string().required(),
  features: Joi.array().items(Joi.string()).required(),
});

// GET /api/admin/services
router.get("/services", async (req, res) => {
  try {
    const services = await Service.findAll({ order: [["id", "DESC"]] });
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// POST /api/admin/services
router.post("/services", async (req, res) => {
  try {
    const { error, value } = serviceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const service = await Service.create(value);
    res.status(201).json(service);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Failed to create service" });
  }
});

// PUT /api/admin/services/:id
router.put("/services/:id", async (req, res) => {
  try {
    const { error, value } = serviceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const [updated] = await Service.update(value, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({ error: "Service not found" });
    }
    const service = await Service.findByPk(req.params.id);
    res.json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
});

// DELETE /api/admin/services/:id
router.delete("/services/:id", async (req, res) => {
  try {
    const deleted = await Service.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Failed to delete service" });
  }
});

// Contact Messages
// GET /api/admin/contacts
router.get("/contacts", async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ error: "Failed to fetch contact messages" });
  }
});

// DELETE /api/admin/contacts/:id
router.delete("/contacts/:id", async (req, res) => {
  try {
    const deleted = await ContactMessage.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: "Contact message not found" });
    }
    res.json({ message: "Contact message deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact message:", error);
    res.status(500).json({ error: "Failed to delete contact message" });
  }
});

// User CRUD
const userSchema = Joi.object({
  username: Joi.string().min(1).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).when('$isUpdate', { is: true, then: Joi.optional(), otherwise: Joi.required() }),
  role: Joi.string().valid('admin', 'user').default('user'),
});

// GET /api/admin/users
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [["id", "DESC"]]
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST /api/admin/users
router.post("/users", async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email: value.email }
    });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    const user = await User.create({
      ...value,
      password: hashedPassword
    });

    const { password, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// PUT /api/admin/users/:id
router.put("/users/:id", async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body, { context: { isUpdate: true } });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updateData = { ...value };
    if (value.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(value.password, salt);
    } else {
      delete updateData.password;
    }

    const [updated] = await User.update(updateData, { where: { id: req.params.id } });
    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// DELETE /api/admin/users/:id
router.delete("/users/:id", async (req, res) => {
  try {
    // Prevent deleting the current admin user
    if (req.user.id === parseInt(req.params.id)) {
      return res.status(400).json({ error: "Cannot delete your own account" });
    }

    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
