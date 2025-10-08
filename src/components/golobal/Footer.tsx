import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaArrowUp, FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaCode, 
  FaMapMarkerAlt, FaPhone, FaTwitter, FaDribbble, FaYoutube,
  FaRocket, FaShieldAlt, FaAward, FaUsers
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

  // Enhanced social links with more platforms
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
      url: "https://linkedin.com/in/yourusername",
      color: "hover:bg-blue-600 border-blue-600"
    },
    {
      icon: <FaDribbble className="w-4 h-4" />,
      name: "Dribbble",
      url: "#",
      color: "hover:bg-pink-500 border-pink-500"
    },
    {
      icon: <FaTwitter className="w-4 h-4" />,
      name: "Twitter",
      url: "#",
      color: "hover:bg-sky-500 border-sky-500"
    },
    {
      icon: <FaYoutube className="w-4 h-4" />,
      name: "YouTube",
      url: "#",
      color: "hover:bg-red-600 border-red-600"
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
    <footer className="relative bg-slate-900 text-gray-300 overflow-hidden border-t border-slate-700/50">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Section :cite[7] */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-8 border-b border-slate-700/30"
        >
          {trustBadges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50"
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
                Nayan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Ray</span>
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
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
                    className={`p-3 rounded-xl bg-slate-800/50 text-slate-400 border border-slate-700 backdrop-blur-sm transition-all duration-300 ${social.color} hover:text-white hover:border-current`}
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
                "About", "Services", "Projects", "Blog", 
                "Testimonials", "Contact", "Process", "Learning"
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ x: 4, color: "#ffffff" }}
                  className="text-slate-400 hover:text-white transition-colors duration-300 text-sm p-2 rounded-lg hover:bg-slate-800/30"
                >
                  {item}
                </motion.a>
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
                  className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/50 text-slate-400 text-xs text-center hover:border-blue-500/30 transition-colors"
                >
                  {service}
                </motion.div>
              ))}
            </div>
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
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-300 group text-sm"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors duration-300">
                  <FaEnvelope className="w-3 h-3" />
                </div>
                <span>wpnayanray@gmail.com</span>
              </motion.a>
              
              <motion.a
                href="tel:+8801981308611"
                whileHover={{ x: 4, color: "#ffffff" }}
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-300 group text-sm"
              >
                <div className="p-2 rounded-lg bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors duration-300">
                  <FaPhone className="w-3 h-3" />
                </div>
                <span>+8801981308611</span>
              </motion.a>
              
              <motion.div
                whileHover={{ x: 4, color: "#ffffff" }}
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-300 group text-sm"
              >
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors duration-300">
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
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium"
                >
                  Join
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer - Enhanced */}
        <div className="py-8 border-t border-slate-700/30">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-3 text-slate-400 text-sm"
            >
              <span>© {currentYear} Nayan Ray. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  Made with <FaHeart className="w-3 h-3 text-red-400 animate-pulse" /> and <FaCode className="w-3 h-3 text-blue-400" />
                </span>
              </div>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-6 text-sm text-slate-400"
            >
              {["Privacy Policy", "Terms of Service", "Cookies", "Sitemap"].map((item, index) => (
                <motion.a
                  key={index}
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  whileHover={{ color: "#ffffff", y: -1 }}
                  className="hover:text-white transition-colors duration-300"
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6 text-xs text-slate-500"
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
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group backdrop-blur-sm border border-blue-400/20"
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