import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaCode, FaMobile, FaShoppingCart, FaCube, FaChartLine } from "react-icons/fa";

const projects = [
  {
    title: "Portfolio Website",
    description: "A modern portfolio built with React, TypeScript, and Tailwind CSS featuring smooth animations and responsive design.",
    image: "/projects/portfolio.png",
    liveLink: "#",
    githubLink: "#",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Web Development",
    icon: <FaCode className="w-5 h-5" />,
    gradient: "from-blue-500 to-cyan-500",
    featured: true
  },
  {
    title: "E-commerce Website",
    description: "Full-featured online store built with WooCommerce and WordPress, featuring product management and secure payments.",
    image: "/projects/ecommerce.png",
    liveLink: "#",
    githubLink: "#",
    technologies: ["WordPress", "WooCommerce", "PHP", "JavaScript"],
    category: "E-commerce",
    icon: <FaShoppingCart className="w-5 h-5" />,
    gradient: "from-purple-500 to-pink-500",
    featured: true
  },
  {
    title: "Loan Management System",
    description: "Custom PHP & MySQL application with responsive UI using Tailwind CSS for financial institutions.",
    image: "/projects/loan.png",
    liveLink: "#",
    githubLink: "#",
    technologies: ["PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    category: "Web Application",
    icon: <FaChartLine className="w-5 h-5" />,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "3D Wardrobe Configurator",
    description: "Interactive 3D product configurator built with Three.js and WordPress for custom furniture.",
    image: "/projects/wardrobe.png",
    liveLink: "#",
    githubLink: "#",
    technologies: ["Three.js", "WordPress", "JavaScript", "WebGL"],
    category: "3D Web",
    icon: <FaCube className="w-5 h-5" />,
    gradient: "from-amber-500 to-orange-500"
  },
  {
    title: "Mobile Fitness App",
    description: "Cross-platform mobile application for fitness tracking with real-time analytics and social features.",
    image: "/projects/fitness.png",
    liveLink: "#",
    githubLink: "#",
    technologies: ["React Native", "Firebase", "Redux", "Node.js"],
    category: "Mobile App",
    icon: <FaMobile className="w-5 h-5" />,
    gradient: "from-red-500 to-rose-500"
  },
  {
    title: "SaaS Dashboard",
    description: "Enterprise SaaS dashboard with real-time analytics, user management, and reporting features.",
    image: "/projects/dashboard.png",
    liveLink: "#",
    githubLink: "#",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    category: "Web Application",
    icon: <FaChartLine className="w-5 h-5" />,
    gradient: "from-indigo-500 to-blue-500"
  }
];

const Project = () => {
  return (
    <section
      id="projects"
      className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-64 h-64 bg-cyan-200/10 rounded-full blur-3xl"></div>
        
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
            <FaCode className="w-4 h-4" />
            My Work
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Projects</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A collection of projects that showcase my expertise in web development, 
            from responsive designs to complex web applications and interactive experiences.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
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
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-300`}></div>
              
              {/* Main Card */}
              <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/50 shadow-sm hover:shadow-2xl transition-all duration-500">
                
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <FaExternalLinkAlt className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <FaGithub className="w-5 h-5" />
                    </motion.a>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${project.gradient} text-white text-sm font-medium shadow-lg`}>
                      {project.icon}
                      {project.category}
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500 text-white text-sm font-medium shadow-lg">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        Featured
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200 group-hover:border-gray-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn overflow-hidden relative"
                    >
                      <span className="relative z-10">Live Demo</span>
                      <FaExternalLinkAlt className="w-4 h-4 relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    </motion.a>
                    
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl border border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300 group/code"
                    >
                      <FaGithub className="w-4 h-4 group-hover:text-blue-600 transition-colors" />
                    </motion.a>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 border-2 border-transparent bg-gradient-to-r ${project.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                  <div className="absolute inset-[2px] bg-white rounded-3xl"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-100/50 shadow-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can bring your ideas to life with cutting-edge technology and creative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start a Project
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              >
                View All Projects
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Project;