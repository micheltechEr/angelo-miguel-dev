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
      {/* Accordion trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 transition-all duration-200 hover:opacity-80"
      >
        <span className="h-px flex-1 bg-border-subtle" />
        <span
          className={`label-uppercase text-accent-gold transition-colors duration-200 ${
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
          className={`text-accent-gold transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span className="h-px flex-1 bg-border-subtle" />
      </button>

      {/* Collapsible content with smooth height transition */}
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

export default function LandingPages() {
  const { t } = useLanguage();
  const niches = t.landingPages.niches;

  return (
    <section id="landing-pages" className="section-spacing px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="heading-section text-text-primary">
          {t.landingPages.title}
        </h2>

        {niches.map((niche, i) => (
          <AccordionItem key={i} name={niche.name} defaultOpen={i === 0}>
            {/* Sites grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {niche.sites.map((site, j) => (
                <a
                  key={j}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group rounded-[8px] border border-border-subtle ${site.accent} bg-bg-primary p-6 transition-all duration-200 hover:scale-[1.01] hover:border-t-2 hover:opacity-95`}
                >
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-teal transition-colors duration-200">
                    {site.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {site.description}
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <span className="inline-flex items-center gap-1 text-sm text-accent-teal transition-all duration-200 group-hover:underline">
                      Live
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </AccordionItem>
        ))}
      </div>
    </section>
  );
}
