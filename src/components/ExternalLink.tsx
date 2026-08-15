type Props = {
  size?: number;
  className?: string;
};

export default function ExternalLink({ size = 14, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 13 L18 19 A2 2 0 0 1 16 21 L5 21 A2 2 0 0 1 3 19 L3 8 A2 2 0 0 1 5 6 L11 6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
