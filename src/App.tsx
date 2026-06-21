import { LanguageProvider } from "./i18n/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SolucoesPage from "./pages/SolucoesPage";
import { useRouter } from "./hooks/useRouter";

function PageContent() {
  const { pathname } = useRouter();

  if (pathname === "/solucoes") {
    return <SolucoesPage />;
  }

  return <HomePage />;
}

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-bg-primary text-text-primary">
        {/* Skip to main — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[8px] focus:bg-accent-teal focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg-primary"
        >
          Skip to main content
        </a>

        <LanguageToggle />

        <main id="main-content">
          <PageContent />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}