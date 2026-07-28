import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import api, { submitProposal, BUDGET_RANGES, TIMELINES } from "../services/api";

interface Service {
  id: number;
  title: string;
}

interface ProposalFormProps {
  defaultServiceId?: number;
  defaultServiceName?: string;
  onSuccess?: () => void;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-surface-100 dark:border-white/10 bg-surface-0 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300 outline-none";
const labelClass = "block text-sm font-medium text-surface-900/70 dark:text-white/60 mb-2";

const ProposalForm = ({ defaultServiceId, defaultServiceName, onSuccess }: ProposalFormProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceId: defaultServiceId ? String(defaultServiceId) : "",
    projectType: "",
    budgetRange: "",
    timeline: "",
    description: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        setServices(response.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const selectedService = services.find((s) => String(s.id) === formData.serviceId);

    try {
      await submitProposal({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        serviceId: formData.serviceId ? Number(formData.serviceId) : undefined,
        serviceName: selectedService?.title || defaultServiceName || undefined,
        projectType: formData.projectType || undefined,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        description: formData.description,
      });
      setSubmitted(true);
      onSuccess?.();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-brand-700 rounded-3xl blur opacity-30" />
        <div className="relative bg-surface-0 dark:bg-surface-900 rounded-3xl p-10 border border-surface-100 dark:border-white/10 shadow-xl text-center">
          <div className="inline-flex p-4 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 mb-6">
            <FaCheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-3">
            Proposal received
          </h3>
          <p className="text-surface-900/60 dark:text-white/50 max-w-md mx-auto">
            Thanks{formData.name ? `, ${formData.name}` : ""} — I typically respond within
            24 hours with next steps or a few clarifying questions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-brand-700 rounded-3xl blur opacity-30" />
      <div className="relative bg-surface-0 dark:bg-surface-900 rounded-3xl p-8 border border-surface-100 dark:border-white/10 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className={labelClass}>Your Name *</label>
              <input
                type="text" id="name" name="name" value={formData.name}
                onChange={handleChange} required className={inputClass} placeholder="Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email Address *</label>
              <input
                type="email" id="email" name="email" value={formData.email}
                onChange={handleChange} required className={inputClass} placeholder="jane@company.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
              <input
                type="tel" id="phone" name="phone" value={formData.phone}
                onChange={handleChange} className={inputClass} placeholder="+1 555 000 0000"
              />
            </div>
            <div>
              <label htmlFor="company" className={labelClass}>Company (optional)</label>
              <input
                type="text" id="company" name="company" value={formData.company}
                onChange={handleChange} className={inputClass} placeholder="Acme Inc."
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="serviceId" className={labelClass}>Service</label>
              <select
                id="serviceId" name="serviceId" value={formData.serviceId}
                onChange={handleChange} className={inputClass}
              >
                <option value="">General inquiry / not sure</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="projectType" className={labelClass}>Project Type</label>
              <input
                type="text" id="projectType" name="projectType" value={formData.projectType}
                onChange={handleChange} className={inputClass} placeholder="e.g. New website, redesign, MVP"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="budgetRange" className={labelClass}>Budget Range *</label>
              <select
                id="budgetRange" name="budgetRange" value={formData.budgetRange}
                onChange={handleChange} required className={inputClass}
              >
                <option value="" disabled>Select a range</option>
                {BUDGET_RANGES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className={labelClass}>Timeline *</label>
              <select
                id="timeline" name="timeline" value={formData.timeline}
                onChange={handleChange} required className={inputClass}
              >
                <option value="" disabled>Select a timeline</option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>Tell me about the project *</label>
            <textarea
              id="description" name="description" value={formData.description}
              onChange={handleChange} required rows={6} minLength={10}
              className={`${inputClass} resize-none`}
              placeholder="Goals, must-have features, anything you already have in place..."
            />
          </div>

          {error && (
            <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold rounded-2xl shadow-glow hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <span>Send Proposal</span>
                <FaPaperPlane className="w-4 h-4" />
              </>
            )}
          </motion.button>

          <p className="text-center text-surface-900/40 dark:text-white/30 text-sm">
            I typically respond within 24 hours. Your information is safe with me.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ProposalForm;
