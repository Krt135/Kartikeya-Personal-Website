type SectionLabelProps = {
  label: string;
  className?: string;
};

export function SectionLabel({ label, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.22em] text-primary ${className}`}
    >
      {label}
    </p>
  );
}
