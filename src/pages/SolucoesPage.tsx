import { useLanguage } from "../i18n/LanguageContext";
import SolucoesHero from "../components/SolucoesHero";
import ServicesByNiche from "../components/ServicesByNiche";
import ExplicadorAgil from "../components/ExplicadorAgil";

export default function SolucoesPage() {
  const { t } = useLanguage();

  return (
    <>
      <SolucoesHero />
      <ServicesByNiche />
      <ExplicadorAgil config={t.solucoes.explicador} />
    </>
  );
}
