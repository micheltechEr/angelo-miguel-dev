import { useEffect, useState, useRef } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useRouter } from "../hooks/useRouter";
import Reveal from "./Reveal";
import { trackClickEvent } from "../utils/analytics";

interface Project {
  name: string;
  url: string;
  updatedAt?: number;
}

interface VercelProjectsProps {
  limit?: number;
  showSeeMore?: boolean;
  isCarousel?: boolean;
}

const CACHE_KEY = "VERCEL_PROJECTS_CACHE_48H_V5";
const CACHE_DURATION_MS = 48 * 60 * 60 * 1000; // 48 hours

const FALLBACK_PROJECTS: Project[] = [];

const isExcluded = (name: string) => {
  const n = name.toLowerCase();
  return (
    n.includes("angelo-miguel-dev") ||
    n.includes("angelomigueldev") ||
    n.includes("netflix")
  );
};

const CLEAN_FALLBACKS = FALLBACK_PROJECTS.filter((p) => !isExcluded(p.name));

const resolveProjectDomain = (p: any): string => {
  const cleanName = p.name.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase();
  const prodAlias: string[] = p.targets?.production?.alias || [];
  const allAlias: string[] = p.alias || [];
  const candidates = [...prodAlias, ...allAlias];

  const cleanCandidate = candidates.find((d: string) => {
    const lower = d.toLowerCase();
    return (
      !lower.includes("-git-") &&
      !lower.includes("-projects") &&
      !lower.includes("vercel.build") &&
      !lower.includes("preview")
    );
  });

  if (cleanCandidate) {
    return cleanCandidate.startsWith("http") ? cleanCandidate : `https://${cleanCandidate}`;
  }

  return `https://${cleanName}.vercel.app`;
};

