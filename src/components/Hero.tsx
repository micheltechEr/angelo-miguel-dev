import { useLanguage } from "../i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 pb-16">
      <div className="max-width-readable text-center">
        {/* Avatar — minimalist square with initials */}
        <div
          className="mx-auto mb-10 flex h-20 w-20 items-center justify-center border-2 border-accent-teal bg-transparent text-xl font-bold tracking-widest text-accent-teal"
          aria-label="Ângelo Miguel avatar"
          role="img"
        >
          AM
        </div>

        {/* Name — weight 700, dense */}
        <h1 className="heading-xl text-text-primary">
          {t.hero.name}
        </h1>

        {/* Tagline */}
        <p className="label-uppercase mt-4 text-accent-teal">
          {t.hero.tagline}
        </p>

        {/* Value proposition */}
        <p className="mt-8 text-base leading-relaxed text-text-secondary md:text-base">
          {t.hero.description}
        </p>

        {/* Visual separator */}
        <div className="mx-auto mt-10 h-px w-16 bg-accent-teal/60" />

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex items-center rounded-[8px] border border-accent-teal bg-accent-teal px-6 py-3 text-sm font-medium text-bg-primary transition-all duration-200 hover:bg-accent-teal/90 active:scale-[0.96]"
          >
            {t.hero.ctaProjects}
          </a>

          {/* View CV */}
          <a
            href="/ANGELO_MIGUEL_RIBEIRO_CERQUEIRA_LIMA.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[8px] border border-border-subtle px-5 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent-teal hover:text-accent-teal active:scale-[0.96]"
          >
            {t.hero.ctaCvView}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}