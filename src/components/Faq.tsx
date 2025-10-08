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
      className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-medium mb-6"
          >
            <FaQuestion className="w-4 h-4" />
            FAQ
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Questions</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white/80 text-gray-700 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
              
              {/* FAQ Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden">
                <motion.button
                  className="w-full px-6 py-6 flex items-start gap-4 text-left group/button"
                  onClick={() => toggleFaq(faq.id)}
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 p-2 rounded-xl bg-blue-100 text-blue-600 group-hover/button:bg-blue-600 group-hover/button:text-white transition-colors duration-300">
                    {faq.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-gray-900 pr-8 group-hover/button:text-gray-800 transition-colors">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openIndex === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 p-1 rounded-lg bg-gray-100 text-gray-600 group-hover/button:bg-blue-100 group-hover/button:text-blue-600 transition-colors duration-300"
                      >
                        <FaChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {openIndex === faq.id && (
                        <motion.div
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
                            className="text-gray-600 leading-relaxed mt-4 pr-8"
                          >
                            {faq.answer}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                  <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-100/50 shadow-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Please reach out to our friendly team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Me
              </motion.a>
              <motion.a
                href="mailto:wpnayanray@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              >
                Send Email
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;