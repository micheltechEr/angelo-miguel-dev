export type Language = "en" | "pt";

export interface Translations {
  hero: {
    name: string;
    tagline: string;
    description: string;
    ctaProjects: string;
    ctaCvView: string;
  };
  preloader: {
    label: string;
    tagline: string;
    boot: string[];
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
      liveUrl?: string;
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
  autoMatchDecisions: {
    title: string;
    subtitle: string;
    decisions: Array<{ decision: string; alternative: string; reason: string }>;
    stack: Array<{ label: string; value: string }>;
  };
  servicesByNiche: {
    title: string;
    description: string;
    structures: {
      standard: { name: string; characteristics: string[] };
      custom: { name: string; characteristics: string[] };
    };
    niches: Array<{
      name: string;
      accent: string;
      sites?: Array<{ name: string; url: string }>;
    }>;
    cta: {
      message: string;
      button: string;
      whatsapp: string;
      whatsappText: string;
    };
  };
  footer: {
    cta: string;
    sub: string;
    email: string;
    copyright: string;
    solucoesLink: string;
  };
  nav: {
    languageToggle: string;
    projects: string;
    thinking: string;
    depth: string;
    contact: string;
    role: string;
  };
  explicadorAgil: {
    title: string;
    subtitle: string;
    startText: string;
    questions: Array<{ question: string; answer: string }>;
    cta: { label: string; href: string };
  };
  solucoes: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    ctaWhatsapp: string;
    ctaServices: string;
    explicador: {
      title: string;
      subtitle: string;
      startText: string;
      questions: Array<{ question: string; answer: string }>;
      cta: { label: string; href: string };
    };
  };
}

