import { motion } from "framer-motion";
import { FaCode, FaWordpress, FaMobileAlt, FaPaintBrush, FaRocket, FaShieldAlt, FaChartLine } from "react-icons/fa";

const services = [
  {
    icon: <FaCode className="w-8 h-8" />,
    title: "Web Development",
    description: "Creating responsive and modern websites using React, TypeScript, and Tailwind CSS.",
    features: ["React/Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1
  },
  {
    icon: <FaWordpress className="w-8 h-8" />,
    title: "WordPress Development",
    description: "Building custom WordPress themes and plugins with clean, maintainable code.",
    features: ["Custom Themes", "Plugin Development", "WooCommerce", "API Integration"],
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2
  },
  {
    icon: <FaMobileAlt className="w-8 h-8" />,
    title: "Mobile Responsive Design",
    description: "Ensuring websites look great and function smoothly on all devices.",
    features: ["Mobile-First", "Touch-Friendly", "Fast Loading", "Cross-Browser"],
    gradient: "from-green-500 to-emerald-500",
    delay: 0.3
  },
  {
    icon: <FaPaintBrush className="w-8 h-8" />,
    title: "UI/UX Design",
    description: "Designing user-friendly interfaces that improve engagement and usability.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    gradient: "from-amber-500 to-orange-500",
    delay: 0.4
  },
  {
    icon: <FaRocket className="w-8 h-8" />,
    title: "Performance Optimization",
    description: "Optimizing websites for lightning-fast loading and superior user experience.",
    features: ["Speed Optimization", "SEO", "Core Web Vitals", "Caching"],
    gradient: "from-red-500 to-rose-500",
    delay: 0.5
  },
  {
    icon: <FaShieldAlt className="w-8 h-8" />,
    title: "Security & Maintenance",
    description: "Keeping your website secure, updated, and running smoothly.",
    features: ["Security Audits", "Regular Updates", "Backup Solutions", "Monitoring"],
    gradient: "from-indigo-500 to-blue-500",
    delay: 0.6
  }
];

const Service = () => {
  return (
    <section
      id="services"
      className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 overflow-hidden"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-medium mb-6"
          >
            <FaChartLine className="w-4 h-4" />
            What I Offer
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Services</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive web solutions tailored to your business needs. 
            From concept to deployment, I deliver high-quality, scalable, and maintainable digital products.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ 
                duration: 0.5, 
                delay: service.delay,
                type: "spring",
                stiffness: 300
              }}
              className="group relative"
            >
              {/* Background Gradient Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300`}></div>
              
              {/* Main Card */}
              <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                
                {/* Hover Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.gradient} text-white shadow-lg mb-6 relative z-10`}
                >
                  {service.icon}
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: service.delay + featureIndex * 0.1 }}
                        className="flex items-center gap-3 text-sm text-gray-600"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`}></div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 px-6 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn overflow-hidden relative`}
                  >
                    <span className="relative z-10">Learn More</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                  </motion.button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-current opacity-5 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-current opacity-5 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-100/50 shadow-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Let's work together to bring your ideas to life with cutting-edge technology and exceptional design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              >
                Schedule a Call
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Service;