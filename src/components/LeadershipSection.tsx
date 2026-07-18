import { leadership, sections } from "@/content/site";
import { LeadershipCard } from "./LeadershipCard";
import { SectionLabel } from "./SectionLabel";

export function LeadershipSection() {
  return (
    <section id="lead" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-12">
          <SectionLabel label={sections.leadership.label} className="md:pt-2" />
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              {sections.leadership.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {sections.leadership.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-14 space-y-6">
          {leadership.map((item) => (
            <LeadershipCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
