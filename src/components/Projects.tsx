import { useLanguage } from "../i18n/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  const projects = t.projects.cards;

  // projects[0] = large (NIDUS), projects[1] = small (CREATOR HUB)
  const mainProject = projects[0];
  const secondaryProject = projects[1];

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
          <a
            href="#creatorhub-decisions"
            className={`group rounded-[8px] border border-border-subtle ${secondaryProject.accent} bg-bg-primary p-6 transition-all duration-200 hover:scale-[1.01] hover:border-t-2 hover:opacity-95`}
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
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}