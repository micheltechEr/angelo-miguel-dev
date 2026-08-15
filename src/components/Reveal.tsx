import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "header";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = as as "div";

  return (
    <Tag
      ref={ref as never}
      className={`reveal h-full ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? ({ ["--reveal-delay" as string]: `${delay}ms` }) : undefined}
    >
      {children}
    </Tag>
  );
}
