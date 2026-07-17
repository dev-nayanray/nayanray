import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaArrowDown } from "react-icons/fa";
import api from "../services/api";

interface ShowcaseProject {
  id: number;
  title: string;
  description: string;
  image: string;
  liveLink: string;
  githubLink: string;
  technologies: string[];
  category: string;
  gradient: string;
  featured: boolean;
}

interface SlideProps {
  project: ShowcaseProject;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const Slide: React.FC<SlideProps> = ({ project, index, total, containerRef }) => {
  const slideRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: slideRef,
    offset: ["start end", "end start"],
  });

  // Apple-style: image is oversized as the slide enters/leaves, settles to
  // its natural scale while centered in the viewport.
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1, 1.14]);
  const contentY = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [50, 0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0.12, 0.35, 0.68, 0.92], [0, 1, 1, 0]);

  return (
    <section
      ref={slideRef}
      className="relative flex h-screen w-full snap-start snap-always items-end overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-overlay opacity-30`} />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-4xl px-6 pb-16 sm:px-12 sm:pb-24"
      >
        {project.featured && (
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Featured Work
          </span>
        )}
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/60">
          {project.category}
        </p>
        <h3 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-6xl">
          {project.title}
        </h3>
        <p className="mb-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          {project.description}
        </p>

        {Array.isArray(project.technologies) && project.technologies.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-lg transition-transform hover:scale-105"
            >
              Live Demo <FaExternalLinkAlt size={12} />
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-transform hover:scale-105"
            >
              <FaGithub size={14} /> Code
            </a>
          )}
          <a
            href={`/projects/${project.id}`}
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white/70 transition-colors hover:text-white"
          >
            View Details →
          </a>
        </div>
      </motion.div>

      <span className="absolute right-6 top-8 z-10 font-mono text-sm text-white/50 sm:right-12">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </section>
  );
};

const ScrollShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        const withImages = (response.data as ShowcaseProject[]).filter((p) => p.image);
        setProjects(withImages.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch showcase projects:", error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / el.clientHeight);
      setActiveIndex(Math.min(Math.max(idx, 0), projects.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [projects.length]);

  const scrollToIndex = (idx: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: idx * el.clientHeight, behavior: "smooth" });
  };

  if (projects.length === 0) return null;

  return (
    <section className="relative bg-black">
      <div className="px-4 py-20 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/50">
            Full-screen showcase
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Projects, up close
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Scroll through a cinematic, full-page look at recent work — each project gets the whole screen.
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mt-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/50"
          >
            <FaArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          className="no-scrollbar h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth"
        >
          {projects.map((project, index) => (
            <Slide
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              containerRef={containerRef}
            />
          ))}
        </div>

        {/* Progress dots */}
        <div className="pointer-events-none absolute inset-y-0 right-4 z-20 hidden flex-col items-center justify-center gap-3 sm:right-6 sm:flex">
          {projects.map((project, idx) => (
            <button
              key={project.id}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to ${project.title}`}
              className={`pointer-events-auto h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "h-6 w-2 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollShowcase;
