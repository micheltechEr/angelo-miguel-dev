import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

interface Differentiator {
  title: string;
  desc: string;
  icon: string;
}

export default function DiferenciaisSolucoes() {
  const { language } = useLanguage();

  const differentialsPT: Differentiator[] = [
    {
      title: "Arquitetura exclusiva",
      desc: "Desenvolvimento sob medida e otimizado. Zero templates prontos ou códigos inflados. Foco em velocidade pura e conversão.",
      icon: "⚡"
    },
    {
      title: "SEO básico",
      desc: "Metadados estruturados, sitemap automatizado e tags essenciais configuradas para seu site aparecer corretamente no Google.",
      icon: "🔍"
    },
    {
      title: "Protótipo sob requisitos",
      desc: "Visualização clara desenhada após levantamento de requisitos. Você valida a estrutura completa do design antes da codificação.",
      icon: "📐"
    }
  ];

  const differentialsEN: Differentiator[] = [
    {
      title: "Exclusive architecture",
      desc: "Custom-made, optimized development. No templates or bloated code. Focused on raw speed and client conversion.",
      icon: "⚡"
    },
    {
      title: "Basic SEO",
      desc: "Structured metadata, automated sitemaps, and essential tags configured to make your site index index properly on Google.",
      icon: "🔍"
    },
    {
      title: "Requirements Prototype",
      desc: "Clear visual structures created right after requirements gathering. Review and approve the layout before writing code.",
      icon: "📐"
    }
  ];

  const items = language === "en" ? differentialsEN : differentialsPT;

  return (
    <section id="diferenciais-solucoes" className="section-spacing px-6 relative overflow-hidden bg-bg-secondary">
      {/* Grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="glow-orb glow-orb-secondary absolute top-10 -right-80 h-[500px] w-[500px]" />

      <div className="mx-auto max-w-5xl relative z-10">
        <Reveal>
          <div className="text-center md:text-left">
            <p className="label-uppercase text-accent-teal">
              {language === "en" ? "OUR DIFFERENTIALS" : "NOSSOS DIFERENCIAIS"}
            </p>
            <h2 className="heading-section mt-3 text-text-primary">
              {language === "en" ? "Engineered for Results" : "Construído com Precisão"}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <div className="tech-card h-full rounded-[8px] p-6 border-l-2 border-l-accent-teal flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-teal/10 font-mono text-lg text-accent-teal border border-accent-teal/15">
                  {item.icon}
                </div>
                
                <h3 className="mt-5 text-lg font-bold text-text-primary tracking-tight">
                  {item.title}
                </h3>
                
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
