import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";
import { trackClickEvent } from "../utils/analytics";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20">
      {/* Cyber Grid background */}
      <div className="absolute inset-0 cyber-grid pointer-events-none" />

      {/* Ambient orbs */}
      <div className="glow-orb glow-orb-primary absolute -top-40 -left-40 h-[600px] w-[600px]" />
      <div className="glow-orb glow-orb-secondary absolute -bottom-40 -right-40 h-[600px] w-[600px]" />

      <div className="relative z-10 max-width-readable text-center">
        {/* Monogram HUD */}
        <div className="relative mb-10 flex justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Outer rotating mechanical ring */}
            <div className="h-[104px] w-[104px] rounded-full border border-dashed border-accent-teal/25 animate-[spin_30s_linear_infinite]" />
            {/* Middle decorative ring */}
            <div className="h-[94px] w-[94px] rounded-full border border-accent-teal/5" />
            {/* Pulsing glow behind */}
            <div className="h-20 w-20 rounded-full bg-accent-teal/5 blur-xl animate-pulse" />
          </div>

          <svg
            width="88"
            height="88"
            viewBox="0 0 88 88"
            fill="none"
            aria-label="Ângelo Miguel monogram"
            role="img"
            className="relative z-10 text-accent-teal hover:scale-105 transition-transform duration-300"
          >
            <circle cx="44" cy="44" r="42" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="44" cy="44" r="38" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />
            <path
              d="M28 60V28L44 50L60 28V60"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M22 70H66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </svg>
        </div>

        <Reveal as="div">
          <p className="label-uppercase text-accent-teal">{t.hero.tagline}</p>
        </Reveal>

        <Reveal as="div" delay={80}>
          <h1 className="heading-xl mt-5 text-text-primary">
            {t.hero.name}
          </h1>
        </Reveal>

        <Reveal as="div" delay={160}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
            {t.hero.description}
          </p>
        </Reveal>

        {/* Telemetry Status Bar */}
        <Reveal as="div" delay={200}>
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-[6px] border border-border-subtle bg-bg-secondary/40 px-6 py-2.5 font-mono text-[10px] text-text-hints backdrop-blur-md max-w-xl">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-text-secondary">SYSTEM:</span> READY
            </div>
            <span className="hidden text-border-strong sm:inline">|</span>
            <div>
              <span className="text-text-secondary">LOC:</span> BA // BR
            </div>
            <span className="hidden text-border-strong sm:inline">|</span>
            <div>
              <span className="text-text-secondary">ENGINE:</span> DOCKER // NODE
            </div>
            <span className="hidden text-border-strong sm:inline">|</span>
            <div>
              <span className="text-text-secondary">PING:</span> 12MS
            </div>
          </div>
        </Reveal>

        <Reveal as="div" delay={280}>
          <div className="mx-auto my-9 h-px w-20 hairline" />
        </Reveal>

        <Reveal as="div" delay={340}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-[6px] bg-accent-teal px-6 py-3 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-teal/90 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(31,224,182,0.3)] active:scale-[0.97]"
            >
              {t.hero.ctaProjects}
              <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              href="/ANGELO_MIGUEL_RIBEIRO_CERQUEIRA_LIMA.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClickEvent("click_cv", { location: "hero" })}
              className="inline-flex items-center gap-1.5 rounded-[6px] border border-border-strong px-5 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent-teal hover:text-accent-teal active:scale-[0.97]"
            >
              {t.hero.ctaCvView}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13 v6 a2 2 0 0 1 -2 2 H5 a2 2 0 0 1 -2 -2 V8 a2 2 0 0 1 2 -2 h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-text-hints" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </section>
  );
}
