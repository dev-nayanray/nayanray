import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCheck, FaStar, FaRocket, FaCrown, FaGem, FaLightbulb, FaSync, FaGlobe, FaMobile, FaPalette } from "react-icons/fa";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses and personal websites",
      price: "$499",
      duration: "one-time",
      popular: false,
      featured: false,
      icon: <FaLightbulb className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "Responsive Website Design",
        "Up to 5 Pages",
        "Contact Form",
        "Basic SEO Optimization",
        "Mobile-Friendly Design",
        "1 Month Support",
        "2 Revisions",
        "48-Hour Delivery"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline"
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses and e-commerce",
      price: "$899",
      duration: "one-time",
      popular: true,
      featured: true,
      icon: <FaRocket className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Everything in Starter",
        "Up to 10 Pages",
        "E-commerce Functionality",
        "Advanced SEO Setup",
        "Performance Optimization",
        "3 Months Support",
        "5 Revisions",
        "Social Media Integration",
        "Google Analytics Setup",
        "CMS Integration"
      ],
      buttonText: "Choose Plan",
      buttonVariant: "primary"
    },
    {
      name: "Enterprise",
      description: "Complete solution for large-scale applications",
      price: "$1,499",
      duration: "one-time",
      popular: false,
      featured: false,
      icon: <FaCrown className="w-8 h-8" />,
      gradient: "from-amber-500 to-orange-500",
      features: [
        "Everything in Professional",
        "Unlimited Pages",
        "Custom Web Application",
        "API Integration",
        "Database Design",
        "6 Months Support",
        "Unlimited Revisions",
        "Priority Development",
        "Advanced Security",
        "Dedicated Project Manager",
        "Training & Documentation"
      ],
      buttonText: "Get Quote",
      buttonVariant: "outline"
    }
  ];

  const services = [
    {
      icon: <FaPalette className="w-6 h-6" />,
      name: "UI/UX Design",
      description: "Custom design that matches your brand identity"
    },
    {
      icon: <FaMobile className="w-6 h-6" />,
      name: "Responsive Development",
      description: "Flawless experience across all devices"
    },
    {
      icon: <FaGlobe className="w-6 h-6" />,
      name: "Web Applications",
      description: "Scalable and maintainable web solutions"
    },
    {
      icon: <FaSync className="w-6 h-6" />,
      name: "Maintenance",
      description: "Ongoing support and updates"
    }
  ];

  return (
    <section id="pricing" className="relative py-20 bg-gradient-to-br from-surface-50 via-surface-0 to-brand-50/30 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-200/10 rounded-full blur-3xl"></div>
        
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
            <FaGem className="w-4 h-4" />
            Pricing & Packages
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-surface-900 dark:text-white">
            Affordable <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">Pricing</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-700 mx-auto rounded-full mb-8"></div>

          <p className="text-xl text-surface-900/60 dark:text-white/50 max-w-3xl mx-auto leading-relaxed">
            Transparent pricing with no hidden fees. Choose the perfect package for your business 
            or request a custom quote for your specific needs.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 300
              }}
              className="relative group"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm shadow-lg">
                    <FaStar className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Background Gradient Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${plan.gradient} rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-300`}></div>
              
              {/* Main Card */}
              <div className={`relative h-full bg-surface-0/80 dark:bg-surface-900/80 backdrop-blur-sm rounded-3xl p-8 border-2 transition-all duration-500 ${
                plan.featured
                  ? 'border-purple-200 dark:border-purple-500/30 shadow-2xl'
                  : 'border-surface-100 dark:border-white/10 shadow-sm hover:shadow-xl'
              }`}>

                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${plan.gradient} text-white shadow-lg mb-4`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-surface-900/60 dark:text-white/50">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl md:text-5xl font-bold text-surface-900 dark:text-white">{plan.price}</span>
                    <span className="text-surface-900/60 dark:text-white/50">/{plan.duration}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                      className="flex items-center gap-3 text-surface-900/80 dark:text-white/70"
                    >
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} text-white flex items-center justify-center`}>
                        <FaCheck className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  to="/start-a-project"
                  className={`block text-center w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                    plan.buttonVariant === 'primary'
                      ? 'bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-0.5'
                      : 'bg-surface-0 dark:bg-surface-900 text-surface-900 dark:text-white border-2 border-surface-100 dark:border-white/10 hover:border-brand-500/40 shadow-sm hover:shadow-lg'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Additional <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">Services</span>
            </h3>
            <p className="text-surface-900/60 dark:text-white/50 max-w-2xl mx-auto">
              Need something specific? I offer standalone services to complement your existing setup.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                <div className="relative bg-surface-0/80 dark:bg-surface-900/80 backdrop-blur-sm rounded-2xl p-6 border border-surface-100 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-500 text-center">
                  <div className="inline-flex p-3 rounded-xl bg-brand-100 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h4 className="font-semibold text-surface-900 dark:text-white mb-2">{service.name}</h4>
                  <p className="text-surface-900/60 dark:text-white/50 text-sm">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;