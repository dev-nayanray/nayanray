import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaCode, FaMobile, FaShoppingCart, FaCube, FaChartLine, FaArrowRight } from "react-icons/fa";
import { useApi } from "../hooks/useApi";
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
  // Replaces 12 lines of duplicated fetch boilerplate with one hook call.
  const { data: projects, loading, error } = useApi<Project[]>("/projects");

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
          {loading && (
            <div className="col-span-full flex justify-center py-12">
              <div className="w-10 h-10 rounded-full border-4 border-brand-500/20 border-t-brand-500 animate-spin" />
            </div>
          )}
          {error && (
            <div className="col-span-full text-center py-12 text-rose-500">
              Failed to load projects: {error}
            </div>
          )}
          {projects && projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: Math.min(index * 0.05, 0.3),
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Premium Card — no gradient halo, clean shadow + lift */}
              <Link
                to={`/projects/${project.id}`}
                className="block relative h-full bg-surface-0 dark:bg-surface-900/60 rounded-2xl overflow-hidden border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image — fixed aspect ratio prevents layout shift */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-100 dark:bg-surface-800">
                  <ProjectGallery
                    images={project.images}
                    alt={project.title}
                    variant="card"
                    className="[&_img]:scale-100 group-hover:[&_img]:scale-105 [&_img]:transition-transform [&_img]:duration-500"
                  />

                  {/* Subtle gradient scrim for badge readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                  {/* Category Badge — glassmorphism, brand-cohesive */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                      {getIconComponent(project.icon)}
                      {project.category}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-500 text-white text-xs font-semibold shadow-lg">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2 tracking-tight group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-surface-900/60 dark:text-white/50 mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies — subtle pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(Array.isArray(project.technologies) ? project.technologies : []).slice(0, 3).map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="px-2 py-0.5 bg-surface-50 dark:bg-white/5 text-surface-900/60 dark:text-white/50 text-xs rounded-md border border-surface-100 dark:border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-surface-900/40 dark:text-white/40 text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-white/5">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-300 group-hover:gap-2.5 transition-all">
                      View Details
                      <FaArrowRight className="w-3 h-3" />
                    </span>
                    <div className="flex items-center gap-2">
                      {project.liveLink && project.liveLink !== "#" && (
                        <span className="p-1.5 rounded-lg bg-surface-50 dark:bg-white/5 text-surface-900/50 dark:text-white/40 hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                          <FaExternalLinkAlt className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {project.githubLink && project.githubLink !== "#" && (
                        <span className="p-1.5 rounded-lg bg-surface-50 dark:bg-white/5 text-surface-900/50 dark:text-white/40 hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                          <FaGithub className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-brand-50 to-brand-100/60 dark:from-brand-500/10 dark:to-brand-500/5 rounded-2xl p-8 md:p-12 border border-brand-100/50 dark:border-brand-500/20">
            <h3 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white mb-3 tracking-tight">
              Interested in Working Together?
            </h3>
            <p className="text-surface-900/60 dark:text-white/50 text-base mb-6 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/start-a-project"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Start a Project
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-0 dark:bg-surface-900 text-surface-900 dark:text-white font-semibold rounded-xl border border-surface-100 dark:border-white/10 hover:border-brand-300 dark:hover:border-brand-500/40 transition-all duration-300"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Project;
