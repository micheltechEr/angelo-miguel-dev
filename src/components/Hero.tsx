import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";
import { trackClickEvent } from "../utils/analytics";

export default function Hero() {
  const { t, language } = useLanguage();

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
            <circle cx="44" cy="44" r="42" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx="44" cy="44" r="38" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
            <path
              d="M34 58 L44 26 L54 58"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M37.5 48 H50.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M26 62 L32 26 L44 46 L56 26 L62 62"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.3"
            />
          </svg>
        </div>

        {/* Live Status Badge */}
        <Reveal as="div" delay={80}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-card/90 px-3.5 py-1.5 font-mono text-xs text-text-secondary shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-teal"></span>
            </span>
            <span>
              {language === "en" ? "AVAILABLE FOR HIGH-IMPACT PROJECTS" : "DISPONÍVEL PARA PROJETOS DE ALTO IMPACTO"}
            </span>
            <span className="text-border-strong">|</span>
            <span className="text-text-hints">BA / BR</span>
          </div>
        </Reveal>

        {/* Title & Tagline */}
        <Reveal delay={120}>
          <h1 className="heading-hero text-text-primary">
            {t.hero.name}
          </h1>
          <p className="mt-2 font-mono text-sm font-semibold tracking-wider text-accent-teal uppercase">
            {t.hero.tagline}
          </p>
        </Reveal>

        {/* Subtitle / Description */}
        <Reveal delay={180}>
          <p className="body-large mx-auto mt-6 max-w-xl text-text-secondary">
            {t.hero.description}
          </p>
        </Reveal>

        {/* Architecture & Performance HUD */}
        <Reveal as="div" delay={240}>
          <div className="mx-auto mt-7 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-text-hints">
            <div className="flex items-center gap-1.5 rounded-[4px] border border-border-subtle bg-bg-card/60 px-2.5 py-1">
              <span className="text-accent-teal font-semibold">0.00 CLS</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-[4px] border border-border-subtle bg-bg-card/60 px-2.5 py-1">
              <span className="text-accent-teal font-semibold">99+ PAGESPEED</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-[4px] border border-border-subtle bg-bg-card/60 px-2.5 py-1">
              <span className="text-text-secondary">STACK:</span> REACT 19 // VITE // TAILWIND 4
            </div>
            <div className="flex items-center gap-1.5 rounded-[4px] border border-border-subtle bg-bg-card/60 px-2.5 py-1">
              <span className="text-text-secondary">EDGE:</span> VERCEL
            </div>
          </div>
        </Reveal>

        <Reveal as="div" delay={280}>
          <div className="mx-auto my-9 h-px w-20 hairline" />
        </Reveal>

        {/* CTAs: Primary + Pure Architectural Outline */}
        <Reveal as="div" delay={340}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#vercel-showcase"
              className="inline-flex items-center gap-2 rounded-[4px] bg-accent-teal px-6 py-3 font-mono text-xs font-bold text-bg-primary transition-all duration-200 hover:bg-accent-teal/90 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,242,254,0.35)] active:scale-[0.98]"
            >
              <span>{t.hero.ctaProjects}</span>
              <span aria-hidden="true">&rarr;</span>
            </a>

            <a
              href={`https://wa.me/5575988428289?text=${encodeURIComponent(
                language === "en"
                  ? "Hi Angelo! I'd like to discuss a new software / landing page project."
                  : "Olá Ângelo! Gostaria de falar sobre um projeto de desenvolvimento / landing page."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClickEvent("click_whatsapp", { location: "hero_primary" })}
              className="inline-flex items-center gap-2 rounded-[4px] border-[1.5px] border-text-primary px-5 py-3 font-mono text-xs font-semibold text-text-primary transition-all duration-200 hover:bg-text-primary hover:text-bg-primary active:scale-[0.98]"
            >
              <span>{language === "en" ? "Direct WhatsApp" : "Chamar no WhatsApp"}</span>
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="https://www.linkedin.com/in/angelo-miguel-rib-cerq/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClickEvent("click_linkedin", { location: "hero" })}
              className="inline-flex items-center gap-1.5 rounded-[4px] border-[1.5px] border-border-strong px-4 py-3 font-mono text-xs font-medium text-text-secondary transition-all duration-200 hover:border-text-primary hover:text-text-primary active:scale-[0.98]"
            >
              <span>LinkedIn</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13 v6 a2 2 0 0 1 -2 2 H5 a2 2 0 0 1 -2 -2 V8 a2 2 0 0 1 2 -2 h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
