import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCode, FaWordpress, FaMobileAlt, FaPaintBrush, FaRocket, FaShieldAlt, FaChartLine, FaArrowRight } from "react-icons/fa";
import { useApi } from "../hooks/useApi";
import { SkeletonGrid } from "./ui/SkeletonCard";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

const Service = () => {
  // Replaces 12 lines of useEffect + useState + try/catch boilerplate
  // with a single hook call. Loading and error states are handled
  // automatically — no more silent failures.
  const { data: services, loading, error } = useApi<Service[]>("/services");

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FaCode': return <FaCode className="w-8 h-8" />;
      case 'FaWordpress': return <FaWordpress className="w-8 h-8" />;
      case 'FaMobileAlt': return <FaMobileAlt className="w-8 h-8" />;
      case 'FaPaintBrush': return <FaPaintBrush className="w-8 h-8" />;
      case 'FaRocket': return <FaRocket className="w-8 h-8" />;
      case 'FaShieldAlt': return <FaShieldAlt className="w-8 h-8" />;
      case 'FaChartLine': return <FaChartLine className="w-8 h-8" />;
      default: return <FaCode className="w-8 h-8" />;
    }
  };

  return (
    <section
      id="services"
      className="relative py-20 bg-gradient-to-br from-surface-50 via-surface-0 to-brand-50/30 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-200/10 rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
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
            <FaChartLine className="w-4 h-4" />
            What I Offer
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-surface-900 dark:text-white">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">Services</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto rounded-full mb-8"></div>

          <p className="text-xl text-surface-900/60 dark:text-white/50 max-w-3xl mx-auto leading-relaxed">
            Comprehensive web solutions tailored to your business needs.
            From concept to deployment, I deliver high-quality, scalable, and maintainable digital products.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && (
            <SkeletonGrid count={3} />
          )}
          {error && (
            <div className="col-span-full text-center py-12 text-rose-500">
              Failed to load services: {error}
            </div>
          )}
          {services && services.length === 0 && !loading && (
            <div className="col-span-full text-center py-12 text-surface-900/40 dark:text-white/40">
              No services yet.
            </div>
          )}
          {services && services.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.05, 0.3),
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Premium Card — no gradient halo, brand-cohesive */}
                <Link
                  to={`/services/${service.id}`}
                  className="block relative h-full bg-surface-0 dark:bg-surface-900/60 rounded-2xl p-6 border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Icon — brand gradient only, not rainbow */}
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300">
                    {getIconComponent(service.icon)}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2 tracking-tight group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-surface-900/60 dark:text-white/50 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features — max 3, subtle list */}
                  <ul className="space-y-2 mb-5">
                    {(Array.isArray(service.features) ? service.features : []).slice(0, 3).map((feature: string, featureIndex: number) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm text-surface-900/60 dark:text-white/50"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-300 group-hover:gap-2.5 transition-all">
                    Learn More
                    <FaArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-brand-50 to-brand-100/60 dark:from-brand-500/10 dark:to-brand-500/5 rounded-3xl p-8 md:p-12 border border-brand-100/50 dark:border-brand-500/20 shadow-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-surface-900/60 dark:text-white/50 text-lg mb-8 max-w-2xl mx-auto">
              Let's work together to bring your ideas to life with cutting-edge technology and exceptional design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/start-a-project">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold rounded-2xl shadow-glow hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  Get Started Today
                </motion.div>
              </Link>
              <a href="tel:+8801981308611">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-surface-0 dark:bg-surface-900 text-surface-900 dark:text-white font-semibold rounded-2xl border-2 border-surface-100 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-500/40 transition-all duration-300 cursor-pointer"
                >
                  Schedule a Call
                </motion.div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Service;
