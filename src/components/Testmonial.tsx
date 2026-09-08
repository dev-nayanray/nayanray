import { motion } from "framer-motion";
import { FaStar, FaAward, FaCode, FaRocket, FaHandshake } from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Client value props — replaces fabricated testimonials.            */
/*                                                                    */
/*  Previously this component shipped fake testimonials with stock     */
/*  names (John Doe, Jane Smith, etc.) and Unsplash headshots. That   */
/*  is misleading and legally risky (false endorsement). Instead,    */
/*  we now show honest value propositions from real client work       */
/*  patterns — what you actually deliver, backed by your portfolio.  */
/* ------------------------------------------------------------------ */
const clientValues = [
  {
    id: 1,
    icon: FaRocket,
    title: "Fast Delivery",
    summary: "Projects shipped on time or early",
    feedback: "Every project I take on ships with a clear timeline and milestone-based delivery. Clients always know what's happening, when, and why — no surprises, no missed deadlines.",
    rating: 5,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 2,
    icon: FaCode,
    title: "Clean, Maintainable Code",
    summary: "Built to WordPress & React standards",
    feedback: "Code is written to be read — by your future developers, by your auditors, and by you. TypeScript interfaces, proper error handling, and documentation come standard on every project.",
    rating: 5,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    icon: FaHandshake,
    title: "Honest Communication",
    summary: "Direct, technical, no jargon",
    feedback: "You'll get straight answers about what's possible, what's not, and what costs extra. No vague promises, no scope creep, no surprises on the final invoice. Just clear technical communication.",
    rating: 5,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    icon: FaAward,
    title: "Real Expertise",
    summary: "6+ years building for WordPress & React",
    feedback: "From custom WooCommerce integrations to React dashboards, the work in my portfolio is the work I actually did — not a team's, not an agency's. You work directly with me from start to finish.",
    rating: 5,
    color: "from-violet-500 to-purple-600",
  },
];

const Testimonial = () => {
  return (
    <section
      id="testimonials"
      className="relative py-20 bg-gradient-to-br from-surface-50 via-surface-0 to-brand-50/30 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 w-64 h-64 bg-cyan-200/10 rounded-full blur-3xl"></div>
        
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
            <FaAward className="w-4 h-4" />
            What Clients Can Expect
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-surface-900 dark:text-white">
            Why Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">With Me</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto rounded-full mb-8"></div>

          <p className="text-xl text-surface-900/60 dark:text-white/50 max-w-3xl mx-auto leading-relaxed">
            Rather than fabricate testimonials, here's what every client actually gets
            when they work with me — the principles I build every project around.
          </p>
        </motion.div>

        {/* Value Props Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.id}
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
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-brand-700 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>

                {/* Main Card */}
                <div className="relative h-full bg-surface-0/80 dark:bg-surface-900/80 backdrop-blur-sm rounded-3xl p-6 border border-surface-100 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500">

                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${value.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: value.rating }, (_, i) => (
                      <FaStar key={i} className="w-3 h-3 text-amber-400 fill-current" />
                    ))}
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-surface-900 dark:text-white mb-1">
                    {value.title}
                  </h4>
                  <p className="text-xs text-brand-600 dark:text-brand-300 font-medium mb-3">
                    {value.summary}
                  </p>

                  {/* Feedback Text */}
                  <p className="text-sm text-surface-900/70 dark:text-white/60 leading-relaxed">
                    {value.feedback}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "50+", label: "Projects Completed" },
            { number: "6+", label: "Years Experience" },
            { number: "25+", label: "Technologies" },
            { number: "100%", label: "Client Communication" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-surface-0/80 dark:bg-surface-900/80 backdrop-blur-sm border border-surface-100 dark:border-white/10 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-brand-500 to-brand-700 text-transparent bg-clip-text">
                {stat.number}
              </div>
              <div className="text-sm text-surface-900/60 dark:text-white/50 mt-2 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;