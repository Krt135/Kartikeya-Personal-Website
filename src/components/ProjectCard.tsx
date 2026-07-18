type ProjectCardProps = {
  badge: string;
  tags: string;
  title: string;
  description: string;
  bullets: readonly string[];
  codeFile: string;
  code: string;
};

export function ProjectCard({
  badge,
  tags,
  title,
  description,
  bullets,
  codeFile,
  code,
}: ProjectCardProps) {
  return (
    <article className="glass-card flex h-full flex-col rounded-2xl p-6 md:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          {badge}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {tags}
        </span>
      </div>

      <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem]">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
        {description}
      </p>

      <ul className="mt-6 space-y-3">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90"
          >
            <span className="mt-2 h-px w-4 shrink-0 bg-primary" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <div className="overflow-hidden rounded-xl border border-border/80 bg-background/70">
          <div className="flex items-center justify-between border-b border-border/70 px-4 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
              <span className="h-2 w-2 rounded-full bg-border" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {codeFile}
            </span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-6 text-muted-foreground">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </article>
  );
}
