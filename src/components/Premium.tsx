import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaClock, FaComments, FaCode, FaShieldAlt, FaArrowRight } from "react-icons/fa";

// A real "start a project" CTA — replaces the previous generic, unwired
// "Upgrade to Premium" SaaS filler that didn't fit a freelance portfolio.
const trustPoints = [
  {
    icon: <FaClock className="w-5 h-5" />,
    title: "24-hour response",
    description: "Every proposal gets a real reply within a day, not a form-mail loop."
  },
  {
    icon: <FaComments className="w-5 h-5" />,
    title: "No-pressure scoping call",
    description: "We talk through the project before any commitment on either side."
  },
  {
    icon: <FaCode className="w-5 h-5" />,
    title: "Clear, working code",
    description: "Documented, maintainable handoffs — not a black box you can't build on."
  },
  {
    icon: <FaShieldAlt className="w-5 h-5" />,
    title: "Fixed-scope estimates",
    description: "You know the budget and timeline before work starts."
  }
];

const Premium = () => {
  return (
    <section className="py-20 bg-surface-0 dark:bg-surface-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/30 dark:text-brand-300 text-sm font-medium mb-6">
            <FaComments className="w-4 h-4" />
            How working together goes
          </div>
          <h2 className="text-4xl font-bold mb-6 text-surface-900 dark:text-white">
            Have a project in mind?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">
              Let's talk about it.
            </span>
          </h2>
          <p className="text-xl text-surface-900/60 dark:text-white/50 max-w-3xl mx-auto">
            Send over the basics — scope, budget, timeline — and get a real answer back,
            not an automated reply.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface-0 dark:bg-surface-800 rounded-2xl p-6 border border-surface-100 dark:border-white/10 shadow-soft hover:shadow-card transition-shadow duration-300"
            >
              <div className="inline-flex p-3 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 mb-4">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-surface-900 dark:text-white">{point.title}</h3>
              <p className="text-surface-900/60 dark:text-white/50">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/start-a-project">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold rounded-2xl shadow-glow hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              Start a Project <FaArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Premium;
