import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ProjectGalleryProps {
  images: string[];
  alt: string;
  /** "card" = compact grid thumbnail, "detail" = larger single-project view */
  variant?: "card" | "detail";
  className?: string;
}

const FALLBACK_IMAGE = "/vite.svg";

const ProjectGallery = ({ images, alt, variant = "card", className = "" }: ProjectGalleryProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const gallery = images.length > 0 ? images : [FALLBACK_IMAGE];
  const multiple = gallery.length > 1;

  const updateActive = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    setActiveIndex(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [updateActive]);

  const goTo = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(gallery.length - 1, index));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: clamped * el.clientWidth, behavior: reduced ? "auto" : "smooth" });
  };

  const aspect = variant === "detail" ? "aspect-[16/10]" : "aspect-[4/3]";

  return (
    <div className={`relative group/gallery ${className}`}>
      <div
        ref={trackRef}
        className={`no-scrollbar flex w-full ${aspect} overflow-x-auto snap-x snap-mandatory`}
        tabIndex={multiple ? 0 : -1}
        role={multiple ? "group" : undefined}
        aria-roledescription={multiple ? "carousel" : undefined}
        aria-label={multiple ? `${alt} — image gallery, ${gallery.length} photos` : undefined}
        onKeyDown={(e) => {
          if (!multiple) return;
          if (e.key === "ArrowRight") goTo(activeIndex + 1);
          if (e.key === "ArrowLeft") goTo(activeIndex - 1);
        }}
      >
        {gallery.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt={i === 0 ? alt : `${alt} — screenshot ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full flex-none snap-start object-cover"
          />
        ))}
      </div>

      {multiple && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              goTo(activeIndex - 1);
            }}
            disabled={activeIndex === 0}
            className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/gallery:opacity-100 disabled:pointer-events-none disabled:opacity-0"
          >
            <FaChevronLeft className="h-3 w-3" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              goTo(activeIndex + 1);
            }}
            disabled={activeIndex === gallery.length - 1}
            className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/gallery:opacity-100 disabled:pointer-events-none disabled:opacity-0"
          >
            <FaChevronRight className="h-3 w-3" />
          </button>

          <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
            {gallery.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === activeIndex}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === activeIndex ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectGallery;
