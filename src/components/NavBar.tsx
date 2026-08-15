import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useRouter } from "../hooks/useRouter";

const SECTIONS = [
  { id: "thinking", key: "nav.thinking" as const },
  { id: "projects", key: "nav.projects" as const },
  { id: "depth", key: "nav.depth" as const },
  { id: "contact", key: "nav.contact" as const },
];

export default function NavBar() {
  const { t, language, setLanguage } = useLanguage();
  const { navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    if (window.location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links: Record<string, string> = {
    "nav.thinking": t.nav.thinking,
    "nav.projects": t.nav.projects,
    "nav.depth": t.nav.depth,
    "nav.contact": t.nav.contact,
  };

  return (
    <header
      className="fixed top-4 inset-x-0 z-40 px-4 w-full max-w-5xl mx-auto transition-all duration-300"
    >
      <nav
        className={`flex items-center justify-between px-6 py-2.5 rounded-[6px] border transition-all duration-300 ${
          scrolled
            ? "border-border-strong bg-bg-secondary/75 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.6)]"
            : "border-border-subtle bg-bg-primary/20 backdrop-blur-sm"
        }`}
        aria-label="Primary"
      >
        <button
          onClick={() => {
            if (window.location.pathname !== "/") {
              navigate("/");
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group flex items-center gap-2"
          aria-label="Back to home"
        >
          <span className="font-mono text-sm font-bold tracking-tight text-text-primary group-hover:text-accent-teal transition-colors duration-200">
            ÂM
          </span>
          <span className="hidden h-4 w-px bg-border-strong sm:block" />
          <span className="label-uppercase hidden text-text-hints sm:block font-mono text-[9px]">
            {t.nav.role}
          </span>
        </button>

        <ul className="hidden items-center gap-1 sm:flex sm:gap-2">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => go(s.id)}
                className={`relative rounded-[4px] px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 sm:text-xs font-mono uppercase ${
                  active === s.id
                    ? "text-accent-teal"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {links[s.key]}
                {active === s.id && (
                  <span className="absolute -bottom-1 left-1/2 h-[1.5px] w-4 -translate-x-1/2 rounded-full bg-accent-teal shadow-[0_0_8px_var(--color-accent-teal)]" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setLanguage(language === "en" ? "pt" : "en")}
          className="rounded-[4px] border border-border-subtle bg-bg-primary/50 px-2.5 py-1 text-xs font-mono font-medium text-text-secondary transition-colors duration-200 hover:border-border-strong hover:text-text-primary"
          aria-label="Toggle language"
        >
          {language === "en" ? "PT" : "EN"}
        </button>
      </nav>
    </header>
  );
}
