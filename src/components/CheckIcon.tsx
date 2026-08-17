interface CheckIconProps {
  className?: string;
}

export default function CheckIcon({ className = '' }: CheckIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${className}`}
      fill="none"
    >
      <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.16" />
      <path d="m4.7 8.1 2.05 2.05 4.55-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
