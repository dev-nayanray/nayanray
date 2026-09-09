import { useParams, useNavigate, Link } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaCode, FaMobile, FaShoppingCart, FaCube, FaChartLine, FaArrowLeft, FaCalendar, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../services/api";
import Premium from "../components/Premium";
import ProjectGallery from "../components/ui/ProjectGallery";

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
  createdAt: string;
  updatedAt: string;
}

const SingleProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedBlogPosts, setRelatedBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Project not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    if (project) {
      const fetchRelatedBlogPosts = async () => {
        try {
          const response = await api.get("/blog");
          const allBlogPosts = response.data;

          // Filter related blog posts based on category and technologies
          const related = allBlogPosts.filter((post: BlogPost) => {
            // Match by category
            if (post.category.toLowerCase() === project.category.toLowerCase()) {
              return true;
            }
            // Match by technologies/tags
            return post.tags.some((tag: string) =>
              project.technologies.some((tech: string) =>
                tag.toLowerCase().includes(tech.toLowerCase()) ||
                tech.toLowerCase().includes(tag.toLowerCase())
              )
            );
          }).slice(0, 3); // Limit to 3 related blog posts
          setRelatedBlogPosts(related);
        } catch (err) {
          console.error("Failed to fetch blog posts:", err);
        }
      };

      fetchRelatedBlogPosts();
    }
  }, [project]);

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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto"></div>
        <p className="mt-4 text-surface-900/60 dark:text-white/50">Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center px-4">
        <h2 className="text-3xl font-bold mb-4 text-surface-900 dark:text-white">Project Not Found</h2>
        <p className="mb-8 text-surface-900/60 dark:text-white/50">{error || "The project you are looking for does not exist."}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="relative pt-28 pb-12 bg-gradient-to-br from-surface-50 via-surface-0 to-brand-50/30 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 mb-8 text-brand-600 dark:text-brand-300 hover:text-brand-800 dark:hover:text-brand-200 font-semibold"
          >
            <FaArrowLeft /> Back to Projects
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.gradient} text-white text-sm font-medium shadow-lg`}>
                {getIconComponent(project.icon)}
                {project.category}
              </div>
              {project.featured && (
                <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500 text-white text-sm font-medium shadow-lg">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Featured
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-surface-900 dark:text-white">{project.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-surface-0 dark:bg-surface-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 pb-4">
          <ProjectGallery
            images={project.images}
            alt={project.title}
            variant="detail"
            className="rounded-2xl overflow-hidden shadow-card"
          />
        </div>
      </section>

      {/* Body */}
      <section className="py-16 bg-surface-0 dark:bg-surface-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article>
            <p className="text-lg text-surface-900/70 dark:text-white/60 leading-relaxed mb-10 max-w-3xl">
              {project.description}
            </p>

            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4 text-surface-900 dark:text-white">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-surface-50 dark:bg-white/5 text-surface-900/70 dark:text-white/60 border border-surface-100 dark:border-white/10 rounded-full text-sm font-medium"
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
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold rounded-lg shadow-glow hover:shadow-xl transition-all duration-300"
              >
                <FaExternalLinkAlt /> Live Demo
              </motion.a>

              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-surface-50 dark:bg-white/5 text-surface-900/70 dark:text-white/60 font-semibold rounded-lg border border-surface-100 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-500/40 transition-all duration-300"
              >
                <FaGithub /> View Code
              </motion.a>
            </div>

            {/* Related Blog Posts Section */}
            {relatedBlogPosts.length > 0 && (
              <div className="mt-16 pt-10 border-t border-surface-100 dark:border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-surface-900 dark:text-white">Related Blog Posts</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedBlogPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-surface-0 dark:bg-surface-800 rounded-lg border border-surface-100 dark:border-white/10 shadow-soft overflow-hidden hover:shadow-card transition-shadow duration-300"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-lg mb-2 text-surface-900 dark:text-white">{post.title}</h4>
                        <p className="text-surface-900/60 dark:text-white/50 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-2 text-xs text-surface-900/40 dark:text-white/40 mb-3">
                          <FaCalendar className="w-3 h-3" />
                          {post.date}
                          <span className="mx-1">•</span>
                          <FaUser className="w-3 h-3" />
                          {post.author}
                        </div>
                        <Link
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-300 hover:text-brand-800 dark:hover:text-brand-200 font-medium text-sm"
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
        </div>
      </section>

      <Premium />
    </>
  );
};

export default SingleProject;
