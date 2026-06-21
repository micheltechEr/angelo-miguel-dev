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
  const { t } = useLanguage();
  const data = config ?? t.explicadorAgil;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

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

  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
    }
  }, [open]);

  const ask = (q: Question) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: q.question },
      { role: "assistant", text: q.answer },
    ]);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={data.title}
        aria-expanded={open}
        aria-controls="explicador-panel"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-accent-teal px-5 py-3 text-sm font-semibold text-bg-primary shadow-lg transition-all duration-200 hover:scale-105 hover:bg-accent-teal/90 focus-visible:outline-2 focus-visible:outline-accent-indigo"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!open && <span>{data.title}</span>}
      </button>

      {/* Panel */}
      <div
        id="explicador-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={data.title}
        tabIndex={-1}
        className={`fixed bottom-24 right-6 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col rounded-[12px] border border-border-subtle bg-bg-primary shadow-2xl transition-all duration-300 ease-in-out ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
        style={{ maxHeight: "min(600px, calc(100vh - 8rem))" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
          <h3 className="text-base font-semibold text-text-primary">
            {data.title}
          </h3>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            aria-label="Close"
            className="rounded-[6px] p-1 text-text-hints transition-colors duration-200 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-accent-indigo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Subtitle */}
        <p className="px-5 pt-3 text-xs text-text-hints">
          {data.subtitle}
        </p>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
          {messages.length === 0 && (
            <p className="text-center text-xs text-text-hints pt-6">
              {data.questions.length > 0
                ? data.startText
                : ""}
            </p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-[10px] px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-accent-teal/15 text-text-primary"
                    : "bg-bg-secondary text-text-secondary"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Questions list */}
        {data.questions.length > 0 && (
          <div className="border-t border-border-subtle px-5 py-3 space-y-2">
            {data.questions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => ask(q)}
                className="w-full rounded-[8px] border border-border-subtle bg-bg-secondary px-3 py-2 text-left text-xs text-text-secondary transition-all duration-200 hover:border-accent-teal/40 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-accent-indigo"
              >
                {q.question}
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        {data.cta && (
          <div className="border-t border-border-subtle px-5 py-3">
            <a
              href={data.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-[8px] bg-accent-teal px-4 py-2.5 text-sm font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-teal/90"
            >
              {data.cta.label}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
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
