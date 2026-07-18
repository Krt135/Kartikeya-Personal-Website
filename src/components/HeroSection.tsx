import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { SpFluidCanvas } from "./SpFluidCanvas";

export function HeroSection() {
  const { headline } = site;

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(85%_0.16_195_/_0.08),transparent_45%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-10 md:px-10">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-primary" />
            {site.tagline}
          </p>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-[4.25rem]">
            {headline.prefix}{" "}
            <span className="font-serif-accent text-gradient-primary">
              {headline.accents[0]}
            </span>
            {headline.connectors[0]}
            <span className="font-serif-accent text-gradient-primary">
              {headline.accents[1]}
            </span>
            {headline.connectors[1]}
            <span className="font-serif-accent text-gradient-primary">
              {headline.accents[2]}
            </span>
            {headline.suffix}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {site.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#systems"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-display text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Explore the work
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center rounded-full border border-border px-5 py-2.5 font-display text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              Read the poetry
            </a>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border/70 pt-8">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <SpFluidCanvas />
      </div>
    </section>
  );
}
