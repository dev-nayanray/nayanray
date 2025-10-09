import { useParams, useNavigate, Link } from "react-router-dom";
import { FaCalendar, FaUser, FaClock, FaTags, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../services/api";

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

const SingleBlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await api.get(`/blog/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
        setError("Blog post not found");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  useEffect(() => {
    if (post) {
      const fetchRelatedProjects = async () => {
        try {
          const response = await api.get("/projects");
          const allProjects = response.data;

          // Filter related projects based on category and tags
          const related = allProjects.filter((project: Project) => {
            // Match by category
            if (project.category.toLowerCase() === post.category.toLowerCase()) {
              return true;
            }
            // Match by technologies/tags
            return project.technologies.some((tech: string) =>
              post.tags.some((tag: string) =>
                tag.toLowerCase().includes(tech.toLowerCase()) ||
                tech.toLowerCase().includes(tag.toLowerCase())
              )
            );
          }).slice(0, 3); // Limit to 3 related projects
          setRelatedProjects(related);
        } catch (err) {
          console.error("Failed to fetch projects:", err);
        }
      };

      fetchRelatedProjects();
    }
  }, [post]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading blog post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Blog Post Not Found</h2>
        <p className="mb-8">{error || "The blog post you are looking for does not exist."}</p>
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
        <FaArrowLeft /> Back to Blog
      </motion.button>

      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 text-sm">
          <span className="flex items-center gap-2">
            <FaCalendar /> {post.date}
          </span>
          <span className="flex items-center gap-2">
            <FaUser /> {post.author}
          </span>
          <span className="flex items-center gap-2">
            <FaClock /> {post.readTime}
          </span>
          <span className="flex items-center gap-2">
            <FaTags /> {post.category}
          </span>
        </div>

        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-lg mb-8 object-cover max-h-96 mx-auto"
        />

        <p className="text-lg text-gray-700 leading-relaxed mb-8">{post.excerpt}</p>

        <div className="flex flex-wrap gap-3">
          {post.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold mb-6">Related Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View Project <FaExternalLinkAlt className="w-3 h-3" />
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

export default SingleBlogPost;
