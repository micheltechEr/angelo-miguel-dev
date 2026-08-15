import { useLanguage } from "../i18n/LanguageContext";

export default function SolucoesHero() {
  const { t } = useLanguage();
  const s = t.solucoes;

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center px-6 pt-24 pb-16">
      {/* Subtle badge */}
      <span className="label-uppercase mb-6 inline-block rounded-full border border-border-subtle px-4 py-1.5 text-[11px] text-accent-amber">
        {s.badge}
      </span>

      <div className="max-width-readable text-center">
        <h1 className="heading-xl text-text-primary">
          {s.title}
        </h1>

        <p className="label-uppercase mt-4 text-accent-teal">
          {s.subtitle}
        </p>

        <p className="mt-8 text-base leading-relaxed text-text-secondary md:text-base">
          {s.description}
        </p>

        <div className="mx-auto mt-10 h-px w-16 bg-accent-teal/60" />

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={`https://wa.me/${t.servicesByNiche.cta.whatsapp}?text=${encodeURIComponent(t.servicesByNiche.cta.whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[8px] bg-accent-teal px-6 py-3 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-teal/90 active:scale-[0.96]"
          >
            {s.ctaWhatsapp}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13 v6 a2 2 0 0 1 -2 2 H5 a2 2 0 0 1 -2 -2 V8 a2 2 0 0 1 2 -2 h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <a
            href="#diferenciais-solucoes"
            className="inline-flex items-center gap-1.5 rounded-[8px] border border-border-subtle px-5 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent-teal hover:text-accent-teal active:scale-[0.96]"
          >
            {s.ctaServices}
            <span aria-hidden="true">&darr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
