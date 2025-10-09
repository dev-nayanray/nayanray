import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import Premium from "../components/Premium";
import Portfolio from "../components/Portfolio";

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          </div>

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-500 mb-8">
            Sorry, the page you are looking for doesn't exist.
          </p>

          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
        </div>
      </div>
      <Premium />
      <Portfolio />
    </>
  );
};

export default NotFound;
