import { useEffect } from "react";
import { useRouter } from "../hooks/useRouter";
import { useLanguage } from "../i18n/LanguageContext";

export default function AnalyticsTracker() {
  const { pathname } = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    // 1. Update document.title dynamically based on route and language
    let pageTitle = "Ângelo Miguel — Full Stack Web Developer";

    if (pathname === "/solucoes") {
      pageTitle = language === "pt" ? "Soluções — Ângelo Miguel" : "Solutions — Ângelo Miguel";
    } else if (pathname === "/projetos" || pathname === "/projetos-ativos") {
      pageTitle = language === "pt" ? "Projetos — Ângelo Miguel" : "Projects — Ângelo Miguel";
    }

    document.title = pageTitle;

    // 2. Track page event using gtag
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        page_path: pathname,
        page_title: pageTitle,
        language: language
      });
    }
  }, [pathname, language]);

  return null;
}
