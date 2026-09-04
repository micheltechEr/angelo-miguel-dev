import { useEffect, useState, useRef, useMemo } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useRouter } from "../hooks/useRouter";
import Reveal from "./Reveal";
import { trackClickEvent } from "../utils/analytics";

interface Project {
  name: string;
  url: string;
  updatedAt?: number;
  category?: "health" | "engineering" | "legal_realestate" | "branding_art" | "saas";
  tags?: string[];
}

interface VercelProjectsProps {
  limit?: number;
  showSeeMore?: boolean;
  isCarousel?: boolean;
}

const CACHE_KEY = "VERCEL_PROJECTS_CACHE_48H_V6";
const CACHE_DURATION_MS = 48 * 60 * 60 * 1000; // 48 hours

// High-converting curated projects with verified screenshots
const FALLBACK_PROJECTS: Project[] = [
  {
    name: "elevare",
    url: "https://elevare.vercel.app",
    category: "health",
    tags: ["Clínica Médica", "Alta Performance", "0.00 CLS"]
  },
  {
    name: "convec-solar",
    url: "https://convec-solar.vercel.app",
    category: "engineering",
    tags: ["Energia Solar", "Lead Gen", "Calculadora"]
  },
  {
    name: "estet-dra-aline-sarmento",
    url: "https://estet-dra-aline-sarmento.vercel.app",
    category: "health",
    tags: ["Estética Avançada", "Luxury UI", "Agendamento"]
  },
  {
    name: "francelino-imoveis",
    url: "https://francelino-imoveis.vercel.app",
    category: "legal_realestate",
    tags: ["Imobiliária", "Catálogo", "WhatsApp Direct"]
  },
  {
    name: "drraphaelbonadiman",
    url: "https://drraphaelbonadiman.vercel.app",
    category: "health",
    tags: ["Medicina Integrativa", "CFM Compliant", "Design Editorial"]
  },
  {
    name: "dr-davy-cardoso",
    url: "https://dr-davy-cardoso.vercel.app",
    category: "health",
    tags: ["Cirurgia Plástica", "UX Premium", "Conversão"]
  },
  {
    name: "nexus-wize",
    url: "https://nexus-wize.vercel.app",
    category: "saas",
    tags: ["SaaS Dashboard", "React 19", "Cloud Infra"]
  },
  {
    name: "multisoft-saude",
    url: "https://multisoft-saude.vercel.app",
    category: "health",
    tags: ["Software Clínico", "B2B SaaS", "Integrações"]
  },
  {
    name: "neuro-psi-lucyenne",
    url: "https://neuro-psi-lucyenne.vercel.app",
    category: "health",
    tags: ["Neuropsicologia", "Autoridade", "Acessibilidade"]
  },
  {
    name: "psi-marcon",
    url: "https://psi-marcon.vercel.app",
    category: "health",
    tags: ["Psicologia Clínica", "Atendimento Online", "Minimalismo"]
  },
  {
    name: "psi-tatiane-barbosa",
    url: "https://psi-tatiane-barbosa.vercel.app",
    category: "health",
    tags: ["Psicologia", "Agendamento Ágil", "Mobile-First"]
  },
  {
    name: "araujo-e-costa-advocacia",
    url: "https://araujo-e-costa-advocacia.vercel.app",
    category: "legal_realestate",
    tags: ["Direito Corporativo", "OAB Compliant", "Autoridade"]
  },
  {
    name: "araujo-e-silva",
    url: "https://araujo-e-silva.vercel.app",
    category: "legal_realestate",
    tags: ["Advocacia Tributária", "B2B", "Alta Conversão"]
  },
  {
    name: "ron-tatoo",
    url: "https://ron-tatoo.vercel.app",
    category: "branding_art",
    tags: ["Estúdio Tattoo", "Galeria Visual", "Dark Mode"]
  },
  {
    name: "tatoo_portifolio",
    url: "https://tatoo-portifolio.vercel.app",
    category: "branding_art",
    tags: ["Arte & Portfólio", "Visual Imersivo", "Fast Loading"]
  },
  {
    name: "wubbert-aguiar",
    url: "https://wubbert-aguiar.vercel.app",
    category: "branding_art",
    tags: ["Personal Branding", "Consultoria", "Design Autoral"]
  },
  {
    name: "psi-gildo",
    url: "https://psi-gildo.vercel.app",
    category: "health",
    tags: ["Psicoterapia", "Conversão Rápida", "Clean UI"]
  },
  {
    name: "psi-ana-lage",
    url: "https://psi-ana-lage.vercel.app",
    category: "health",
    tags: ["Saúde Mental", "Acolhimento", "Tipografia Editorial"]
  },
  {
    name: "psico_patricia",
    url: "https://psico-patricia.vercel.app",
    category: "health",
    tags: ["Psicologia & TCC", "Direcionamento Claro", "SEO Local"]
  }
];

