import { motion } from "framer-motion";
import { FaCrown, FaStar, FaShieldAlt, FaRocket } from "react-icons/fa";

const Premium = () => {
  const premiumFeatures = [
    {
      icon: <FaCrown className="w-6 h-6" />,
      title: "Exclusive Access",
      description: "Get access to premium content and features not available to regular users."
    },
    {
      icon: <FaStar className="w-6 h-6" />,
      title: "Priority Support",
      description: "Receive faster response times and dedicated support from our team."
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Advanced Security",
      description: "Enhanced security features to protect your data and privacy."
    },
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Performance Boost",
      description: "Optimized performance with faster loading times and better user experience."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mb-6">
            <FaCrown className="w-4 h-4" />
            Premium Features
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Premium</span> Benefits
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the full potential with our premium features designed for power users.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex p-3 rounded-xl bg-purple-100 text-purple-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            Upgrade to Premium
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Premium;
