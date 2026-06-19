import { LanguageProvider } from "./i18n/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import Hero from "./components/Hero";
import Thinking from "./components/Thinking";
import Projects from "./components/Projects";
import ServicesByNiche from "./components/ServicesByNiche";
import NidusDecisions from "./components/NidusDecisions";
import CreatorHubDecisions from "./components/CreatorHubDecisions";
import AutoMatchDecisions from "./components/AutoMatchDecisions";
import TechnicalDepth from "./components/TechnicalDepth";
import Footer from "./components/Footer";
import ExplicadorAgil from "./components/ExplicadorAgil";

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
          <Hero />
          <Thinking />
          <Projects />
          <ServicesByNiche />
          <NidusDecisions />
          <CreatorHubDecisions />
          <AutoMatchDecisions />
          <TechnicalDepth />
        </main>

        <Footer />
      </div>

      <ExplicadorAgil />
    </LanguageProvider>
  );
}