import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

export default function Projects() {
  const { t } = useLanguage();
  const projects = t.projects.cards;

  const mainProject = projects[0];
  const secondaryProject = projects[1];
  const thirdProject = projects[2];

  return (
    <section id="projects" className="section-spacing px-6 relative overflow-hidden bg-bg-primary">
      {/* Dynamic light orb */}
      <div className="glow-orb glow-orb-primary absolute top-1/2 -left-80 h-[600px] w-[600px]" />
      
      <div className="mx-auto max-w-5xl relative z-10">
        <Reveal>
          <p className="label-uppercase text-accent-teal text-center sm:text-left">02 — Selected work</p>
          <h2 className="heading-section mt-3 text-text-primary text-center sm:text-left">
            {t.projects.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <a
              href="#nidus-decisions"
              className={`tech-card group flex h-full flex-col rounded-[8px] border-l-2 border-l-accent-teal p-8 text-center sm:text-left`}
            >
              <span className="label-uppercase text-text-hints">
                {mainProject.subtitle}
              </span>
              <h3 className="mt-3 text-[clamp(22px,2.4vw,30px)] font-semibold text-text-primary flex items-center justify-center sm:justify-start gap-3">
                {mainProject.title}
                {mainProject.status && (
                  <span className="inline-flex items-center rounded-full bg-accent-teal/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-accent-teal border border-accent-teal/15 animate-pulse">
                    <span className="h-1 w-1 rounded-full bg-accent-teal mr-1.5" />
                    {mainProject.status}
                  </span>
                )}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {mainProject.description}
              </p>
              
              <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-2">
                {mainProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[4px] border border-border-subtle bg-bg-secondary px-2.5 py-0.5 text-[11px] font-mono text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-center sm:justify-start gap-4 pt-8">
                <span className="inline-flex items-center gap-1 text-sm text-accent-teal transition-all duration-200 group-hover:gap-2 font-medium">
                  {mainProject.linkLabel}
                  <span aria-hidden="true">&rarr;</span>
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-text-hints transition-colors duration-200 group-hover:text-accent-violet">
                  GitHub
                </span>
              </div>
            </a>
          </Reveal>

          <Reveal delay={90}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => { window.location.hash = "creatorhub-decisions"; }}
              onKeyDown={(e) => { if (e.key === "Enter") window.location.hash = "creatorhub-decisions"; }}
              className={`tech-card group flex h-full cursor-pointer flex-col rounded-[8px] border-l-2 border-l-accent-violet p-6 text-center sm:text-left`}
            >
              <span className="label-uppercase text-text-hints">
                {secondaryProject.subtitle}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-text-primary">
                {secondaryProject.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {secondaryProject.description}
              </p>
              
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                {secondaryProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[4px] border border-border-subtle bg-bg-secondary px-2 py-0.5 text-[11px] font-mono text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="mt-auto flex items-center justify-center sm:justify-start gap-4 pt-6">
                <span className="inline-flex items-center gap-1 text-sm text-accent-violet transition-all duration-200 group-hover:gap-2 font-medium">
                  {secondaryProject.linkLabel}
                  <span aria-hidden="true">&rarr;</span>
                </span>
                {secondaryProject.liveUrl && (
                  <a
                    href={secondaryProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-sm text-text-hints transition-colors duration-200 hover:text-accent-violet"
                  >
                    Live
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13 v6 a2 2 0 0 1 -2 2 H5 a2 2 0 0 1 -2 -2 V8 a2 2 0 0 1 2 -2 h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => { window.location.hash = "auto-match-decisions"; }}
            onKeyDown={(e) => { if (e.key === "Enter") window.location.hash = "auto-match-decisions"; }}
            className={`tech-card group mt-6 flex cursor-pointer flex-col rounded-[8px] border-l-2 border-l-accent-teal p-6 text-center sm:text-left`}
          >
            <span className="label-uppercase text-text-hints">
              {thirdProject.subtitle}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-text-primary">
              {thirdProject.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {thirdProject.description}
            </p>
            
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
              {thirdProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[4px] border border-border-subtle bg-bg-secondary px-2 py-0.5 text-[11px] font-mono text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-5 flex items-center justify-center sm:justify-start gap-4">
              <span className="inline-flex items-center gap-1 text-sm text-accent-teal transition-all duration-200 group-hover:gap-2 font-medium">
                {thirdProject.linkLabel}
                <span aria-hidden="true">&rarr;</span>
              </span>
              {thirdProject.liveUrl && (
                <a
                  href={thirdProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-text-hints transition-colors duration-200 hover:text-accent-teal"
                  onClick={(e) => e.stopPropagation()}
                >
                  Live
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13 v6 a2 2 0 0 1 -2 2 H5 a2 2 0 0 1 -2 -2 V8 a2 2 0 0 1 2 -2 h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
