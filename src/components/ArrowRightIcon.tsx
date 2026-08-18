type Props = {
  className?: string;
};

export default function ArrowRightIcon({ className = '' }: Props) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 18 18"
      className={className}
      fill="none"
    >
      <path d="M3.5 9h10M9.5 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
