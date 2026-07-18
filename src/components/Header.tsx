import { site } from "../content";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur">
      <div className="mx-auto max-w-content px-6 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-display text-lg tracking-tight focus-ring"
        >
          {site.name}
        </a>

        <nav className="hidden md:flex items-center gap-8 font-mono text-[13px] tracking-wide text-ink/70">
          <a href="#systems" className="hover:text-ink transition-colors focus-ring">
            Systems
          </a>
          <a href="#lead" className="hover:text-ink transition-colors focus-ring">
            Leadership
          </a>
          <a href="#gallery" className="hover:text-ink transition-colors focus-ring">
            Gallery
          </a>
        </nav>

        <div className="flex items-center gap-4 font-mono text-[13px]">
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline text-ink/70 hover:text-ink transition-colors focus-ring"
          >
            GitHub
          </a>
          <a
            href={site.cvUrl}
            className="inline-flex items-center rounded-sm border border-ink/20 px-3 py-1.5 hover:border-ink hover:bg-ink hover:text-paper transition-colors focus-ring"
          >
            CV
          </a>
        </div>
      </div>
    </header>
  );
}