const isExcluded = (name: string) => {
  const n = name.toLowerCase();
  return (
    n.includes("angelo-miguel-dev") ||
    n.includes("angelomigueldev") ||
    n.includes("netflix")
  );
};

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

const inferCategory = (name: string): "health" | "engineering" | "legal_realestate" | "branding_art" | "saas" => {
  const n = name.toLowerCase();
  if (n.includes("psi") || n.includes("dr") || n.includes("saude") || n.includes("estet") || n.includes("clini") || n.includes("med") || n.includes("elevare")) {
    return "health";
  }
  if (n.includes("solar") || n.includes("convec") || n.includes("engenharia")) {
    return "engineering";
  }
  if (n.includes("imoveis") || n.includes("adv") || n.includes("araujo") || n.includes("juridico")) {
    return "legal_realestate";
  }
  if (n.includes("tatoo") || n.includes("art") || n.includes("wubbert") || n.includes("brand")) {
    return "branding_art";
  }
  return "saas";
};

export default function VercelProjects({
  limit,
  showSeeMore = false,
  isCarousel = false
}: VercelProjectsProps) {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [, setLoading] = useState<boolean>(true);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_DURATION_MS && parsed.projects?.length > 0) {
          setProjects(parsed.projects);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("Cache parse error, re-fetching:", err);
    }

    async function fetchProjects() {
      const token = import.meta.env.VITE_VERCEL_TOKEN;

      if (!token) {
        setProjects(FALLBACK_PROJECTS);
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

        const filtered: Project[] = apiProjects
          .filter((p: any) => !isExcluded(p.name))
          .map((p: any) => {
            const fb = FALLBACK_PROJECTS.find((f) => f.name.toLowerCase() === p.name.toLowerCase());
            return {
              name: p.name,
              url: resolveProjectDomain(p),
              updatedAt: p.updatedAt,
              category: fb?.category || inferCategory(p.name),
              tags: fb?.tags || ["Vercel Edge", "React", "Live"]
            };
          });

        const finalProjects = filtered.length > 0 ? filtered : FALLBACK_PROJECTS;

        setProjects(finalProjects);

        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              timestamp: Date.now(),
              projects: finalProjects
            })
          );
        } catch (e) {
          console.warn("Failed to write to localStorage:", e);
        }
      } catch (err) {
        console.error("Failed to fetch live Vercel projects, using robust fallbacks:", err);
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Preload images into browser RAM cache for instant switching
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

  const categories = useMemo(() => {
    return [
      { id: "all", labelPt: "Todos os Projetos", labelEn: "All Projects" },
      { id: "health", labelPt: "Saúde & Clínicas", labelEn: "Healthcare & Clinics" },
      { id: "engineering", labelPt: "Engenharia & Solar", labelEn: "Engineering & Solar" },
      { id: "legal_realestate", labelPt: "Imóveis & Advocacia", labelEn: "Real Estate & Legal" },
      { id: "branding_art", labelPt: "Branding & Arte", labelEn: "Branding & Art" },
      { id: "saas", labelPt: "SaaS & Plataformas", labelEn: "SaaS & Platforms" }
    ];
  }, []);

  const filteredProjects = useMemo(() => {
    let result = projects;
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory || inferCategory(p.name) === selectedCategory);
    }
    return result;
  }, [projects, selectedCategory]);

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const renderProjectCard = (project: Project) => {
    const localSrc = getPrimaryScreenshot(project.name, deviceMode);
    const fallbackSrc = getFallbackScreenshot(project.url, deviceMode);
    const cleanDomain = project.url.replace(/^https?:\/\//, "");

    return (
      <div
        key={project.name}
        className="tech-card group flex flex-col justify-between rounded-[8px] border border-border-subtle bg-bg-card p-5 transition-all duration-300 hover:border-accent-teal/60 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
      >
        <div>
          {/* Card Top Bar */}
          <div className="flex items-center justify-between gap-2 border-b border-border-subtle/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-teal"></span>
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-teal">
                PROD // LIVE
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-text-hints">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-teal/40" />
              0.00 CLS
            </div>
          </div>

          {/* Project Title & Link */}
          <div className="mt-3.5">
            <h3 className="text-lg font-bold text-text-primary tracking-tight group-hover:text-accent-teal transition-colors">
              {formatName(project.name)}
            </h3>
            <p className="mt-0.5 font-mono text-xs text-text-hints truncate">
              {cleanDomain}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(project.tags || ["Vercel Edge", "React"]).map((tag, idx) => (
              <span
                key={idx}
                className="rounded-[4px] border border-border-subtle bg-bg-elevated/80 px-2 py-0.5 font-mono text-[10px] text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Interactive Mockup Frame */}
          {deviceMode === "mobile" ? (
            <div className="relative mt-4 flex justify-center items-center py-4 bg-bg-elevated/40 rounded-[6px] border border-border-subtle h-[230px]">
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
          ) : (
            <div className="relative mt-4 overflow-hidden rounded-[6px] border border-border-strong bg-black">
              <div className="flex items-center justify-between bg-bg-secondary px-3 py-1.5 border-b border-border-subtle">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/80" />
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/80" />
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-[8px] text-text-hints truncate max-w-[140px]">
                  {cleanDomain}
                </span>
                <span className="font-mono text-[8px] text-accent-teal/80">SSL 🔒</span>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-primary">
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
          )}
        </div>

        {/* Action Button: Architectural Outline */}
        <div className="mt-5 pt-3 border-t border-border-subtle/50">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackClickEvent("click_vercel_project", {
                project_name: project.name,
                url: project.url,
                mode: deviceMode
              })
            }
            className="flex items-center justify-between w-full rounded-[4px] border-[1.5px] border-text-primary/30 px-3.5 py-2.5 font-mono text-xs font-semibold text-text-primary transition-all duration-200 hover:border-text-primary hover:bg-text-primary hover:text-bg-primary"
          >
            <span>{language === "en" ? "Visit Live Site" : "Ver Site no Ar"}</span>
            <span aria-hidden="true" className="text-sm">↗</span>
          </a>
        </div>
      </div>
    );
  };

  return (
    <section id="vercel-showcase" className="section-spacing px-6 relative overflow-hidden bg-bg-primary">
      <div className="mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6">
          <Reveal>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-accent-teal animate-pulse" />
              <p className="label-uppercase text-accent-teal">
                {language === "en" ? "03 — Live Production Work" : "03 — Projetos Reais em Produção"}
              </p>
            </div>
            <h2 className="heading-section mt-3 text-text-primary">
              {language === "en"
                ? "High-Converting Applications & Sites"
                : "Aplicações & Landing Pages de Alta Performance"}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-text-secondary">
              {language === "en"
                ? "Production-ready architectures deployed on Vercel Edge with zero layout shifts, ultra-fast TTFB, and verified conversion metrics."
                : "Projetos reais entregues e hospedados na infraestrutura Vercel. 100% responsivos, 0.00 CLS e velocidade máxima para fechar vendas."}
            </p>
          </Reveal>

          {/* Global Device Switcher (Desktop 💻 vs Mobile 📱) */}
          <Reveal delay={150}>
            <div className="flex items-center gap-1 rounded-[6px] border border-border-strong bg-bg-card p-1">
              <button
                type="button"
                onClick={() => setDeviceMode("desktop")}
                className={`flex items-center gap-1.5 rounded-[4px] px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                  deviceMode === "desktop"
                    ? "bg-accent-teal text-bg-primary font-bold shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <span>💻</span>
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode("mobile")}
                className={`flex items-center gap-1.5 rounded-[4px] px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                  deviceMode === "mobile"
                    ? "bg-accent-teal text-bg-primary font-bold shadow-sm"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <span>📱</span>
                <span>Mobile</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Niche Filter Pills */}
        <Reveal delay={200}>
          <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-border-subtle pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-[4px] px-3 py-1 font-mono text-xs transition-all ${
                  selectedCategory === cat.id
                    ? "border-[1.5px] border-accent-teal bg-accent-teal/10 text-accent-teal font-semibold"
                    : "border border-border-subtle bg-bg-card text-text-secondary hover:border-border-strong hover:text-text-primary"
                }`}
              >
                {language === "en" ? cat.labelEn : cat.labelPt}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Carousel or Grid */}
        {isCarousel ? (
          <div className="relative mt-8">
            <div className="absolute -top-12 right-0 hidden md:flex items-center gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                aria-label="Previous projects"
                className="h-8 w-8 rounded-[4px] border border-border-strong bg-bg-card flex items-center justify-center text-text-primary hover:border-accent-teal hover:text-accent-teal transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                aria-label="Next projects"
                className="h-8 w-8 rounded-[4px] border border-border-strong bg-bg-card flex items-center justify-center text-text-primary hover:border-accent-teal hover:text-accent-teal transition-colors"
              >
                →
              </button>
            </div>

            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
            >
              {displayedProjects.map((project) => (
                <div key={project.name} className="w-[310px] md:w-[340px] flex-shrink-0 snap-start">
                  {renderProjectCard(project)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((project) => renderProjectCard(project))}
          </div>
        )}

        {/* View All Projects CTA */}
        {showSeeMore && (
          <Reveal delay={250}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[8px] border border-border-strong bg-bg-card p-6">
              <div>
                <h4 className="text-base font-bold text-text-primary">
                  {language === "en" ? "Looking for a custom build?" : "Precisa de uma aplicação ou landing page sob medida?"}
                </h4>
                <p className="mt-1 text-sm text-text-secondary">
                  {language === "en"
                    ? `Explore all ${projects.length} live production projects in the full catalog.`
                    : `Confira todos os ${projects.length} projetos com links no catálogo completo.`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/projetos")}
                  className="rounded-[4px] border-[1.5px] border-text-primary/40 bg-transparent px-5 py-2.5 font-mono text-xs font-semibold text-text-primary transition-all hover:border-text-primary hover:bg-text-primary hover:text-bg-primary"
                >
                  {language === "en" ? "View All Projects →" : "Ver Todos os Projetos →"}
                </button>
                <a
                  href={`https://wa.me/5575988428289?text=${encodeURIComponent(
                    language === "en"
                      ? "Hi Angelo! I'd like to request a quote for a new web project."
                      : "Olá Ângelo! Gostaria de solicitar um orçamento para um novo projeto web."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[4px] bg-accent-teal px-5 py-2.5 font-mono text-xs font-bold text-bg-primary transition-all hover:bg-accent-teal/90"
                >
                  {language === "en" ? "Talk on WhatsApp" : "Chamar no WhatsApp"}
                </a>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
