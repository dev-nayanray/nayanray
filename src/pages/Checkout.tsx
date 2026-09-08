import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaCheck, FaLock, FaCreditCard, FaArrowRight, FaArrowLeft, FaShieldAlt,
  FaDownload, FaSync,
} from "react-icons/fa";
import { useSeo } from "../hooks/useSeo";

const PLANS = {
  personal: { name: "Personal", priceMonthly: 19, priceYearly: 190, sites: 1 },
  business: { name: "Business", priceMonthly: 49, priceYearly: 490, sites: 3 },
  agency: { name: "Agency", priceMonthly: 99, priceYearly: 990, sites: 10 },
};

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const planKey = (searchParams.get("plan") || "business") as keyof typeof PLANS;
  const cycle = (searchParams.get("cycle") || "yearly") as "monthly" | "yearly";

  const plan = PLANS[planKey] || PLANS.business;
  const price = cycle === "yearly" ? plan.priceYearly : plan.priceMonthly;

  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    country: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useSeo({
    title: "Checkout — WooTelegram Premium",
    description: "Purchase your WooTelegram Premium license. Secure checkout with instant license key delivery.",
    canonical: "/checkout",
    noindex: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "details") setStep("payment");
    else if (step === "payment") {
      // Simulate payment — in production this would call a payment gateway
      setTimeout(() => setStep("success"), 1500);
    }
  };

  const licenseKey = "WTM-" + Math.random().toString(36).substring(2, 6).toUpperCase() + "-" +
    Math.random().toString(36).substring(2, 6).toUpperCase() + "-" +
    Math.random().toString(36).substring(2, 6).toUpperCase() + "-" +
    Math.random().toString(36).substring(2, 6).toUpperCase();

  return (
    <main className="pt-20 min-h-screen bg-surface-50 dark:bg-surface-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Back link */}
        <Link to="/premium" className="inline-flex items-center gap-2 text-sm text-surface-900/50 dark:text-white/40 hover:text-brand-600 dark:hover:text-brand-300 transition-colors mb-8">
          <FaArrowLeft className="w-3 h-3" />
          Back to pricing
        </Link>

        {step === "success" ? (
          /* Success state */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-surface-0 dark:bg-surface-900/60 rounded-2xl p-8 md:p-12 border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)] text-center">
              <div className="inline-flex p-4 rounded-2xl bg-emerald-500/10 mb-6">
                <FaCheck className="w-8 h-8 text-emerald-500" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white mb-3">
                Payment successful!
              </h1>
              <p className="text-surface-900/60 dark:text-white/50 mb-8">
                Your {plan.name} license has been activated. A confirmation email with your
                license key has been sent to <strong className="text-surface-900 dark:text-white">{formData.email}</strong>.
              </p>

              {/* License key display */}
              <div className="bg-surface-50 dark:bg-white/5 rounded-xl p-5 border border-surface-100 dark:border-white/10 mb-8">
                <p className="text-xs uppercase tracking-wider text-surface-900/40 dark:text-white/40 mb-2">Your License Key</p>
                <code className="text-lg font-mono font-bold text-brand-600 dark:text-brand-300 select-all">{licenseKey}</code>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/account"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-0.5 transition-all"
                >
                  <FaSync className="w-4 h-4" />
                  Manage License
                </Link>
                <Link
                  to="/markhubs-store-manager-for-telegram/docs#setup"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-surface-0 dark:bg-surface-900 text-surface-900 dark:text-white font-semibold rounded-xl border border-surface-100 dark:border-white/10 hover:border-brand-500/40 transition-all"
                >
                  <FaDownload className="w-4 h-4" />
                  Setup Guide
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Checkout form */}
            <div className="lg:col-span-3">
              <div className="bg-surface-0 dark:bg-surface-900/60 rounded-2xl p-6 md:p-8 border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)]">
                {/* Steps indicator */}
                <div className="flex items-center gap-3 mb-8">
                  <div className={`flex items-center gap-2 ${step === "details" ? "text-brand-600 dark:text-brand-300" : "text-emerald-500"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === "details" ? "bg-brand-500 text-white" : "bg-emerald-500 text-white"}`}>
                      {step === "details" ? "1" : <FaCheck className="w-3 h-3" />}
                    </div>
                    <span className="text-sm font-medium">Account</span>
                  </div>
                  <div className="flex-1 h-px bg-surface-100 dark:bg-white/10" />
                  <div className={`flex items-center gap-2 ${step === "payment" ? "text-brand-600 dark:text-brand-300" : "text-surface-900/30 dark:text-white/30"}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === "payment" ? "bg-brand-500 text-white" : "bg-surface-100 dark:bg-white/10"}`}>
                      2
                    </div>
                    <span className="text-sm font-medium">Payment</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {step === "details" ? (
                    <>
                      <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-4">Account details</h2>

                      <div>
                        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60 mb-1.5">Full name *</label>
                        <input
                          type="text" required value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                          placeholder="John Smith"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60 mb-1.5">Email address *</label>
                        <input
                          type="email" required value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                          placeholder="you@example.com"
                        />
                        <p className="text-xs text-surface-900/40 dark:text-white/30 mt-1">License key will be sent to this email.</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60 mb-1.5">Company (optional)</label>
                          <input
                            type="text" value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                            placeholder="Acme Inc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60 mb-1.5">Country *</label>
                          <input
                            type="text" required value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                            placeholder="United States"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-0.5 transition-all"
                      >
                        Continue to Payment
                        <FaArrowRight className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="text-lg font-bold text-surface-900 dark:text-white mb-4">Payment details</h2>

                      {/* Payment method tabs */}
                      <div className="flex gap-2 mb-5">
                        <button type="button" className="flex-1 py-2.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300 text-sm font-medium border border-brand-500/30">
                          <FaCreditCard className="w-4 h-4 inline mr-2" />
                          Credit Card
                        </button>
                        <button type="button" className="flex-1 py-2.5 rounded-xl bg-surface-50 dark:bg-white/5 text-surface-900/40 dark:text-white/40 text-sm font-medium border border-surface-100 dark:border-white/10">
                          PayPal
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60 mb-1.5">Card number</label>
                        <input
                          type="text" required placeholder="4242 4242 4242 4242"
                          className="w-full px-4 py-2.5 rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60 mb-1.5">Expiry</label>
                          <input
                            type="text" required placeholder="MM / YY"
                            className="w-full px-4 py-2.5 rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-surface-900/70 dark:text-white/60 mb-1.5">CVC</label>
                          <input
                            type="text" required placeholder="123"
                            className="w-full px-4 py-2.5 rounded-xl border border-surface-100 dark:border-white/10 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-surface-900/40 dark:text-white/30 py-2">
                        <FaLock className="w-3 h-3" />
                        This is a demo checkout. No real payment will be processed.
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep("details")}
                          className="px-5 py-3 bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white font-medium rounded-xl border border-surface-100 dark:border-white/10 hover:border-brand-500/40 transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-0.5 transition-all"
                        >
                          <FaLock className="w-4 h-4" />
                          Pay ${price}
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <div className="bg-surface-0 dark:bg-surface-900/60 rounded-2xl p-6 border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)] sticky top-24">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-surface-900/40 dark:text-white/40 mb-4">Order Summary</h3>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-surface-900 dark:text-white">{plan.name} Plan</div>
                      <div className="text-xs text-surface-900/50 dark:text-white/40">
                        {plan.sites} site{plan.sites > 1 ? "s" : ""} · {cycle === "yearly" ? "Annual" : "Monthly"}
                      </div>
                    </div>
                    <div className="font-bold text-surface-900 dark:text-white">${price}</div>
                  </div>
                </div>

                <div className="border-t border-surface-100 dark:border-white/10 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-900/60 dark:text-white/50">Subtotal</span>
                    <span className="text-surface-900 dark:text-white">${price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-surface-900/60 dark:text-white/50">Tax (0%)</span>
                    <span className="text-surface-900 dark:text-white">$0</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-surface-100 dark:border-white/10">
                    <span className="font-bold text-surface-900 dark:text-white">Total</span>
                    <span className="font-bold text-lg text-brand-600 dark:text-brand-300">${price}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5">
                  {["Instant license key delivery", "14-day money-back guarantee", "Priority email support", "Free updates for 1 year"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-surface-900/50 dark:text-white/40">
                      <FaCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-surface-900/40 dark:text-white/30">
                  <FaShieldAlt className="w-3 h-3" />
                  Secure payment · SSL encrypted
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
