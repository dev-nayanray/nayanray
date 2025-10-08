import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaPalette,
  FaRocket,
  FaMobile,
  FaSearch,
  FaCog,
  FaLightbulb,
  FaUsers,
  FaCheckCircle,
  FaPlay,
  FaPause
} from "react-icons/fa";

const Workingp = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  // Auto-advance steps
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const processSteps = [
    {
      id: 1,
      title: "Discovery & Research",
      description: "Deep dive into project requirements, target audience, and technical constraints. Market analysis and competitor research.",
      icon: FaSearch,
      color: "from-blue-500 to-cyan-500",
      tasks: ["Requirement Analysis", "User Research", "Technical Audit", "Project Planning"],
      duration: "1-3 days"
    },
    {
      id: 2,
      title: "Strategy & Planning",
      description: "Architectural decisions, technology stack selection, and project roadmap creation with clear milestones.",
      icon: FaLightbulb,
      color: "from-purple-500 to-pink-500",
      tasks: ["Tech Stack Selection", "Architecture Design", "Timeline Creation", "Resource Planning"],
      duration: "2-4 days"
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Creating intuitive user interfaces with modern design principles, focusing on usability and aesthetic appeal.",
      icon: FaPalette,
      color: "from-amber-500 to-orange-500",
      tasks: ["Wireframing", "Prototyping", "Visual Design", "User Testing"],
      duration: "3-7 days"
    },
    {
      id: 4,
      title: "Development",
      description: "Agile development process with continuous integration, clean code practices, and regular progress updates.",
      icon: FaCode,
      color: "from-green-500 to-emerald-500",
      tasks: ["Frontend Development", "Backend Integration", "API Development", "Code Reviews"],
      duration: "2-8 weeks"
    },
    {
      id: 5,
      title: "Testing & Quality",
      description: "Comprehensive testing across devices and browsers, performance optimization, and security audits.",
      icon: FaCog,
      color: "from-red-500 to-rose-500",
      tasks: ["Unit Testing", "Integration Testing", "Performance Testing", "Security Audit"],
      duration: "3-10 days"
    },
    {
      id: 6,
      title: "Launch & Support",
      description: "Smooth deployment, post-launch monitoring, and ongoing maintenance with reliable support.",
      icon: FaRocket,
      color: "from-indigo-500 to-blue-500",
      tasks: ["Deployment", "Performance Monitoring", "Bug Fixing", "Ongoing Support"],
      duration: "Ongoing"
    }
  ];

  const metrics = [
    { value: "98%", label: "Client Satisfaction", icon: FaUsers },
    { value: "50+", label: "Projects Completed", icon: FaCheckCircle },
    { value: "24/7", label: "Support Available", icon: FaMobile },
    { value: "A+", label: "Code Quality", icon: FaCode }
  ];

  const currentStep = processSteps[activeStep];
  const CurrentIcon = currentStep.icon;

  return (
    <section
      id="working-process"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent" />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        style={{ opacity, scale }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 font-medium text-sm mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            WORKING PROCESS
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            How I Create{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Digital Excellence
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A structured, transparent process that ensures your project is delivered on time, 
            within budget, and exceeds expectations at every stage.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Process Steps */}
          <div className="lg:col-span-7">
            {/* Process Steps List */}
            <div className="space-y-4">
              {processSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer group ${
                      isActive
                        ? "bg-white border-blue-200 shadow-2xl shadow-blue-500/10 scale-105"
                        : isCompleted
                        ? "bg-white/80 border-green-200/50 shadow-lg shadow-green-500/5"
                        : "bg-white/50 border-gray-200/50 shadow-md hover:shadow-lg hover:border-gray-300"
                    }`}
                    onClick={() => {
                      setActiveStep(index);
                      setIsPlaying(false);
                    }}
                    whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                  >
                {/* Step Header */}
                <div className="flex items-center gap-4">
                  {/* Step Number */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white transition-all duration-500 ${
                      isActive
                        ? "bg-gradient-to-r " + step.color + " scale-110"
                        : isCompleted
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gradient-to-r from-gray-400 to-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <FaCheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm">{step.id}</span>
                    )}
                  </div>

                  {/* Step Title & Duration */}
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-lg transition-colors duration-300 ${
                        isActive ? "text-slate-900" : "text-slate-700"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : isCompleted
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  {/* Step Icon */}
                  <StepIcon
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isActive
                        ? "text-blue-600"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>

                {/* Step Description */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <p className="text-slate-600 leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {step.tasks.map((task, taskIndex) => (
                          <motion.div
                            key={task}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: taskIndex * 0.1 }}
                            className="flex items-center gap-2 text-sm text-slate-600"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {task}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
                );
              })}
            </div>

            {/* Play/Pause Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-4 mt-8"
            >
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 text-slate-700 font-medium"
              >
                {isPlaying ? (
                  <>
                    <FaPause className="w-4 h-4" />
                    Pause Auto-play
                  </>
                ) : (
                  <>
                    <FaPlay className="w-4 h-4" />
                    Play Auto-play
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* Right: Current Step Details */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="sticky top-24"
            >
              {/* Current Step Card */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/80 overflow-hidden">
                {/* Card Header */}
                <div
                  className={`bg-gradient-to-r ${currentStep.color} p-8 text-white`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                      <CurrentIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-white/80 text-sm font-medium">
                        Step {currentStep.id}
                      </span>
                      <h3 className="text-2xl font-bold mt-1">
                        {currentStep.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-white/90 leading-relaxed">
                    {currentStep.description}
                  </p>
                </div>

                {/* Card Content */}
                <div className="p-8">
                  <div className="space-y-6">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm text-slate-600 mb-2">
                        <span>Progress</span>
                        <span>{Math.round(((activeStep + 1) / processSteps.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${currentStep.color}`}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${((activeStep + 1) / processSteps.length) * 100}%`
                          }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Key Tasks */}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">
                        Key Tasks
                      </h4>
                      <div className="space-y-2">
                        {currentStep.tasks.map((task, index) => (
                          <motion.div
                            key={task}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100 transition-colors duration-300"
                          >
                            <div
                              className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentStep.color}`}
                            />
                            <span className="text-slate-700">{task}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/50">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-700 font-medium">
                          Estimated Duration
                        </span>
                        <span className="text-blue-600 font-bold">
                          {currentStep.duration}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.a
                      href="#contact"
                      className="block w-full py-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white font-semibold rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Start Your Project
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-2 gap-4 mt-6"
              >
                {metrics.map((metric, index) => {
                  const MetricIcon = metric.icon;
                  return (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-200/50 shadow-lg"
                    >
                      <MetricIcon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-slate-900">
                        {metric.value}
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        {metric.label}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Workingp;