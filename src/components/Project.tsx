import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaCode, FaMobile, FaShoppingCart, FaCube, FaChartLine } from "react-icons/fa";
import api from "../services/api";
import ProjectGallery from "./ui/ProjectGallery";

interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  liveLink: string;
  githubLink: string;
  technologies: string[];
  category: string;
  icon: string;
  gradient: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const Project = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FaCode': return <FaCode className="w-5 h-5" />;
      case 'FaMobile': return <FaMobile className="w-5 h-5" />;
      case 'FaShoppingCart': return <FaShoppingCart className="w-5 h-5" />;
      case 'FaCube': return <FaCube className="w-5 h-5" />;
      case 'FaChartLine': return <FaChartLine className="w-5 h-5" />;
      default: return <FaCode className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="projects"
      className="relative py-20 bg-gradient-to-br from-surface-50 via-surface-0 to-brand-50/30 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-brand-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-64 h-64 bg-cyan-200/10 rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/30 dark:text-brand-300 text-sm font-medium mb-6"
          >
            <FaCode className="w-4 h-4" />
            My Work
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-surface-900 dark:text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">Projects</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto rounded-full mb-8"></div>

          <p className="text-xl text-surface-900/60 dark:text-white/50 max-w-3xl mx-auto leading-relaxed">
            A collection of projects that showcase my expertise in web development,
            from responsive designs to complex web applications and interactive experiences.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 300
              }}
              className="group relative"
            >
              {/* Background Gradient Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-300`}></div>

              {/* Main Card */}
              <div className="relative h-full bg-surface-0/80 dark:bg-surface-900/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-surface-100 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500">

                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <ProjectGallery
                    images={project.images}
                    alt={project.title}
                    variant="card"
                    className="group-hover:[&_img]:scale-110 [&_img]:transition-transform [&_img]:duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center gap-4 bg-black/60 opacity-0 pointer-events-none transition-all duration-500 group-hover:opacity-100 group-hover:pointer-events-auto">
                    <motion.a
                      href={`/projects/${project.id}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <FaExternalLinkAlt className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <FaGithub className="w-5 h-5" />
                    </motion.a>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.gradient} text-white text-sm font-medium shadow-lg`}>
                      {getIconComponent(project.icon)}
                      {project.category}
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500 text-white text-sm font-medium shadow-lg">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        Featured
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-3 group-hover:text-surface-900/80 dark:group-hover:text-white/90 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-surface-900/60 dark:text-white/50 mb-4 leading-relaxed group-hover:text-surface-900/70 dark:group-hover:text-white/60 transition-colors">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(Array.isArray(project.technologies) ? project.technologies : []).map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-surface-50 dark:bg-white/5 text-surface-900/70 dark:text-white/60 text-sm rounded-full border border-surface-100 dark:border-white/10 group-hover:border-surface-100/80 dark:group-hover:border-white/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold rounded-xl shadow-glow hover:shadow-xl transition-all duration-300 group/btn overflow-hidden relative"
                    >
                      <span className="relative z-10">Live Demo</span>
                      <FaExternalLinkAlt className="w-4 h-4 relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    </motion.a>

                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-50 dark:bg-white/5 text-surface-900/70 dark:text-white/60 font-semibold rounded-xl border border-surface-100 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-500/40 transition-all duration-300 group/code"
                    >
                      <FaGithub className="w-4 h-4 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors" />
                    </motion.a>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 border-2 border-transparent bg-gradient-to-r ${project.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                  <div className="absolute inset-[2px] bg-surface-0 dark:bg-surface-900 rounded-3xl"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-brand-50 to-brand-100/60 dark:from-brand-500/10 dark:to-brand-500/5 rounded-3xl p-8 md:p-12 border border-brand-100/50 dark:border-brand-500/20 shadow-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-surface-900/60 dark:text-white/50 text-lg mb-8 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can bring your ideas to life with cutting-edge technology and creative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/start-a-project">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold rounded-2xl shadow-glow hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  Start a Project
                </motion.div>
              </Link>
              <Link to="/projects">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-surface-0 dark:bg-surface-900 text-surface-900 dark:text-white font-semibold rounded-2xl border-2 border-surface-100 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-500/40 transition-all duration-300 cursor-pointer"
                >
                  View All Projects
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Project;
