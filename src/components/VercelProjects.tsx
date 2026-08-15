import { useEffect, useState, useRef } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useRouter } from "../hooks/useRouter";
import Reveal from "./Reveal";

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

const CACHE_KEY = "VERCEL_PROJECTS_CACHE_48H";
const CACHE_DURATION_MS = 48 * 60 * 60 * 1000; // 48 hours

const FALLBACK_PROJECTS: Project[] = [
  { name: "psico_patricia", url: "https://psicopatricia.vercel.app" },
  { name: "convec-solar", url: "https://convec-solar.vercel.app" },
  { name: "elevare", url: "https://elevare.vercel.app" },
  { name: "multisoft-saude", url: "https://multisoft-saude.vercel.app" },
  { name: "ron-tatoo", url: "https://ron-tatoo.vercel.app" },
  { name: "estet-dra-aline-sarmento", url: "https://estet-dra-aline-sarmento.vercel.app" },
  { name: "nexus-wize", url: "https://nexus-wize.vercel.app" },
  { name: "psi-marcon", url: "https://psi-marcon.vercel.app" },
  { name: "psi-ana-lage", url: "https://psi-ana-lage.vercel.app" },
  { name: "neuro-psi-lucyenne", url: "https://neuro-psi-lucyenne.vercel.app" },
  { name: "psi-leticia-freitas", url: "https://psi-leticia-freitas.vercel.app" },
  { name: "wubbert-aguiar", url: "https://wubbert-aguiar.vercel.app" },
  { name: "araujo-e-costa-advocacia", url: "https://araujo-e-costa-advocacia.vercel.app" },
  { name: "drraphaelbonadiman", url: "https://drraphaelbonadiman.vercel.app" },
  { name: "araujo-e-silva", url: "https://araujo-e-silva.vercel.app" },
  { name: "dr-davy-cardoso", url: "https://dr-davy-cardoso.vercel.app" },
  { name: "francelino-imoveis", url: "https://francelino-imoveis.vercel.app" },
  { name: "psi-gildo", url: "https://psi-gildo.vercel.app" },
  { name: "tatoo_portifolio", url: "https://tatooportifolio.vercel.app" }
];

const isExcluded = (name: string) => {
  const n = name.toLowerCase();
  return (
    n.includes("angelo-miguel-dev") ||
    n.includes("angelomigueldev") ||
    n.includes("netflix")
  );
};

const CLEAN_FALLBACKS = FALLBACK_PROJECTS.filter((p) => !isExcluded(p.name));

export default function VercelProjects({
  limit,
  showSeeMore = false,
  isCarousel = false
}: VercelProjectsProps) {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [projects, setProjects] = useState<Project[]>(CLEAN_FALLBACKS);
  const [isLive, setIsLive] = useState(false);
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
    async function fetchProjects() {
      // 1. Check 48h localStorage cache
      try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cachedData = JSON.parse(cachedRaw);
          const age = Date.now() - (cachedData.timestamp || 0);
          if (age < CACHE_DURATION_MS && cachedData.projects?.length > 0) {
            setProjects(cachedData.projects);
            setIsLive(cachedData.isLive ?? true);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Cache parse error, re-fetching:", err);
      }

      // 2. Fetch from Vercel API if cache missing/expired
      const token = import.meta.env.VITE_VERCEL_TOKEN;

      if (!token) {
        setProjects(CLEAN_FALLBACKS);
        setIsLive(false);
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
            const alias = p.alias || [];
            let domain = `${p.name}.vercel.app`;
            if (alias.length > 0) {
              domain = alias[0];
            } else if (p.targets?.production?.alias?.length > 0) {
              domain = p.targets.production.alias[0];
            } else if (p.targets?.production?.url) {
              domain = p.targets.production.url;
            }

            return {
              name: p.name,
              url: domain.startsWith("http") ? domain : `https://${domain}`,
              updatedAt: p.updatedAt
            };
          });

        const finalProjects = filtered.length > 0 ? filtered : CLEAN_FALLBACKS;
        const liveStatus = filtered.length > 0;

        setProjects(finalProjects);
        setIsLive(liveStatus);

        // Save to 48h localStorage cache
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
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const formatName = (str: string) => {
    return str
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const getScreenshotUrl = (url: string, mode: "desktop" | "mobile") => {
    const encoded = encodeURIComponent(url);
    if (mode === "mobile") {
      return `https://api.microlink.io/?url=${encoded}&screenshot=true&viewport.isMobile=true&embed=screenshot.url`;
    }
    return `https://api.microlink.io/?url=${encoded}&screenshot=true&embed=screenshot.url`;
  };

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  const renderCardPreview = (project: Project) => {
    const screenshotUrl = getScreenshotUrl(project.url, deviceMode);

    if (deviceMode === "mobile") {
      return (
        <div className="relative mt-4 flex justify-center items-center py-3 bg-bg-elevated/40 rounded-[6px] border border-border-subtle h-[220px]">
          <div className="relative w-[115px] aspect-[9/18] overflow-hidden rounded-[14px] border-[2px] border-border-strong bg-black shadow-xl group">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 z-10 h-1 w-6 rounded-full bg-border-strong" />
            <img
              src={screenshotUrl}
              alt={`${project.name} mobile preview`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = `https://image.thum.io/get/width/600/crop/800/${project.url}`;
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
            src={screenshotUrl}
            alt={`${project.name} desktop preview`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = `https://image.thum.io/get/width/600/crop/800/${project.url}`;
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

              {/* Status badge */}
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-border-subtle bg-bg-secondary/60 px-3 py-1 font-mono text-[10px] text-text-secondary backdrop-blur-sm">
                <span className={`h-2 w-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-accent-amber"}`} />
                <span className="uppercase tracking-wider">
                  {isLive 
                    ? (language === "en" ? "LIVE CACHED" : "CONEXÃO ATIVA (48h)") 
                    : (language === "en" ? "LOCAL CACHE" : "LOCAL CACHE ACTIVATED")}
                </span>
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
                {displayedProjects.map((project, idx) => (
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
                          className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-accent-teal hover:text-accent-teal/80"
                        >
                          {language === "en" ? "VISIT SITE" : "VISITAR SITE"} ↗
                        </a>
                      </div>
                    </div>
                  </Reveal>
                ))}
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
