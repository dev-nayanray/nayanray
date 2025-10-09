import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaCalendarAlt, FaDownload, FaCode, FaWordpress, FaDatabase, FaPalette, FaAward, FaLinkedin, FaGithub, FaNodeJs, FaPython, FaAws, FaDocker, FaGitAlt, FaLightbulb, FaClock, FaCheckCircle, FaStar, FaCertificate, FaBriefcase, FaTrophy, FaUsers, FaGem, FaCrown, FaFire } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";



const techStack = [
  { name: "React", icon: FaCode, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "TypeScript", icon: FaCode, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-500", bg: "bg-green-50" },
  { name: "Python", icon: FaPython, color: "text-yellow-500", bg: "bg-yellow-50" },
  { name: "AWS", icon: FaAws, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Docker", icon: FaDocker, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Git", icon: FaGitAlt, color: "text-red-500", bg: "bg-red-50" },
  { name: "WordPress", icon: FaWordpress, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "MongoDB", icon: FaDatabase, color: "text-green-600", bg: "bg-green-50" },
  { name: "PostgreSQL", icon: FaDatabase, color: "text-blue-700", bg: "bg-blue-50" },
  { name: "Figma", icon: FaPalette, color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Firebase", icon: FaFire, color: "text-orange-500", bg: "bg-orange-50" }
];

const experience = [
  {
    year: "2021 - Present",
    title: "Full Stack Developer",
    company: "Freelance & Various Clients",
    description: "Developing modern web applications with React, Node.js, and cloud technologies",
    achievements: ["50+ projects completed", "98% client satisfaction", "Modern tech stack expertise"],
    icon: FaBriefcase,
    color: "from-blue-500 to-purple-500"
  },
  {
    year: "2020 - 2021",
    title: "WordPress Developer",
    company: "Local Agencies",
    description: "Specialized in custom WordPress themes and e-commerce solutions",
    achievements: ["40+ WordPress sites", "E-commerce expertise", "Performance optimization"],
    icon: FaWordpress,
    color: "from-blue-600 to-indigo-500"
  },
  {
    year: "2019 - 2020",
    title: "Frontend Developer",
    company: "Tech Startup",
    description: "Built responsive web applications and improved user experiences",
    achievements: ["Modern UI frameworks", "Mobile-first design", "Performance improvements"],
    icon: FaCode,
    color: "from-green-500 to-teal-500"
  }
];

const personalInfo = [
  {
    label: "Full Name",
    value: "Nayan Ray",
    icon: FaCrown,
    color: "text-amber-500"
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
    value: "4+ Years",
    icon: FaCalendarAlt,
    color: "text-green-400"
  },
];

const stats = [
  { number: 50, label: "Projects Completed", icon: FaAward, suffix: "+" },
  { number: 40, label: "Happy Clients", icon: FaUsers, suffix: "+" },
  { number: 98, label: "Client Satisfaction", icon: FaStar, suffix: "%" },
  { number: 4, label: "Years Experience", icon: FaTrophy, suffix: "+" },
];

const currentProjects = [
  { name: "AI-Powered Analytics Dashboard", tech: "React, Node.js, Python", status: "In Progress" },
  { name: "E-commerce Platform", tech: "Next.js, Stripe, MongoDB", status: "Review Phase" },
  { name: "Mobile App Backend", tech: "Node.js, PostgreSQL, AWS", status: "Planning" }
];

const About = () => {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Animated counters
  useEffect(() => {
    if (isInView) {
      const timers = stats.map((stat, index) => {
        return setTimeout(() => {
          const increment = stat.number / 50;
          const timer = setInterval(() => {
            setAnimatedStats(prev => {
              const newStats = [...prev];
              if (newStats[index] < stat.number) {
                newStats[index] = Math.min(newStats[index] + increment, stat.number);
                return newStats;
              }
              return newStats;
            });
          }, 30);
          return timer;
        }, index * 200);
      });
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const target = event.currentTarget.getBoundingClientRect();
    mouseX.set(clientX - target.left);
    mouseY.set(clientY - target.top);
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Enhanced Background Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[32rem] h-[32rem] bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Interactive Cursor Follower */}
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-2xl pointer-events-none"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        {/* Grid Pattern with Animation */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/10 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-blue-600 text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm"
          >
            <FaStar className="w-4 h-4 animate-pulse" />
            Professional Overview
            <FaStar className="w-4 h-4 animate-pulse" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Me
            </span>
          </h2>
          <motion.div
            className="w-32 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Crafting digital excellence through innovative solutions, cutting-edge technology, and a passion for creating exceptional user experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column - Profile + Tech Stack + Professional Journey */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 space-y-10"
          >
            {/* Enhanced Profile Section */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group">
                {/* Multi-layered Background Animation */}
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700 animate-pulse" />
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl opacity-30 group-hover:opacity-40 transition-opacity duration-700" />
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl opacity-40 group-hover:opacity-50 transition-opacity duration-700" />

                {/* Main Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white transform group-hover:scale-105 transition-all duration-700 backdrop-blur-sm">
                  <img
                    src="/profile.png"
                    alt="Nayan Ray - Professional Full Stack Developer"
                    className="w-80 h-80 md:w-96 md:h-96 object-cover"
                  />

                  {/* Premium Status Badge */}
                  <motion.div
                    className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl border border-gray-100/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75" />
                      </div>
                      <span className="text-sm font-bold text-gray-700">Available for work</span>
                    </div>
                  </motion.div>

                  {/* Enhanced Social Links */}
                  <div className="absolute top-6 left-6 flex flex-col gap-3">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100/50 text-gray-700 hover:text-blue-600 transition-all duration-300 hover:shadow-2xl"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100/50 text-gray-700 hover:text-gray-900 transition-all duration-300 hover:shadow-2xl"
                    >
                      <FaGithub className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>

                {/* Premium Experience Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white px-6 py-4 rounded-3xl shadow-2xl border-4 border-white"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold flex items-center gap-2">
                      <FaCrown className="w-6 h-6" />
                      4+
                    </div>
                    <div className="text-sm font-semibold">Years Experience</div>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-8 -left-8 w-40 h-40 border-2 border-blue-200/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-8 -right-8 w-32 h-32 border-2 border-purple-200/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-pink-200/30 rounded-full"
                />
              </div>
            </div>

            {/* Tech Stack Showcase */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  <FaGem className="w-6 h-6 text-purple-500" />
                  Tech Stack
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Core Technologies</span>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
                {techStack.map((tech, index) => {
                  const IconComponent = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className={`p-4 rounded-2xl ${tech.bg} border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer`}
                    >
                      <div className="text-center space-y-2">
                        <motion.div
                          className={`mx-auto w-8 h-8 ${tech.color} group-hover:scale-110 transition-transform duration-300`}
                          whileHover={{ rotate: 5 }}
                        >
                          <IconComponent className="w-full h-full" />
                        </motion.div>
                        <div className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                          {tech.name}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Professional Experience Timeline */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <FaBriefcase className="w-6 h-6 text-blue-500" />
                Professional Journey
              </h4>
              <div className="space-y-6">
                {experience.map((exp, index) => {
                  const IconComponent = exp.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="relative pl-8 pb-8 border-l-2 border-blue-200 last:border-l-0 last:pb-0"
                    >
                      <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div>
                            <h5 className="text-xl font-bold text-gray-900">{exp.title}</h5>
                            <p className="text-blue-600 font-semibold">{exp.company}</p>
                          </div>
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                            {exp.year}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.achievements.map((achievement, i) => (
                            <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium flex items-center gap-2">
                              <FaCheckCircle className="w-3 h-3" />
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Introduction + Stats + Currently Working On + Skills + Personal Info & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-10"
          >
            {/* Professional Introduction */}
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Transforming Ideas Into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Digital Reality
                </span>
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  I'm <span className="font-bold text-gray-900">Nayan Ray</span>, a passionate{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">
                    Full-Stack Developer
                  </span>{" "}
                  with expertise in modern web technologies. With over 4 years of professional experience, I specialize in creating scalable, high-performance applications that deliver exceptional user experiences.
                </p>
                <p className="text-lg">
                  My approach combines technical excellence with strategic thinking, ensuring every project not only meets technical requirements but also drives business growth and user engagement through innovative solutions.
                </p>
              </div>
            </div>

            {/* Premium Stats Grid */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -8 }}
                    className="text-center p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <motion.div
                        className="flex justify-center mb-3"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                      >
                        <IconComponent className="w-8 h-8 text-blue-500 group-hover:text-purple-600 transition-colors duration-300" />
                      </motion.div>
                      <motion.div
                        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-1"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                      >
                        {Math.round(animatedStats[index])}{stat.suffix}
                      </motion.div>
                      <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Currently Working On */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <FaClock className="w-6 h-6 text-orange-500" />
                Currently Working On
              </h4>
              <div className="grid md:grid-cols-1 gap-4">
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h5 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h5>
                        <p className="text-gray-600 text-sm mb-3">{project.tech}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                        project.status === 'Review Phase' ? 'bg-yellow-50 text-yellow-600' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>


            {/* Enhanced Personal Info & CTA */}
            <div className="grid md:grid-cols-2 gap-8 pt-6">
              {/* Personal Info Cards */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                  <FaCertificate className="w-5 h-5 text-green-500" />
                  Personal Information
                </h4>
                <div className="space-y-4">
                  {personalInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <motion.div
                        key={info.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className={`p-3 rounded-xl bg-gray-50 group-hover:bg-white transition-colors duration-300 ${info.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 font-medium">{info.label}</div>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-gray-800 font-bold hover:text-blue-600 transition-colors duration-300"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <div className="text-gray-800 font-bold">{info.value}</div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced CTA Section */}
              <div className="flex flex-col gap-6 justify-center">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-center group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <FaLightbulb className="w-5 h-5" />
                    View My Projects
                  </div>
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-5 bg-white text-gray-800 font-bold rounded-3xl border-2 border-gray-200 shadow-xl hover:shadow-2xl hover:border-blue-300 transition-all duration-300 text-center flex items-center justify-center gap-3 group"
                >
                  <FaDownload className="w-5 h-5 group-hover:animate-bounce transition-transform" />
                  Download Resume
                </motion.a>
                <div className="flex gap-4 justify-center mt-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.2, y: -3, rotate: 5 }}
                    className="p-4 bg-gray-100 rounded-2xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.2, y: -3, rotate: -5 }}
                    className="p-4 bg-gray-100 rounded-2xl text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaGithub className="w-6 h-6" />
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
