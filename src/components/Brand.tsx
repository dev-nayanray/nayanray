import { motion } from "framer-motion";
import { FaCrown, FaAward, FaRocket, FaRegHandshake } from "react-icons/fa";

const brands = [
  { 
    name: "Google", 
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=400&q=60",
    description: "Global Technology Leader",
    projects: 12,
    since: "2022",
    featured: true
  },
  { 
    name: "Fiverr", 
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=60",
    description: "Freelance Marketplace",
    projects: 8,
    since: "2021"
  },
  { 
    name: "Envato", 
    logo: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&w=400&q=60",
    description: "Digital Marketplace",
    projects: 6,
    since: "2021"
  },
  { 
    name: "Upwork", 
    logo: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=400&q=60",
    description: "Freelance Platform",
    projects: 15,
    since: "2020",
    featured: true
  },
  { 
    name: "ThemeForest", 
    logo: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=400&q=60",
    description: "WordPress Theme Marketplace",
    projects: 20,
    since: "2020"
  },
  { 
    name: "Shopify", 
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=60",
    description: "E-commerce Platform",
    projects: 10,
    since: "2022",
    featured: true
  },
  { 
    name: "Microsoft", 
    logo: "https://images.unsplash.com/photo-1633419461181-2e4eba8a2d49?auto=format&fit=crop&w=400&q=60",
    description: "Technology Corporation",
    projects: 5,
    since: "2023"
  },
  { 
    name: "Amazon", 
    logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=400&q=60",
    description: "E-commerce & Cloud Computing",
    projects: 7,
    since: "2022"
  }
];

const stats = [
  { number: "50+", label: "Projects Delivered", icon: FaRocket },
  { number: "40+", label: "Happy Clients", icon: FaRegHandshake },
  { number: "98%", label: "Client Satisfaction", icon: FaAward },
  { number: "3+", label: "Years Experience", icon: FaCrown }
];

const Brand = () => {
  return (
    <section
      id="brands"
      className="relative py-20 bg-gradient-to-br from-surface-50 via-surface-0 to-brand-50/30 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 overflow-hidden"
    >
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
            <FaCrown className="w-4 h-4" />
            Trusted Partnerships
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-surface-900 dark:text-white">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">Amazing Brands</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto rounded-full mb-8"></div>

          <p className="text-xl text-surface-900/60 dark:text-white/50 max-w-3xl mx-auto leading-relaxed">
            I've had the privilege to collaborate with industry-leading companies and innovative startups, 
            delivering exceptional digital solutions that drive growth and success.
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 300
              }}
              className="group relative"
            >
              {/* Background Gradient Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>

              {/* Main Card */}
              <div className="relative bg-surface-0/80 dark:bg-surface-900/80 backdrop-blur-sm rounded-2xl p-6 border border-surface-100 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500 text-center">
                
                {/* Featured Badge */}
                {brand.featured && (
                  <div className="absolute -top-2 -right-2">
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow-lg">
                      <FaCrown className="w-3 h-3" />
                      Featured
                    </div>
                  </div>
                )}

                {/* Brand Logo */}
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden border-2 border-surface-100 dark:border-white/10 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Brand Info */}
                <h3 className="font-bold text-surface-900 dark:text-white mb-1 group-hover:text-surface-900/80 dark:group-hover:text-white/80 transition-colors">
                  {brand.name}
                </h3>
                <p className="text-sm text-surface-900/60 dark:text-white/50 mb-3">{brand.description}</p>

                {/* Stats */}
                <div className="flex justify-center gap-4 text-xs text-surface-900/40 dark:text-white/40">
                  <span>{brand.projects} projects</span>
                  <span>Since {brand.since}</span>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                  <div className="absolute inset-[2px] bg-surface-0 dark:bg-surface-900 rounded-2xl"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                {/* Background Gradient Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>

                {/* Stat Card */}
                <div className="relative bg-surface-0/80 dark:bg-surface-900/80 backdrop-blur-sm rounded-2xl p-6 border border-surface-100 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-lg">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-brand-500 to-brand-700 text-transparent bg-clip-text">
                    {stat.number}
                  </div>
                  <div className="text-sm text-surface-900/60 dark:text-white/50 font-medium mt-1">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Collaboration CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-500/10 dark:to-brand-500/5 rounded-3xl p-8 md:p-12 border border-brand-100/50 dark:border-brand-500/20 shadow-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Ready to Join These Amazing Brands?
            </h3>
            <p className="text-surface-900/60 dark:text-white/50 text-lg mb-8 max-w-2xl mx-auto">
              Let's collaborate to create something extraordinary. Your brand deserves
              the same level of excellence and attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold rounded-2xl shadow-glow hover:shadow-xl transition-all duration-300"
              >
                Start a Project
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-surface-0 dark:bg-surface-900 text-surface-900/80 dark:text-white/70 font-semibold rounded-2xl border-2 border-surface-100 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-500/50 transition-all duration-300"
              >
                View Case Studies
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Brand;