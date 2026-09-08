import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaKey, FaCheck, FaTimes, FaDownload, FaSync, FaCopy, FaArrowRight,
  FaShieldAlt, FaRocket, FaExclamationTriangle, FaEnvelope, FaCalendarAlt,
} from "react-icons/fa";
import { useSeo } from "../hooks/useSeo";

/* Demo license data — in production this would come from the backend API.
   The premium plugin calls:
   - POST /api/license/activate  → activates a license key
   - POST /api/license/deactivate → deactivates a license on a site
   - GET  /api/license/verify    → checks license status
*/
const demoLicense = {
  key: "WTM-X4K9-2B7F-8M3D-P6LQ",
  plan: "Business",
  status: "active",
  sites: 3,
  sitesUsed: 2,
  purchasedOn: "2026-09-01",
  expiresOn: "2027-09-01",
  email: "you@example.com",
  activations: [
    { site: "https://mystore.com", activatedOn: "2026-09-02", status: "active" },
    { site: "https://staging.mystore.com", activatedOn: "2026-09-05", status: "active" },
  ],
};

export default function Account() {
  const [copied, setCopied] = useState(false);
  const [license, setLicense] = useState(demoLicense);
  const [activating, setActivating] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useSeo({
    title: "My Account — License Management | WooTelegram",
    description: "Manage your WooTelegram Premium license — activate, deactivate, and view your activations.",
    canonical: "/account",
    noindex: true,
  });

  const handleCopyKey = () => {
    navigator.clipboard.writeText(license.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeactivate = (site: string) => {
    setLicense({
      ...license,
      activations: license.activations.filter((a) => a.site !== site),
      sitesUsed: license.sitesUsed - 1,
    });
  };

  const handleActivate = () => {
    setActivating(true);
    setTimeout(() => {
      setLicense({
        ...license,
        activations: [
          ...license.activations,
          { site: "https://newsite.com", activatedOn: new Date().toISOString().split("T")[0], status: "active" },
        ],
        sitesUsed: license.sitesUsed + 1,
      });
      setActivating(false);
    }, 1500);
  };

  return (
    <main className="pt-20 min-h-screen bg-surface-50 dark:bg-surface-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white tracking-tight">
            License Management
          </h1>
          <p className="text-sm text-surface-900/50 dark:text-white/40 mt-1">
            Manage your WooTelegram Premium license and site activations.
          </p>
        </div>

        {/* License card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-0 dark:bg-surface-900/60 rounded-2xl p-6 border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)] mb-6"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg">
                <FaKey className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-surface-900 dark:text-white">{license.plan} Plan</h2>
                <p className="text-sm text-surface-900/50 dark:text-white/40">Premium Edition · v3.8.0</p>
              </div>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              license.status === "active"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${license.status === "active" ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
              {license.status === "active" ? "Active" : "Expired"}
            </span>
          </div>

          {/* License key */}
          <div className="bg-surface-50 dark:bg-white/5 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-surface-900/40 dark:text-white/40 mb-1">License Key</p>
                <code className="text-base font-mono font-bold text-brand-600 dark:text-brand-300 select-all">{license.key}</code>
              </div>
              <button
                onClick={handleCopyKey}
                className="p-2.5 rounded-lg bg-surface-0 dark:bg-surface-900 text-surface-900/50 dark:text-white/40 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
                aria-label="Copy license key"
              >
                {copied ? <FaCheck className="w-4 h-4 text-emerald-500" /> : <FaCopy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* License details grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FaEnvelope, label: "Email", value: license.email },
              { icon: FaCalendarAlt, label: "Purchased", value: license.purchasedOn },
              { icon: FaCalendarAlt, label: "Expires", value: license.expiresOn },
              { icon: FaRocket, label: "Sites", value: `${license.sitesUsed} / ${license.sites}` },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="text-center p-3 rounded-xl bg-surface-50 dark:bg-white/5">
                  <Icon className="w-4 h-4 mx-auto text-surface-900/40 dark:text-white/40 mb-2" />
                  <div className="text-xs text-surface-900/40 dark:text-white/40 mb-0.5">{item.label}</div>
                  <div className="text-sm font-medium text-surface-900 dark:text-white truncate">{item.value}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Site activations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface-0 dark:bg-surface-900/60 rounded-2xl p-6 border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)] mb-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-surface-900 dark:text-white">Site Activations</h3>
              <p className="text-xs text-surface-900/50 dark:text-white/40 mt-0.5">
                {license.sitesUsed} of {license.sites} sites activated
              </p>
            </div>
            {license.sitesUsed < license.sites && (
              <button
                onClick={handleActivate}
                disabled={activating}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-semibold rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-0.5 transition-all disabled:opacity-50"
              >
                {activating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Activating...
                  </>
                ) : (
                  <>
                    <FaSync className="w-3 h-3" />
                    Activate New Site
                  </>
                )}
              </button>
            )}
          </div>

          {/* Activation progress bar */}
          <div className="w-full h-2 bg-surface-100 dark:bg-white/5 rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-brand-700 rounded-full transition-all duration-500"
              style={{ width: `${(license.sitesUsed / license.sites) * 100}%` }}
            />
          </div>

          {/* Activated sites list */}
          <div className="space-y-3">
            {license.activations.map((activation, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-white/5 border border-surface-100 dark:border-white/10"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <FaCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-surface-900 dark:text-white truncate">{activation.site}</div>
                    <div className="text-xs text-surface-900/40 dark:text-white/40">Activated {activation.activatedOn}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeactivate(activation.site)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg transition-colors"
                >
                  <FaTimes className="w-3 h-3" />
                  Deactivate
                </button>
              </motion.div>
            ))}

            {license.activations.length === 0 && (
              <div className="text-center py-8 text-surface-900/40 dark:text-white/40">
                <FaExclamationTriangle className="w-6 h-6 mx-auto mb-2" />
                No sites activated yet. Click "Activate New Site" to get started.
              </div>
            )}
          </div>

          {license.sitesUsed >= license.sites && (
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2">
              <FaExclamationTriangle className="w-3.5 h-3.5 shrink-0" />
              You've reached your site limit. Upgrade your plan to activate more sites.
              <Link to="/premium" className="font-semibold underline ml-1">Upgrade →</Link>
            </div>
          )}
        </motion.div>

        {/* Actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            to="/premium"
            className="flex items-center justify-between p-5 bg-surface-0 dark:bg-surface-900/60 rounded-2xl border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center gap-3">
              <FaRocket className="w-5 h-5 text-brand-500" />
              <div>
                <div className="text-sm font-semibold text-surface-900 dark:text-white">Upgrade Plan</div>
                <div className="text-xs text-surface-900/40 dark:text-white/30">Get more sites & features</div>
              </div>
            </div>
            <FaArrowRight className="w-4 h-4 text-surface-900/30 dark:text-white/20" />
          </Link>

          <Link
            to="/markhubs-store-manager-for-telegram/docs"
            className="flex items-center justify-between p-5 bg-surface-0 dark:bg-surface-900/60 rounded-2xl border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center gap-3">
              <FaDownload className="w-5 h-5 text-brand-500" />
              <div>
                <div className="text-sm font-semibold text-surface-900 dark:text-white">Download Plugin</div>
                <div className="text-xs text-surface-900/40 dark:text-white/30">Get the latest version</div>
              </div>
            </div>
            <FaArrowRight className="w-4 h-4 text-surface-900/30 dark:text-white/20" />
          </Link>
        </div>

        {/* Security note */}
        <div className="mt-6 flex items-center gap-2 text-xs text-surface-900/40 dark:text-white/30">
          <FaShieldAlt className="w-3 h-3" />
          Your license key is encrypted and stored securely. Never share it publicly.
        </div>
      </div>
    </main>
  );
}
