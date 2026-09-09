import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaCalendar, FaUser, FaClock, FaTags, FaArrowLeft, FaExternalLinkAlt, FaShare } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useSeo } from "../hooks/useSeo";
import Premium from "../components/Premium";
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
  tags: string[];
  createdAt: string;
  updatedAt: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  status?: string;
  featured?: boolean;
}

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
          <p className="mb-6 text-surface-900/60 dark:text-white/50">We encountered an unexpected error. Please try again.</p>
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
        <div className="w-6 h-6 bg-surface-100 dark:bg-white/10 rounded"></div>
        <div className="w-20 h-6 bg-surface-100 dark:bg-white/10 rounded"></div>
      </div>

      {/* Title skeleton */}
      <div className="h-10 bg-surface-100 dark:bg-white/10 rounded mb-6"></div>

      {/* Meta info skeleton */}
      <div className="flex flex-wrap gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-4 h-4 bg-surface-100 dark:bg-white/10 rounded"></div>
            <div className="w-24 h-4 bg-surface-100 dark:bg-white/10 rounded"></div>
          </div>
        ))}
      </div>

      {/* Image skeleton */}
      <div className="w-full h-96 bg-surface-100 dark:bg-white/10 rounded-lg mb-8"></div>

      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-surface-100 dark:bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-surface-100 dark:bg-white/10 rounded w-5/6"></div>
        <div className="h-4 bg-surface-100 dark:bg-white/10 rounded w-4/6"></div>
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

  // SEO — uses metaTitle/metaDescription from the blog post if available,
  // falls back to title/excerpt. Updates document head on every post change.
  useSeo({
    title: post?.metaTitle || post?.title || "Blog Post — Nayan Ray",
    description: post?.metaDescription || post?.excerpt || "Read this blog post on Nayan Ray's portfolio.",
    canonical: id ? `/blog/${id}` : "/blog",
    keywords: post?.tags || [],
    ogType: "article",
  });

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
          <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">Blog Post Not Found</h2>
          <p className="text-lg text-surface-900/60 dark:text-white/50 mb-8 max-w-md mx-auto">
            {error || "The blog post you're looking for doesn't exist or may have been moved."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium shadow-lg"
            >
              Go Back
            </motion.button>
            <motion.button
              onClick={() => navigate('/blog')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-surface-100 dark:border-white/10 text-surface-900/70 dark:text-white/60 rounded-lg hover:bg-surface-50 dark:hover:bg-white/5 transition-colors font-medium"
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
        <div className="fixed top-0 left-0 w-full h-1 bg-surface-100 dark:bg-white/10 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-500 to-brand-700"
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
                className="flex items-center gap-3 mb-12 text-brand-600 dark:text-brand-300 hover:text-brand-800 dark:hover:text-brand-200 font-semibold group transition-colors"
              >
                <motion.div
                  whileHover={{ x: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FaArrowLeft className="group-hover:text-brand-800 dark:group-hover:text-brand-200 transition-colors" />
                </motion.div>
                <span>Back to Blog</span>
              </motion.button>

              {/* Blog Article */}
              <motion.article
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-surface-0 dark:bg-surface-900 rounded-3xl shadow-xl p-8 md:p-12 border border-surface-100 dark:border-white/10"
              >
                {/* Header */}
                <header className="mb-12">
                  <motion.h1
                    className="text-4xl md:text-5xl font-bold text-surface-900 dark:text-white mb-6 leading-tight"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {post.title}
                  </motion.h1>

                  <motion.div
                    className="flex flex-wrap items-center gap-4 text-surface-900/60 dark:text-white/50 mb-8 text-sm"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="flex items-center gap-2 bg-surface-50 dark:bg-white/5 px-3 py-1.5 rounded-full">
                      <FaCalendar className="text-blue-500" />
                      <span className="font-medium">{new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </span>
                    <span className="flex items-center gap-2 bg-surface-50 dark:bg-white/5 px-3 py-1.5 rounded-full">
                      <FaUser className="text-green-500" />
                      <span className="font-medium">{post.author}</span>
                    </span>
                    <span className="flex items-center gap-2 bg-surface-50 dark:bg-white/5 px-3 py-1.5 rounded-full">
                      <FaClock className="text-purple-500" />
                      <span className="font-medium">{post.readTime}</span>
                    </span>
                    <span className="flex items-center gap-2 bg-brand-100 text-brand-800 dark:bg-brand-500/10 dark:text-brand-300 px-3 py-1.5 rounded-full">
                      <FaTags className="text-brand-600 dark:text-brand-300" />
                      <span className="font-medium">{post.category}</span>
                    </span>
                    {/* View count removed — was hardcoded "1.2K views" on
                        every post. Implement real view counting in the
                        backend before re-enabling this badge. */}
                  </motion.div>

                  {/* Social Share — Web Share API + copy link */}
                  <motion.div
                    className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-surface-50 dark:bg-white/5 rounded-2xl"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-surface-900/70 dark:text-white/60">Share:</span>
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({ title: post.title, url: window.location.href });
                          } else {
                            navigator.clipboard.writeText(window.location.href);
                          }
                        }}
                        className="px-3 py-2 bg-brand-500/10 text-brand-600 dark:text-brand-300 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors"
                      >
                        <FaShare className="w-3.5 h-3.5 inline mr-1.5" />
                        {typeof navigator !== 'undefined' && typeof navigator.share === 'function' ? 'Share' : 'Copy Link'}
                      </button>
                    </div>
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
                  <p className="text-xl leading-relaxed bg-gradient-to-r from-surface-900 to-surface-900/70 dark:from-white dark:to-white/70 bg-clip-text text-transparent font-medium">
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
                        className="px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-full text-sm font-medium shadow-lg cursor-pointer hover:shadow-xl transition-all"
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </motion.div>
                )}

                {/* Article Content — renders post.content from the API.
                    If the backend doesn't provide content (older seed data),
                    falls back to the excerpt expanded into a readable intro
                    instead of shipping Lorem ipsum placeholders. */}
                <motion.div
                  className="prose prose-lg max-w-none mb-12"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  {post.content ? (
                    <div
                      className="text-surface-900/70 dark:text-white/60 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">
                        Overview
                      </h2>
                      <p className="text-surface-900/70 dark:text-white/60 leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                      <p className="text-surface-900/70 dark:text-white/60 leading-relaxed">
                        This article is part of the {post.category} series. The full
                        body content will be available once it's published in the
                        admin panel. The excerpt above gives you a preview of what's
                        covered — check back soon for the complete write-up, or
                        reach out via the contact form if you'd like to discuss
                        this topic in more detail.
                      </p>
                    </>
                  )}
                </motion.div>

                {/* Related Projects Section */}
                {relatedProjects.length > 0 && (
                  <motion.div
                    className="mt-16 pt-12 border-t border-surface-100 dark:border-white/10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0 }}
                  >
                    <h3 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">Related Projects</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {relatedProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                          className="bg-surface-0 dark:bg-surface-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-surface-100 dark:border-white/10"
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={project.images?.[0]}
                              alt={project.title}
                              loading="lazy"
                              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          <div className="p-6">
                            <h4 className="font-bold text-lg mb-3 text-surface-900 dark:text-white">{project.title}</h4>
                            <p className="text-surface-900/60 dark:text-white/50 text-sm mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-surface-50 dark:bg-white/5 text-surface-900/70 dark:text-white/60 text-xs rounded-full font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="px-3 py-1 bg-surface-50 dark:bg-white/5 text-surface-900/40 dark:text-white/40 text-xs rounded-full font-medium">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>
                            <Link
                              to={`/projects/${project.id}`}
                              className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-300 hover:text-brand-800 dark:hover:text-brand-200 font-semibold text-sm group"
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
                  className="mt-12 pt-8 border-t border-surface-100 dark:border-white/10"
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
                      <h4 className="font-semibold text-lg text-surface-900 dark:text-white mb-2">About {post.author}</h4>
                      <p className="text-surface-900/60 dark:text-white/50 text-sm leading-relaxed">
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
      </>
    </ErrorBoundary>
  );
};

export default SingleBlogPost;
