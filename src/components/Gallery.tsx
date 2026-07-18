import { gallery } from "../content";

export default function Gallery() {
  const [p1, p2, p3, p4] = gallery.plates;

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

        <div className="mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <span className="font-display text-5xl text-gold leading-none block mb-2">
              &ldquo;
            </span>
            <blockquote className="border-l-2 border-gold pl-6 md:pl-8 max-w-lg">
              <p className="font-display italic text-xl md:text-2xl leading-relaxed text-ink/90">
                {gallery.poem.lines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <footer className="mt-6 flex items-center gap-3 font-mono text-[12px] text-ink/50 tracking-wide">
                <span>{gallery.poem.attribution}</span>
                <span className="text-ink/25">·</span>
                <span className="font-display">{gallery.poem.source}</span>
                <span className="ml-auto rounded-full border border-ink/15 px-2.5 py-1 text-[10px] uppercase tracking-wider">
                  {gallery.poem.date}
                </span>
              </footer>
            </blockquote>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Plate plate={p1} className="row-span-2" />
            <Plate plate={p2} />
            <Plate plate={p3} />
            <Plate plate={p4} className="col-span-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Plate({
  plate,
  className = "",
}: {
  plate: (typeof gallery.plates)[number];
  className?: string;
}) {
  return (
    <figure className={`group ${className}`}>
      <div className="relative overflow-hidden rounded-md border border-ink/15 h-full aspect-[4/5]">
        <img
          src={plate.src}
          alt={plate.alt}
          loading="lazy"
          className="w-full h-full object-cover grayscale-[15%] group-hover:scale-[1.04] group-hover:grayscale-0 transition-all duration-500 ease-out"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-3">
          <p className="font-mono text-[10px] tracking-wide text-paper/70 uppercase">
            {plate.plate}
          </p>
          <p className="font-display text-[15px] text-paper">{plate.caption}</p>
        </div>
      </div>
    </figure>
  );
}
