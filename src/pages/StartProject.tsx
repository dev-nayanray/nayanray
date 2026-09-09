import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import ProposalForm from "../components/ProposalForm";

const StartProject = () => {
  return (
    <section className="relative py-32 bg-gradient-to-br from-surface-50 via-surface-0 to-brand-50/30 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-brand-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/30 dark:text-brand-300 text-sm font-medium mb-6">
            <FaRocket className="w-4 h-4" />
            Start a Project
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-surface-900 dark:text-white">
            Tell me about your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">
              project
            </span>
          </h1>
          <p className="text-lg text-surface-900/60 dark:text-white/50 max-w-xl mx-auto leading-relaxed">
            A few details about scope, budget, and timeline help me get back to you with a
            useful answer instead of a round of back-and-forth questions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProposalForm />
        </motion.div>
      </div>
    </section>
  );
};

export default StartProject;
