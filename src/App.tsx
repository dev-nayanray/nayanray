import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/golobal/Header";
import Footer from "./components/golobal/Footer";
import Preloader from "./components/ui/Preloader";
import ReadingProgress from "./components/ui/ReadingProgress";

/* ------------------------------------------------------------------ */
/*  Code-splitting — ALL routes are lazy-loaded so the initial         */
/*  bundle only contains the shell (Header, Footer, Home page).       */
/*  Each page becomes its own chunk that loads on demand when the     */
/*  user navigates to it. This keeps the home page LCP fast — a      */
/*  direct Google ranking factor via Core Web Vitals.                */
/*                                                                    */
/*  Previously only the 2 Markhubs pages were lazy-loaded, while      */
/*  10 other pages (About, Projects, Services, Blog, Contact, etc.)   */
/*  were statically imported — visitors to "/" downloaded all of     */
/*  them even if they never visited those pages. Now every route     */
/*  is a separate chunk.                                              */
/* ------------------------------------------------------------------ */
const Home = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const ProjectsPage = lazy(() => import("./pages/Projects"));
const SingleProject = lazy(() => import("./pages/SingleProject"));
const ServicesPage = lazy(() => import("./pages/Services"));
const SingleService = lazy(() => import("./pages/SingleService"));
const BlogPage = lazy(() => import("./pages/Blog"));
const SingleBlogPost = lazy(() => import("./pages/SingleBlogPost"));
const ContactPage = lazy(() => import("./pages/Contact"));
const StartProject = lazy(() => import("./pages/StartProject"));
const MarkhubsPlugin = lazy(() => import("./pages/MarkhubsPlugin"));
const MarkhubsDocs = lazy(() => import("./pages/MarkhubsDocs"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* Lightweight fallback shown while a chunk downloads. Keeps the      */
/* header visible so users don't think the page crashed.               */
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

/* Wrap all routes with Suspense + PageFallback so each page chunk    */
/* shows a spinner while downloading, rather than a white screen.     */
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
        {/* Reading progress bar — appears on scroll, shows how far down
            the page the user has scrolled. Boosts engagement on long
            pages like the 23-section plugin landing page. */}
        <ReadingProgress />
        <Header />
        <main id="main-content">
          <Suspense fallback={<PageFallback />}>
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
                element={<MarkhubsPlugin />}
              />
              <Route
                path="/markhubs-store-manager-for-telegram/docs"
                element={<MarkhubsDocs />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
