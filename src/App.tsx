import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/golobal/Header";
import Footer from "./components/golobal/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import ProjectsPage from "./pages/Projects";
import ServicesPage from "./pages/Services";
import BlogPage from "./pages/Blog";
import ContactPage from "./pages/Contact";
import SingleProject from "./pages/SingleProject";
import SingleService from "./pages/SingleService";
import SingleBlogPost from "./pages/SingleBlogPost";
import StartProject from "./pages/StartProject";
import NotFound from "./pages/NotFound";
import Preloader from "./components/ui/Preloader";

/* ------------------------------------------------------------------ */
/*  Code-splitting: the markhubs plugin pages are large (2400+ lines  */
/*  each). Lazy-load them so the home page bundle stays small and     */
/*  LCP/Core Web Vitals stay fast — a direct Google ranking factor.   */
/* ------------------------------------------------------------------ */
const MarkhubsPlugin = lazy(() => import("./pages/MarkhubsPlugin"));
const MarkhubsDocs = lazy(() => import("./pages/MarkhubsDocs"));

/* Lightweight fallback shown while the chunk downloads. Keeps the    */
/* header visible so users don't think the page crashed.              */
function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-brand-500/20 border-t-brand-500 animate-spin" />
        <p className="text-sm text-surface-900/50 dark:text-white/50">Loading…</p>
      </div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Keep loader for a short moment to look smoother
      setTimeout(() => setLoading(false), 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <Router>
      {/* Preloader will overlay until content fully loads */}
      {loading && (
        <Preloader
          variant="logo"
          logoSrc="/nayan.svg"
          message="Launching portfolio..."
        />
      )}

      {/* Site Content */}
      <div className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<SingleProject />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<SingleService />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<SingleBlogPost />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/start-a-project" element={<StartProject />} />
            <Route
              path="/markhubs-store-manager-for-telegram"
              element={
                <Suspense fallback={<PageFallback />}>
                  <MarkhubsPlugin />
                </Suspense>
              }
            />
            <Route
              path="/markhubs-store-manager-for-telegram/docs"
              element={
                <Suspense fallback={<PageFallback />}>
                  <MarkhubsDocs />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
