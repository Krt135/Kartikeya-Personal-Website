import { systems } from "../content";

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
          {systems.projects.map((p) => (
            <article
              key={p.title}
              className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start border-t border-ink/10 pt-12 first:border-t-0 first:pt-0"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="eyebrow text-moss">{p.kicker}</span>
                  <span className="text-ink/30">·</span>
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
                      <span className="text-moss mt-[3px] font-mono">→</span>
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
                  <span>{p.codeLabel}</span>
                  <span className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                  </span>
                </div>
                <pre className="p-4 overflow-x-auto text-[12.5px] leading-relaxed font-mono">
                  <code>{p.code}</code>
                </pre>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
