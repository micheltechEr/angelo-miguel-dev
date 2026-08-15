import { useLanguage } from "../i18n/LanguageContext";
import Reveal from "./Reveal";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="section-spacing px-6">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="label-uppercase text-accent-teal">04 — Say hi</p>
          <h2 className="heading-section mt-3 text-text-primary">
            {t.footer.cta}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-text-secondary">
            {t.footer.sub}
          </p>
          <a
            href="mailto:angelomiguelrib@gmail.com"
            className="group mt-7 inline-flex items-center gap-2 text-lg font-medium text-accent-teal transition-colors duration-200 hover:text-accent-teal/80"
          >
            {t.footer.email}
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </a>
        </Reveal>

        <div className="mx-auto mt-10 h-px w-24 hairline" />

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
            className="transition-colors duration-200 hover:text-accent-violet"
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

        <a
          href="/solucoes"
          className="mt-6 inline-block text-[11px] text-text-hints/40 transition-colors duration-200 hover:text-accent-teal/60"
        >
          {t.footer.solucoesLink}
        </a>
      </div>
    </footer>
  );
}
