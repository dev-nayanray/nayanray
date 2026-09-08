import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowUp, FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaCode,
  FaMapMarkerAlt, FaPhone, FaRocket, FaShieldAlt, FaAward, FaUsers, FaWordpress, FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  const [showButton, setShowButton] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Social links — only real profiles, no dead links
  const socialLinks = [
    {
      icon: <FaGithub className="w-4 h-4" />,
      name: "GitHub",
      url: "https://github.com/dev-nayanray",
      color: "hover:bg-gray-800 border-gray-600"
    },
    {
      icon: <FaLinkedin className="w-4 h-4" />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/dev-nayanray",
      color: "hover:bg-blue-600 border-blue-600"
    },
    {
      icon: <FaEnvelope className="w-4 h-4" />,
      name: "Email",
      url: "mailto:wpnayanray@gmail.com",
      color: "hover:bg-red-500 border-red-500"
    }
  ];

  // Trust badges for credibility :cite[7]
  const trustBadges = [
    { icon: FaAward, text: "Premium Quality", color: "from-amber-500 to-orange-500" },
    { icon: FaShieldAlt, text: "Secure Code", color: "from-green-500 to-emerald-500" },
    { icon: FaRocket, text: "Fast Delivery", color: "from-purple-500 to-pink-500" },
    { icon: FaUsers, text: "Client Focused", color: "from-blue-500 to-cyan-500" }
  ];

  return (
    // Footer stays a permanently dark band regardless of the site's light/dark
    // toggle (same deliberate choice as ScrollShowcase) — reskinned onto the
    // shared surface/brand tokens rather than the old ad-hoc slate/blue/purple mix.
    <footer className="relative bg-surface-950 text-white/60 overflow-hidden border-t border-white/10">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Section :cite[7] */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-8 border-b border-white/10"
        >
          {trustBadges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className={`p-2 rounded-xl bg-gradient-to-r ${badge.color}`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-white">{badge.text}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Footer Content - Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Nayan <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Ray</span>
              </h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Full-Stack Developer & WordPress Specialist. Building performant,
                accessible web experiences that drive business growth.
              </p>
            </div>

            {/* Enhanced Social Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Connect</h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-xl bg-white/5 text-white/40 border border-white/10 backdrop-blur-sm transition-all duration-300 ${social.color} hover:text-white hover:border-current`}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links - Bento Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navigation</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "About", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Projects", to: "/projects" },
                { label: "Blog", to: "/blog" },
                { label: "Contact", to: "/contact" },
                { label: "Plugin", to: "/markhubs-store-manager-for-telegram" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 4, color: "#ffffff" }}
                  className="text-white/60 hover:text-white transition-colors duration-300 text-sm p-2 rounded-lg hover:bg-white/5"
                >
                  <Link to={item.to}>{item.label}</Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services in Bento Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Expertise</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                "React Development", "WordPress", "UI/UX Design", "Performance",
                "E-Commerce", "API Integration", "Responsive", "Animation"
              ].map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 text-xs text-center hover:border-brand-500/30 transition-colors"
                >
                  {service}
                </motion.div>
              ))}
            </div>

            {/* Featured plugin link — internal link from footer so Google
                discovers the plugin page and the home page passes authority */}
            <Link
              to="/markhubs-store-manager-for-telegram"
              className="block p-4 rounded-2xl bg-gradient-to-br from-brand-500/10 to-purple-500/10 border border-brand-500/20 hover:border-brand-500/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg">
                  <FaWordpress className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors">
                    markhubs Telegram Plugin
                  </div>
                  <div className="text-xs text-white/40">Free · GPL · v1.0.0</div>
                </div>
                <FaArrowRight className="w-3 h-3 text-white/40 group-hover:text-brand-300 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </motion.div>

          {/* Contact - Compact Bento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Get In Touch</h4>
            <div className="space-y-3">
              <motion.a
                href="mailto:wpnayanray@gmail.com"
                whileHover={{ x: 4, color: "#ffffff" }}
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 group text-sm"
              >
                <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 transition-colors duration-300">
                  <FaEnvelope className="w-3 h-3" />
                </div>
                <span>wpnayanray@gmail.com</span>
              </motion.a>

              <motion.a
                href="tel:+8801981308611"
                whileHover={{ x: 4, color: "#ffffff" }}
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 group text-sm"
              >
                <div className="p-2 rounded-lg bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors duration-300">
                  <FaPhone className="w-3 h-3" />
                </div>
                <span>+8801981308611</span>
              </motion.a>

              <motion.div
                whileHover={{ x: 4, color: "#ffffff" }}
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300 group text-sm"
              >
                <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 transition-colors duration-300">
                  <FaMapMarkerAlt className="w-3 h-3" />
                </div>
                <span>Khulna, Bangladesh</span>
              </motion.div>
            </div>

            {/* Newsletter Signup :cite[4] */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider">Stay Updated</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  aria-label="Email address for newsletter signup"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-lg text-sm font-medium"
                >
                  Join
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer - Enhanced */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-3 text-white/60 text-sm"
            >
              <span>© {currentYear} Nayan Ray. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  Made with <FaHeart className="w-3 h-3 text-red-400 animate-pulse" /> and <FaCode className="w-3 h-3 text-brand-400" />
                </span>
              </div>
            </motion.div>

            {/* Legal Links — removed dead anchor links. Re-add as real
                pages when /privacy, /terms etc. are created. */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-6 text-sm text-white/40"
            >
              <Link to="/contact" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors duration-300">
                Contact
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6 text-xs text-white/30"
            >
              <span>🚀 50+ Projects</span>
              <span>⭐ 4.9/5 Rating</span>
              <span>🌍 Worldwide</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced Back to Top Button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-2xl shadow-glow hover:shadow-3xl transition-all duration-300 group backdrop-blur-sm border border-brand-400/20"
            aria-label="Back to top"
          >
            <FaArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;