import { leadership } from "../content";

export default function Leadership() {
  return (
    <section id="lead" className="py-20 md:py-28 rule bg-ink/[0.025]">
      <div className="mx-auto max-w-content px-6">
        <p className="eyebrow mb-4">{leadership.eyebrow}</p>
        <h2 className="font-display text-3xl md:text-[2.6rem] leading-tight max-w-2xl">
          {leadership.heading}
        </h2>
        <p className="mt-5 max-w-xl text-ink/65 text-[15px] leading-relaxed">
          {leadership.intro}
        </p>

        <div className="mt-16 space-y-16">
          {leadership.roles.map((r, idx) => (
            <article
              key={r.role}
              className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start border-t border-ink/10 pt-12 first:border-t-0 first:pt-0"
            >
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <span className="eyebrow text-rust">{r.role}</span>
                <h3 className="font-display text-2xl md:text-3xl mt-3">
                  {r.title}
                </h3>
                <p className="mt-4 text-ink/70 text-[15px] leading-relaxed">
                  {r.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {r.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 text-[14px] text-ink/75 leading-snug"
                    >
                      <span className="text-rust mt-[1px] font-mono text-[13px]">↗</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`rounded-md border border-ink/15 bg-paper p-6 ${
                  idx % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] text-ink/45">
                  <span>{r.panelLabel}</span>
                  <span>{r.panelHeading}</span>
                </div>
                <p className="font-display text-xl mt-6">{r.panelSub}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {r.panelTags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ink/15 px-3 py-1 font-mono text-[11px] text-ink/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {r.tracks && (
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {r.tracks.map((t) => (
                      <div
                        key={t}
                        className="rounded border border-ink/10 px-3 py-3 text-center"
                      >
                        <p className="eyebrow">Track</p>
                        <p className="font-display mt-1">{t}</p>
                      </div>
                    ))}
                  </div>
                )}

                {r.stats && (
                  <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-ink/10 pt-6">
                    {r.stats.map((s) => (
                      <div key={s.label}>
                        <dt className="eyebrow">{s.label}</dt>
                        <dd className="font-display text-xl mt-1">
                          {s.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
