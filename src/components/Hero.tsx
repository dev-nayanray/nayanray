import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { FaDownload, FaEnvelope, FaStar, FaCode, FaWordpress, FaBolt, FaUniversalAccess, FaMobileAlt, FaRocket, FaPaintBrush } from "react-icons/fa";

// Enhanced roles with more specific specialties
const roles = [
  { text: "React Architect", icon: FaCode, color: "from-cyan-500 to-blue-500" },
  { text: "WordPress Engineer", icon: FaWordpress, color: "from-blue-500 to-indigo-500" },
  { text: "UI Artisan", icon: FaPaintBrush, color: "from-purple-500 to-pink-500" },
  { text: "Performance Expert", icon: FaRocket, color: "from-amber-500 to-orange-500" }
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Enhanced typing effect
  useEffect(() => {
    const current = roles[index].text;
    if (subIndex === current.length + 1 && !reverse) {
      const pause = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(pause);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((i) => (i + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((s) => s + (reverse ? -1 : 1));
    }, reverse ? 40 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  // Mouse position for interactive background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const target = event.currentTarget.getBoundingClientRect();
    mouseX.set(clientX - target.left);
    mouseY.set(clientY - target.top);
  };

  const currentRole = roles[index];
  const CurrentIcon = currentRole.icon;

  // Bento grid items configuration
  const bentoItems = [
    {
      title: "Pixel-Perfect UI",
      description: "Impeccable attention to detail in every component",
      icon: FaPaintBrush,
      color: "from-violet-500/15 to-purple-500/15",
      borderColor: "border-violet-400/20",
      delay: 0.1
    },
    {
      title: "Lightning Fast",
      description: "Optimized for maximum performance scores",
      icon: FaBolt,
      color: "from-amber-500/15 to-orange-500/15",
      borderColor: "border-amber-400/20",
      delay: 0.2
    },
    {
      title: "Fully Responsive",
      description: "Flawless experience on all devices",
      icon: FaMobileAlt,
      color: "from-blue-500/15 to-cyan-500/15",
      borderColor: "border-blue-400/20",
      delay: 0.3
    },
    {
      title: "Accessibility First",
      description: "Inclusive design for all users",
      icon: FaUniversalAccess,
      color: "from-emerald-500/15 to-green-500/15",
      borderColor: "border-emerald-400/20",
      delay: 0.4
    }
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden"
      aria-label="Intro — Nayan Ray"
      onMouseMove={handleMouseMove}
      ref={ref}
    >
      {/* Enhanced Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Subtle gradient orbs */}
        <motion.div
          className="absolute w-[480px] h-[480px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl opacity-40"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
        
        {/* Static background elements */}
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative z-10 max-w-7xl w-full">
        {/* Main content grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
          {/* Left: Main content - spans 7 columns on xl screens */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="xl:col-span-7 space-y-8"
            role="region"
            aria-labelledby="hero-heading"
          >
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-3 h-3 text-amber-400 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-700">Top Rated • 4.9/5</span>
            </motion.div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1
                id="hero-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight"
              >
                Hi, I'm{" "}
                <motion.span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Nayan Ray
                </motion.span>
              </h1>

              {/* Enhanced role display */}
              <motion.div 
                className="text-xl md:text-2xl font-semibold text-slate-700 flex items-center gap-3 min-h-[2.5rem]"
                aria-live="polite"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                <CurrentIcon className={`text-gradient ${currentRole.color} w-6 h-6`} />
                <span className={`bg-gradient-to-r ${currentRole.color} text-transparent bg-clip-text font-bold`}>
                  {currentRole.text.slice(0, subIndex)}
                </span>
                <span className="h-6 w-1 inline-block align-middle" aria-hidden>
                  {blink ? (
                    <span className={`inline-block w-1 h-6 bg-gradient-to-b ${currentRole.color} rounded-sm`} />
                  ) : (
                    <span className="inline-block w-1 h-6" />
                  )}
                </span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p 
              className="text-slate-600 max-w-2xl text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
            >
              I craft <span className="font-semibold text-slate-800">premium, high-performance web experiences</span> with modern front-end tooling, robust WordPress architecture and pixel-perfect UI. Focused on performance, accessibility and delightful micro-interactions.
            </motion.p>

            {/* CTA buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaDownload />
                <span>View My Work</span>
              </motion.a>

              <motion.a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-md border border-slate-300 text-slate-700 font-bold rounded-2xl hover:bg-white transform hover:scale-[1.03] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-300/50"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEnvelope />
                <span>Contact Me</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Bento grid - spans 5 columns on xl screens */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="xl:col-span-5"
          >
            <div className="grid grid-cols-2 gap-4">
              {bentoItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: item.delay }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className={`bg-gradient-to-br ${item.color} backdrop-blur-md ${item.borderColor} border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-default`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color.replace('/15', '/20')} ${item.borderColor}`}>
                          <IconComponent className="w-4 h-4 text-slate-700" />
                        </div>
                        <h3 className="font-semibold text-slate-800 text-sm">{item.title}</h3>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-900">50+</div>
                  <div className="text-xs text-slate-500 mt-1">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">98%</div>
                  <div className="text-xs text-slate-500 mt-1">Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">A+</div>
                  <div className="text-xs text-slate-500 mt-1">Accessibility</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced location/availability line */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-slate-600 text-lg">
            Available for <span className="text-slate-800 font-semibold">freelance</span> & <span className="text-slate-800 font-semibold">remote roles</span> • Based in Bangladesh
          </p>
        </motion.div>
      </div>
    </section>
  );
}