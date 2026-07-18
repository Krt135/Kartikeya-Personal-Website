import { site, footer } from "../content";

export default function Footer() {
  return (
    <footer className="rule py-16">
      <div className="mx-auto max-w-content px-6">
        <div className="grid sm:grid-cols-3 gap-10">
          <div>
            <p className="font-display text-xl">{site.name}</p>
            <p className="mt-2 text-ink/60 text-[14px] max-w-xs">
              {footer.tagline}
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3">Elsewhere</p>
            <ul className="space-y-2 font-mono text-[13px]">
              {footer.elsewhere.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-ink/70 hover:text-ink transition-colors focus-ring"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3">Sections</p>
            <ul className="space-y-2 font-mono text-[13px]">
              {footer.sections.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-ink/70 hover:text-ink transition-colors focus-ring"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-6 mb-3">Résumé</p>
            <a
              href={site.cvUrl}
              className="font-mono text-[13px] text-ink/70 hover:text-ink transition-colors focus-ring"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-ink/10 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[11px] text-ink/40">
          <span>
            © {site.year} {site.name}. All rights reserved.
          </span>
          <span>crafted with care</span>
        </div>
      </div>
    </footer>
  );
}
