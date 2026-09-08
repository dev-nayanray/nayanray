import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ReadingProgress — a thin gradient bar fixed to the top of the viewport
 * that fills as the user scrolls down the page.
 *
 * Why this matters:
 * - UX: On a 23-section page, users lose orientation. The progress bar
 *   gives them a sense of how far they've read and how far is left.
 * - Engagement: Visible progress encourages users to keep scrolling,
 *   which increases dwell time — a signal Google measures.
 * - Polish: The gradient matches the brand palette, reinforcing identity.
 *
 * Mounted at the app root so it appears on every page. Uses framer-motion's
 * useScroll + useSpring for smooth, jank-free animation.
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Only show after the user has scrolled a bit (past the hero fold)
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #0088cc 0%, #7c5cff 50%, #ec4899 100%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
