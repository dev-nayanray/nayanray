import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaCalendar, FaUser, FaClock, FaTags, FaArrowLeft, FaExternalLinkAlt, FaShare, FaFacebook, FaTwitter, FaLinkedin, FaBookmark, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../services/api";
import Premium from "../components/Premium";
import Portfolio from "../components/Portfolio";
import BlogSidebar from "../components/BlogSidebar";

// Define TypeScript interfaces
interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  readTime: string;
  category: string;
  tags: string[]; // Ensure this is always an array
  createdAt: string;
  updatedAt: string;
  content?: string; // Added for full post content
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

// Error Boundary Component (Class Component)
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

 static getDerivedStateFromError(_error: Error) {
  return { hasError: true };
}


  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-4xl mx-auto py-20 text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Something went wrong</h2>
          <p className="mb-6 text-gray-600">We encountered an unexpected error. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Skeleton Loading Component
const BlogPostSkeleton = () => (
  <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
    <div className="animate-pulse">
      {/* Back button skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
        <div className="w-20 h-6 bg-gray-300 rounded"></div>
      </div>

      {/* Title skeleton */}
      <div className="h-10 bg-gray-300 rounded mb-6"></div>

      {/* Meta info skeleton */}
      <div className="flex flex-wrap gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Image skeleton */}
      <div className="w-full h-96 bg-gray-300 rounded-lg mb-8"></div>

      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>
    </div>
  </div>
);

// Main Component
const SingleBlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Safe tags array with fallback
  const tags = Array.isArray(post?.tags) ? post.tags : [];

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) {
        setError("Invalid blog post ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/blog/${id}`);

        // Ensure tags is always an array and validate response structure
        const postData = {
          ...response.data,
          tags: Array.isArray(response.data.tags) ? response.data.tags : []
        };

        setPost(postData);
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
        setError("Blog post not found or failed to load");
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

          // Enhanced filtering with safety checks
          const related = allProjects.filter((project: Project) => {
            // Safe category comparison
            const postCategory = post.category?.toLowerCase() || '';
            const projectCategory = project.category?.toLowerCase() || '';

            if (postCategory && projectCategory && projectCategory === postCategory) {
              return true;
            }

            // Safe tag/technology matching
            const projectTech = Array.isArray(project.technologies) ? project.technologies : [];
            const postTags = Array.isArray(post.tags) ? post.tags : [];

            return projectTech.some((tech: string) =>
              postTags.some((tag: string) =>
                tag?.toLowerCase().includes(tech?.toLowerCase()) ||
                tech?.toLowerCase().includes(tag?.toLowerCase())
              )
            );
          }).slice(0, 3);

          setRelatedProjects(related);
        } catch (err) {
          console.error("Failed to fetch projects:", err);
          setRelatedProjects([]); // Ensure it's always an array
        }
      };

      fetchRelatedProjects();
    }
  }, [post]);

  // Loading state
  if (loading) {
    return <BlogPostSkeleton />;
  }

  // Error state
  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            {error || "The blog post you're looking for doesn't exist or may have been moved."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
            >
              Go Back
            </motion.button>
            <motion.button
              onClick={() => navigate('/blog')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Browse All Posts
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <>
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            style={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5, delay: 1 }}
          />
        </div>

        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              {/* Back Button */}
              <motion.button
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 mb-12 text-blue-600 hover:text-blue-800 font-semibold group transition-colors"
              >
                <motion.div
                  whileHover={{ x: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FaArrowLeft className="group-hover:text-blue-800 transition-colors" />
                </motion.div>
                <span>Back to Blog</span>
              </motion.button>

              {/* Blog Article */}
              <motion.article
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100"
              >
                {/* Header */}
                <header className="mb-12">
                  <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {post.title}
                  </motion.h1>

                  <motion.div
                    className="flex flex-wrap items-center gap-4 text-gray-600 mb-8 text-sm"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                      <FaCalendar className="text-blue-500" />
                      <span className="font-medium">{new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </span>
                    <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                      <FaUser className="text-green-500" />
                      <span className="font-medium">{post.author}</span>
                    </span>
                    <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                      <FaClock className="text-purple-500" />
                      <span className="font-medium">{post.readTime}</span>
                    </span>
                    <span className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full">
                      <FaTags className="text-blue-600" />
                      <span className="font-medium">{post.category}</span>
                    </span>
                    <span className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-full">
                      <FaEye className="text-green-600" />
                      <span className="font-medium">1.2K views</span>
                    </span>
                  </motion.div>

                  {/* Social Share & Actions */}
                  <motion.div
                    className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-gray-50 rounded-2xl"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700">Share this post:</span>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                        >
                          <FaFacebook className="w-3 h-3" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                        >
                          <FaTwitter className="w-3 h-3" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                        >
                          <FaLinkedin className="w-3 h-3" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                        >
                          <FaShare className="w-3 h-3" />
                        </motion.button>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      <FaBookmark className="w-4 h-4" />
                      Save
                    </motion.button>
                  </motion.div>
                </header>

                {/* Featured Image */}
                <motion.img
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  src={post.image}
                  alt={post.title}
                  className="w-full rounded-2xl mb-12 object-cover max-h-96 shadow-xl"
                  loading="eager"
                />

                {/* Excerpt */}
                <motion.div
                  className="prose prose-lg max-w-none mb-12"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-xl text-gray-700 leading-relaxed bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-medium">
                    {post.excerpt}
                  </p>
                </motion.div>

                {/* Tags */}
                {tags.length > 0 && (
                  <motion.div
                    className="flex flex-wrap gap-3 mb-12"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {tags.map((tag: string, index: number) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg cursor-pointer hover:shadow-xl transition-all"
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </motion.div>
                )}

                {/* Article Content Placeholder */}
                <motion.div
                  className="prose prose-lg max-w-none mb-12"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Main Content</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>

                  <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-600 my-8 bg-blue-50 py-4 px-6 rounded-r-lg">
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
                  </blockquote>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
                </motion.div>

                {/* Related Projects Section */}
                {relatedProjects.length > 0 && (
                  <motion.div
                    className="mt-16 pt-12 border-t border-gray-200"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0 }}
                  >
                    <h3 className="text-3xl font-bold text-gray-900 mb-8">Related Projects</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {relatedProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="p-6">
                            <h4 className="font-bold text-lg mb-3 text-gray-900">{project.title}</h4>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>
                            <Link
                              to={`/projects/${project.id}`}
                              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm group"
                            >
                              View Project
                              <FaExternalLinkAlt className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Author Bio */}
                <motion.div
                  className="mt-12 pt-8 border-t border-gray-200"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={post.image}
                      alt={post.author}
                      className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900 mb-2">About {post.author}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {post.author} is a passionate developer and writer who loves sharing knowledge about technology, design, and innovation. With years of experience in the field, they strive to create meaningful content that helps others grow.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            </motion.main>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-1"
            >
              <BlogSidebar currentPostId={post.id} />
            </motion.aside>
          </div>
        </div>
        <Premium />
        <Portfolio />
      </>
    </ErrorBoundary>
  );
};

export default SingleBlogPost;
