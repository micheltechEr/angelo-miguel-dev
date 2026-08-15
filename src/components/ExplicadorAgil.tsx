import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";

type Message = { role: "user" | "assistant"; text: string };
type Question = { question: string; answer: string };

export type ExplicadorAgilConfig = {
  title: string;
  subtitle: string;
  startText: string;
  questions: Question[];
  cta?: { label: string; href: string };
};

type Props = {
  config?: ExplicadorAgilConfig;
};

export default function ExplicadorAgil({ config }: Props) {
  const { t, language } = useLanguage();
  const data = config ?? t.explicadorAgil;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Scroll chat area to bottom when messages update
  useEffect(() => {
    if (open && chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, open]);

  // Clean chat when language switches to avoid mixed-lingual dialogs
  useEffect(() => {
    setMessages([]);
    setAskedQuestions([]);
  }, [language]);

  // ESC key listener to close panel
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Focus panel on open
  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
    }
  }, [open]);

  const ask = (q: Question) => {
    if (askedQuestions.includes(q.question)) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: q.question },
      { role: "assistant", text: q.answer },
    ]);
    setAskedQuestions((prev) => [...prev, q.question]);
  };

  // Filter out questions already clicked
  const availableQuestions = data.questions.filter(
    (q) => !askedQuestions.includes(q.question)
  );

  return (
    <>
      {/* Cybernetic Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={data.title}
        aria-expanded={open}
        aria-controls="explicador-panel"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-[6px] border border-accent-teal/30 bg-bg-secondary/90 px-4 py-3 font-mono text-xs font-semibold text-accent-teal shadow-[0_0_15px_rgba(31,224,182,0.15)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-accent-teal hover:shadow-[0_0_20px_rgba(31,224,182,0.3)] focus-visible:outline-2 focus-visible:outline-accent-teal"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-teal"></span>
        </span>
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1 -2 2H7l-4 4V5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!open && <span className="tracking-wider uppercase text-[10px]">{data.title}</span>}
      </button>

      {/* Cybernetic Panel Panel */}
      <div
        id="explicador-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={data.title}
        tabIndex={-1}
        className={`fixed bottom-24 right-6 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col rounded-[6px] border border-border-strong bg-bg-secondary/95 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 ease-in-out ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
        style={{ maxHeight: "min(550px, calc(100vh - 8rem))" }}
      >
        {/* Decorative cyber corner ticks */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent-teal/50" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent-teal/50" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent-teal/50" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent-teal/50" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3 bg-bg-primary/40">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-teal animate-pulse" />
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-text-primary">
              {data.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            aria-label="Close"
            className="rounded-[4px] p-1 text-text-hints transition-colors duration-200 hover:text-accent-teal focus-visible:outline-2 focus-visible:outline-accent-teal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Subtitle / System Log Info */}
        <div className="px-4 py-2 border-b border-border-subtle/50 bg-black/20 font-mono text-[9px] text-text-hints flex justify-between">
          <span>PORT: 8080 // SSL</span>
          <span>{data.subtitle}</span>
        </div>

        {/* Chat area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-4 font-mono text-[11px]"
        >
          {messages.length === 0 && (
            <div className="text-center text-text-hints pt-8 leading-relaxed">
              <span className="text-accent-teal font-bold">{"> "}</span>
              {availableQuestions.length > 0 ? data.startText : "System Ready."}
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <span className="text-[9px] text-text-hints mb-1">
                {msg.role === "user" ? "[USER_EXEC]:" : "[SYS_LOG]:"}
              </span>
              <div
                className={`max-w-[90%] rounded-[4px] px-3.5 py-2.5 leading-relaxed ${
                  msg.role === "user"
                    ? "border border-accent-teal/20 bg-accent-teal/5 text-accent-teal"
                    : "border border-border-subtle bg-bg-primary/60 text-text-secondary"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Questions list */}
        {availableQuestions.length > 0 && (
          <div className="border-t border-border-subtle px-4 py-3 space-y-2 bg-bg-primary/20">
            {availableQuestions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => ask(q)}
                className="w-full rounded-[4px] border border-border-subtle bg-bg-secondary/40 px-3 py-2 text-left font-mono text-[10px] text-text-secondary transition-all duration-200 hover:border-accent-teal/40 hover:text-accent-teal focus-visible:outline-2 focus-visible:outline-accent-teal"
              >
                <span className="text-accent-teal mr-1.5">&gt;</span>
                {q.question}
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        {data.cta && (
          <div className="border-t border-border-subtle px-4 py-3 bg-bg-primary/40">
            <a
              href={data.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-[4px] bg-accent-teal px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-bg-primary transition-all duration-300 hover:bg-accent-teal/90 hover:shadow-[0_0_15px_rgba(31,224,182,0.3)]"
            >
              {data.cta.label}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13 v6 a2 2 0 0 1 -2 2 H5 a2 2 0 0 1 -2 -2 V8 a2 2 0 0 1 2 -2 h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
