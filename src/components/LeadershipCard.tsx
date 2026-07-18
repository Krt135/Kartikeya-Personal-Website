type LeadershipPreview = {
  domain: string;
  season: string;
  headline: readonly string[];
  tags: readonly string[];
  tracks: readonly string[];
};

type LeadershipCardProps = {
  role: string;
  title: string;
  description: string;
  bullets: readonly string[];
  preview: LeadershipPreview;
};

function LeadershipPreviewPanel({ preview }: { preview: LeadershipPreview }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-background/60">
      <div className="border-b border-border/70 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
            {preview.season}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {preview.domain}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          {preview.headline.map((line) => (
            <p
              key={line}
              className="font-display text-xl font-semibold leading-tight text-foreground"
            >
              {line}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {preview.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {preview.tracks.map((track) => (
            <div
              key={track}
              className="rounded-xl border border-border/70 bg-card/80 px-3 py-3 text-center"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Track
              </p>
              <p className="mt-1 font-display text-sm font-medium text-foreground">
                {track}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LeadershipCard({
  role,
  title,
  description,
  bullets,
  preview,
}: LeadershipCardProps) {
  return (
    <article className="glass-card grid gap-8 rounded-2xl p-6 md:grid-cols-[1.05fr_0.95fr] md:p-7">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
          {role}
        </p>
        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground md:text-[1.85rem]">
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
      </div>

      <LeadershipPreviewPanel preview={preview} />
    </article>
  );
}
