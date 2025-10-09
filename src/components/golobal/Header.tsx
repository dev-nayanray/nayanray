import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome, FaUser, FaCog, FaProjectDiagram, FaBlog,
  FaEnvelope, FaPhone, FaBars, FaTimes
} from "react-icons/fa";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageToggle from "../ui/LanguageToggle";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Bento grid navigation items
  const bentoItems = [
    {
      category: "discover",
      items: [
        { name: "Home", to: "/", icon: FaHome, color: "from-blue-500 to-cyan-500" },
        { name: "About", to: "/about", icon: FaUser, color: "from-purple-500 to-pink-500" }
      ]
    },
    {
      category: "work",
      items: [
        { name: "Projects", to: "/projects", icon: FaProjectDiagram, color: "from-amber-500 to-orange-500" },
        { name: "Services", to: "/services", icon: FaCog, color: "from-green-500 to-emerald-500" }
      ]
    },
    {
      category: "connect",
      items: [
        { name: "Blog", to: "/blog", icon: FaBlog, color: "from-red-500 to-rose-500" },
        { name: "Contact", to: "/contact", icon: FaEnvelope, color: "from-indigo-500 to-blue-500" }
      ]
    }
  ];

  // Filtered bento items based on search term
  const filteredBentoItems = bentoItems.map(category => ({
    ...category,
    items: category.items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(category => category.items.length > 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? "w-11/12 max-w-4xl" : "w-11/12 max-w-2xl"
      }`}
    >
      {/* Main Header Bar */}
      <motion.div
        className={`rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
          scrolled
            ? "bg-white/90 border-gray-200/80 shadow-lg dark:bg-gray-900/90 dark:border-gray-700/80"
            : "bg-white/80 border-white/40 shadow-md dark:bg-gray-900/80 dark:border-gray-700/40"
        }`}
        layoutId="header-background"
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo with modern gradient */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.img
              src="/nayan.svg"
              alt="Nayan Ray Logo"
              className="w-12 h-12 rounded-2xl shadow-lg"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
            <motion.span
              className={`font-bold text-xl bg-gradient-to-r from-slate-800 to-slate-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent ${
                scrolled ? "opacity-100" : "opacity-90"
              }`}
            >
              Nayan Ray
            </motion.span>
          </motion.div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBars className="w-4 h-4" />
              <span>Menu</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-xl bg-slate-800 text-white shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <FaTimes className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <FaBars className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Bento Grid Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-gray-200/50 dark:border-gray-700/50 px-6 py-6">
                {/* Search Input */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <input
                    type="text"
                    placeholder="Search menu..."
                    className="w-full px-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </motion.div>

                {/* Category Filters */}
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {["all", "discover", "work", "connect"].map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                        activeCategory === category
                          ? "bg-blue-500 text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredBentoItems.map((section, sectionIndex) => (
                    <motion.div
                      key={section.category}
                      className={`space-y-3 ${
                        activeCategory !== "all" && activeCategory !== section.category ? "opacity-30" : "opacity-100"
                      } transition-opacity duration-300`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + sectionIndex * 0.1 }}
                    >
                      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {section.category}
                      </h3>
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => {
                          const IconComponent = item.icon;
                          return (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + (sectionIndex * 0.2) + (itemIndex * 0.1) }}
                            >
                              <Link
                                to={item.to}
                                className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300 group dark:from-gray-800 dark:to-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:text-white"
                              >
                                <motion.div
                                  className={`p-2 rounded-lg bg-gradient-to-r ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <IconComponent className="w-4 h-4 text-white" />
                                </motion.div>
                                <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                  {item.name}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <motion.div
                  className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.a
                    href="tel:+8801981308611"
                    className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 transition-colors duration-300 dark:bg-green-900/20 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPhone className="w-4 h-4" />
                    <span className="font-medium">Call Now</span>
                  </motion.a>
                  <motion.a
                    href="#contact"
                    className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors duration-300 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaEnvelope className="w-4 h-4" />
                    <span className="font-medium">Get Quote</span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;