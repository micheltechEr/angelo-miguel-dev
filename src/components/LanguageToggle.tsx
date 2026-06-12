import { useLanguage } from "../i18n/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="fixed top-0 right-0 z-50 p-6" aria-label="Language selector">
      <button
        onClick={() => setLanguage(language === "en" ? "pt" : "en")}
        className="rounded-[8px] border border-border-subtle bg-bg-primary/80 px-3 py-1.5 text-xs font-medium text-text-hints transition-all duration-200 hover:border-accent-teal hover:text-accent-teal active:scale-[0.98] backdrop-blur-sm"
        aria-label={language === "en" ? "Switch to Portuguese" : "Mudar para Ingl\u00eas"}
      >
        {t.nav.languageToggle}
      </button>
    </nav>
  );
}