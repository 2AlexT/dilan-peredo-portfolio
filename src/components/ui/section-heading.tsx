interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  index?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  index,
}: SectionHeadingProps) {
  return (
    <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <div className="flex items-start gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
        {index && <span className="text-accent">{index}</span>}
        <span>{eyebrow}</span>
      </div>

      <div>
        <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
