import { gallery } from "../content";

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 rule">
      <div className="mx-auto max-w-content px-6">
        <p className="eyebrow mb-4">{gallery.eyebrow}</p>
        <h2 className="font-display text-3xl md:text-[2.6rem] leading-tight max-w-2xl">
          {gallery.heading}
        </h2>
        <p className="mt-5 max-w-xl text-ink/65 text-[15px] leading-relaxed">
          {gallery.intro}
        </p>

        <blockquote className="mt-14 border-l-2 border-gold pl-6 md:pl-8 max-w-2xl">
          <p className="font-display italic text-xl md:text-2xl leading-relaxed text-ink/90">
            {gallery.poem.lines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
          <footer className="mt-5 font-mono text-[12px] text-ink/50 tracking-wide">
            {gallery.poem.attribution} — {gallery.poem.source} — {gallery.poem.date}
          </footer>
        </blockquote>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.plates.map((p) => (
            <figure key={p.plate} className="group">
              <div className="overflow-hidden rounded-md border border-ink/15 aspect-[4/5]">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[15%] group-hover:scale-[1.04] group-hover:grayscale-0 transition-all duration-500 ease-out"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-wide text-ink/45">
                  {p.plate}
                </span>
                <span className="font-display text-[15px]">{p.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
