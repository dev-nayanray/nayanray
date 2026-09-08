import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  SkeletonCard — animated placeholder for loading states             */
/*                                                                    */
/*  Replaces bare spinners in Service, Project, and Blog loading      */
/*  states. Shows the shape of the final card with a shimmer effect    */
/*  so users know what's loading and how many items to expect.        */
/* ------------------------------------------------------------------ */

export function SkeletonCard() {
  return (
    <div className="bg-surface-0 dark:bg-surface-900/60 rounded-2xl overflow-hidden border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)]">
      {/* Image placeholder */}
      <div className="aspect-[16/10] bg-surface-100 dark:bg-white/5">
        <motion.div
          className="h-full w-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(124, 92, 255, 0.05), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content placeholder */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="h-5 w-3/4 rounded bg-surface-100 dark:bg-white/5" />
        {/* Description */}
        <div className="h-3 w-full rounded bg-surface-100 dark:bg-white/5" />
        <div className="h-3 w-5/6 rounded bg-surface-100 dark:bg-white/5" />
        {/* Tags */}
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-16 rounded-md bg-surface-100 dark:bg-white/5" />
          <div className="h-5 w-20 rounded-md bg-surface-100 dark:bg-white/5" />
          <div className="h-5 w-14 rounded-md bg-surface-100 dark:bg-white/5" />
        </div>
      </div>
    </div>
  );
}

/* Grid of skeleton cards — matches the 3-col layout of Service/Project/Blog */
export function SkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}
