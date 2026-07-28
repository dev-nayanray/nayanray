import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import Premium from "../components/Premium";

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen bg-surface-0 dark:bg-surface-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <Search className="w-16 h-16 mx-auto text-surface-900/40 dark:text-white/40 mb-4" />
            <h1 className="text-6xl font-bold text-surface-900 dark:text-white mb-2">404</h1>
          </div>

          <h2 className="text-2xl font-semibold text-surface-900/80 dark:text-white/70 mb-4">
            Page Not Found
          </h2>

          <p className="text-surface-900/40 dark:text-white/40 mb-8">
            Sorry, the page you are looking for doesn't exist.
          </p>

          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-medium rounded-lg shadow-glow hover:shadow-xl transition-all duration-200"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
        </div>
      </div>
      <Premium />
    </>
  );
};

export default NotFound;
