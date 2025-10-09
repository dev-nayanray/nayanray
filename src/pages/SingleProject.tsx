import { useParams, useNavigate, Link } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaCode, FaMobile, FaShoppingCart, FaCube, FaChartLine, FaArrowLeft, FaCalendar, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../services/api";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
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
      <div className="max-w-4xl mx-auto py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <p className="mb-8">{error || "The project you are looking for does not exist."}</p>
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
            {project.technologies.map((tech: string, index: number) => (
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
                  key={post.id}
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
