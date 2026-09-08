import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaArrowRight, FaClock, FaTags } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";

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

const Blog = () => {
  // Replaces 12 lines of duplicated fetch boilerplate with one hook call.
  const { data: blogPosts, loading, error } = useApi<BlogPost[]>("/blog");

  return (
    <section id="blog" className="relative py-20 bg-gradient-to-br from-surface-50 via-surface-0 to-brand-50/30 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-200/10 rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
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
            <FaTags className="w-4 h-4" />
            Latest Articles
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-surface-900 dark:text-white">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">Blog</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto rounded-full mb-8"></div>

          <p className="text-xl text-surface-900/60 dark:text-white/50 max-w-3xl mx-auto leading-relaxed">
            Insights, tutorials, and thoughts on web development, design, and technology.
            Stay updated with the latest trends and best practices.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && (
            <div className="col-span-full flex justify-center py-12">
              <div className="w-10 h-10 rounded-full border-4 border-brand-500/20 border-t-brand-500 animate-spin" />
            </div>
          )}
          {error && (
            <div className="col-span-full text-center py-12 text-rose-500">
              Failed to load blog posts: {error}
            </div>
          )}
          {blogPosts && blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
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
              <Link
                to={`/blog/${post.id}`}
                className="block relative h-full bg-surface-0 dark:bg-surface-900/60 rounded-2xl overflow-hidden border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image — fixed aspect ratio */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-100 dark:bg-surface-800">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                  {/* Category Badge — glassmorphism */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                      {post.category}
                    </span>
                  </div>

                  {/* Read Time — glass chip */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                      <FaClock className="w-2.5 h-2.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-surface-900/40 dark:text-white/40 mb-2">
                    <span className="flex items-center gap-1">
                      <FaCalendar className="w-2.5 h-2.5" />
                      {post.date}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <FaUser className="w-2.5 h-2.5" />
                      {post.author}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2 tracking-tight group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-surface-900/60 dark:text-white/50 mb-4 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Tags — max 3 */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(Array.isArray(post.tags) ? post.tags : []).slice(0, 3).map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-0.5 bg-surface-50 dark:bg-white/5 text-surface-900/60 dark:text-white/50 text-xs rounded-md border border-surface-100 dark:border-white/10"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-300 group-hover:gap-2.5 transition-all">
                    Read Article
                    <FaArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Posts CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-0.5 transition-all"
          >
            View All Articles
            <FaArrowRight className="w-3.5 h-3.5" />
          </Link>

          <p className="text-surface-900/60 dark:text-white/50 mt-6">
            More articles on web development, design systems, and technology trends
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
