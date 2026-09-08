import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Preloader — lightweight loading overlay                            */
/*                                                                    */
/*  Replaces the previous 690-line version that shipped 8 unused      */
/*  variants (spinner, progress, modern, elegant, circular, steps,   */
/*  morphing) with floating particles, multi-stage timers, and env-  */
/*  var fallbacks. Only the "logo" variant was ever used (in App.tsx),*/
/*  so this version does exactly that — nothing more.               */
/*                                                                    */
/*  Props are kept for backward compatibility — existing callers      */
/*  pass `variant`, `logoSrc`, and `message` — but the component      */
/*  ignores `variant` (always renders the logo spinner) and any      */
/*  props it doesn't need.                                           */
/* ------------------------------------------------------------------ */

interface PreloaderProps {
  variant?: string; // kept for backward compat; ignored
  logoSrc?: string;
  message?: string;
  // These props are accepted but ignored — they were part of the old
  // API. Removing them would break callers; keeping them silently
  // no-ops is safer during refactor.
  visible?: boolean | null;
  minDuration?: number;
  color?: string;
  externalProgress?: number | null;
  onFinish?: () => void;
  brandName?: string;
  showPercentage?: boolean;
  stepCount?: number;
  currentStep?: number;
}

export default function Preloader({
  logoSrc = "/nayan.svg",
  message = "Loading...",
}: PreloaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-50 dark:bg-surface-950"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo with pulse + spin */}
        <motion.div
          className="relative"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {logoSrc && (
            <img
              src={logoSrc}
              alt="Loading"
              className="w-16 h-16 rounded-2xl shadow-lg"
            />
          )}
          {/* Spinning ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-brand-500/30 border-t-brand-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-medium text-surface-900/60 dark:text-white/50"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
}
