import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

// Prevents loading overlay re-triggering during SPA state/language updates
let preloaderFinishedGlobal = false;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function Preloader() {
  const { t, language } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit" | "done">(() => {
    return preloaderFinishedGlobal ? "done" : "loading";
  });
  const [bootLine, setBootLine] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const bootLines = t.preloader.boot;

  useEffect(() => {
    if (phase === "done") return;

    const reduced = prefersReducedMotion();

    if (reduced) {
      setProgress(100);
      setBootLine(bootLines.length - 1);
      const id = window.setTimeout(() => setPhase("exit"), 250);
      return () => window.clearTimeout(id);
    }

    let raf = 0;
    let current = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const elapsed = now - last;
      last = now;
      // Slower boot animation step: 0.018 -> 0.009
      const step = Math.max(0.3, (100 - current) * 0.009);
      const jitter = Math.random() * 0.9;
      current = Math.min(100, current + step + jitter * (elapsed / 16));
      setProgress(Math.floor(current));
      setBootLine(Math.min(bootLines.length - 1, Math.floor((current / 100) * bootLines.length)));
      if (current >= 100) {
        setProgress(100);
        setBootLine(bootLines.length - 1);
        window.setTimeout(() => setPhase("exit"), 600);
        return;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [bootLines, language, phase]);

  useEffect(() => {
    if (phase === "exit") {
      const id = window.setTimeout(() => {
        setPhase("done");
        preloaderFinishedGlobal = true;
      }, 1000);
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
                "transition-opacity duration-300 sm:text-xs",
                i <= bootLine ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              <span className="text-accent-teal">&gt;</span> {line}
            </div>
          ))}
        </div>

        {/* progress bar — brand gradient */}
        <div className="mt-7 h-[2px] w-44 overflow-hidden rounded-full bg-border-subtle">
          <div
            className="h-full rounded-full preloader-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-text-hints">
          {t.preloader.tagline}
        </p>
      </div>
    </div>
  );
}
