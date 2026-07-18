import { systems } from "../content";

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function DiceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8" cy="8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="8" cy="16" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="16" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const icons: Record<string, () => JSX.Element> = {
  Simulation: GearIcon,
  Game: DiceIcon,
};

export default function Systems() {
  return (
    <section id="systems" className="py-20 md:py-28 rule">
      <div className="mx-auto max-w-content px-6">
        <p className="eyebrow mb-4">{systems.eyebrow}</p>
        <h2 className="font-display text-3xl md:text-[2.6rem] leading-tight max-w-2xl">
          {systems.heading}
        </h2>
        <p className="mt-5 max-w-xl text-ink/65 text-[15px] leading-relaxed">
          {systems.intro}
        </p>

        <div className="mt-16 space-y-16">
          {systems.projects.map((p) => {
            const Icon = icons[p.kicker];
            return (
              <article
                key={p.title}
                className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start border-t border-ink/10 pt-12 first:border-t-0 first:pt-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-sm border border-moss/30 bg-moss/[0.06] text-moss px-2.5 py-1 font-mono text-[11px] tracking-wide uppercase">
                      {Icon && <Icon />}
                      {p.kicker}
                    </span>
                    <span className="font-mono text-[11px] text-ink/45">
                      {p.tags.join(" · ")}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl">{p.title}</h3>
                  <p className="mt-4 text-ink/70 text-[15px] leading-relaxed">
                    {p.description}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {p.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-[14px] text-ink/75 leading-snug"
                      >
                        <span className="text-moss mt-[7px] w-3 h-px bg-moss shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.pills.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-ink/15 px-3 py-1 font-mono text-[11px] text-ink/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-md overflow-hidden border border-ink/15 bg-[#12151a] text-[#d7dbe0]">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 font-mono text-[11px] text-white/45">
                    <span className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                    </span>
                    <span>{p.codeLabel}</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-[12.5px] leading-relaxed font-mono">
                    <code>{p.code}</code>
                  </pre>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
