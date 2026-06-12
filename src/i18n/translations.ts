export type Language = "en" | "pt";

export interface Translations {
  hero: {
    name: string;
    tagline: string;
    description: string;
    ctaProjects: string;
    ctaCvView: string;
  };
  thinking: {
    title: string;
    cards: Array<{
      title: string;
      subtitle: string;
      lines: string[];
      accent: string;
      size: "large" | "small";
    }>;
  };
  projects: {
    title: string;
    cards: Array<{
      subtitle: string;
      title: string;
      description: string;
      tags: string[];
      accent: string;
      size: "large" | "small";
      linkLabel: string;
      status?: string;
    }>;
    cta: string;
  };
  technicalDepth: {
    title: string;
    areas: Array<{
      title: string;
      items: string[];
      accent: string;
      size: "large" | "medium" | "full";
    }>;
  };
  nidusDecisions: {
    title: string;
    subtitle: string;
    decisions: Array<{ decision: string; alternative: string; reason: string }>;
    stack: Array<{ label: string; value: string }>;
  };
  creatorHubDecisions: {
    title: string;
    subtitle: string;
    decisions: Array<{ decision: string; alternative: string; reason: string }>;
    stack: Array<{ label: string; value: string }>;
  };
  footer: {
    cta: string;
    email: string;
    copyright: string;
  };
  nav: {
    languageToggle: string;
  };
}

const en: Translations = {
  hero: {
    name: "Ângelo Miguel",
    tagline: "Full Stack Web Developer",
    description:
      "Systems that scale. Decisions over trends. Monoliths. Multitenancy. When NOT to use AI.",
    ctaProjects: "Projects",
    ctaCvView: "View CV",
  },
  thinking: {
    title: "What I actually do",
    cards: [
      {
        title: "Fullstack Architecture",
        subtitle: "Node.js / Laravel / TypeScript",
        lines: [
          "Monolith patterns, security, product thinking",
        ],
        accent: "border-t-accent-teal",
        size: "large",
      },
      {
        title: "AI-Ready Systems",
        subtitle: "MCP / RAG / Decision Arch",
        lines: [
          "When NOT to use AI. Integration with providers.",
        ],
        accent: "border-t-accent-indigo",
        size: "small",
      },
      {
        title: "Design Without AI Artifacts",
        subtitle: "Blade / Tailwind / UX",
        lines: [
          "Distinctive palettes. Micro-interactions. No templates.",
        ],
        accent: "border-t-accent-gold",
        size: "small",
      },
    ],
  },
  projects: {
    title: "Featured Projects",
    cards: [
      {
        subtitle: "Family Assistant",
        title: "NIDUS",
        description: "Monolith. Neon DB. Next.js.",
        tags: ["Monolith", "Neon DB", "Next.js"],
        accent: "border-t-accent-teal",
        size: "large",
        linkLabel: "Decisions",
        status: "Final development phase",
      },
      {
        subtitle: "Artist Marketplace",
        title: "CREATOR HUB",
        description: "Monolith. Supabase. Next.js.",
        tags: ["Node", "TS", "Supabase"],
        accent: "border-t-accent-indigo",
        size: "small",
        linkLabel: "Visit",
      },
    ],
    cta: "View on GitHub",
  },
  technicalDepth: {
    title: "Depth Areas",
    areas: [
      {
        title: "Architecture Patterns",
        items: [
          "Monolith (layered, modular)",
          "Event-driven architecture",
          "Idempotency, graceful shutdown",
          "Feature flags, deployment strategies",
        ],
        accent: "border-t-accent-teal",
        size: "large",
      },
      {
        title: "Backend",
        items: [
          "Node.js (Express, Next.js API)",
          "Laravel (PHP)",
          "REST & GraphQL APIs",
        ],
        accent: "border-t-accent-gold",
        size: "medium",
      },
      {
        title: "Security & Ops",
        items: [
          "JWT, OAuth, PKCE",
          "RLS, policies",
          "OWASP top 10",
          "Multitenancy",
          "Feature flags",
        ],
        accent: "border-t-accent-indigo",
        size: "medium",
      },
      {
        title: "Frontend & UX",
        items: [
          "React, TypeScript",
          "TailwindCSS",
          "Laravel Blade",
          "Micro-interactions",
          "WCAG A11Y",
        ],
        accent: "border-t-accent-gold",
        size: "medium",
      },
      {
        title: "Databases & AI Integration",
        items: [
          "PostgreSQL (RLS, indexing, migrations)",
          "MySQL",
          "Redis (cache, sessions)",
          "MCP (Model Context Protocol)",
          "Any AI model integration (OpenAI, Anthropic, etc.)",
        ],
        accent: "border-t-accent-indigo",
        size: "full",
      },
    ],
  },
  nidusDecisions: {
    title: "NIDUS — Architecture Decisions",
    subtitle: "Family Assistant",
    decisions: [
      { decision: "Monolith", alternative: "Microservices", reason: "Small team, simpler deploy" },
      { decision: "Neon DB (PostgreSQL)", alternative: "Supabase / PlanetScale", reason: "Serverless PostgreSQL, scalable" },
      { decision: "Next.js App Router", alternative: "Pages Router", reason: "Streaming, Server Components" },
      { decision: "JWT + OAuth", alternative: "Session-based", reason: "Stateless, horizontal scaling" },
    ],
    stack: [
      { label: "Frontend", value: "Next.js, TypeScript, TailwindCSS" },
      { label: "Backend", value: "Next.js API Routes (monolith)" },
      { label: "Database", value: "Neon DB (serverless PostgreSQL)" },
      { label: "Auth", value: "JWT + OAuth" },
    ],
  },
  creatorHubDecisions: {
    title: "CREATOR HUB — Architecture Decisions",
    subtitle: "Artist Marketplace",
    decisions: [
      { decision: "Modular Monolith", alternative: "Microservices", reason: "Marketplace acoplado, queries cross-module frequentes" },
      { decision: "PostgreSQL (Supabase)", alternative: "NoSQL", reason: "ACID transactions, integridade de dados crítica" },
      { decision: "Node.js + Next.js API", alternative: "Backend separado", reason: "Type safety end-to-end com TypeScript" },
      { decision: "ASAAS Payments", alternative: "Stripe / Mercado Pago", reason: "Gateway brasileiro, pix, parcelamento" },
    ],
    stack: [
      { label: "Frontend", value: "Next.js, TypeScript, TailwindCSS" },
      { label: "Backend", value: "Next.js API Routes (modular monolith)" },
      { label: "Database", value: "PostgreSQL via Supabase (RLS, Realtime)" },
      { label: "Payments", value: "ASAAS (webhooks, PIX, parcelamento)" },
    ],
  },
  footer: {
    cta: "Let\u2019s talk",
    email: "angelomiguelrib@gmail.com",
    copyright: "Ângelo Miguel",
  },
  nav: {
    languageToggle: "PT",
  },
};

