import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const SESSION_STORAGE_KEY = "ANGELO_PORTFOLIO_PRELOADER_V2";
let preloaderFinishedGlobal = false;

function isPreloaderAlreadySeen(): boolean {
  if (typeof window === "undefined") return false;
  if (preloaderFinishedGlobal) return true;
  try {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function Preloader() {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit" | "done">(() => {
    return isPreloaderAlreadySeen() ? "done" : "loading";
  });
  const [bootLine, setBootLine] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const bootLines = t.preloader.boot;

  useEffect(() => {
    if (phase === "done") return;

    if (isPreloaderAlreadySeen() || prefersReducedMotion()) {
      setProgress(100);
      setBootLine(bootLines.length - 1);
      setPhase("done");
      preloaderFinishedGlobal = true;
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      } catch {}
      return;
    }

    // Snappy fixed-duration timer (~750ms total animation)
    const DURATION = 750;
    const startTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / DURATION);
      
      // Smooth ease-out quad
      const eased = 1 - Math.pow(1 - rawProgress, 2);
      const currentProgress = Math.min(100, Math.floor(eased * 100));

      setProgress(currentProgress);
      setBootLine(
        Math.min(
          bootLines.length - 1,
          Math.floor((currentProgress / 100) * bootLines.length)
        )
      );

      if (rawProgress >= 1) {
        setProgress(100);
        setBootLine(bootLines.length - 1);
        preloaderFinishedGlobal = true;
        try {
          sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
        } catch {}
        
        window.setTimeout(() => setPhase("exit"), 150);
        return;
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [bootLines.length, phase]);

  useEffect(() => {
    if (phase === "exit") {
      const id = window.setTimeout(() => {
        setPhase("done");
      }, 400);
      return () => window.clearTimeout(id);
    }
  }, [phase]);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeProgress = (progress / 100) * circumference;

  if (phase === "done") return null;

  const isHidden = phase === "exit";

  return (
    <div
      ref={rootRef}
      aria-hidden={isHidden}
      role="status"
      aria-label={t.preloader.label}
      className={[
        "fixed inset-0 z-[200] flex flex-col items-center justify-center",
        "bg-bg-primary text-text-primary",
        "grid-lines",
        phase === "exit" ? "preloader-exit" : "",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Monogram self-draw */}
        <div className="relative mb-10 h-[120px] w-[120px]">
          <svg
            width="120"
            height="120"
            viewBox="0 0 88 88"
            fill="none"
            aria-label="Ângelo Miguel monogram"
            role="img"
            className="text-accent-teal"
          >
            <circle
              cx="44"
              cy="44"
              r={radius}
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.25"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - strokeProgress}
            />
            <path
              d="M28 60V28L44 50L60 28V60"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="preloader-draw"
              style={{ strokeDashoffset: `${1 - progress / 100}em` }}
            />
            <path
              d="M22 70H66"
              stroke="var(--color-accent-amber)"
              strokeWidth="2"
              strokeLinecap="round"
              className="preloader-draw"
              style={{ strokeDashoffset: `${1 - progress / 100}em` }}
            />
          </svg>

          {/* center counter */}
          <span className="absolute inset-0 flex items-center justify-center font-mono text-lg font-medium tracking-tight text-text-primary">
            {String(progress).padStart(2, "0")}
            <span className="text-text-hints">%</span>
          </span>
        </div>

        {/* terminal boot lines */}
        <div className="font-mono text-[11px] leading-relaxed text-text-secondary">
          {bootLines.map((line, i) => (
            <div
              key={i}
              className={[
                "transition-opacity duration-150",
                i <= bootLine ? "opacity-100" : "opacity-20",
              ].join(" ")}
            >
              <span className="text-text-hints mr-2">$</span>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
