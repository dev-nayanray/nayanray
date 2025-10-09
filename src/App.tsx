import { useState, useEffect } from "react";
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
import SingleBlogPost from "./pages/SingleBlogPost";
import Preloader from "./components/ui/Preloader";

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
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<SingleBlogPost />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
