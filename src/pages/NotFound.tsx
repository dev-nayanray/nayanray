import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useSeo } from "../hooks/useSeo";

const NotFound = () => {
  useSeo({
    title: "404 — Page Not Found | Nayan Ray",
    description: "The page you're looking for doesn't exist.",
    canonical: "/404",
    noindex: true,
  });

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700 mb-4">
          404
        </h1>
        <p className="text-lg text-surface-900/60 dark:text-white/50 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold rounded-xl shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] transition-all"
        >
          <FaHome className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
