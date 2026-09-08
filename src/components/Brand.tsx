import { motion } from "framer-motion";
import {
  FaWordpress, FaReact, FaNodeJs, FaPhp, FaJs, FaHtml5, FaCss3Alt,
  FaGitAlt, FaDocker, FaAws, FaFigma,
} from "react-icons/fa";
import {
  SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql,
  SiWoocommerce, SiSupabase, SiVite, SiVercel,
} from "react-icons/si";

/* ------------------------------------------------------------------ */
/*  Technologies & platforms — replaces fabricated client logos.      */
/*                                                                    */
/*  Previously this section claimed Google, Microsoft, Amazon,       */
/*  Shopify, Fiverr, Upwork, etc. as clients, using Unsplash stock   */
/*  photos as "logos". That's false endorsement — legally risky     */
/*  and credibility-destroying. This section now honestly shows      */
/*  the technologies and platforms I actually work with daily.      */
/* ------------------------------------------------------------------ */
const technologies = [
  { name: "WordPress", icon: FaWordpress, color: "#21759b", category: "CMS" },
  { name: "WooCommerce", icon: SiWoocommerce, color: "#96588a", category: "E-commerce" },
  { name: "React", icon: FaReact, color: "#61dafb", category: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", category: "Frontend" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6", category: "Language" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4", category: "Styling" },
  { name: "Node.js", icon: FaNodeJs, color: "#83cd29", category: "Backend" },
  { name: "PHP", icon: FaPhp, color: "#777bb4", category: "Language" },
  { name: "JavaScript", icon: FaJs, color: "#f7df1e", category: "Language" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", category: "Database" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248", category: "Database" },
  { name: "Supabase", icon: SiSupabase, color: "#3ecf8e", category: "Backend" },
  { name: "Vite", icon: SiVite, color: "#646cff", category: "Build" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff", category: "Deploy" },
  { name: "Docker", icon: FaDocker, color: "#2496ed", category: "DevOps" },
  { name: "AWS", icon: FaAws, color: "#ff9900", category: "Cloud" },
  { name: "Git", icon: FaGitAlt, color: "#f05032", category: "DevOps" },
  { name: "HTML5", icon: FaHtml5, color: "#e34f26", category: "Markup" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572b6", category: "Styling" },
  { name: "Figma", icon: FaFigma, color: "#f24e1e", category: "Design" },
];

const stats = [
  { number: "6+", label: "Years Building for WordPress", color: "from-blue-500 to-cyan-500" },
  { number: "25+", label: "Technologies Mastered", color: "from-violet-500 to-purple-600" },
  { number: "50+", label: "Projects Shipped", color: "from-amber-500 to-orange-600" },
  { number: "100%", label: "Direct Developer Communication", color: "from-emerald-500 to-teal-600" },
];

const Brand = () => {
  return (
    <section
      id="brands"
      className="relative py-20 bg-gradient-to-br from-surface-50 via-surface-0 to-brand-50/30 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl"></div>

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/30 dark:text-brand-300 text-sm font-medium mb-6"
          >
            <FaReact className="w-4 h-4" />
            Technologies & Platforms
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-surface-900 dark:text-white">
            Tools I <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">Build With</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto rounded-full mb-8"></div>

          <p className="text-xl text-surface-900/60 dark:text-white/50 max-w-3xl mx-auto leading-relaxed">
            These are the technologies and platforms I work with daily. From custom
            WordPress plugins to React dashboards, every project uses the right tool
            for the job — not the one that's trending.
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center gap-3 p-5 bg-surface-0/80 dark:bg-surface-900/80 backdrop-blur-sm rounded-2xl border border-surface-100 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="p-3 rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${tech.color}15` }}
                >
                  <Icon
                    className="w-7 h-7 transition-colors duration-300"
                    style={{ color: tech.color }}
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm text-surface-900 dark:text-white">
                    {tech.name}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-surface-900/40 dark:text-white/40 mt-0.5">
                    {tech.category}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              {/* Background Gradient Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>

              {/* Stat Card */}
              <div className="relative bg-surface-0/80 dark:bg-surface-900/80 backdrop-blur-sm rounded-2xl p-6 border border-surface-100 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500 text-center">
                <div className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-sm text-surface-900/60 dark:text-white/50 font-medium mt-2">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Brand;