const pt: Translations = {
  hero: {
    name: "Ângelo Miguel",
    tagline: "Desenvolvedor Web Full Stack",
    description:
      "Sistemas que escalam. Decis\u00f5es sobre modas passageiras. Monolitos. Multiten\u00eancia. Quando N\u00c3O usar IA.",
    ctaProjects: "Projetos",
    ctaCvView: "Visualizar CV",
  },
  thinking: {
    title: "O que voc\u00ea realmente faz",
    cards: [
      {
        title: "Arquitetura Fullstack",
        subtitle: "Node.js / Laravel / TypeScript",
        lines: [
          "Padr\u00f5es de monolitos, seguran\u00e7a, pensamento de produto",
        ],
        accent: "border-t-accent-teal",
        size: "large",
      },
      {
        title: "Sistemas Prontos para IA",
        subtitle: "MCP / RAG / Decis\u00e3o Arquitetural",
        lines: [
          "Quando N\u00c3O usar IA. Integra\u00e7\u00e3o com provedores.",
        ],
        accent: "border-t-accent-indigo",
        size: "small",
      },
      {
        title: "Design Sem Apar\u00eancia de IA",
        subtitle: "Blade / Tailwind / UX",
        lines: [
          "Paletas diferenciadas. Micro-intera\u00e7\u00f5es. Nada gen\u00e9rico.",
        ],
        accent: "border-t-accent-gold",
        size: "small",
      },
    ],
  },
  projects: {
    title: "Projetos em Destaque",
    cards: [
      {
        subtitle: "Assistente Familiar",
        title: "NIDUS",
        description: "Monolito. Neon DB. Next.js.",
        tags: ["Monolito", "Neon DB", "Next.js"],
        accent: "border-t-accent-teal",
        size: "large",
        linkLabel: "Decis\u00f5es",
        status: "Em fase final de desenvolvimento",
      },
      {
        subtitle: "Marketplace de Artistas",
        title: "CREATOR HUB",
        description: "Monolito. Supabase. Next.js.",
        tags: ["Node", "TS", "Supabase"],
        accent: "border-t-accent-indigo",
        size: "small",
        linkLabel: "Visitar",
      },
    ],
    cta: "Ver no GitHub",
  },
  technicalDepth: {
    title: "\u00c1reas de Profundidade",
    areas: [
      {
        title: "Padr\u00f5es de Arquitetura",
        items: [
          "Monolito (em camadas, modular)",
          "Event-driven architecture",
          "Idempot\u00eancia, graceful shutdown",
          "Feature flags, estrat\u00e9gias de deploy",
        ],
        accent: "border-t-accent-teal",
        size: "large",
      },
      {
        title: "Backend",
        items: [
          "Node.js (Express, Next.js API)",
          "Laravel (PHP)",
          "APIs REST & GraphQL",
        ],
        accent: "border-t-accent-gold",
        size: "medium",
      },
      {
        title: "Seguran\u00e7a & Opera\u00e7\u00f5es",
        items: [
          "JWT, OAuth, PKCE",
          "RLS, pol\u00edticas de acesso",
          "OWASP top 10",
          "Multiten\u00eancia",
          "Feature flags",
        ],
        accent: "border-t-accent-indigo",
        size: "medium",
      },
      {
        title: "Frontend & UX",
        items: [
          "React, TypeScript",
          "TailwindCSS",
          "Laravel Blade",
          "Micro-intera\u00e7\u00f5es",
          "Acessibilidade WCAG",
        ],
        accent: "border-t-accent-gold",
        size: "medium",
      },
      {
        title: "Banco de Dados & Integra\u00e7\u00e3o com IA",
        items: [
          "PostgreSQL (RLS, indexa\u00e7\u00e3o, migra\u00e7\u00f5es)",
          "MySQL",
          "Redis (cache, sess\u00f5es)",
          "MCP (Model Context Protocol)",
          "Integra\u00e7\u00e3o com qualquer modelo de IA (OpenAI, Anthropic, etc)",
        ],
        accent: "border-t-accent-indigo",
        size: "full",
      },
    ],
  },
  nidusDecisions: {
    title: "NIDUS — Decis\u00f5es de Arquitetura",
    subtitle: "Assistente Familiar",
    decisions: [
      { decision: "Monolito", alternative: "Microservices", reason: "Time pequeno, deploy simplificado" },
      { decision: "Neon DB (PostgreSQL)", alternative: "Supabase / PlanetScale", reason: "PostgreSQL serverless, escal\u00e1vel" },
      { decision: "Next.js App Router", alternative: "Pages Router", reason: "Streaming, Server Components" },
      { decision: "JWT + OAuth", alternative: "Baseado em sess\u00e3o", reason: "Stateless, escala horizontal" },
    ],
    stack: [
      { label: "Frontend", value: "Next.js, TypeScript, TailwindCSS" },
      { label: "Backend", value: "Next.js API Routes (monolito)" },
      { label: "Banco", value: "Neon DB (PostgreSQL serverless)" },
      { label: "Auth", value: "JWT + OAuth" },
    ],
  },
  creatorHubDecisions: {
    title: "CREATOR HUB — Decis\u00f5es de Arquitetura",
    subtitle: "Marketplace de Artistas",
    decisions: [
      { decision: "Monolito Modular", alternative: "Microservices", reason: "Marketplace acoplado, queries cross-module frequentes" },
      { decision: "PostgreSQL (Supabase)", alternative: "NoSQL", reason: "Transa\u00e7\u00f5es ACID, integridade de dados cr\u00edtica" },
      { decision: "Node.js + Next.js API", alternative: "Backend separado", reason: "Type safety ponta a ponta com TypeScript" },
      { decision: "ASAAS", alternative: "Stripe / Mercado Pago", reason: "Gateway brasileiro, PIX, parcelamento" },
    ],
    stack: [
      { label: "Frontend", value: "Next.js, TypeScript, TailwindCSS" },
      { label: "Backend", value: "Next.js API Routes (monolito modular)" },
      { label: "Banco", value: "PostgreSQL via Supabase (RLS, Realtime)" },
      { label: "Pagamentos", value: "ASAAS (webhooks, PIX, parcelamento)" },
    ],
  },
  footer: {
    cta: "Vamos conversar",
    email: "angelomiguelrib@gmail.com",
    copyright: "Ângelo Miguel",
  },
  nav: {
    languageToggle: "EN",
  },
};

export const translations: Record<Language, Translations> = { en, pt };