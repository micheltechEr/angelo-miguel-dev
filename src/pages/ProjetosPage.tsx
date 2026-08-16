import { useLanguage } from "../i18n/LanguageContext";
import { useRouter } from "../hooks/useRouter";
import VercelProjects from "../components/VercelProjects";
import Reveal from "../components/Reveal";
import { trackClickEvent } from "../utils/analytics";

export default function ProjetosPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-bg-primary">
      {/* Header section */}
      <section className="px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 w-full">
              <div className="flex flex-col items-start gap-4">
                <button
                  onClick={() => navigate("/solucoes")}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent-teal hover:text-accent-teal/80 transition-colors"
                >
                  ← {language === "en" ? "Back to Solutions" : "Voltar para Soluções"}
                </button>

                <span className="label-uppercase mt-2 inline-block rounded-full border border-border-subtle px-4 py-1.5 text-[11px] text-accent-amber">
                  {language === "en" ? "Full Catalog" : "Catálogo Completo"}
                </span>

                <h1 className="heading-xl text-text-primary">
                  {language === "en" ? "All Active Projects" : "Todos os Projetos Ativos"}
                </h1>

                <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
                  {language === "en"
                    ? "Complete list of web applications, landing pages, and systems deployed and active in production."
                    : "Lista completa de aplicações web, landing pages e sistemas desenvolvidos e ativos em produção."}
                </p>
              </div>

              {/* Header CTA Button - visible on md screens and up */}
              <div className="hidden md:block flex-shrink-0 mb-2">
                <a
                  href={`https://wa.me/5575988428289?text=${encodeURIComponent(
                    language === "en"
                      ? "Hi Angelo! I saw your active projects and would like to build a site."
                      : "Olá Ângelo! Vi seus projetos ativos e gostaria de solicitar um orçamento para meu negócio."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClickEvent("click_whatsapp", { location: "projetos_page_header" })}
                  className="inline-flex items-center gap-2 rounded-[8px] bg-accent-teal px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-bg-primary hover:bg-accent-teal/90 active:scale-[0.98] transition-all shadow-lg"
                >
                  <span>{language === "en" ? "START PROJECT" : "INICIAR PROJETO"}</span>
                  <span className="text-sm">💬</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full project list */}
      <VercelProjects />
    </div>
  );
}
