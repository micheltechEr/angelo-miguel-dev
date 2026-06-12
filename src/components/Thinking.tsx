import { useLanguage } from "../i18n/LanguageContext";

export default function Thinking() {
  const { t } = useLanguage();
  const cards = t.thinking.cards;

  // Card 0 = large (Fullstack), cards 1-2 = small (AI, Design)
  const largeCard = cards[0];
  const smallCards = cards.slice(1);

  return (
    <section className="bg-bg-secondary section-spacing px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="heading-section text-text-primary">
          {t.thinking.title}
        </h2>

        <div className="mt-12 space-y-6">
          {/* Large card — Fullstack Architecture, teal border */}
          <article
            className={`rounded-[8px] border border-border-subtle ${largeCard.accent} bg-bg-primary p-8 transition-all duration-200 hover:scale-[1.01] hover:opacity-95`}
          >
            <h3 className="text-[clamp(20px,2vw,28px)] font-semibold text-text-primary">
              {largeCard.title}
            </h3>
            <p className="mt-2 text-sm text-accent-teal font-mono">
              {largeCard.subtitle}
            </p>
            {largeCard.lines.map((line, j) => (
              <p key={j} className="mt-3 text-base leading-relaxed text-text-secondary">
                {line}
              </p>
            ))}
          </article>

          {/* Two small cards side by side on desktop */}
          <div className="grid gap-6 md:grid-cols-2">
            {smallCards.map((card, i) => (
              <article
                key={i}
                className={`rounded-[8px] border border-border-subtle ${card.accent} bg-bg-primary p-6 transition-all duration-200 hover:scale-[1.01] hover:opacity-95`}
              >
                <h3 className="heading-card text-text-primary">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-accent-indigo font-mono">
                  {card.subtitle}
                </p>
                {card.lines.map((line, j) => (
                  <p key={j} className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {line}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}