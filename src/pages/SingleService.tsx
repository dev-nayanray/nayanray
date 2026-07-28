import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaCode, FaWordpress, FaMobileAlt, FaPaintBrush, FaRocket, FaShieldAlt, FaChartLine,
  FaArrowLeft, FaCheckCircle, FaExternalLinkAlt,
} from "react-icons/fa";
import api from "../services/api";
import ProposalForm from "../components/ProposalForm";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface RelatedProject {
  id: number;
  title: string;
  images: string[];
  category: string;
  gradient: string;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'FaCode': return <FaCode className="w-9 h-9" />;
    case 'FaWordpress': return <FaWordpress className="w-9 h-9" />;
    case 'FaMobileAlt': return <FaMobileAlt className="w-9 h-9" />;
    case 'FaPaintBrush': return <FaPaintBrush className="w-9 h-9" />;
    case 'FaRocket': return <FaRocket className="w-9 h-9" />;
    case 'FaShieldAlt': return <FaShieldAlt className="w-9 h-9" />;
    case 'FaChartLine': return <FaChartLine className="w-9 h-9" />;
    default: return <FaCode className="w-9 h-9" />;
  }
};

const PROCESS_STEPS = [
  { title: "Discovery", description: "We talk through goals, constraints, and what success looks like." },
  { title: "Plan", description: "A clear scope, timeline, and milestones before any code is written." },
  { title: "Build", description: "Iterative development with regular check-ins, not a black box." },
  { title: "Launch & Support", description: "Deployed, documented, and backed by post-launch support." },
];

const SingleService = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<RelatedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await api.get("/services");
        const found = (response.data as Service[]).find((s) => String(s.id) === id);
        if (!found) {
          setError("Service not found");
        } else {
          setService(found);
        }
      } catch (err) {
        console.error("Failed to fetch service:", err);
        setError("Service not found");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProjects = async () => {
      try {
        const response = await api.get("/projects");
        setRelatedProjects((response.data as RelatedProject[]).filter((p) => p.images?.length).slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch related projects:", err);
      }
    };
    fetchRelatedProjects();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto" />
        <p className="mt-4 text-surface-900/60 dark:text-white/50">Loading service...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="max-w-4xl mx-auto py-32 text-center px-4">
        <h2 className="text-3xl font-bold mb-4 text-surface-900 dark:text-white">Service Not Found</h2>
        <p className="mb-8 text-surface-900/60 dark:text-white/50">{error || "The service you are looking for does not exist."}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <section className="relative py-28 bg-gradient-to-br from-surface-50 via-surface-0 to-brand-50/30 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-72 h-72 bg-brand-200/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 mb-8 text-brand-600 dark:text-brand-300 hover:text-brand-800 dark:hover:text-brand-200 font-semibold"
          >
            <FaArrowLeft /> Back to Services
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-glow mb-6">
              {getIconComponent(service.icon)}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-surface-900 dark:text-white">{service.title}</h1>
            <p className="text-lg text-surface-900/60 dark:text-white/50 leading-relaxed max-w-2xl">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface-0 dark:bg-surface-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16">
          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-surface-900 dark:text-white">What's included</h2>
            <ul className="space-y-4">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 text-brand-600 dark:text-brand-300 mt-0.5 flex-shrink-0" />
                  <span className="text-surface-900/70 dark:text-white/60">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-surface-900 dark:text-white">How it works</h2>
            <ol className="space-y-6">
              {PROCESS_STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 text-sm font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-surface-900/60 dark:text-white/50">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="py-20 bg-surface-50 dark:bg-surface-950">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-surface-900 dark:text-white">Recent work</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-surface-0 dark:bg-surface-900 rounded-2xl overflow-hidden border border-surface-100 dark:border-white/10 shadow-soft hover:shadow-card transition-shadow duration-300"
                >
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-5">
                    <p className="text-xs font-medium text-brand-600 dark:text-brand-300 uppercase tracking-wide mb-1">
                      {project.category}
                    </p>
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-3">{project.title}</h3>
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-300 hover:text-brand-800 dark:hover:text-brand-200"
                    >
                      View project <FaExternalLinkAlt className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-surface-0 dark:bg-surface-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 text-surface-900 dark:text-white">
              Get a proposal for {service.title.toLowerCase()}
            </h2>
            <p className="text-surface-900/60 dark:text-white/50">
              Share a few details and I'll follow up with next steps.
            </p>
          </div>
          <ProposalForm defaultServiceId={service.id} defaultServiceName={service.title} />
        </div>
      </section>
    </>
  );
};

export default SingleService;
