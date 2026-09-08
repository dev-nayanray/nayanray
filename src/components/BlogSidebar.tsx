import { motion } from "framer-motion";
import { FaCalendar, FaSearch } from "react-icons/fa";
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
}

interface BlogSidebarProps {
  currentPostId?: number;
}

const BlogSidebar = ({ currentPostId }: BlogSidebarProps) => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [popularTags, setPopularTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const response = await api.get("/blog");
        const posts = response.data;

        // Get recent posts (excluding current if provided)
        const recent = posts
          .filter((post: BlogPost) => !currentPostId || post.id !== currentPostId)
          .slice(0, 5);

        // Get unique categories
        const cats = [...new Set(posts.map((post: BlogPost) => post.category))] as string[];

        // Get popular tags (flatten and count)
        const allTags = posts.flatMap((post: BlogPost) => post.tags || []);
        const tagCount: { [key: string]: number } = {};
        allTags.forEach((tag: string) => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
        const popular = Object.keys(tagCount)
          .sort((a, b) => tagCount[b] - tagCount[a])
          .slice(0, 10);

        setRecentPosts(recent);
        setCategories(cats);
        setPopularTags(popular);
      } catch (err) {
        console.error("Failed to fetch sidebar data:", err);
      }
    };

    fetchSidebarData();
  }, [currentPostId]);

  return (
    <aside className="space-y-8">
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-0 dark:bg-surface-900 rounded-2xl p-6 shadow-sm border border-surface-100 dark:border-white/10"
      >
        <h3 className="text-lg font-semibold mb-4 text-surface-900 dark:text-white">Search Posts</h3>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-900/40 dark:text-white/40 w-4 h-4" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search articles..."
            aria-label="Search blog articles"
            className="w-full pl-10 pr-4 py-3 border border-surface-100 dark:border-white/10 bg-transparent text-surface-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Recent Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-surface-0 dark:bg-surface-900 rounded-2xl p-6 shadow-sm border border-surface-100 dark:border-white/10"
      >
        <h3 className="text-lg font-semibold mb-4 text-surface-900 dark:text-white">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.02 }}
              className="flex gap-3 group cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-surface-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 text-sm leading-tight">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-surface-900/40 dark:text-white/40">
                  <FaCalendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface-0 dark:bg-surface-900 rounded-2xl p-6 shadow-sm border border-surface-100 dark:border-white/10"
      >
        <h3 className="text-lg font-semibold mb-4 text-surface-900 dark:text-white">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.span
              key={category}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 rounded-full text-sm font-medium cursor-pointer hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-colors"
            >
              {category}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Popular Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-surface-0 dark:bg-surface-900 rounded-2xl p-6 shadow-sm border border-surface-100 dark:border-white/10"
      >
        <h3 className="text-lg font-semibold mb-4 text-surface-900 dark:text-white">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-2 bg-surface-50 dark:bg-white/5 text-surface-900/80 dark:text-white/70 rounded-lg text-sm cursor-pointer hover:bg-surface-100 dark:hover:bg-white/10 transition-colors"
            >
              #{tag}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-500/10 dark:to-brand-500/10 rounded-2xl p-6 border border-brand-100 dark:border-brand-500/20"
      >
        <h3 className="text-lg font-semibold mb-3 text-surface-900 dark:text-white">Stay Updated</h3>
        <p className="text-surface-900/60 dark:text-white/50 text-sm mb-4">
          Get the latest posts delivered to your inbox.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address for newsletter signup"
            className="w-full px-4 py-2 border border-surface-100 dark:border-white/10 bg-surface-0 dark:bg-white/5 text-surface-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-lg font-medium hover:shadow-glow transition-all duration-300 text-sm"
          >
            Subscribe
          </motion.button>
        </div>
      </motion.div>
    </aside>
  );
};

export default BlogSidebar;
