import { Download, Github } from "lucide-react";
import { site } from "@/content/site";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-[4.5rem] md:px-10">
        <a
          href="#top"
          className="group flex items-center gap-2 font-display text-sm font-medium tracking-tight text-foreground transition-opacity hover:opacity-80 md:text-base"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
          {site.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={site.links.cv}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-primary/50 px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/10"
          >
            CV
            <Download className="h-3.5 w-3.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
