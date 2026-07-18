import { useState } from "react";
import { gallery } from "@/content/site";
import { ImageLightbox, type LightboxItem } from "./ImageLightbox";
import { SectionLabel } from "./SectionLabel";

export function GallerySection() {
  const [activeItem, setActiveItem] = useState<LightboxItem | null>(null);

  return (
    <>
      <section id="gallery" className="relative overflow-hidden py-28 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,oklch(85%_0.16_195_/_0.05),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <SectionLabel label={gallery.label} />
              <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                {gallery.title}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                {gallery.subtitle}
              </p>

              <figure className="mt-10 border-l border-primary/40 pl-6">
                <blockquote className="font-serif-accent text-2xl leading-relaxed text-foreground md:text-[1.75rem]">
                  {gallery.poem.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </blockquote>
                <figcaption className="mt-6 space-y-1">
                  <p className="font-display text-sm font-medium text-foreground">
                    {gallery.poem.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {gallery.poem.publication}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                    {gallery.poem.year}
                  </p>
                </figcaption>
              </figure>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {gallery.items.map((item) => (
                <button
                  key={item.plate}
                  type="button"
                  aria-label={`Open ${item.title}`}
                  className={`group relative overflow-hidden rounded-2xl border border-border/80 text-left transition-transform hover:-translate-y-0.5 ${
                    item.span === "tall" ? "row-span-2 min-h-[320px]" : "min-h-[160px]"
                  }`}
                  onClick={() => setActiveItem(item)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                      Plate {item.plate}
                    </p>
                    <p className="mt-1 font-display text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ImageLightbox item={activeItem} onClose={() => setActiveItem(null)} />
    </>
  );
}
