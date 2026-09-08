import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "../ui/ThemeToggle";

/* ------------------------------------------------------------------ */
/*  Header — modern inline nav + clean mobile sheet                    */
/*                                                                    */
/*  Previously: over-engineered bento-grid menu with search, category  */
/*  filters, and quick-action buttons. Users had to click "Menu", wait  */
/*  for an animation, optionally search/filter, then click a link.     */
/*  80% of navigation was hidden behind a click.                      */
/*                                                                    */
/*  Now: inline horizontal nav on desktop (Home · About · Projects ·   */
/*  Services · Blog · Contact + CTA). Mobile: hamburger → slide-down    */
/*  sheet with the same links. No search, no categories.              */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Projects", to: "/projects" },
  { name: "Services", to: "/services" },
  { name: "Blog", to: "/blog" },
  { name: "Contact", to: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
          scrolled
            ? "bg-surface-0/80 dark:bg-surface-900/80 border-surface-100/80 dark:border-white/10 shadow-[var(--shadow-card)]"
            : "bg-surface-0/60 dark:bg-surface-900/60 border-surface-100/40 dark:border-white/10"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src="/nayan.svg" alt="Nayan Ray" className="w-9 h-9 rounded-xl" />
          <span className="font-bold text-base text-surface-900 dark:text-white hidden sm:block">
            Nayan Ray
          </span>
        </Link>

        {/* Desktop nav — inline, no menu button */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(link.to)
                  ? "text-brand-600 dark:text-brand-300 bg-brand-500/10"
                  : "text-surface-900/60 dark:text-white/60 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-white/5"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side — theme toggle + CTA + mobile menu button */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/start-a-project"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-semibold shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-premium)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Start a Project
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-surface-900 dark:text-white hover:bg-surface-50 dark:hover:bg-white/5 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <FaTimes className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <FaBars className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* Mobile menu — slide-down sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden mt-2"
          >
            <div className="bg-surface-0/95 dark:bg-surface-900/95 backdrop-blur-xl rounded-2xl border border-surface-100 dark:border-white/10 shadow-[var(--shadow-card)] p-3">
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      to={link.to}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive(link.to)
                          ? "text-brand-600 dark:text-brand-300 bg-brand-500/10"
                          : "text-surface-900/70 dark:text-white/70 hover:text-surface-900 dark:hover:text-white hover:bg-surface-50 dark:hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <Link
                  to="/start-a-project"
                  className="block mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-semibold text-center shadow-[var(--shadow-glow)]"
                >
                  Start a Project
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
