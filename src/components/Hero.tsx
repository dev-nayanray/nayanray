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

  // Remove unused colors variable to fix TS6133 error
  // const colors = [...]; // removed as unused

  const currentRole = roles[index];
  const CurrentIcon = currentRole.icon;

  // Bento grid items configuration
  const bentoItems = [
    {
      title: "Pixel-Perfect UI",
      description: "Impeccable attention to detail in every component",
      icon: FaPaintBrush,
      color: "from-violet-500/15 to-purple-500/15",
      borderColor: "border-gradient-to-r from-violet-400 to-purple-400",
      delay: 0.1
    },
    {
      title: "Lightning Fast",
      description: "Optimized for maximum performance scores",
      icon: FaBolt,
      color: "from-amber-500/15 to-orange-500/15",
      borderColor: "border-gradient-to-r from-amber-400 to-orange-400",
      delay: 0.2
    },
    {
      title: "Fully Responsive",
      description: "Flawless experience on all devices",
      icon: FaMobileAlt,
      color: "from-blue-500/15 to-cyan-500/15",
      borderColor: "border-gradient-to-r from-blue-400 to-cyan-400",
      delay: 0.3
    },
    {
      title: "Accessibility First",
      description: "Inclusive design for all users",
      icon: FaUniversalAccess,
      color: "from-emerald-500/15 to-green-500/15",
      borderColor: "border-gradient-to-r from-emerald-400 to-green-400",
      delay: 0.4
    }
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 overflow-hidden"
      aria-label="Intro — Nayan Ray"
      onMouseMove={handleMouseMove}
      ref={ref}
    >
      {/* Premium Full-Screen Code Animation Background */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Interactive mouse-following gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${cursorX}px ${cursorY}px, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.1) 25%, rgba(236, 72, 153, 0.05) 50%, transparent 70%)`,
          }}
        />

        {/* Unique Multi-Circle Tech Icon System with Path Light Animation */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
          <defs>
            <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="25%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="75%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <radialGradient id="icon-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
            </radialGradient>
            <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.4)" />
            </radialGradient>
          </defs>

          {/* Multiple concentric circles with path animations */}
          {[1, 2, 3, 4, 5].map((ring) => {
            const radius = 150 + ring * 100; // Balanced radius for coverage without full width
            const iconCount = 10 + ring * 5; // Balanced icon count


            return (
              <g key={`ring-${ring}`}>
                {/* Animated path light effect */}
                <motion.circle
                  cx={window.innerWidth / 2}
                  cy={window.innerHeight / 2}
                  r={radius}
                  fill="none"
                  stroke="url(#line-gradient)"
                  strokeWidth="2"
                  strokeDasharray="20 40"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{
                    strokeDashoffset: [-60, 0],
                    strokeOpacity: [0.1, 0.4, 0.1]
                  }}
                  transition={{
                    duration: 4 + ring,
                    repeat: Infinity,
                    ease: "linear",
                    delay: ring * 0.5
                  }}
                  filter="drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))"
                />

                {/* Connecting lines between icons */}
                {[...Array(iconCount)].map((_, i) => {
                  const angle = (i / iconCount) * 2 * Math.PI;
                  const nextAngle = ((i + 1) % iconCount) / iconCount * 2 * Math.PI;
                  const x1 = window.innerWidth / 2 + radius * Math.cos(angle);
                  const y1 = window.innerHeight / 2 + radius * Math.sin(angle);
                  const x2 = window.innerWidth / 2 + radius * Math.cos(nextAngle);
                  const y2 = window.innerHeight / 2 + radius * Math.sin(nextAngle);

                  return (
                    <motion.line
                      key={`line-${ring}-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#line-gradient)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 1, 0],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.1 + ring * 0.3,
                        ease: "easeInOut"
                      }}
                      filter="drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))"
                    />
                  );
                })}


              </g>
            );
          })}

          {/* Central hub with pulsing effect */}
          <motion.circle
            cx={window.innerWidth / 2}
            cy={window.innerHeight / 2}
            r="60"
            fill="url(#center-glow)"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />



          {/* Outer ring with flowing light */}
          <motion.circle
            cx={window.innerWidth / 2}
            cy={window.innerHeight / 2}
            r="800"
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="1"
            strokeDasharray="10 30"
            initial={{ strokeDashoffset: 0 }}
            animate={{
              strokeDashoffset: [-40, 0],
              strokeOpacity: [0.05, 0.2, 0.05]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
            filter="drop-shadow(0 0 15px rgba(59, 130, 246, 0.6))"
          />
        </svg>

        {/* Enhanced grid pattern with code-like lines */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 opacity-3 bg-gradient-to-br from-transparent via-blue-500/5 to-transparent" />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/20 shadow-lg shadow-blue-500/10"
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
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/60 backdrop-blur-xl border border-white/20 text-slate-700 font-bold rounded-2xl hover:bg-white/80 transform hover:scale-[1.03] transition-all duration-300 shadow-lg shadow-blue-500/10 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
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
              className="mt-4 bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-lg shadow-blue-500/10"
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
