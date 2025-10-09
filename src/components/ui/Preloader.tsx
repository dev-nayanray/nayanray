import { useEffect, useState, useRef } from "react";

type Variant = "spinner" | "logo" | "progress" | "modern" | "elegant" | "circular" | "steps" | "morphing";

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
  stepCount?: number;
  currentStep?: number;
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
  stepCount = 4,
  currentStep = 1,
}: PreloaderProps) {
  const [mountedAt] = useState(Date.now());
  const [show, setShow] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logoError, setLogoError] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>
  >([]);
  const [morphProgress, setMorphProgress] = useState(0);

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
  const defaultLogo = envLogo || "/nayan.svg"; // public/nayan.svg served at /nayan.svg
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
    if (variant !== "progress" && variant !== "modern" && variant !== "elegant" && variant !== "circular" && variant !== "steps" && variant !== "morphing") return;
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

  // Morphing progress animation
  useEffect(() => {
    if (variant !== "morphing") return;
    
    let animationFrame: number;
    let startTime: number | null = null;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / 3000, 1); // 3 second animation
      
      setMorphProgress(progress * 100);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [variant]);

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

  // Calculate step progress
  const stepProgress = currentStep / stepCount * 100;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={show}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-2xl transition-all duration-700 ${
        exiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)' 
        }} />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:60px_60px] animate-grid-flow" />
        
        {/* Floating Particles */}
        {!prefersReduced &&
          particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
              style={{
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animation: `float ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
                filter: 'blur(1px)',
              }}
            />
          ))}

        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-violet-500/10 rounded-full blur-2xl animate-pulse-slower" />
        <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-pulse-medium" />
      </div>

      {/* Main Content Container with Glass Morphism */}
      <div className="relative z-10 w-full max-w-lg px-8">
        <div className="glass-effect rounded-3xl p-8 shadow-2xl border border-white/10 dark:bg-gray-900/80 dark:border-gray-700/50 dark:shadow-black/30">
          {(variant === "modern" || variant === "elegant") && (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative mb-4">
                <div className="relative">
                  {finalLogo && !logoError ? (
                    <img
                      src={finalLogo}
                      alt="Brand logo"
                      onError={() => setLogoError(true)}
                      className={`w-28 h-28 object-contain rounded-2xl shadow-2xl transform ${
                        prefersReduced ? "" : "animate-logo-glow"
                      }`}
                      style={gradientStyle}
                    />
                  ) : (
                    <div
                      className={`w-28 h-28 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-3xl font-bold text-white shadow-2xl ${
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
                <h2 className={`text-xl font-semibold text-gray-900 dark:text-white ${prefersReduced ? "" : "animate-fade-in"}`} style={{ animationDelay: "0.3s" }}>{finalBrand}</h2>
                <p className={`text-sm text-gray-600 dark:text-gray-300 mt-1 ${prefersReduced ? "" : "animate-fade-in"}`} style={{ animationDelay: "0.5s" }}>Premium Web Solutions</p>
              </div>

              <div className="w-full max-w-xs">
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-2">
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

          {/* NEW: Circular Progress Variant */}
          {variant === "circular" && (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      stroke={color || "url(#circularGradient)"} 
                      strokeWidth="8" 
                      fill="none"
                      strokeDasharray={`${progress * 2.83} 283`}
                      strokeLinecap="round"
                      className="transition-all duration-500 ease-out"
                    />
                    <defs>
                      <linearGradient id="circularGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-white font-bold text-xl">{progress}%</span>
                    <span className="text-white/60 text-xs mt-1">Complete</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold text-white/90 mb-2">{finalBrand}</h2>
                <p className="text-white/60 text-sm mb-4">{message}</p>
              </div>

              {!prefersReduced && (
                <div className="flex gap-1 mt-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* NEW: Steps Progress Variant */}
          {variant === "steps" && (
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-white/90 mb-2">{finalBrand}</h2>
                <p className="text-white/60 text-sm">Premium Web Solutions</p>
              </div>

              <div className="w-full max-w-md">
                <div className="flex justify-between mb-8 relative">
                  {/* Connection lines */}
                  <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/10 -z-10"></div>
                  <div 
                    className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 -z-10 transition-all duration-500"
                    style={{ width: `${stepProgress}%` }}
                  ></div>

                  {/* Steps */}
                  {Array.from({ length: stepCount }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                          index < currentStep 
                            ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30" 
                            : index === currentStep
                            ? "bg-white/20 text-white border-2 border-white/40"
                            : "bg-white/10 text-white/40"
                        }`}
                      >
                        {index < currentStep ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span 
                        className={`text-xs mt-2 transition-all duration-300 ${
                          index < currentStep 
                            ? "text-white font-medium" 
                            : "text-white/40"
                        }`}
                      >
                        Step {index + 1}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-white/70 text-sm mb-4">{message}</p>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Progress</span>
                    <span className="font-medium">{Math.round(stepProgress)}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-2 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${stepProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NEW: Morphing Progress Variant */}
          {variant === "morphing" && (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative mb-6">
                <div className="relative w-40 h-40">
                  {/* Morphing SVG Shape */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                    
                    {/* Animated morphing path */}
                    <path
                      d={`
                        M ${20 + 60 * (morphProgress / 100)} ${20 + 60 * Math.sin(morphProgress / 100 * Math.PI)}
                        C ${40 + 40 * Math.cos(morphProgress / 100 * Math.PI)} ${30 + 50 * Math.sin(morphProgress / 100 * Math.PI)},
                        ${60 + 30 * Math.sin(morphProgress / 100 * Math.PI)} ${70 + 20 * Math.cos(morphProgress / 100 * Math.PI)},
                        ${80 + 10 * Math.cos(morphProgress / 100 * Math.PI)} ${90 - 60 * (morphProgress / 100)}
                      `}
                      fill="url(#morphGradient)"
                      opacity="0.8"
                      className="transition-all duration-1000 ease-out"
                    />
                    
                    {/* Outer progress ring */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="url(#morphGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${morphProgress * 2.83} 283`}
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                  
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-white font-bold text-2xl">{Math.round(morphProgress)}%</span>
                    <span className="text-white/60 text-xs mt-1">Processing</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold text-white/90 mb-2">{finalBrand}</h2>
                <p className="text-white/60 text-sm mb-4">{message}</p>
              </div>

              <div className="w-full max-w-xs">
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>Transforming</span>
                  <span className="font-medium">{Math.round(morphProgress)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${morphProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shine"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <span className="sr-only">Page is loading</span>

      <style>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
        }

        @keyframes spin-premium {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes logo-glow { 
          0% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 20px rgba(59,130,246,0.3));} 
          50% { transform: scale(1.05) rotate(5deg); filter: drop-shadow(0 0 40px rgba(59,130,246,0.6));} 
          100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 20px rgba(59,130,246,0.3));} 
        }
        @keyframes logo-3d { 
          0% { transform: perspective(1000px) rotateY(0deg) scale(0.9);} 
          50% { transform: perspective(1000px) rotateY(10deg) scale(1);} 
          100% { transform: perspective(1000px) rotateY(0deg) scale(0.9);} 
        }
        @keyframes slide-premium { 
          0% { transform: translateX(-100%);} 
          100% { transform: translateX(250%);} 
        }
        @keyframes shine { 
          0% { transform: translateX(-100%) skewX(-12deg);} 
          100% { transform: translateX(200%) skewX(-12deg);} 
        }
        @keyframes orbit-1 { 
          0% { transform: rotate(0deg) translateX(20px) rotate(0deg);} 
          100% { transform: rotate(360deg) translateX(20px) rotate(-360deg);} 
        }
        @keyframes orbit-2 { 
          0% { transform: rotate(0deg) translateX(15px) rotate(0deg);} 
          100% { transform: rotate(360deg) translateX(15px) rotate(-360deg);} 
        }
        @keyframes float { 
          0%,100% { transform: translateY(0px) rotate(0deg);} 
          50% { transform: translateY(-20px) rotate(180deg);} 
        }
        @keyframes pulse-slow { 
          0%,100% { opacity: 0.3; transform: scale(1);} 
          50% { opacity: 0.6; transform: scale(1.1);} 
        }
        @keyframes pulse-slower { 
          0%,100% { opacity: 0.2; transform: scale(1);} 
          50% { opacity: 0.4; transform: scale(1.05);} 
        }
        @keyframes pulse-medium { 
          0%,100% { opacity: 0.2; transform: scale(1);} 
          50% { opacity: 0.5; transform: scale(1.08);} 
        }
        @keyframes fade-in { 
          0% { opacity: 0; transform: translateY(10px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }
        @keyframes grid-flow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .animate-spin-premium { animation: spin-premium 1.5s ease-in-out infinite; }
        .animate-logo-glow { animation: logo-glow 2s ease-in-out infinite; }
        .animate-logo-3d { animation: logo-3d 3s ease-in-out infinite; }
        .animate-slide-premium { animation: slide-premium 1.8s ease-in-out infinite; }
        .animate-shine { animation: shine 2s ease-in-out infinite; }
        .animate-orbit-1 { animation: orbit-1 3s linear infinite; }
        .animate-orbit-2 { animation: orbit-2 4s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 6s ease-in-out infinite; }
        .animate-pulse-medium { animation: pulse-medium 5s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
        .animate-grid-flow { animation: grid-flow 20s linear infinite; }
      `}</style>
    </div>
  );
}