import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";

function AccordionItem({
  name,
  defaultOpen = false,
  children,
}: {
  name: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div className="mt-8">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 transition-all duration-200 hover:opacity-80"
      >
        <span className="h-px flex-1 bg-border-subtle" />
        <span
          className={`label-uppercase text-accent-amber transition-colors duration-200 ${
            open ? "text-accent-teal" : ""
          }`}
        >
          {name}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-accent-amber transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span className="h-px flex-1 bg-border-subtle" />
      </button>

      <div
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: open ? contentHeight : 0 }}
      >
        <div ref={contentRef} className="pt-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ServicesByNiche() {
  const { t } = useLanguage();
  const { niches, structures } = t.servicesByNiche;

  return (
    <section id="services-by-niche" className="section-spacing px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="heading-section text-text-primary text-center sm:text-left">
          {t.servicesByNiche.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary text-center sm:text-left">
          {t.servicesByNiche.description}
        </p>

        {niches.map((niche, i) => (
          <AccordionItem key={niche.name} name={niche.name} defaultOpen={i === 0}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div
                className={`rounded-[8px] border border-border-subtle ${niche.accent} bg-bg-primary p-6`}
              >
                <h3 className="text-lg font-semibold text-text-primary">
                  {structures.standard.name}
                </h3>
                <ul className="mt-3 space-y-2">
                  {structures.standard.characteristics.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="mt-0.5 text-accent-teal shrink-0">✓</span>
                      {c}
                    </li>
                  ))}
                </ul>
                {niche.sites && (
                  <div className="mt-5 flex flex-col gap-2">
                    {niche.sites.map((site) => (
                      <a
                        key={site.name}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-accent-teal transition-all duration-200 hover:underline"
                      >
                        {site.name}
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13 v6 a2 2 0 0 1 -2 2 H5 a2 2 0 0 1 -2 -2 V8 a2 2 0 0 1 2 -2 h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div
                className={`rounded-[8px] border border-border-subtle ${niche.accent} bg-bg-primary p-6`}
              >
                <h3 className="text-lg font-semibold text-text-primary">
                  {structures.custom.name}
                </h3>
                <ul className="mt-3 space-y-2">
                  {structures.custom.characteristics.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="mt-0.5 text-accent-amber shrink-0">✦</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AccordionItem>
        ))}

        {t.servicesByNiche.cta && (
          <div className="mt-16 text-center">
            <p className="text-sm leading-relaxed text-text-secondary whitespace-pre-line">
              {t.servicesByNiche.cta.message}
            </p>
            <a
              href={`https://wa.me/${t.servicesByNiche.cta.whatsapp}?text=${encodeURIComponent(t.servicesByNiche.cta.whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-[8px] bg-accent-teal px-6 py-3 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-teal/90 hover:scale-[1.02]"
            >
              {t.servicesByNiche.cta.button}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13 v6 a2 2 0 0 1 -2 2 H5 a2 2 0 0 1 -2 -2 V8 a2 2 0 0 1 2 -2 h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
