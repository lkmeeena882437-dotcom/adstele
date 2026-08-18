interface KickerProps {
  children: string;
  className?: string;
}

export default function Kicker({ children, className = '' }: KickerProps) {
  return (
    <div className={`kicker ${className}`}>
      <span className="kicker-line" />
      <span className="kicker-label">{children}</span>
      <span className="kicker-line" />
    </div>
  );
}
