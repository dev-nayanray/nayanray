import { sequelize } from "../models/index.js";
import Project from "../models/Project.js";
import BlogPost from "../models/BlogPost.js";
import Service from "../models/Service.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const seedDatabase = async () => {
  try {
    // Seed Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = {
      username: 'admin',
      email: 'admin@nayanray.com',
      password: hashedPassword,
      role: 'admin'
    };

    await User.create(adminUser);
    console.log("Admin user seeded successfully");

    // Seed Projects
    const projects = [
      {
        title: "Portfolio Website",
        description: "A modern portfolio built with React, TypeScript, and Tailwind CSS featuring smooth animations and responsive design.",
        image: "/projects/portfolio.png",
        liveLink: "#",
        githubLink: "#",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        category: "Web Development",
        icon: "FaCode",
        gradient: "from-blue-500 to-cyan-500",
        featured: true
      },
      {
        title: "E-commerce Website",
        description: "Full-featured online store built with WooCommerce and WordPress, featuring product management and secure payments.",
        image: "/projects/ecommerce.png",
        liveLink: "#",
        githubLink: "#",
        technologies: ["WordPress", "WooCommerce", "PHP", "JavaScript"],
        category: "E-commerce",
        icon: "FaShoppingCart",
        gradient: "from-purple-500 to-pink-500",
        featured: true
      },
      {
        title: "Loan Management System",
        description: "Custom PHP & MySQL application with responsive UI using Tailwind CSS for financial institutions.",
        image: "/projects/loan.png",
        liveLink: "#",
        githubLink: "#",
        technologies: ["PHP", "MySQL", "Tailwind CSS", "JavaScript"],
        category: "Web Application",
        icon: "FaChartLine",
        gradient: "from-green-500 to-emerald-500"
      },
      {
        title: "3D Wardrobe Configurator",
        description: "Interactive 3D product configurator built with Three.js and WordPress for custom furniture.",
        image: "/projects/wardrobe.png",
        liveLink: "#",
        githubLink: "#",
        technologies: ["Three.js", "WordPress", "JavaScript", "WebGL"],
        category: "3D Web",
        icon: "FaCube",
        gradient: "from-amber-500 to-orange-500"
      },
      {
        title: "Mobile Fitness App",
        description: "Cross-platform mobile application for fitness tracking with real-time analytics and social features.",
        image: "/projects/fitness.png",
        liveLink: "#",
        githubLink: "#",
        technologies: ["React Native", "Firebase", "Redux", "Node.js"],
        category: "Mobile App",
        icon: "FaMobile",
        gradient: "from-red-500 to-rose-500"
      },
      {
        title: "SaaS Dashboard",
        description: "Enterprise SaaS dashboard with real-time analytics, user management, and reporting features.",
        image: "/projects/dashboard.png",
        liveLink: "#",
        githubLink: "#",
        technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
        category: "Web Application",
        icon: "FaChartLine",
        gradient: "from-indigo-500 to-blue-500"
      }
    ];

    await Project.bulkCreate(projects);
    console.log("Projects seeded successfully");

    // Seed Blog Posts
    const blogPosts = [
      {
        title: "Designing a Modern Portfolio with React + Tailwind CSS",
        date: "October 5, 2025",
        author: "Nayan Ray",
        excerpt: "Learn how to craft a visually appealing and high-performance portfolio using React, Vite, and Tailwind CSS with smooth animations and best practices.",
        image: "https://images.unsplash.com/photo-1522204501860-5b2cb5300d40?auto=format&fit=crop&w=800&q=60",
        readTime: "8 min read",
        category: "Web Development",
        tags: ["React", "Tailwind CSS", "Portfolio"]
      },
      {
        title: "Optimizing Your Website for Lightning-Fast Performance",
        date: "September 20, 2025",
        author: "Nayan Ray",
        excerpt: "Discover proven strategies to boost your site speed and improve SEO ranking using Vite, lazy loading, and image optimization techniques.",
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=60",
        readTime: "12 min read",
        category: "Performance",
        tags: ["SEO", "Optimization", "Core Web Vitals"]
      },
      {
        title: "Building Scalable Frontend Systems with TypeScript",
        date: "August 12, 2025",
        author: "Nayan Ray",
        excerpt: "TypeScript helps developers build reliable, maintainable codebases. Learn best practices and patterns for scalable React projects in enterprise applications.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
        readTime: "10 min read",
        category: "TypeScript",
        tags: ["TypeScript", "React", "Best Practices"]
      },
      {
        title: "Modern State Management in React Applications",
        date: "July 28, 2025",
        author: "Nayan Ray",
        excerpt: "Exploring modern state management solutions from Context API to Zustand and their practical applications in real-world projects.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60",
        readTime: "15 min read",
        category: "React",
        tags: ["React", "State Management", "Zustand"]
      },
      {
        title: "The Complete Guide to WordPress Theme Development",
        date: "June 15, 2025",
        author: "Nayan Ray",
        excerpt: "A comprehensive guide to building custom WordPress themes from scratch with modern development practices and security considerations.",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=60",
        readTime: "20 min read",
        category: "WordPress",
        tags: ["WordPress", "Theme Development", "PHP"]
      },
      {
        title: "Mastering CSS Grid and Flexbox for Modern Layouts",
        date: "May 8, 2025",
        author: "Nayan Ray",
        excerpt: "Deep dive into CSS Grid and Flexbox with practical examples and real-world use cases for creating responsive, modern web layouts.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=60",
        readTime: "14 min read",
        category: "CSS",
        tags: ["CSS", "Grid", "Flexbox", "Responsive"]
      }
    ];

    await BlogPost.bulkCreate(blogPosts);
    console.log("Blog posts seeded successfully");

    // Seed Services
    const services = [
      {
        title: "Web Development",
        description: "Custom web applications built with modern technologies and best practices.",
        icon: "FaCode",
        features: ["React/Next.js", "Node.js", "Database Design", "API Development"]
      },
      {
        title: "Mobile Development",
        description: "Cross-platform mobile apps for iOS and Android using React Native.",
        icon: "FaMobile",
        features: ["React Native", "Native Performance", "App Store Deployment", "Push Notifications"]
      },
      {
        title: "UI/UX Design",
        description: "Beautiful and intuitive user interfaces designed for optimal user experience.",
        icon: "FaPalette",
        features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
      },
      {
        title: "E-commerce Solutions",
        description: "Complete e-commerce platforms with payment integration and inventory management.",
        icon: "FaShoppingCart",
        features: ["WooCommerce", "Payment Gateway", "Inventory System", "Analytics"]
      }
    ];

    await Service.bulkCreate(services);
    console.log("Services seeded successfully");

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

export default seedDatabase;
