import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

export default function TechnicalDepth() {
  const { t } = useLanguage();
  const areas = t.technicalDepth.areas;

  const large = areas[0];
  const mediums = areas.slice(1, 4);
  const full = areas[4];

  return (
    <section id="depth" className="bg-bg-secondary section-spacing px-6 relative overflow-hidden">
      {/* Subtle grid background layer */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="glow-orb glow-orb-secondary absolute bottom-10 -right-80 h-[500px] w-[500px]" />

      <div className="mx-auto max-w-5xl relative z-10">
        <Reveal>
          <p className="label-uppercase text-accent-teal text-center sm:text-left">03 — Capabilities</p>
          <h2 className="heading-section mt-3 text-text-primary text-center sm:text-left">
            {t.technicalDepth.title}
          </h2>
        </Reveal>

        <div className="mt-12 space-y-6">
          <Reveal as="article">
            <article
              className={`tech-card rounded-[8px] p-8 border-l-2 border-l-accent-teal`}
            >
              <h3 className="label-uppercase text-accent-teal text-center sm:text-left">
                {large.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {large.items.map((item, j) => (
                  <li key={j} className="text-sm leading-relaxed text-text-secondary">
                    <span className="font-semibold text-text-primary">{item.split(" (")[0]}</span>
                    {item.includes(" (") && <span className="text-text-hints"> ({item.split(" (")[1]}</span>}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {mediums.map((area, i) => (
              <Reveal as="article" key={i} delay={i * 80}>
                <article
                  className={`tech-card h-full rounded-[8px] p-6 border-l-2 ${
                    i === 0 ? "border-l-accent-violet" : i === 1 ? "border-l-accent-teal" : "border-l-accent-violet"
                  }`}
                >
                  <h3 className={`label-uppercase text-center sm:text-left ${
                    i === 0 ? "text-accent-violet" : i === 1 ? "text-accent-teal" : "text-accent-violet"
                  }`}>
                    {area.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {area.items.map((item, j) => (
                      <li key={j} className="text-sm text-text-secondary">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal as="article" delay={100}>
            <article
              className={`tech-card rounded-[8px] p-8 border-l-2 border-l-accent-violet`}
            >
              <h3 className="label-uppercase text-accent-violet text-center sm:text-left">
                {full.title}
              </h3>
              <ul className="mt-5 space-y-3 md:columns-2 md:gap-x-8">
                {full.items.map((item, j) => (
                  <li key={j} className="text-sm leading-relaxed text-text-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
