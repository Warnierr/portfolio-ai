type SectionTitleProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  className,
}: SectionTitleProps) {
  return (
    <div className={`mb-8 space-y-4 ${className ?? ""}`}>
      <span className="section-eyebrow">{eyebrow}</span>
      <div>
        <h2 className="text-3xl font-semibold leading-tight text-[var(--text-primary)] md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-base text-[var(--text-secondary)] md:text-lg">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

