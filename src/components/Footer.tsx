import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="section-spacing px-6">
      <div className="mx-auto max-w-5xl text-center">
        {/* CTA — "Vamos conversar?" */}
        <h2 className="heading-section text-text-primary">
          {t.footer.cta}
        </h2>

        {/* Email highlighted */}
          <a
            href="mailto:angelomiguelrib@gmail.com"
            className="mt-4 inline-block text-base font-medium text-accent-teal transition-colors duration-200 hover:text-accent-teal/80 md:text-lg"
          >
            {t.footer.email}
          </a>

        {/* Divider */}
        <div className="mx-auto mt-10 h-px w-16 bg-accent-indigo/40" />

        {/* Links */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-text-hints">
          <a
            href="https://github.com/micheltechEr"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-accent-teal"
          >
            GitHub
          </a>
          <span aria-hidden="true" className="text-text-hints/40">/</span>
          <a
            href="https://www.linkedin.com/in/angelo-miguel-rib-cerq/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-accent-indigo"
          >
            LinkedIn
          </a>
          <span aria-hidden="true" className="text-text-hints/40">/</span>
          <a
            href="mailto:angelomiguelrib@gmail.com"
            className="transition-colors duration-200 hover:text-accent-teal"
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-10 text-xs text-text-hints/60">
          &copy; 2026 {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}