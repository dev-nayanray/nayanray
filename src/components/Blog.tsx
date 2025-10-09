import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaArrowRight, FaClock, FaTags, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";

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

const Blog = () => {
  return (
    <section id="blog" className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 overflow-hidden">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-medium mb-6"
          >
            <FaTags className="w-4 h-4" />
            Latest Articles
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Blog</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Insights, tutorials, and thoughts on web development, design, and technology. 
            Stay updated with the latest trends and best practices.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
              
              {/* Main Card */}
              <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/50 shadow-sm hover:shadow-2xl transition-all duration-500">
                
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium shadow-lg">
                      {post.category}
                    </span>
                  </div>

                  {/* Read Time */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/70 text-white text-sm font-medium backdrop-blur-sm">
                      <FaClock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-2">
                      <FaCalendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaUser className="w-3 h-3" />
                      {post.author}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200 group-hover:border-gray-300 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 group/read"
                    >
                      <Link
                        to={`/blog/${post.id}`}
                        className="flex items-center gap-2"
                      >
                        Read Article
                        <FaArrowRight className="w-4 h-4 group-hover/read:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </motion.div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-300"
                    >
                      <FaShare className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                  <div className="absolute inset-[2px] bg-white rounded-3xl"></div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Posts CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group/cta"
          >
            View All Articles
            <FaArrowRight className="w-5 h-5 group-hover/cta:translate-x-1 transition-transform duration-300" />
          </motion.a>
          
          <p className="text-gray-600 mt-6">
            More articles on web development, design systems, and technology trends
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;