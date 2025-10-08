import { useEffect, useState, useRef } from "react";

type Variant = "spinner" | "logo" | "progress" | "modern" | "elegant";

interface PreloaderProps {
  visible?: boolean | null;
  variant?: Variant;
  minDuration?: number;
  logoSrc?: string;
  message?: string;
  color?: string;
  externalProgress?: number | null;
  onFinish?: () => void;
  brandName?: string;
  showPercentage?: boolean;
}

const DEFAULT_MIN_DURATION = 800;

export default function Preloader({
  visible = null,
  variant = "modern",
  minDuration = DEFAULT_MIN_DURATION,
  logoSrc,
  message = "Loading Excellence...",
  color,
  externalProgress = null,
  onFinish,
  brandName,
  showPercentage = true,
}: PreloaderProps) {
  const [mountedAt] = useState(Date.now());
  const [show, setShow] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logoError, setLogoError] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>
  >([]);

  const isBrowser = typeof window !== "undefined";
  const prefersReduced =
    isBrowser &&
    !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // timers
  const timers = useRef<number[]>([]);

  const setSafeTimeout = (fn: () => void, ms: number) => {
    if (!isBrowser) return -1;
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  };

  const clearAll = () => {
    if (!isBrowser) return;
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  // Use Vite envs (if available). Vite exposes env via import.meta.env
  const envBrand = typeof import.meta !== "undefined" ? (import.meta.env.VITE_APP_NAME as string | undefined) : undefined;
  const envLogo = typeof import.meta !== "undefined" ? (import.meta.env.VITE_APP_LOGO as string | undefined) : undefined;
  const defaultLogo = envLogo || "/profile.png"; // public/profile.png served at /profile.png
  const finalLogo = logoSrc || defaultLogo;
  const finalBrand = brandName || envBrand || "Nayan Ray";

  // Initialize floating particles (with duration)
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 3,
      duration: 6 + Math.random() * 8,
    }));
    setParticles(newParticles);
  }, []);

  // Auto-hide logic when `visible` isn't controlled
  useEffect(() => {
    if (!isBrowser) return;
    if (visible === true || visible === false) {
      return;
    }

    const onLoad = () => {
      const elapsed = Date.now() - mountedAt;
      const remaining = Math.max(0, minDuration - elapsed);
      setSafeTimeout(() => startExit(), remaining);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      const loadHandler = () => onLoad();
      window.addEventListener("load", loadHandler, { once: true });
      const fb = setSafeTimeout(onLoad, 5000);
      return () => {
        window.removeEventListener("load", loadHandler);
        if (fb !== -1) clearTimeout(fb);
      };
    }

    return () => clearAll();
  }, [visible, minDuration, mountedAt]);

  // Controlled visible handling
  useEffect(() => {
    if (!isBrowser) return;
    if (visible === true) {
      setShow(true);
      setExiting(false);
    } else if (visible === false) {
      const elapsed = Date.now() - mountedAt;
      const remaining = Math.max(0, minDuration - elapsed);
      setSafeTimeout(() => startExit(), remaining);
    }
  }, [visible]);

  // Progress simulation (if no external progress provided)
  useEffect(() => {
    if (variant !== "progress" && variant !== "modern" && variant !== "elegant") return;
    if (externalProgress != null) {
      setProgress(Math.max(0, Math.min(100, Math.round(externalProgress))));
      return;
    }

    let pct = 0;
    setProgress(0);

    const step = () => {
      const inc = Math.max(1, Math.floor((100 - pct) / 14));
      pct = Math.min(96, pct + inc);
      setProgress(pct);
      if (pct < 96) {
        const t = setSafeTimeout(step, 200 + Math.random() * 200);
        if (t === -1) return;
      }
    };

    const t0 = setSafeTimeout(step, 150);
    if (t0 === -1) return;

    return () => clearAll();
  }, [variant, externalProgress]);

  // External progress observer
  useEffect(() => {
    if (externalProgress === null || externalProgress === undefined) return;
    setProgress(Math.max(0, Math.min(100, Math.round(externalProgress))));
    if (externalProgress >= 100) {
      setSafeTimeout(() => startExit(), 400);
    }
  }, [externalProgress]);

  // start exit sequence
  const startExit = () => {
    if (!show || exiting) return;
    setExiting(true);
    const id = setSafeTimeout(() => {
      setShow(false);
      setExiting(false);
      clearAll();
      onFinish?.();
    }, 700);
    if (id !== -1) timers.current.push(id);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => clearAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  const accentColor = color || "#3b82f6";
  const gradientStyle = color
    ? { background: `linear-gradient(135deg, ${color}40, ${color}20)` }
    : { background: "linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(16, 185, 129, 0.2))" };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={show}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-800/95 via-indigo-900/90 to-purple-800/95 backdrop-blur-xl transition-all duration-700 ${
        exiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 100%)' }} />
        {!prefersReduced &&
          particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-white/10"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animation: `float ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}

        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-violet-500/10 rounded-full blur-2xl animate-pulse-slower" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-md w-full px-8">
        {(variant === "modern" || variant === "elegant") && (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative mb-4">
              <div className="relative">
                {finalLogo && !logoError ? (
                  <img
                    src={finalLogo}
                    alt="Brand logo"
                    onError={() => setLogoError(true)}
                    className={`w-24 h-24 object-contain rounded-2xl shadow-2xl transform ${
                      prefersReduced ? "" : "animate-logo-glow"
                    }`}
                    style={gradientStyle}
                  />
                ) : (
                  <div
                    className={`w-24 h-24 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-2xl font-bold text-white shadow-2xl ${
                      prefersReduced ? "" : "animate-logo-glow"
                    }`}
                    style={gradientStyle}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">NR</span>
                  </div>
                )}

                {!prefersReduced && (
                  <>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-orbit-1" />
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full animate-orbit-2" />
                  </>
                )}
              </div>
            </div>

            <div className="mb-2">
              <h2 className={`text-xl font-semibold text-white/90 ${prefersReduced ? "" : "animate-fade-in"}`} style={{ animationDelay: "0.3s" }}>{finalBrand}</h2>
              <p className={`text-sm text-white/60 mt-1 ${prefersReduced ? "" : "animate-fade-in"}`} style={{ animationDelay: "0.5s" }}>Premium Web Solutions</p>
            </div>

            <div className="w-full max-w-xs">
              <div className="flex justify-between text-sm text-white/70 mb-2">
                <span>{message}</span>
                {showPercentage && <span className="font-medium">{Math.min(100, Math.max(0, progress))}%</span>}
              </div>

              <div className="relative">
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                    style={{
                      width: `${progress}%`,
                      background: color ? `linear-gradient(90deg, ${color}, ${color}dd)` : "linear-gradient(90deg, #3b82f6, #10b981)",
                    }}
                  >
                    {!prefersReduced && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shine" />}
                  </div>
                </div>

                {!prefersReduced && (
                  <div
                    className="absolute inset-0 blur-md opacity-30 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${progress}%`,
                      background: color ? `linear-gradient(90deg, ${color}, ${color}dd)` : "linear-gradient(90deg, #3b82f6, #10b981)",
                    }}
                  />
                )}
              </div>
            </div>

            {!prefersReduced && (
              <div className="flex gap-1 mt-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            )}
          </div>
        )}

        {variant === "spinner" && (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                <svg className={`${prefersReduced ? "" : "animate-spin-premium"} w-16 h-16`} viewBox="0 0 50 50" fill="none">
                  <defs>
                    <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={accentColor} />
                      <stop offset="100%" stopColor={accentColor} stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                  <circle cx="25" cy="25" r="20" stroke="url(#spinnerGradient)" strokeWidth="4" strokeLinecap="round" strokeDasharray="32 100" fill="none" />
                </svg>
              </div>
            </div>
            <div className="text-white/80 font-medium">{message}</div>
          </div>
        )}

        {variant === "logo" && (
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              {finalLogo && !logoError ? (
                <img
                  src={finalLogo}
                  alt="Brand logo"
                  onError={() => setLogoError(true)}
                  className={`w-32 h-32 object-contain rounded-2xl shadow-2xl transform ${prefersReduced ? "" : "animate-logo-3d"}`}
                />
              ) : (
                <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-4xl font-bold text-white shadow-2xl ${prefersReduced ? "" : "animate-logo-3d"}`}>
                  NR
                </div>
              )}
            </div>

            {!prefersReduced ? (
              <div className="w-48 h-1 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm">
                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 animate-slide-premium rounded-full" style={{ width: "40%" }} />
              </div>
            ) : (
              <div className="h-1 w-48 bg-white/10 rounded-full" />
            )}

            <div className="text-white/80 font-medium">{message}</div>
          </div>
        )}

        {variant === "progress" && (
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-white/90 mb-2">{finalBrand}</h3>
              <p className="text-white/60 text-sm">Crafting digital excellence</p>
            </div>

            <div className="w-full bg-white/5 rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between text-sm text-white/80 mb-3">
                <span>{message}</span>
                {showPercentage && <span className="font-bold text-white">{Math.min(100, Math.max(0, progress))}%</span>}
              </div>

              <div className="relative">
                <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out relative"
                    style={{
                      width: `${progress}%`,
                      background: color ? `linear-gradient(90deg, ${color}, ${color}dd)` : "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                    }}
                  >
                    {!prefersReduced && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-shine" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <span className="sr-only">Page is loading</span>

      <style>{`
        @keyframes spin-premium {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes logo-glow { 0% { transform: scale(1) rotate(0deg); box-shadow: 0 0 20px rgba(59,130,246,0.3);} 50% { transform: scale(1.05) rotate(5deg); box-shadow: 0 0 40px rgba(59,130,246,0.6);} 100% { transform: scale(1) rotate(0deg);} }
        @keyframes logo-3d { 0% { transform: perspective(1000px) rotateY(0deg) scale(0.9);} 50% { transform: perspective(1000px) rotateY(10deg) scale(1);} 100% { transform: perspective(1000px) rotateY(0deg) scale(0.9);} }
        @keyframes slide-premium { 0% { transform: translateX(-100%);} 100% { transform: translateX(250%);} }
        @keyframes shine { 0% { transform: translateX(-100%) skewX(-12deg);} 100% { transform: translateX(200%) skewX(-12deg);} }
        @keyframes orbit-1 { 0% { transform: rotate(0deg) translateX(20px) rotate(0deg);} 100% { transform: rotate(360deg) translateX(20px) rotate(-360deg);} }
        @keyframes orbit-2 { 0% { transform: rotate(0deg) translateX(15px) rotate(0deg);} 100% { transform: rotate(360deg) translateX(15px) rotate(-360deg);} }
        @keyframes float { 0%,100% { transform: translateY(0px) rotate(0deg);} 50% { transform: translateY(-20px) rotate(180deg);} }
        @keyframes pulse-slow { 0%,100% { opacity: 0.3; transform: scale(1);} 50% { opacity: 0.6; transform: scale(1.1);} }
        @keyframes pulse-slower { 0%,100% { opacity: 0.2; transform: scale(1);} 50% { opacity: 0.4; transform: scale(1.05);} }
        @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }

        .animate-spin-premium { animation: spin-premium 1.5s ease-in-out infinite; }
        .animate-logo-glow { animation: logo-glow 2s ease-in-out infinite; }
        .animate-logo-3d { animation: logo-3d 3s ease-in-out infinite; }
        .animate-slide-premium { animation: slide-premium 1.8s ease-in-out infinite; }
        .animate-shine { animation: shine 2s ease-in-out infinite; }
        .animate-orbit-1 { animation: orbit-1 3s linear infinite; }
        .animate-orbit-2 { animation: orbit-2 4s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 6s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
      `}</style>
    </div>
  );
}
