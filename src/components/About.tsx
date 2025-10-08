import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaCalendarAlt, FaDownload, FaCode, FaWordpress, FaDatabase, FaPalette, FaMobileAlt, FaRocket, FaAward, FaLinkedin, FaGithub } from "react-icons/fa";

const skills = [
  { 
    name: "React & TypeScript", 
    level: 95,
    icon: FaCode,
    color: "from-blue-500 to-cyan-500",
    description: "Modern frontend development"
  },
  { 
    name: "WordPress Development", 
    level: 90,
    icon: FaWordpress,
    color: "from-blue-600 to-indigo-500",
    description: "Custom themes & plugins"
  },
  { 
    name: "PHP & Laravel", 
    level: 85,
    icon: FaDatabase,
    color: "from-purple-500 to-pink-500",
    description: "Backend development"
  },
  { 
    name: "UI/UX Design", 
    level: 88,
    icon: FaPalette,
    color: "from-amber-500 to-orange-500",
    description: "User-centered design"
  },
  { 
    name: "Responsive Design", 
    level: 92,
    icon: FaMobileAlt,
    color: "from-green-500 to-emerald-500",
    description: "Mobile-first approach"
  },
  { 
    name: "Performance Optimization", 
    level: 87,
    icon: FaRocket,
    color: "from-red-500 to-rose-500",
    description: "Fast loading solutions"
  }
];

const personalInfo = [
  { 
    label: "Full Name", 
    value: "Nayan Ray",
    icon: FaCode,
    color: "text-blue-500"
  },
  { 
    label: "Location", 
    value: "Khulna, Bangladesh",
    icon: FaMapMarkerAlt,
    color: "text-red-400"
  },
  { 
    label: "Email", 
    value: "wpnayanray@gmail.com", 
    link: "mailto:wpnayanray@gmail.com",
    icon: FaEnvelope,
    color: "text-blue-400"
  },
  { 
    label: "Experience", 
    value: "3+ Years",
    icon: FaCalendarAlt,
    color: "text-green-400"
  },
];

const stats = [
  { number: "50+", label: "Projects Completed", icon: FaAward },
  { number: "40+", label: "Happy Clients", icon: FaAward },
  { number: "98%", label: "Client Satisfaction", icon: FaAward },
  { number: "3+", label: "Years Experience", icon: FaAward },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 text-gray-800 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-64 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Section Header */}
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
            <FaAward className="w-4 h-4" />
            Professional Overview
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Crafting digital excellence through innovative solutions and cutting-edge technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Enhanced Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative group">
              {/* Background Animation */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src="/profile.png"
                  alt="Nayan Ray - Professional Web Developer"
                  className="w-80 h-80 md:w-96 md:h-96 object-cover"
                />
                
                {/* Floating Status Badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">Available for work</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-100 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <FaGithub className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>

              {/* Experience Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-2xl border-2 border-white"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">3+</div>
                  <div className="text-xs font-medium">Years Experience</div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-blue-200/50 rounded-full"
              ></motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-6 w-24 h-24 border-2 border-purple-200/50 rounded-full"
              ></motion.div>
            </div>
          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Professional Introduction */}
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Transforming Ideas Into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Digital Reality
                </span>
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  I'm <span className="font-semibold text-gray-900">Nayan Ray</span>, a passionate 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold"> Full-Stack Developer </span>
                  with expertise in modern web technologies. With over 3 years of professional experience, 
                  I specialize in creating scalable, high-performance applications that deliver exceptional user experiences.
                </p>
                <p className="text-lg">
                  My approach combines technical excellence with strategic thinking, ensuring every project 
                  not only meets technical requirements but also drives business growth and user engagement.
                </p>
              </div>
            </div>

            {/* Enhanced Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex justify-center mb-2">
                      <IconComponent className="w-6 h-6 text-blue-500 group-hover:text-purple-600 transition-colors" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 mt-1 font-medium">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Enhanced Skills Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-semibold text-gray-900">Technical Expertise</h4>
                <span className="text-sm text-gray-500 font-medium">Proficiency Level</span>
              </div>
              <div className="space-y-4">
                {skills.map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/50 hover:bg-white/70 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{skill.name}</div>
                            <div className="text-sm text-gray-600">{skill.description}</div>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-gray-700">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Personal Info & CTA */}
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              {/* Personal Info Cards */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h4>
                <div className="space-y-3">
                  {personalInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <motion.div
                        key={info.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className={`p-3 rounded-xl bg-gray-50 group-hover:bg-white transition-colors duration-300 ${info.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 font-medium">{info.label}</div>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-gray-800 font-semibold hover:text-blue-600 transition-colors duration-300"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <div className="text-gray-800 font-semibold">{info.value}</div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced CTA Section */}
              <div className="flex flex-col gap-4 justify-center">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  View My Projects
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300 text-center flex items-center justify-center gap-3 group"
                >
                  <FaDownload className="w-4 h-4 group-hover:animate-bounce transition-transform" />
                  Download Resume
                </motion.a>
                <div className="flex gap-4 justify-center mt-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-3 bg-gray-100 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-3 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300"
                  >
                    <FaGithub className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;