export default function VercelProjects({
  limit,
  showSeeMore = false,
  isCarousel = false
}: VercelProjectsProps) {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [projects, setProjects] = useState<Project[]>(CLEAN_FALLBACKS);
  const [loading, setLoading] = useState(true);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Clear old cache keys
    try {
      localStorage.removeItem("VERCEL_PROJECTS_CACHE_48H");
      localStorage.removeItem("VERCEL_PROJECTS_CACHE_48H_V2");
      localStorage.removeItem("VERCEL_PROJECTS_CACHE_48H_V3");
      localStorage.removeItem("VERCEL_PROJECTS_CACHE_48H_V4");
    } catch (e) {}

    // 1. Check 48h localStorage cache
    try {
      const cachedRaw = localStorage.getItem(CACHE_KEY);
      if (cachedRaw) {
        const cachedData = JSON.parse(cachedRaw);
        const age = Date.now() - (cachedData.timestamp || 0);
        if (age < CACHE_DURATION_MS && cachedData.projects?.length > 0) {
          setProjects(cachedData.projects);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Cache parse error, re-fetching:", err);
    }

    // 2. Fetch from Vercel API if cache missing/expired
    async function fetchProjects() {
      const token = import.meta.env.VITE_VERCEL_TOKEN;

      if (!token) {
        setProjects(CLEAN_FALLBACKS);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://api.vercel.com/v10/projects?limit=100", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) throw new Error(`Vercel API returned status ${res.status}`);

        const data = await res.json();
        const apiProjects: any[] = data.projects || [];

        const filtered = apiProjects
          .filter((p: any) => !isExcluded(p.name))
          .map((p: any) => {
            return {
              name: p.name,
              url: resolveProjectDomain(p),
              updatedAt: p.updatedAt
            };
          });

        const finalProjects = filtered.length > 0 ? filtered : CLEAN_FALLBACKS;
        const liveStatus = filtered.length > 0;

        setProjects(finalProjects);

        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              timestamp: Date.now(),
              projects: finalProjects,
              isLive: liveStatus
            })
          );
        } catch (e) {
          console.warn("Failed to write to localStorage:", e);
        }
      } catch (err) {
        console.error("Failed to fetch live Vercel projects:", err);
        setProjects(CLEAN_FALLBACKS);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Preload desktop & mobile images into browser RAM cache for instant switching
  useEffect(() => {
    if (projects.length > 0) {
      projects.forEach((p) => {
        const imgDesk = new Image();
        imgDesk.src = `/screenshots/${p.name}-desktop.jpg`;
        const imgMob = new Image();
        imgMob.src = `/screenshots/${p.name}-mobile.jpg`;
      });
    }
  }, [projects]);

  const formatName = (str: string) => {
    return str
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const getPrimaryScreenshot = (projectName: string, mode: "desktop" | "mobile") => {
    return `/screenshots/${projectName}-${mode}.jpg`;
  };

  const getFallbackScreenshot = (url: string, mode: "desktop" | "mobile") => {
    const encoded = encodeURIComponent(url);
    if (mode === "mobile") {
      return `https://api.microlink.io/?url=${encoded}&screenshot=true&viewport.isMobile=true&embed=screenshot.url`;
    }
    return `https://api.microlink.io/?url=${encoded}&screenshot=true&embed=screenshot.url`;
  };

  const renderCtaCard = (key: string, titlePt: string, titleEn: string, descPt: string, descEn: string, delay: number) => {
    const title = language === "en" ? titleEn : titlePt;
    const desc = language === "en" ? descEn : descPt;
    const whatsappText = encodeURIComponent(
      language === "en" 
        ? `Hi Angelo! I saw your project catalog and want to talk about building a site.` 
        : `Olá Ângelo! Vi seus projetos no portfólio de projetos ativos e gostaria de solicitar um orçamento para meu negócio.`
    );
    
    return (
      <Reveal key={key} className="hidden md:block" delay={delay}>
        <div className="tech-card flex h-full flex-col rounded-[8px] p-5 justify-between border border-dashed border-accent-teal/40 bg-accent-teal/5 relative overflow-hidden group hover:border-accent-teal/80 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-teal/0 via-accent-teal/[0.01] to-accent-teal/0 pointer-events-none" />
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <span className="font-mono text-[9px] text-accent-teal font-semibold uppercase tracking-widest">
              SYS // ORÇAMENTO
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-teal"></span>
            </span>
          </div>

          {/* Body */}
          <div className="my-6 flex-grow flex flex-col justify-center">
            <h3 className="text-base font-bold text-text-primary tracking-tight">
              {title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-text-secondary">
              {desc}
            </p>
          </div>

          {/* Action Button */}
          <div className="border-t border-border-subtle/40 pt-4 mt-auto">
            <a
              href={`https://wa.me/5575988428289?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClickEvent("click_whatsapp", { location: "projects_cta_card", title: title })}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-[6px] bg-accent-teal text-bg-primary font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-accent-teal/90 active:scale-[0.98] transition-all shadow-sm"
            >
              <span>{language === "en" ? "REQUEST QUOTE" : "SOLICITAR ORÇAMENTO"}</span>
              <span>💬</span>
            </a>
          </div>
        </div>
      </Reveal>
    );
  };

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  const renderCardPreview = (project: Project) => {
    const localSrc = getPrimaryScreenshot(project.name, deviceMode);
    const fallbackSrc = getFallbackScreenshot(project.url, deviceMode);

    if (deviceMode === "mobile") {
      return (
        <div className="relative mt-4 flex justify-center items-center py-3 bg-bg-elevated/40 rounded-[6px] border border-border-subtle h-[220px]">
          <div className="relative w-[115px] aspect-[9/18] overflow-hidden rounded-[14px] border-[2px] border-border-strong bg-black shadow-xl group">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10 h-1 w-6 rounded-full bg-border-strong" />
            <img
              src={localSrc}
              alt={`${project.name} mobile preview`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== fallbackSrc) {
                  target.src = fallbackSrc;
                }
              }}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="relative mt-4 overflow-hidden rounded-[6px] border border-border-strong bg-black">
        <div className="flex items-center justify-between bg-bg-secondary px-3 py-1.5 border-b border-border-subtle">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-[8px] text-text-hints truncate max-w-[140px]">
            {project.url.replace("https://", "")}
          </span>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-elevated group">
          <img
            src={localSrc}
            alt={`${project.name} desktop preview`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== fallbackSrc) {
                target.src = fallbackSrc;
              }
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <section className="relative px-6 py-12 overflow-hidden bg-bg-primary">
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      
      <div className="mx-auto max-w-5xl relative z-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-6">
            <div>
              <p className="label-uppercase text-accent-teal">
                {language === "en" ? "Production Dashboard" : "Painel de Produção"}
              </p>
              <h2 className="heading-section mt-2 text-text-primary">
                {language === "en" ? "Live Projects" : "Projetos Ativos"}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Device format toggle */}
              <div className="flex items-center rounded-full border border-border-subtle bg-bg-secondary/80 p-0.5 font-mono text-[10px]">
                <button
                  onClick={() => setDeviceMode("desktop")}
                  className={`rounded-full px-3 py-1 transition-all ${
                    deviceMode === "desktop"
                      ? "bg-accent-teal text-bg-primary font-bold shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  💻 DESKTOP
                </button>
                <button
                  onClick={() => setDeviceMode("mobile")}
                  className={`rounded-full px-3 py-1 transition-all ${
                    deviceMode === "mobile"
                      ? "bg-accent-teal text-bg-primary font-bold shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  📱 MOBILE
                </button>
              </div>

              {isCarousel && (
                <div className="flex items-center gap-1.5 ml-1">
                  <button
                    onClick={() => scroll("left")}
                    aria-label="Previous Project"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary/80 font-mono text-xs text-text-secondary hover:border-accent-teal hover:text-accent-teal transition-colors active:scale-95"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    aria-label="Next Project"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary/80 font-mono text-xs text-text-secondary hover:border-accent-teal hover:text-accent-teal transition-colors active:scale-95"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent-teal border-t-transparent" />
          </div>
        ) : (
          <>
            {isCarousel ? (
              /* Carousel Layout */
              <div
                ref={scrollRef}
                className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar py-2 px-1 scroll-smooth"
              >
                {displayedProjects.map((project, idx) => (
                  <div
                    key={project.name}
                    className="snap-start shrink-0 w-[290px] sm:w-[320px] lg:w-[340px]"
                  >
                    <Reveal delay={idx * 40}>
                      <div className="tech-card flex h-[430px] flex-col rounded-[8px] p-5">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                          <span className="font-mono text-[9px] text-text-hints uppercase tracking-widest">
                            SYS // {project.name.slice(0, 12)}
                          </span>
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
                        </div>

                        {/* Title & URL */}
                        <div className="mt-3">
                          <h3 className="text-base font-semibold text-text-primary tracking-tight truncate">
                            {formatName(project.name)}
                          </h3>
                          <p className="mt-0.5 text-xs font-mono text-text-hints truncate">
                            {project.url.replace("https://", "")}
                          </p>
                        </div>

                        {/* Preview Screenshot (Desktop or Mobile) */}
                        {renderCardPreview(project)}

                        {/* Actions */}
                        <div className="mt-auto flex items-center justify-between pt-4 gap-2 border-t border-border-subtle/40">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-text-hints">
                            {deviceMode} MODE
                          </span>

                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackClickEvent("click_project_link", { project_name: project.name, url: project.url, layout: "carousel" })}
                            className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-teal hover:text-accent-teal/80"
                          >
                            {language === "en" ? "VISIT SITE" : "VISITAR SITE"} ↗
                          </a>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                ))}
              </div>
            ) : (
              /* Grid Layout */
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(() => {
                  const elements: any[] = [];
                  displayedProjects.forEach((project, idx) => {
                    elements.push(
                      <Reveal key={project.name} delay={idx * 40}>
                        <div className="tech-card flex h-full flex-col rounded-[8px] p-5">
                          {/* Header */}
                          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                            <span className="font-mono text-[9px] text-text-hints uppercase tracking-widest">
                              SYS // {project.name.slice(0, 12)}
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
                          </div>

                          {/* Title & URL */}
                          <div className="mt-3">
                            <h3 className="text-base font-semibold text-text-primary tracking-tight truncate">
                              {formatName(project.name)}
                            </h3>
                            <p className="mt-0.5 text-xs font-mono text-text-hints truncate">
                              {project.url.replace("https://", "")}
                            </p>
                          </div>

                          {/* Preview Screenshot (Desktop or Mobile) */}
                          {renderCardPreview(project)}

                          {/* Actions */}
                          <div className="mt-auto flex items-center justify-between pt-4 gap-2 border-t border-border-subtle/40 mt-4">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-text-hints">
                              {deviceMode} MODE
                            </span>

                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackClickEvent("click_project_link", { project_name: project.name, url: project.url, layout: "grid" })}
                              className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-teal hover:text-accent-teal/80"
                            >
                              {language === "en" ? "VISIT SITE" : "VISITAR SITE"} ↗
                            </a>
                          </div>
                        </div>
                      </Reveal>
                    );

                    // Insert CTA card on desktop size after specific card count
                    if (!limit) {
                      if (idx === 2) {
                        elements.push(
                          renderCtaCard(
                            "cta-1",
                            "Precisa de uma landing page?",
                            "Need a landing page?",
                            "Desenvolvo páginas de alta conversão integradas ao WhatsApp para maximizar suas leads e vendas.",
                            "I build fast, optimized landing pages connected to WhatsApp to maximize leads and sales.",
                            (idx + 1) * 40
                          )
                        );
                      } else if (idx === 7) {
                        elements.push(
                          renderCtaCard(
                            "cta-2",
                            "Escale a engenharia do seu sistema",
                            "Scale your systems",
                            "Arquiteturas de software limpas, APIs de alto desempenho e automações robustas prontas para crescer.",
                            "Clean software architectures, high-performance APIs, and robust integrations designed to scale.",
                            (idx + 1) * 40
                          )
                        );
                      } else if (idx === 11) {
                        elements.push(
                          renderCtaCard(
                            "cta-3",
                            "Pronto para criar seu site?",
                            "Ready to start?",
                            "Com portfólios dinâmicos, infraestrutura moderna e design autêntico. Vamos conversar hoje.",
                            "With dynamic portfolios, modern infrastructure, and authentic designs. Let's talk today.",
                            (idx + 1) * 40
                          )
                        );
                      }
                    }
                  });
                  return elements;
                })()}
              </div>
            )}

            {showSeeMore && (
              <Reveal>
                <div className="mt-12 flex flex-col items-center justify-center">
                  <button
                    onClick={() => navigate("/projetos")}
                    className="group inline-flex items-center gap-2 rounded-[8px] border border-accent-teal/40 bg-accent-teal/10 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-accent-teal transition-all duration-200 hover:border-accent-teal hover:bg-accent-teal hover:text-bg-primary active:scale-[0.98]"
                  >
                    <span>
                      {language === "en" ? "See All Active Projects" : "Ver Todos os Projetos Ativos"}
                    </span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </Reveal>
            )}
          </>
        )}
      </div>
    </section>
  );
}
