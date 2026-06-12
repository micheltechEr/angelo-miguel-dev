import { useLanguage } from "../i18n/LanguageContext";

export default function TechnicalDepth() {
  const { t } = useLanguage();
  const areas = t.technicalDepth.areas;

  // areas[0] = large (Architecture, teal)
  // areas[1] = medium (Backend, gold)
  // areas[2] = medium (Security, indigo)
  // areas[3] = medium (Frontend, gold)
  // areas[4] = full (DB/IA, indigo)
  const large = areas[0];
  const mediums = areas.slice(1, 4);
  const full = areas[4];

  return (
    <section className="bg-bg-secondary section-spacing px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="heading-section text-text-primary">
          {t.technicalDepth.title}
        </h2>

        <div className="mt-12 space-y-6">
          {/* Large card — Architecture Patterns (teal) */}
          <article
            className={`rounded-[8px] border border-border-subtle ${large.accent} bg-bg-primary p-8 transition-all duration-200 hover:scale-[1.01] hover:opacity-95`}
          >
            <h3 className="label-uppercase text-accent-teal">
              {large.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {large.items.map((item, j) => (
                <li key={j} className="text-sm leading-relaxed text-text-secondary">
                  <span className="font-medium text-text-primary">{item.split(" (")[0]}</span>
                  {item.includes(" (") && <span> ({item.split(" (")[1]}</span>}
                </li>
              ))}
            </ul>
          </article>

          {/* Three medium cards — Backend + Security + Frontend */}
          <div className="grid gap-6 md:grid-cols-3">
            {mediums.map((area, i) => (
              <article
                key={i}
                className={`rounded-[8px] border border-border-subtle ${area.accent} bg-bg-primary p-6 transition-all duration-200 hover:scale-[1.01] hover:opacity-95`}
              >
                <h3 className={`label-uppercase ${area.accent.replace("border-t-", "text-")}`}>
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
            ))}
          </div>

          {/* Full-width card — Databases & AI (indigo) */}
          <article
            className={`rounded-[8px] border border-border-subtle ${full.accent} bg-bg-primary p-8 transition-all duration-200 hover:scale-[1.01] hover:opacity-95`}
          >
            <h3 className="label-uppercase text-accent-indigo">
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
        </div>
      </div>
    </section>
  );
}