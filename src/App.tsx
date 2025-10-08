import { useState, useEffect } from "react";
import Header from "./components/golobal/Header";
import Footer from "./components/golobal/Footer";
import Home from "./pages/Home";
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
    <>
      {/* Preloader will overlay until content fully loads */}
      {loading && (
        <Preloader
          variant="logo"
          logoSrc="/logo192.png"
          message="Launching portfolio..."
        />
      )}

      {/* Site Content */}
      <div className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-700`}>
        <Header />
        <main>
          <Home />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
