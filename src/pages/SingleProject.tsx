import { useParams, useNavigate, Link } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaCode, FaMobile, FaShoppingCart, FaCube, FaChartLine, FaArrowLeft, FaCalendar, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import React from "react";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  readTime: string;
  category: string;
  tags: string[];
}

interface Project {
  title: string;
  description: string;
  image: string;
  liveLink: string;
  githubLink: string;
  technologies: string[];
  category: string;
  icon: React.ReactElement;
  gradient: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "A modern portfolio built with React, TypeScript, and Tailwind CSS featuring smooth animations and responsive design.",
    image: "/projects/portfolio.png",
    liveLink: "#",
    githubLink: "#",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Web Development",
    icon: <FaCode className="w-5 h-5" />,
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
    icon: <FaShoppingCart className="w-5 h-5" />,
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
    icon: <FaChartLine className="w-5 h-5" />,
    gradient: "from-green-500 to-emerald-500",
    featured: false
  },
  {
    title: "3D Wardrobe Configurator",
    description: "Interactive 3D product configurator built with Three.js and WordPress for custom furniture.",
    image: "/projects/wardrobe.png",
    liveLink: "#",
    githubLink: "#",
    technologies: ["Three.js", "WordPress", "JavaScript", "WebGL"],
    category: "3D Web",
    icon: <FaCube className="w-5 h-5" />,
    gradient: "from-amber-500 to-orange-500",
    featured: false
  },
  {
    title: "Mobile Fitness App",
    description: "Cross-platform mobile application for fitness tracking with real-time analytics and social features.",
    image: "/projects/fitness.png",
    liveLink: "#",
    githubLink: "#",
    technologies: ["React Native", "Firebase", "Redux", "Node.js"],
    category: "Mobile App",
    icon: <FaMobile className="w-5 h-5" />,
    gradient: "from-red-500 to-rose-500",
    featured: false
  },
  {
    title: "SaaS Dashboard",
    description: "Enterprise SaaS dashboard with real-time analytics, user management, and reporting features.",
    image: "/projects/dashboard.png",
    liveLink: "#",
    githubLink: "#",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    category: "Web Application",
    icon: <FaChartLine className="w-5 h-5" />,
    gradient: "from-indigo-500 to-blue-500",
    featured: false
  }
];

const SingleProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectIndex = Number(id);
  const project = projects[projectIndex];

  // Find related blog posts based on category and technologies
  const getRelatedBlogPosts = (currentProject: Project) => {
    return blogPosts.filter(post => {
      // Match by category
      if (post.category.toLowerCase() === currentProject.category.toLowerCase()) {
        return true;
      }
      // Match by technologies/tags
      return post.tags.some(tag =>
        currentProject.technologies.some(tech =>
          tag.toLowerCase().includes(tech.toLowerCase()) ||
          tech.toLowerCase().includes(tag.toLowerCase())
        )
      );
    }).slice(0, 3); // Limit to 3 related blog posts
  };

  const relatedBlogPosts = project ? getRelatedBlogPosts(project) : [];

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <p className="mb-8">The project you are looking for does not exist.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <motion.button
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 mb-8 text-blue-600 hover:text-blue-800 font-semibold"
      >
        <FaArrowLeft /> Back to Projects
      </motion.button>

      <article>
        <div className="flex items-center gap-3 mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.gradient} text-white text-sm font-medium shadow-lg`}>
            {project.icon}
            {project.category}
          </div>
          {project.featured && (
            <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500 text-white text-sm font-medium shadow-lg">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Featured
            </div>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

        <img
          src={project.image}
          alt={project.title}
          className="w-full rounded-lg mb-8 object-cover max-h-96 mx-auto"
        />

        <p className="text-lg text-gray-700 leading-relaxed mb-8">{project.description}</p>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaExternalLinkAlt /> Live Demo
          </motion.a>

          <motion.a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg border border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300"
          >
            <FaGithub /> View Code
          </motion.a>
        </div>

        {/* Related Blog Posts Section */}
        {relatedBlogPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold mb-6">Related Blog Posts</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-2">{post.title}</h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <FaCalendar className="w-3 h-3" />
                      {post.date}
                      <span className="mx-1">•</span>
                      <FaUser className="w-3 h-3" />
                      {post.author}
                    </div>
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Read Article <FaExternalLinkAlt className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </article>
    </section>
  );
};

export default SingleProject;
