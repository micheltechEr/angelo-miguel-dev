import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

export default function Thinking() {
  const { t } = useLanguage();
  const cards = t.thinking.cards;

  const largeCard = cards[0];
  const smallCards = cards.slice(1);

  return (
    <section id="thinking" className="bg-bg-secondary section-spacing px-6 relative overflow-hidden">
      {/* Subtle grid background layer */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div className="glow-orb glow-orb-secondary absolute top-1/4 -right-80 h-[500px] w-[500px]" />

      <div className="mx-auto max-w-5xl relative z-10">
        <Reveal>
          <p className="label-uppercase text-accent-teal text-center sm:text-left">01 — Mindset</p>
          <h2 className="heading-section mt-3 text-text-primary text-center sm:text-left">
            {t.thinking.title}
          </h2>
        </Reveal>

        <div className="mt-12 space-y-6">
          <Reveal as="article">
            <article
              className={`tech-card rounded-[8px] p-8 text-center sm:text-left border-l-2 border-l-accent-teal`}
            >
              <h3 className="text-[clamp(22px,2.4vw,32px)] font-semibold text-text-primary">
                {largeCard.title}
              </h3>
              <p className="mt-2 text-xs text-accent-teal font-mono tracking-wider font-semibold uppercase">
                {largeCard.subtitle}
              </p>
              {largeCard.lines.map((line, j) => (
                <p key={j} className="mt-4 text-base leading-relaxed text-text-secondary">
                  {line}
                </p>
              ))}
            </article>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {smallCards.map((card, i) => (
              <Reveal as="article" key={i} delay={i * 90}>
                <article
                  className={`tech-card h-full rounded-[8px] p-6 text-center sm:text-left ${
                    i === 0 ? "border-l-2 border-l-accent-violet" : "border-l-2 border-l-accent-teal"
                  }`}
                >
                  <h3 className="heading-card text-text-primary">
                    {card.title}
                  </h3>
                  <p className={`mt-2 text-xs font-mono tracking-wider font-semibold uppercase ${
                    i === 0 ? "text-accent-violet" : "text-accent-teal"
                  }`}>
                    {card.subtitle}
                  </p>
                  {card.lines.map((line, j) => (
                    <p key={j} className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {line}
                    </p>
                  ))}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
