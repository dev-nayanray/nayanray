import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestion, FaRocket, FaCode, FaHandshake, FaCog, FaHeadset, FaLightbulb } from "react-icons/fa";

const faqs = [
  {
    id: 1,
    question: "What services do you offer?",
    answer: "I offer comprehensive web development services including custom website development, WordPress theme and plugin development, responsive web design, UI/UX design, performance optimization, and ongoing maintenance. I specialize in creating modern, scalable solutions using React, TypeScript, and modern web technologies.",
    category: "services",
    icon: <FaCode className="w-5 h-5" />
  },
  {
    id: 2,
    question: "What technologies do you work with?",
    answer: "I specialize in modern web technologies including React, Next.js, TypeScript, Tailwind CSS, Node.js, and PHP. For WordPress, I work with custom theme development, plugin creation, and WooCommerce. I also have experience with databases (MySQL, MongoDB), version control (Git), and deployment platforms (Vercel, Netlify, cPanel).",
    category: "tech",
    icon: <FaCog className="w-5 h-5" />
  },
  {
    id: 3,
    question: "How can I contact you?",
    answer: "You can reach me via email at wpnayanray@gmail.com, through the contact form on this website, or connect with me on LinkedIn. I typically respond within 24 hours and offer free initial consultations to discuss your project requirements.",
    category: "contact",
    icon: <FaHeadset className="w-5 h-5" />
  },
  {
    id: 4,
    question: "Do you provide support after project delivery?",
    answer: "Yes, I provide comprehensive post-launch support including bug fixes, performance monitoring, and feature updates. I offer different support packages ranging from 30 days of free support to ongoing monthly maintenance plans to ensure your website continues to perform optimally.",
    category: "support",
    icon: <FaHandshake className="w-5 h-5" />
  },
  {
    id: 5,
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on complexity. A simple website typically takes 2-3 weeks, while more complex applications can take 4-8 weeks. During our initial consultation, I'll provide a detailed timeline with milestones. I believe in transparent communication and regular updates throughout the project.",
    category: "process",
    icon: <FaRocket className="w-5 h-5" />
  },
  {
    id: 6,
    question: "Do you work with international clients?",
    answer: "Absolutely! I have experience working with clients from around the world including the US, UK, Canada, Australia, and Europe. I'm comfortable working across different time zones and can accommodate various communication preferences including video calls, email, and project management tools.",
    category: "clients",
    icon: <FaHandshake className="w-5 h-5" />
  },
  {
    id: 7,
    question: "What about pricing and payment terms?",
    answer: "I offer flexible pricing models including fixed project pricing, hourly rates, and monthly retainers. Payment terms are typically 50% upfront and 50% upon completion for fixed projects. For larger projects, we can arrange milestone-based payments. I provide detailed quotes after understanding your project requirements.",
    category: "pricing",
    icon: <FaLightbulb className="w-5 h-5" />
  },
  {
    id: 8,
    question: "Can you help with existing projects?",
    answer: "Yes, I frequently work on existing projects for maintenance, updates, or improvements. I can help with bug fixes, performance optimization, adding new features, or redesigning specific sections. I start with a comprehensive code review to understand the current implementation.",
    category: "support",
    icon: <FaCog className="w-5 h-5" />
  }
];

const categories = [
  { id: "all", name: "All Questions", icon: <FaQuestion className="w-4 h-4" /> },
  { id: "services", name: "Services", icon: <FaCode className="w-4 h-4" /> },
  { id: "tech", name: "Technology", icon: <FaCog className="w-4 h-4" /> },
  { id: "process", name: "Process", icon: <FaRocket className="w-4 h-4" /> },
  { id: "pricing", name: "Pricing", icon: <FaLightbulb className="w-4 h-4" /> },
  { id: "support", name: "Support", icon: <FaHeadset className="w-4 h-4" /> }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section
      id="faq"
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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <FaQuestion className="w-4 h-4" />
            FAQ
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-surface-900 dark:text-white">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">Questions</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto rounded-full mb-8"></div>

          <p className="text-xl text-surface-900/60 dark:text-white/50 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about my services, process, and how we can work together 
            to bring your digital ideas to life.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-glow"
                  : "bg-surface-0/80 dark:bg-surface-900/80 text-surface-900/80 dark:text-white/70 border border-surface-100 dark:border-white/10 hover:border-brand-300 dark:hover:border-brand-500/50 shadow-sm hover:shadow-md"
              }`}
            >
              {category.icon}
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Background Gradient Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>

              {/* FAQ Card */}
              <div className="relative bg-surface-0/80 dark:bg-surface-900/80 backdrop-blur-sm rounded-2xl border border-surface-100 dark:border-white/10 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
                <motion.button
                  className="w-full px-6 py-6 flex items-start gap-4 text-left group/button focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset rounded-2xl"
                  onClick={() => toggleFaq(faq.id)}
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  aria-expanded={openIndex === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                  aria-label={`${faq.question} — ${openIndex === faq.id ? "collapse" : "expand"}`}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 p-2 rounded-xl bg-brand-100 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 group-hover/button:bg-brand-600 group-hover/button:text-white transition-colors duration-300">
                    {faq.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 id={`faq-question-${faq.id}`} className="text-lg font-semibold text-surface-900 dark:text-white pr-8 group-hover/button:text-surface-900/80 dark:group-hover/button:text-white/80 transition-colors">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openIndex === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 p-1 rounded-lg bg-surface-50 dark:bg-white/5 text-surface-900/60 dark:text-white/50 group-hover/button:bg-brand-100 dark:group-hover/button:bg-brand-500/10 group-hover/button:text-brand-600 dark:group-hover/button:text-brand-300 transition-colors duration-300"
                      >
                        <FaChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {openIndex === faq.id && (
                        <motion.div
                          id={`faq-answer-${faq.id}`}
                          role="region"
                          aria-labelledby={`faq-question-${faq.id}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-surface-900/60 dark:text-white/50 leading-relaxed mt-4 pr-8"
                          >
                            {faq.answer}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                  <div className="absolute inset-[2px] bg-surface-0 dark:bg-surface-900 rounded-2xl"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;