const en: Translations = {
  hero: {
    name: "Ângelo Miguel",
    tagline: "Full Stack Web Developer",
    description:
      "Full Stack Web Developer specialized in Node.js, TypeScript, React, and Laravel. Building reliable web applications, clean data architectures, and scalable APIs.",
    ctaProjects: "Projects",
    ctaCvView: "View CV",
  },
  preloader: {
    label: "Loading portfolio",
    tagline: "Full Stack Developer",
    boot: [
      "init architecture",
      "load modules",
      "secure auth",
      "ready",
    ],
  },
  thinking: {
    title: "Engineering Mindset",
    cards: [
      {
        title: "Pragmatic System Architecture",
        subtitle: "Node.js / Laravel / TypeScript",
        lines: [
          "Focusing on modular monoliths, clear domain boundaries, and security before adding unnecessary complexity.",
        ],
        accent: "border-t border-accent-teal/40",
        size: "large",
      },
      {
        title: "Purposeful AI Integration",
        subtitle: "MCP / RAG / Vector & Relational DBs",
        lines: [
          "Integrating LLMs and vector search where they solve real user problems, keeping plain SQL queries when speed and accuracy matter.",
        ],
        accent: "border-t border-accent-teal/40",
        size: "small",
      },
      {
        title: "Clean & Intuitive Interfaces",
        subtitle: "React / Tailwind / UX",
        lines: [
          "Prioritizing strong typography, responsive layouts, and smooth interactions designed for real usability.",
        ],
        accent: "border-t border-accent-teal/40",
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
        accent: "border-t-accent-violet",
        size: "small",
        linkLabel: "Visit",
        liveUrl: "https://creatorhub-g4pn.onrender.com/",
      },
      {
        subtitle: "What do you need?",
        title: "AUTO MATCH",
        description: "Monolith. Next.js. React. TypeScript. PostgreSQL.",
        tags: ["Next.js", "React", "TypeScript", "PostgreSQL"],
        accent: "border-t-accent-amber",
        size: "small",
        linkLabel: "Details",
        liveUrl: "https://match-auto-1.onrender.com/",
      },
    ],
    cta: "View on GitHub",
  },
  technicalDepth: {
    title: "Where I go deep",
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
        accent: "border-t-accent-amber",
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
        accent: "border-t-accent-violet",
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
        accent: "border-t-accent-amber",
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
        accent: "border-t-accent-violet",
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
  autoMatchDecisions: {
    title: "AUTO MATCH — Architecture Decisions",
    subtitle: "What do you need?",
    decisions: [
      { decision: "Monolith", alternative: "Microservices", reason: "Small team, simpler deploy" },
      { decision: "PostgreSQL (Supabase)", alternative: "NoSQL", reason: "ACID transactions, critical data integrity" },
      { decision: "Next.js API Routes", alternative: "Separate Backend", reason: "End-to-end TypeScript, single deploy" },
      { decision: "Pure JWT Auth", alternative: "OAuth / Sessions", reason: "Stateless, simple, no external dependency" },
    ],
    stack: [
      { label: "Frontend", value: "React, TypeScript, TailwindCSS" },
      { label: "Backend", value: "Next.js API Routes (monolith)" },
      { label: "Database", value: "PostgreSQL via Supabase" },
      { label: "Auth", value: "Pure JWT" },
    ],
  },
  servicesByNiche: {
    title: "Services by Niche",
    description: "Institutional website solutions tailored to each industry — illustrative examples.",
    structures: {
      standard: {
        name: "Standard Structure",
        characteristics: [
          "Validated structure",
          "Basic SEO",
          "Ready-made sections",
          "Customizable colors, images, texts, and visual identity",
        ],
      },
      custom: {
        name: "Custom Structure",
        characteristics: [
          "Exclusive architecture",
          "Unique design",
          "Custom flow",
          "Specific functionalities",
          "Prototype created after requirements gathering",
        ],
      },
    },
    niches: [
      { name: "Dentistry", accent: "border-t-accent-teal", sites: [{ name: "Instituto Sorriso Prime", url: "https://institutosorrisoprime.vercel.app/" }, { name: "Clínica OdontoViva", url: "https://clnicaodontoviva.vercel.app/" }] },
      { name: "Law", accent: "border-t-accent-violet" },
      { name: "Real Estate", accent: "border-t-accent-amber" },
      { name: "Medical Clinics", accent: "border-t-accent-teal" },
      { name: "Gyms", accent: "border-t-accent-violet" },
    ],
    cta: {
      message: "We don't use pre-defined templates.\nEach project is planned according to business goals.",
      button: "Request project analysis",
      whatsapp: "5575988428289",
      whatsappText: "Quero um orçamento personalizado",
    },
  },
  footer: {
    cta: "Let's build something that lasts",
    sub: "Got a system that needs to scale, a monolith that needs untangling, or an idea that just needs the right architecture? My inbox is open.",
    email: "angelomiguelrib@gmail.com",
    copyright: "Ângelo Miguel",
    solucoesLink: "Need a website? →",
  },
  nav: {
    languageToggle: "PT",
    projects: "Projects",
    thinking: "How I think",
    depth: "Depth",
    contact: "Contact",
    role: "Full Stack Dev",
  },
  solucoes: {
    badge: "Web Solutions",
    title: "Your Business Deserves a Professional Website",
    subtitle: "Clear. Modern. Effective.",
    description:
      "No technical jargon. No complexity. Just a website that presents your business professionally, loads fast on any device, and helps you attract more clients.",
    ctaWhatsapp: "Request Quote",
    ctaServices: "See Solutions",
    explicador: {
      title: "Quick Help",
      subtitle: "Answers about our services",
      startText: "Choose a question below to get started.",
      questions: [
        {
          question: "How long does it take to build a site?",
          answer: "Standard structure sites are delivered in 2-3 weeks. Custom projects vary based on requirements.",
        },
        {
          question: "Do I need technical knowledge?",
          answer: "Not at all. We handle everything from domain registration to hosting setup. You just send us your content.",
        },
        {
          question: "What if I need changes after the site is live?",
          answer: "Changes are covered within the first 30 days after delivery. Beyond that, a new budget will be quoted.",
        },
      ],
      cta: {
        label: "Request Quote",
        href: "https://wa.me/5575988428289?text=Quero%20um%20or%C3%A7amento%20personalizado",
      },
    },
  },
  explicadorAgil: {
    title: "Agile Explorer",
    subtitle: "Get quick answers about our services",
    startText: "Choose a question below to get started.",
    questions: [
      {
        question: "Who is the Standard Structure for?",
        answer: "Ideal for businesses that need a professional institutional website with a shorter development timeline.",
      },
      {
        question: "What's the difference from the Custom Structure?",
        answer: "The Standard Structure uses a pre-validated architecture while the Custom Structure is built from scratch with a unique design and exclusive features.",
      },
      {
        question: "Can I change colors and images in the Standard Structure?",
        answer: "Yes. The Standard Structure allows full customization of colors, images, texts, and visual identity to match your brand.",
      },
      {
        question: "How does the Custom Structure process work?",
        answer: "We start with a requirements gathering phase, then create a prototype, followed by development of the exclusive architecture and custom flow.",
      },
    ],
    cta: {
      label: "Request project analysis",
      href: "https://wa.me/5575988428289?text=Quero%20um%20orçamento%20personalizado",
    },
  },
};

const pt: Translations = {
  hero: {
    name: "Ângelo Miguel",
    tagline: "Desenvolvedor Web Full Stack",
    description:
      "Desenvolvedor Web Full Stack focado em Node.js, TypeScript, React e Laravel. Especializado na construção de aplicações web robustas, arquitetura de dados e APIs escaláveis.",
    ctaProjects: "Projetos",
    ctaCvView: "Visualizar CV",
  },
  preloader: {
    label: "Carregando portfólio",
    tagline: "Desenvolvedor Full Stack",
    boot: [
      "inicializando arquitetura",
      "carregando módulos",
      "autenticação segura",
      "pronto",
    ],
  },
  thinking: {
    title: "Como Penso e Construo",
    cards: [
      {
        title: "Arquitetura Pragmática de Sistemas",
        subtitle: "Node.js / Laravel / TypeScript",
        lines: [
          "Foco em monolitos modulares, separação clara de domínios e autenticação sólida antes de introduzir complexidade desnecessária.",
        ],
        accent: "border-t border-accent-teal/40",
        size: "large",
      },
      {
        title: "Integração Prática de IA",
        subtitle: "MCP / RAG / Bancos Vetoriais e Relacionais",
        lines: [
          "Integração de LLMs e busca vetorial onde agregam valor real, priorizando consultas SQL diretas quando oferecem maior velocidade e precisão.",
        ],
        accent: "border-t border-accent-teal/40",
        size: "small",
      },
      {
        title: "Interfaces Limpas e Intuitivas",
        subtitle: "React / Tailwind / UX",
        lines: [
          "Prioridade para tipografia clara, layouts responsivos e interações fluidas focadas na experiência do usuário.",
        ],
        accent: "border-t border-accent-teal/40",
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
        accent: "border-t-accent-violet",
        size: "small",
        linkLabel: "Visitar",
        liveUrl: "https://creatorhub-g4pn.onrender.com/",
      },
      {
        subtitle: "Do que você precisa?",
        title: "AUTO MATCH",
        description: "Monolito. Next.js. React. TypeScript. PostgreSQL.",
        tags: ["Next.js", "React", "TypeScript", "PostgreSQL"],
        accent: "border-t-accent-amber",
        size: "small",
        linkLabel: "Detalhes",
        liveUrl: "https://match-auto-1.onrender.com/",
      },
    ],
    cta: "Ver no GitHub",
  },
  technicalDepth: {
    title: "Onde eu vou fundo",
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
        accent: "border-t-accent-amber",
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
        accent: "border-t-accent-violet",
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
        accent: "border-t-accent-amber",
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
        accent: "border-t-accent-violet",
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
  autoMatchDecisions: {
    title: "AUTO MATCH — Decisões de Arquitetura",
    subtitle: "Do que você precisa?",
    decisions: [
      { decision: "Monolito", alternative: "Microservices", reason: "Time pequeno, deploy simplificado" },
      { decision: "PostgreSQL (Supabase)", alternative: "NoSQL", reason: "Transações ACID, integridade de dados crítica" },
      { decision: "Next.js API Routes", alternative: "Backend separado", reason: "TypeScript ponta a ponta, deploy único" },
      { decision: "JWT Puro", alternative: "OAuth / Sessões", reason: "Stateless, simples, sem dependência externa" },
    ],
    stack: [
      { label: "Frontend", value: "React, TypeScript, TailwindCSS" },
      { label: "Backend", value: "Next.js API Routes (monolito)" },
      { label: "Banco", value: "PostgreSQL via Supabase" },
      { label: "Auth", value: "JWT Puro" },
    ],
  },
  servicesByNiche: {
    title: "Serviços por Nicho",
    description: "Soluções de site institucional sob medida para cada segmento — exemplos ilustrativos.",
    structures: {
      standard: {
        name: "Estrutura Padrão",
        characteristics: [
          "Estrutura validada",
          "SEO básico",
          "Seções prontas",
          "Mudança de cores, imagens, textos e identidade visual",
        ],
      },
      custom: {
        name: "Estrutura Personalizada",
        characteristics: [
          "Arquitetura exclusiva",
          "Design único",
          "Fluxo personalizado",
          "Funcionalidades específicas",
          "Protótipo criado após levantamento dos requisitos",
        ],
      },
    },
    niches: [
      { name: "Odontologia", accent: "border-t-accent-teal", sites: [{ name: "Instituto Sorriso Prime", url: "https://institutosorrisoprime.vercel.app/" }, { name: "Clínica OdontoViva", url: "https://clnicaodontoviva.vercel.app/" }] },
      { name: "Advocacia", accent: "border-t-accent-violet" },
      { name: "Imobiliárias", accent: "border-t-accent-amber" },
      { name: "Clínicas Médicas", accent: "border-t-accent-teal" },
      { name: "Academias", accent: "border-t-accent-violet" },
    ],
    cta: {
      message: "Não utilizamos modelos pré-definidos.\nCada projeto é planejado conforme os objetivos do negócio.",
      button: "Solicitar análise do projeto",
      whatsapp: "5575988428289",
      whatsappText: "Quero um orçamento personalizado",
    },
  },
  footer: {
    cta: "Vamos construir algo que dura",
    sub: "Tem um sistema pra escalar, um monolito pra desembaraçar ou uma ideia que só precisa da arquitetura certa? Minha caixa de entrada está aberta.",
    email: "angelomiguelrib@gmail.com",
    copyright: "Ângelo Miguel",
    solucoesLink: "Precisa de um site? →",
  },
  nav: {
    languageToggle: "EN",
    projects: "Projetos",
    thinking: "Como penso",
    depth: "Profundidade",
    contact: "Contato",
    role: "Dev Full Stack",
  },
  solucoes: {
    badge: "Soluções Web",
    title: "Seu Negócio Merece um Site Profissional",
    subtitle: "Claro. Moderno. Eficaz.",
    description:
      "Sem termos técnicos. Sem complicação. Apenas um site que apresenta seu negócio profissionalmente, carrega rápido em qualquer dispositivo e ajuda você a atrair mais clientes.",
    ctaWhatsapp: "Solicitar Orçamento",
    ctaServices: "Ver Soluções",
    explicador: {
      title: "Ajuda Rápida",
      subtitle: "Respostas sobre nossos serviços",
      startText: "Escolha uma pergunta abaixo para começar.",
      questions: [
        {
          question: "Quanto tempo leva para fazer um site?",
          answer: "Sites com estrutura padrão ficam prontos em 2 a 3 semanas. Projetos personalizados variam conforme os requisitos.",
        },
        {
          question: "Preciso ter conhecimento técnico?",
          answer: "De forma alguma. Cuidamos de tudo, desde o registro do domínio até a hospedagem. Você só envia o conteúdo.",
        },
        {
          question: "E se eu precisar de mudanças depois do site no ar?",
          answer: "Mudanças estão cobertas nos primeiros 30 dias após a entrega. Após esse período, um novo orçamento será cotado.",
        },
      ],
      cta: {
        label: "Solicitar Orçamento",
        href: "https://wa.me/5575988428289?text=Quero%20um%20or%C3%A7amento%20personalizado",
      },
    },
  },
  explicadorAgil: {
    title: "Explicador Ágil",
    subtitle: "Tire suas dúvidas rapidamente",
    startText: "Escolha uma pergunta abaixo para começar.",
    questions: [
      {
        question: "Para quem a Estrutura Padrão é recomendada?",
        answer: "Ideal para empresas que precisam de um site institucional profissional com menor prazo de desenvolvimento.",
      },
      {
        question: "Qual a diferença para a Estrutura Personalizada?",
        answer: "A Estrutura Padrão utiliza uma arquitetura previamente validada enquanto a Personalizada é criada do zero com design único e funcionalidades exclusivas.",
      },
      {
        question: "Posso mudar as cores e imagens na Estrutura Padrão?",
        answer: "Sim. A Estrutura Padrão permite personalizar cores, imagens, textos e identidade visual para se adequar à sua marca.",
      },
      {
        question: "Como funciona o processo da Estrutura Personalizada?",
        answer: "Fazemos um levantamento de requisitos, criamos um protótipo, e então desenvolvemos a arquitetura exclusiva com fluxo personalizado.",
      },
    ],
    cta: {
      label: "Solicitar análise do projeto",
      href: "https://wa.me/5575988428289?text=Quero%20um%20orçamento%20personalizado",
    },
  },
};

export const translations: Record<Language, Translations> = { en, pt };