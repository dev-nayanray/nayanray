import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCheck, FaTimes, FaRocket, FaRobot, FaCogs, FaLanguage, FaChartBar,
  FaWhatsapp, FaCode, FaUsers, FaArrowRight, FaShieldAlt, FaBolt,
  FaStar, FaDownload, FaSync,
} from "react-icons/fa";
import { useSeo } from "../hooks/useSeo";

/* ------------------------------------------------------------------ */
/*  Pricing tiers — matches the premium plugin's feature set           */
/* ------------------------------------------------------------------ */

const pricingTiers = [
  {
    name: "Personal",
    tagline: "For a single store",
    priceMonthly: 19,
    priceYearly: 190,
    sites: 1,
    highlighted: false,
    color: "from-blue-500 to-cyan-600",
    icon: FaRocket,
    features: [
      { label: "116+ bot commands", included: true },
      { label: "AI customer support (Llama 3.3 70B)", included: true },
      { label: "CRM with Kanban pipeline", included: true },
      { label: "Automation rules engine", included: true },
      { label: "Multi-agent support", included: false },
      { label: "WhatsApp Business API", included: false },
      { label: "REST API + PDF reports", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    name: "Business",
    tagline: "For growing stores",
    priceMonthly: 49,
    priceYearly: 490,
    sites: 3,
    highlighted: true,
    color: "from-brand-500 to-brand-700",
    icon: FaBolt,
    features: [
      { label: "116+ bot commands", included: true },
      { label: "AI customer support (Llama 3.3 70B)", included: true },
      { label: "CRM with Kanban pipeline", included: true },
      { label: "Automation rules engine", included: true },
      { label: "Multi-agent support (3 agents)", included: true },
      { label: "WhatsApp Business API", included: true },
      { label: "REST API + PDF reports", included: false },
      { label: "Priority support", included: true },
    ],
  },
  {
    name: "Agency",
    tagline: "For agencies & developers",
    priceMonthly: 99,
    priceYearly: 990,
    sites: 10,
    highlighted: false,
    color: "from-violet-500 to-purple-600",
    icon: FaShieldAlt,
    features: [
      { label: "116+ bot commands", included: true },
      { label: "AI customer support (Llama 3.3 70B)", included: true },
      { label: "CRM with Kanban pipeline", included: true },
      { label: "Automation rules engine", included: true },
      { label: "Multi-agent support (unlimited)", included: true },
      { label: "WhatsApp Business API", included: true },
      { label: "REST API + PDF reports + forecasting", included: true },
      { label: "Priority support + white-label", included: true },
    ],
  },
];

const premiumFeatures = [
  {
    icon: FaRobot,
    title: "AI Customer Support",
    description: "Llama 3.3 70B powered AI answers customer questions, handles complaints, and resolves issues automatically — 24/7, in 10 languages.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: FaUsers,
    title: "CRM with Kanban Pipeline",
    description: "Track every customer interaction with a visual Kanban board. Move deals through stages, add notes, schedule follow-ups, and never lose a lead.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: FaCogs,
    title: "Automation Rules Engine",
    description: "Create if-then rules: 'If order > $500 → assign to VIP agent + send discount coupon.' Automate your entire Telegram commerce workflow.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: FaUsers,
    title: "Multi-Agent Support",
    description: "Multiple support agents can handle conversations simultaneously. Route messages by language, category, or customer tier.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp Business API",
    description: "Connect your WhatsApp Business account alongside Telegram. Manage both channels from a single dashboard.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: FaCode,
    title: "REST API + PDF Reports",
    description: "Full REST API for custom integrations. Generate PDF reports with revenue forecasting, customer analytics, and bot performance metrics.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: FaLanguage,
    title: "10 Languages",
    description: "Built-in support for English, Spanish, French, German, Portuguese, Arabic, Russian, Chinese, Japanese, and Bengali.",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: FaChartBar,
    title: "Revenue Forecasting",
    description: "AI-powered forecasting predicts next month's revenue based on historical order data, customer behavior, and seasonality.",
    color: "from-cyan-500 to-teal-600",
  },
];

const comparisonRows = [
  { feature: "Bot commands", free: "25", premium: "116+" },
  { feature: "AI customer support", free: false, premium: true },
  { feature: "CRM with Kanban pipeline", free: false, premium: true },
  { feature: "Automation rules engine", free: false, premium: true },
  { feature: "Multi-agent support", free: false, premium: true },
  { feature: "WhatsApp Business API", free: false, premium: true },
  { feature: "REST API", free: false, premium: true },
  { feature: "PDF reports + forecasting", free: false, premium: true },
  { feature: "Languages", free: "1 (EN)", premium: "10" },
  { feature: "Priority support", free: false, premium: true },
  { feature: "HPOS compatible", free: true, premium: true },
  { feature: "Webhook auto-setup", free: true, premium: true },
];

const faqItems = [
  {
    q: "How does the license activation work?",
    a: "After purchase, you'll receive a license key via email. Enter it in your WordPress admin under WTM Premium → License. The plugin calls our API to activate and verify the key. No manual file uploads needed.",
  },
  {
    q: "Can I use the premium plugin on multiple sites?",
    a: "Yes. Each license tier allows a specific number of sites (1, 3, or 10). You can deactivate a license on one site and move it to another at any time from your account panel.",
  },
  {
    q: "Do I need the free plugin installed?",
    a: "No. The premium plugin is a complete standalone replacement. If the free version is active, the premium version will deactivate it automatically to prevent conflicts.",
  },
  {
    q: "What happens when my license expires?",
    a: "The plugin continues to work but you'll lose access to updates, AI support, and the CRM. Your data is never deleted — renew your license at any time to restore full functionality.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. We offer a 14-day no-questions-asked refund. If the premium plugin doesn't work for your store, contact us within 14 days of purchase for a full refund.",
  },
  {
    q: "Does the AI support work offline?",
    a: "No. AI customer support requires an internet connection to call the Groq API (Llama 3.3 70B). All other features work independently of the AI.",
  },
];

export default function PremiumPricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useSeo({
    title: "WooTelegram Premium — AI Support, CRM & Automation Plugin",
    description: "Premium WooCommerce Telegram plugin with AI customer support (Llama 3.3 70B), CRM Kanban, automation rules, multi-agent, WhatsApp API, 116+ commands. From $19/mo.",
    canonical: "/premium",
    keywords: [
      "WooTelegram premium",
      "WooCommerce Telegram premium plugin",
      "AI customer support WordPress",
      "CRM Kanban WooCommerce",
      "automation rules Telegram bot",
      "WhatsApp Business API WooCommerce",
    ],
    ogType: "website",
    ogImage: "https://nayanray.com/og-image.png",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "WooTelegram Manager Premium",
        applicationCategory: "WordPressPlugin",
        operatingSystem: "WordPress 5.8+, WooCommerce 5.0+, PHP 7.4+",
        description: "Premium WooCommerce Telegram plugin with AI customer support, CRM, automation rules, multi-agent, WhatsApp API, 116+ commands.",
        softwareVersion: "3.8.0",
        offers: pricingTiers.map((t) => ({
          "@type": "Offer",
          name: t.name,
          price: billingCycle === "yearly" ? t.priceYearly : t.priceMonthly,
          priceCurrency: "USD",
        })),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          ratingCount: "48",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  });

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-surface-950 via-surface-900 to-surface-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-300 text-xs font-semibold uppercase tracking-wider border border-brand-500/20 mb-6"
          >
            <FaStar className="w-3 h-3" />
            Premium Edition · v3.8.0
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
          >
            Upgrade to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
              AI-powered commerce
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            AI customer support (Llama 3.3 70B), CRM with Kanban pipeline, automation rules,
            multi-agent, WhatsApp Business API, 116+ commands, 10 languages, REST API, PDF reports.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 inline-flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10"
          >
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                billingCycle === "monthly"
                  ? "bg-brand-500 text-white shadow-lg"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                billingCycle === "yearly"
                  ? "bg-brand-500 text-white shadow-lg"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Yearly
              <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                SAVE 17%
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative -mt-10 px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, idx) => {
            const Icon = tier.icon;
            const price = billingCycle === "yearly" ? tier.priceYearly : tier.priceMonthly;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-2xl border overflow-hidden ${
                  tier.highlighted
                    ? "border-brand-500/40 shadow-[var(--shadow-premium)]"
                    : "border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)]"
                } bg-surface-0 dark:bg-surface-900/60`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-500 to-brand-700" />
                )}

                <div className="p-7">
                  {/* Tier header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${tier.color} shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-surface-900 dark:text-white">{tier.name}</h3>
                      <p className="text-xs text-surface-900/50 dark:text-white/40">{tier.tagline}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-1">
                    <span className="text-4xl font-bold text-surface-900 dark:text-white">${price}</span>
                    <span className="text-sm text-surface-900/50 dark:text-white/40">
                      /{billingCycle === "yearly" ? "year" : "month"}
                    </span>
                  </div>
                  <p className="text-xs text-surface-900/40 dark:text-white/30 mb-5">
                    {tier.sites} site{tier.sites > 1 ? "s" : ""} · {billingCycle === "yearly" ? "billed annually" : "billed monthly"}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6">
                    {tier.features.map((feat) => (
                      <li key={feat.label} className="flex items-center gap-2.5 text-sm">
                        {feat.included ? (
                          <FaCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <FaTimes className="w-4 h-4 text-surface-300 dark:text-white/20 shrink-0" />
                        )}
                        <span className={feat.included ? "text-surface-900/70 dark:text-white/60" : "text-surface-900/30 dark:text-white/30"}>
                          {feat.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={`/checkout?plan=${tier.name.toLowerCase()}&cycle=${billingCycle}`}
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      tier.highlighted
                        ? "bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-0.5"
                        : "bg-surface-50 dark:bg-white/5 text-surface-900 dark:text-white border border-surface-100 dark:border-white/10 hover:border-brand-500/40"
                    }`}
                  >
                    Get {tier.name}
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-sm text-surface-900/40 dark:text-white/30 mt-8">
          14-day money-back guarantee · Cancel anytime · GPL-2.0 licensed
        </p>
      </section>

      {/* Premium Features Grid */}
      <section className="py-20 px-4 sm:px-6 bg-surface-50 dark:bg-surface-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider border border-brand-500/20 mb-5">
              <FaRocket className="w-3 h-3" />
              Premium Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white tracking-tight">
              Everything in the free version, plus
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {premiumFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                  className="group bg-surface-0 dark:bg-surface-900/60 rounded-2xl p-6 border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feat.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-surface-900 dark:text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-surface-900/60 dark:text-white/50 leading-relaxed">{feat.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 sm:px-6 bg-surface-0 dark:bg-surface-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white tracking-tight">
              Free vs Premium
            </h2>
            <p className="mt-4 text-surface-900/60 dark:text-white/50">See exactly what you get when you upgrade.</p>
          </div>

          <div className="rounded-2xl border border-surface-100 dark:border-white/10 overflow-hidden shadow-[var(--shadow-card)]">
            <div className="grid grid-cols-3 bg-surface-50 dark:bg-white/5">
              <div className="p-4 text-sm font-semibold text-surface-900/60 dark:text-white/50">Feature</div>
              <div className="p-4 text-center text-sm font-bold text-surface-900/50 dark:text-white/40">Free</div>
              <div className="p-4 text-center text-sm font-bold text-brand-600 dark:text-brand-300">Premium</div>
            </div>
            <div className="divide-y divide-surface-100 dark:divide-white/5">
              {comparisonRows.map((row, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  className="grid grid-cols-3 items-center hover:bg-surface-50 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="p-4 text-sm text-surface-900/70 dark:text-white/60">{row.feature}</div>
                  <div className="p-4 text-center">
                    {typeof row.free === "boolean" ? (
                      row.free ? <FaCheck className="w-4 h-4 mx-auto text-emerald-500" /> : <FaTimes className="w-4 h-4 mx-auto text-surface-300 dark:text-white/20" />
                    ) : (
                      <span className="text-sm font-bold text-surface-900/50 dark:text-white/40">{row.free}</span>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    {typeof row.premium === "boolean" ? (
                      row.premium ? <FaCheck className="w-4 h-4 mx-auto text-emerald-500" /> : <FaTimes className="w-4 h-4 mx-auto text-surface-300 dark:text-white/20" />
                    ) : (
                      <span className="text-sm font-bold text-brand-600 dark:text-brand-300">{row.premium}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 bg-surface-50 dark:bg-surface-950">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white tracking-tight">
              Pricing FAQ
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-surface-0 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-surface-900 dark:text-white text-sm">{item.q}</span>
                  <motion.span animate={{ rotate: openFaq === idx ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <FaArrowRight className="w-3.5 h-3.5 text-brand-500 -rotate-90 shrink-0" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-surface-900/60 dark:text-white/55 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl p-10 md:p-14 shadow-[var(--shadow-premium)]">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to upgrade?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Join stores using WooTelegram Premium to automate their Telegram commerce with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/checkout?plan=business&cycle=yearly"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <FaDownload className="w-4 h-4" />
                Get Premium Now
              </Link>
              <Link
                to="/account"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                <FaSync className="w-4 h-4" />
                Manage License
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
