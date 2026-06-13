import { useLanguage } from "../i18n/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  const projects = t.projects.cards;

  // projects[0] = large (NIDUS), projects[1] = small (CREATOR HUB), projects[2] = small (AUTO MATCH)
  const mainProject = projects[0];
  const secondaryProject = projects[1];
  const thirdProject = projects[2];

  return (
    <section id="projects" className="section-spacing px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="heading-section text-text-primary">
          {t.projects.title}
        </h2>

        {/* 60/40 grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-[1.6fr_1fr]">
          {/* Main project — NIDUS (teal, 60%) */}
          <a
            href="#nidus-decisions"
            className={`group rounded-[8px] border border-border-subtle ${mainProject.accent} bg-bg-primary p-8 transition-all duration-200 hover:scale-[1.01] hover:border-t-2 hover:opacity-95`}
          >
            <span className="label-uppercase text-text-hints">
              {mainProject.subtitle}
            </span>
            <h3 className="mt-3 text-[clamp(20px,2vw,26px)] font-semibold text-text-primary">
              {mainProject.title}
              {mainProject.status && (
                <span className="ml-3 inline-block align-middle rounded-full bg-accent-teal/15 px-3 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-teal">
                  {mainProject.status}
                </span>
              )}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {mainProject.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {mainProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[4px] bg-white/5 px-2 py-0.5 text-xs font-mono text-text-hints"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="inline-flex items-center gap-1 text-sm text-accent-teal transition-all duration-200 group-hover:underline">
                {mainProject.linkLabel}
                <span aria-hidden="true" className="text-sm">&rarr;</span>
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-text-hints transition-all duration-200 hover:text-accent-indigo">
                GitHub
              </span>
            </div>
          </a>

          {/* Secondary project — CREATOR HUB (indigo, 40%) */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => { window.location.hash = "creatorhub-decisions"; }}
            onKeyDown={(e) => { if (e.key === "Enter") window.location.hash = "creatorhub-decisions"; }}
            className={`group cursor-pointer rounded-[8px] border border-border-subtle ${secondaryProject.accent} bg-bg-primary p-6 transition-all duration-200 hover:scale-[1.01] hover:border-t-2 hover:opacity-95`}
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
            <div className="mt-4 flex flex-wrap gap-2">
              {secondaryProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[4px] bg-white/5 px-2 py-0.5 text-xs font-mono text-text-hints"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-4">
              <span className="inline-flex items-center gap-1 text-sm text-accent-indigo transition-all duration-200 group-hover:underline">
                {secondaryProject.linkLabel}
                <span aria-hidden="true" className="text-sm">&rarr;</span>
              </span>
              {secondaryProject.liveUrl && (
                <a
                  href={secondaryProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-text-hints transition-all duration-200 hover:text-accent-indigo"
                >
                  Live
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Third project — AUTO MATCH (gold, full width) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => { window.location.hash = "auto-match-decisions"; }}
          onKeyDown={(e) => { if (e.key === "Enter") window.location.hash = "auto-match-decisions"; }}
          className={`group mt-6 cursor-pointer rounded-[8px] border border-border-subtle ${thirdProject.accent} bg-bg-primary p-6 transition-all duration-200 hover:scale-[1.01] hover:border-t-2 hover:opacity-95`}
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
          <div className="mt-4 flex flex-wrap gap-2">
            {thirdProject.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[4px] bg-white/5 px-2 py-0.5 text-xs font-mono text-text-hints"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-sm text-accent-gold transition-all duration-200 group-hover:underline">
              {thirdProject.linkLabel}
              <span aria-hidden="true" className="text-sm">&rarr;</span>
            </span>
            {thirdProject.liveUrl && (
              <a
                href={thirdProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-text-hints transition-all duration-200 hover:text-accent-gold"
              >
                Live
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}