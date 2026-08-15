import { useLanguage } from "../i18n/LanguageContext";
import { useHashVisible } from "../hooks/useHashVisible";

export default function NidusDecisions() {
  const { t } = useLanguage();
  const { visible, close } = useHashVisible("#nidus-decisions");

  if (!visible) return null;

  return (
    <section id="nidus-decisions" className="section-spacing px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="heading-section text-text-primary">
              {t.nidusDecisions.title}
            </h2>
            <p className="mt-2 text-sm text-text-secondary font-mono">
              {t.nidusDecisions.subtitle}
            </p>
          </div>
          <button
            onClick={close}
            className="mt-1 shrink-0 rounded-[4px] border border-border-subtle px-3 py-1 text-xs text-text-hints transition-all duration-200 hover:border-accent-teal hover:text-accent-teal"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Stack grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {t.nidusDecisions.stack.map((item) => (
            <div
              key={item.label}
              className="rounded-[8px] border border-border-subtle border-t-accent-amber bg-bg-primary p-4"
            >
              <span className="label-uppercase text-accent-amber">
                {item.label}
              </span>
              <p className="mt-2 text-sm text-text-secondary">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Decisions table */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="label-uppercase pb-3 pr-4 text-accent-teal">Decision</th>
                <th className="label-uppercase pb-3 pr-4 text-text-hints">Alternative</th>
                <th className="label-uppercase pb-3 text-text-hints">Why</th>
              </tr>
            </thead>
            <tbody>
              {t.nidusDecisions.decisions.map((row, i) => (
                <tr key={i} className="border-b border-border-subtle/50 last:border-0">
                  <td className="py-3 pr-4 font-medium text-text-primary">{row.decision}</td>
                  <td className="py-3 pr-4 text-text-secondary">{row.alternative}</td>
                  <td className="py-3 text-text-secondary">{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
