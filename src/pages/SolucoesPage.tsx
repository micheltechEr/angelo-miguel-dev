import { useLanguage } from "../i18n/LanguageContext";
import SolucoesHero from "../components/SolucoesHero";
import VercelProjects from "../components/VercelProjects";
import DiferenciaisSolucoes from "../components/DiferenciaisSolucoes";
import ExplicadorAgil from "../components/ExplicadorAgil";

export default function SolucoesPage() {
  const { t } = useLanguage();

  return (
    <>
      <SolucoesHero />
      <VercelProjects limit={4} showSeeMore={true} isCarousel={true} />
      <DiferenciaisSolucoes />
      <ExplicadorAgil config={t.solucoes.explicador} />
    </>
  );
}
