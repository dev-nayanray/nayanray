import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaReact,
  FaWordpress,
  FaNodeJs,
  FaCloud,
  FaGraduationCap,
  FaRocket,
  FaChartLine,
  FaBook,
  FaFire,
  FaSeedling,
  FaTree,
  FaMountain,
  FaUsers
} from "react-icons/fa";

const Learningp = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeSkill, setActiveSkill] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  // Skill categories with progression data
  const skillCategories = [
    {
      id: 1,
      title: "Frontend Development",
      icon: FaReact,
      color: "from-cyan-500 to-blue-500",
      level: 95,
      description: "Modern React ecosystems, state management, and performance optimization",
      skills: [
        { name: "React.js", level: 98, months: 36 },
        { name: "TypeScript", level: 92, months: 24 },
        { name: "Next.js", level: 90, months: 18 },
        { name: "Tailwind CSS", level: 95, months: 24 },
        { name: "Framer Motion", level: 88, months: 12 }
      ]
    },
    {
      id: 2,
      title: "WordPress Development",
      icon: FaWordpress,
      color: "from-blue-500 to-purple-500",
      level: 90,
      description: "Custom theme development, plugin creation, and enterprise solutions",
      skills: [
        { name: "Custom Themes", level: 95, months: 48 },
        { name: "Plugin Development", level: 85, months: 36 },
        { name: "WooCommerce", level: 88, months: 30 },
        { name: "REST API", level: 82, months: 24 },
        { name: "Performance", level: 90, months: 36 }
      ]
    },
    {
      id: 3,
      title: "Backend & DevOps",
      icon: FaNodeJs,
      color: "from-green-500 to-emerald-500",
      level: 80,
      description: "Server-side development, APIs, and deployment pipelines",
      skills: [
        { name: "Node.js", level: 85, months: 24 },
        { name: "Express.js", level: 80, months: 18 },
        { name: "MongoDB", level: 75, months: 12 },
        { name: "PostgreSQL", level: 78, months: 15 },
        { name: "Docker", level: 70, months: 8 }
      ]
    },
    {
      id: 4,
      title: "Tools & Technologies",
      icon: FaCode,
      color: "from-amber-500 to-orange-500",
      level: 85,
      description: "Development tools, version control, and modern workflows",
      skills: [
        { name: "Git & GitHub", level: 90, months: 42 },
        { name: "VS Code", level: 95, months: 48 },
        { name: "Figma", level: 75, months: 18 },
        { name: "Webpack", level: 80, months: 24 },
        { name: "Jest/Testing", level: 78, months: 20 }
      ]
    }
  ];

  // Learning timeline
  const learningTimeline = [
    {
      year: "2019-2020",
      title: "Foundation Building",
      description: "Started with web fundamentals - HTML, CSS, JavaScript. Built first WordPress themes and learned responsive design principles.",
      technologies: ["HTML5", "CSS3", "JavaScript", "WordPress", "PHP"],
      icon: FaSeedling,
      color: "from-green-400 to-emerald-500",
      projects: 12
    },
    {
      year: "2021",
      title: "React Ecosystem",
      description: "Dived deep into React, modern frontend tooling, and state management. Started working with APIs and component architecture.",
      technologies: ["React", "Redux", "Webpack", "REST APIs", "SASS"],
      icon: FaTree,
      color: "from-blue-400 to-cyan-500",
      projects: 24
    },
    {
      year: "2022",
      title: "Full-Stack Expansion",
      description: "Expanded into backend development with Node.js, databases, and server management. Learned deployment and DevOps basics.",
      technologies: ["Node.js", "Express", "MongoDB", "Docker", "AWS"],
      icon: FaMountain,
      color: "from-purple-400 to-pink-500",
      projects: 18
    },
    {
      year: "2023-Present",
      title: "Advanced Specialization",
      description: "Focusing on performance optimization, TypeScript, advanced animations, and enterprise-level architecture patterns.",
      technologies: ["TypeScript", "Next.js", "GraphQL", "Framer Motion", "Microservices"],
      icon: FaRocket,
      color: "from-orange-400 to-red-500",
      projects: 32
    }
  ];

  // Current learning goals
  const currentGoals = [
    {
      title: "Advanced TypeScript",
      progress: 65,
      deadline: "Q1 2024",
      resources: ["TypeScript Handbook", "Advanced Patterns Course", "Open Source Contributions"],
      icon: FaBook
    },
    {
      title: "Cloud Architecture",
      progress: 45,
      deadline: "Q2 2024",
      resources: ["AWS Certification", "Serverless Patterns", "Microservices"],
      icon: FaCloud
    },
    {
      title: "AI Integration",
      progress: 30,
      deadline: "Q3 2024",
      resources: ["ML Basics", "OpenAI API", "AI-powered UX"],
      icon: FaChartLine
    }
  ];

  const currentCategory = skillCategories[activeSkill];
  const CurrentCategoryIcon = currentCategory.icon;

  return (
    <section
      id="learning-journey"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
      ref={ref}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        style={{ opacity, y }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 font-medium text-sm mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            CONTINUOUS GROWTH
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Learning{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Journey
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Technology evolves rapidly, and so do I. Here's my journey of continuous learning, 
            skill development, and adaptation to new technologies in the web development landscape.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Skill Categories */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {skillCategories.map((category, index) => {
                const CategoryIcon = category.icon;
                const isActive = index === activeSkill;

                return (
                  <motion.div
                    key={category.id}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer group ${
                      isActive
                        ? "bg-white/10 border-cyan-400/50 shadow-2xl shadow-cyan-500/20 scale-105"
                        : "bg-white/5 border-white/10 shadow-lg hover:shadow-xl hover:border-white/20"
                    }`}
                    onClick={() => setActiveSkill(index)}
                    whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Category Icon */}
                      <div
                        className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}
                      >
                        <CategoryIcon className="w-6 h-6 text-white" />
                      </div>

                      {/* Category Info */}
                      <div className="flex-1">
                        <h3 className={`font-semibold text-lg transition-colors duration-300 ${
                          isActive ? "text-white" : "text-gray-300"
                        }`}>
                          {category.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <motion.div
                              className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${category.level}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                          <span className="text-sm font-medium text-cyan-400">
                            {category.level}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-gray-400 mt-3 text-sm leading-relaxed"
                        >
                          {category.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Center: Skills Details */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${currentCategory.color} shadow-lg`}>
                  <CurrentCategoryIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {currentCategory.title}
                  </h3>
                  <p className="text-cyan-400 text-sm">
                    {currentCategory.skills.length} core skills
                  </p>
                </div>
              </div>

              {/* Skills Progress */}
              <div className="space-y-6">
                {currentCategory.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400 text-sm font-medium">
                          {skill.level}%
                        </span>
                        <span className="text-gray-500 text-xs">
                          {skill.months}mo
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <motion.div
                        className={`h-3 rounded-full bg-gradient-to-r ${currentCategory.color} shadow-lg shadow-cyan-500/25`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Learning Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">86+</div>
                  <div className="text-gray-400 text-sm">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">48</div>
                  <div className="text-gray-400 text-sm">Months</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">25+</div>
                  <div className="text-gray-400 text-sm">Technologies</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Current Learning Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaRocket className="text-amber-400" />
                Current Learning Goals
              </h3>
              <div className="space-y-4">
                {currentGoals.map((goal, index) => {
                  const GoalIcon = goal.icon;
                  return (
                    <motion.div
                      key={goal.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="bg-white/5 rounded-2xl p-4 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <GoalIcon className="w-5 h-5 text-amber-400" />
                          <span className="text-white font-medium">{goal.title}</span>
                        </div>
                        <span className="text-cyan-400 text-sm">{goal.deadline}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                        <motion.div
                          className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Progress: {goal.progress}%</span>
                        <span>{goal.resources.length} resources</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right: Learning Timeline */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaChartLine className="text-purple-400" />
                Learning Timeline
              </h3>

              {learningTimeline.map((period, index) => {
                const PeriodIcon = period.icon;
                const isActive = index === activeTimeline;

                return (
                  <motion.div
                    key={period.year}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                      isActive
                        ? "bg-white/10 border-purple-400/50 shadow-2xl shadow-purple-500/20"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                    onClick={() => setActiveTimeline(index)}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Timeline connector */}
                    {index < learningTimeline.length - 1 && (
                      <div className="absolute left-8 top-full w-0.5 h-6 bg-gradient-to-b from-purple-500/50 to-transparent" />
                    )}

                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${period.color} shadow-lg flex-shrink-0`}>
                        <PeriodIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-cyan-400 text-sm font-medium">
                            {period.year}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {period.projects} projects
                          </span>
                        </div>
                        <h4 className="text-white font-semibold mb-2">
                          {period.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {period.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {period.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-white/5 rounded-lg text-gray-400 text-xs border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Learning Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 max-w-4xl mx-auto">
            <FaGraduationCap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Learning Philosophy
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              "I believe in <span className="text-cyan-400">continuous learning</span> through building real projects, 
              contributing to open source, and staying curious about emerging technologies. 
              Every challenge is an opportunity to grow, and every project teaches something new."
            </p>
            <div className="flex justify-center gap-6 mt-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <FaFire className="text-amber-400" />
                Always Learning
              </span>
              <span className="flex items-center gap-2">
                <FaCode className="text-green-400" />
                Build to Learn
              </span>
              <span className="flex items-center gap-2">
                <FaUsers className="text-purple-400" />
                Community Driven
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Learningp;