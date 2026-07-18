import { projects, sections } from "@/content/site";
import { ProjectCard } from "./ProjectCard";
import { SectionLabel } from "./SectionLabel";

export function SystemsSection() {
  return (
    <section id="systems" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-12">
          <SectionLabel label={sections.systems.label} className="md:pt-2" />
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              {sections.systems.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {sections.systems.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
