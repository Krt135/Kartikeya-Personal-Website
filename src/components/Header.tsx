import { site } from "../content";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur">
      <div className="mx-auto max-w-content px-6 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-display text-lg tracking-tight focus-ring flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-moss" />
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
            className="inline-flex items-center gap-1.5 rounded-full bg-moss text-paper px-3.5 py-1.5 hover:bg-ink transition-colors focus-ring"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v13m0 0-4-4m4 4 4-4M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            CV
          </a>
        </div>
      </div>
    </header>
  );
}
