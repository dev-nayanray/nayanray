import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaLinkedin, FaAward } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    position: "CEO, Example Corp",
    company: "Tech Startup",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=60",
    feedback: "Nayan delivered an outstanding website for our business. His attention to detail and technical expertise exceeded our expectations. The project was completed ahead of schedule with excellent communication throughout.",
    rating: 5,
    linkedin: "#",
    project: "E-commerce Platform"
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Project Manager, ABC Ltd",
    company: "Digital Agency",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=60",
    feedback: "I highly recommend Nayan for any web development project. He is creative, skilled, and reliable. His ability to understand client requirements and translate them into beautiful, functional websites is remarkable.",
    rating: 5,
    linkedin: "#",
    project: "Corporate Website"
  },
  {
    id: 3,
    name: "Mark Wilson",
    position: "Founder, Startup Hub",
    company: "Innovation Center",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=60",
    feedback: "Working with Nayan was a great experience. He delivered exactly what we needed with amazing quality. His technical skills combined with creative problem-solving made our project a huge success.",
    rating: 5,
    linkedin: "#",
    project: "SaaS Application"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    position: "Marketing Director",
    company: "Global Brand",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=60",
    feedback: "Exceptional work! Nayan transformed our online presence with a stunning website that perfectly captures our brand identity. The user experience is seamless and conversion rates have improved significantly.",
    rating: 5,
    linkedin: "#",
    project: "Brand Website"
  },
  {
    id: 5,
    name: "David Chen",
    position: "CTO",
    company: "FinTech Company",
    photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&q=60",
    feedback: "Nayan's expertise in modern web technologies is impressive. He built a complex financial dashboard that performs flawlessly. His code is clean, maintainable, and well-documented.",
    rating: 5,
    linkedin: "#",
    project: "Financial Dashboard"
  },
  {
    id: 6,
    name: "Emily Rodriguez",
    position: "Creative Director",
    company: "Design Studio",
    photo: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=400&q=60",
    feedback: "A true professional! Nayan understood our vision perfectly and brought it to life with technical excellence. The website has received numerous compliments from our clients and partners.",
    rating: 5,
    linkedin: "#",
    project: "Portfolio Website"
  }
];

const Testimonial = () => {
  return (
    <section
      id="testimonials"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-medium mb-6"
          >
            <FaAward className="w-4 h-4" />
            Client Testimonials
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Clients Say</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take my word for it. Here's what clients have to say about working with me 
            and the results we've achieved together.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
              
              {/* Main Card */}
              <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-sm hover:shadow-2xl transition-all duration-500">
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6">
                  <FaQuoteLeft className="w-8 h-8 text-blue-200 group-hover:text-blue-300 transition-colors" />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>

                {/* Feedback Text */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed group-hover:text-gray-800 transition-colors">
                  "{testimonial.feedback}"
                </blockquote>

                {/* Project Info */}
                <div className="mb-6 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="text-sm text-blue-600 font-medium">Project:</div>
                  <div className="text-sm text-gray-700">{testimonial.project}</div>
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>

                  {/* Social Links */}
                  <motion.a
                    href={testimonial.linkedin}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-300"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </motion.a>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                  <div className="absolute inset-[2px] bg-white rounded-3xl"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "40+", label: "Happy Clients" },
            { number: "50+", label: "Projects Completed" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 mt-2 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-100/50 shadow-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join dozens of satisfied clients who have transformed their digital presence. 
              Let's discuss how we can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Project
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              >
                Schedule a Call
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;