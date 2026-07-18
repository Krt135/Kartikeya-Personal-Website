import { hero } from "../content";
import FluidVisual from "./FluidVisual";

export default function Hero() {
  return (
    <section id="top" className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-content px-6">
        <p className="eyebrow mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-moss" />
          {hero.eyebrow}
        </p>

        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-end">
          <div>
            <h1 className="font-display font-medium text-[13vw] leading-[0.98] sm:text-6xl md:text-6xl lg:text-7xl tracking-tight">
              {hero.headline.map(([prefix, accent, suffix], i) => (
                <span key={i} className="block">
                  {prefix}
                  <em className="text-moss italic font-normal">{accent}</em>
                  {suffix}
                </span>
              ))}
            </h1>

            <p className="mt-8 max-w-xl text-ink/70 text-[15px] leading-relaxed">
              {hero.subhead}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={hero.ctaPrimary.href}
                className="inline-flex items-center rounded-sm bg-ink text-paper px-5 py-2.5 font-mono text-[13px] tracking-wide hover:bg-moss transition-colors focus-ring"
              >
                {hero.ctaPrimary.label}
              </a>
              <a
                href={hero.ctaSecondary.href}
                className="inline-flex items-center rounded-sm border border-ink/25 px-5 py-2.5 font-mono text-[13px] tracking-wide hover:border-ink transition-colors focus-ring"
              >
                {hero.ctaSecondary.label}
              </a>
            </div>

            <dl className="mt-14 grid grid-cols-3 max-w-md border-t border-ink/10 pt-6">
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="eyebrow">{s.label}</dt>
                  <dd className="font-display text-2xl mt-1">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <FluidVisual />
        </div>
      </div>
    </section>
  );
}
