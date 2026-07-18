// ---------------------------------------------------------------------------
// All editable site content lives here. Swap the placeholder text, links,
// and images below — you shouldn't need to touch the component files
// unless you're changing layout.
// ---------------------------------------------------------------------------

export const site = {
  name: "Kartikeya Pant",
  tagline: "Systems, Markets & Perspective",
  githubUrl: "https://github.com/",
  linkedinUrl: "#",
  email: "hello@example.com",
  cvUrl: "#",
  year: "2026",
};

export const hero = {
  eyebrow: "Portfolio · 2026",
  headline: ["Building systems,", "analyzing markets,", "and capturing perspective."],
  subhead:
    "Student Developer & Economist · Published Poet · Community Leader. Working at the intersection of computer science, economics, and creative arts — from fluid simulators to the pages of Folio.",
  ctaPrimary: { label: "Explore the work", href: "#systems" },
  ctaSecondary: { label: "Read the poetry", href: "#gallery" },
  stats: [
    { label: "Fields", value: "03" },
    { label: "Projects", value: "12+" },
    { label: "Published", value: "Folio" },
  ],
};

export const systems = {
  eyebrow: "01 · Code & Systems",
  heading: "Engineered for physics, tuned for play.",
  intro:
    "Two projects at opposite ends of the systems spectrum — one obeys Navier-Stokes, the other bends probability.",
  projects: [
    {
      kicker: "Simulation",
      tags: ["C++", "OpenGL", "Physics"],
      title: "SPH Fluid Simulator",
      description:
        "A smoothed-particle hydrodynamics engine solving incompressible flow with the Poly6/Spiky kernel family. Sub-stepped semi-implicit integration keeps the fluid stable at high particle counts; spatial hashing makes neighbor queries linear in practice.",
      bullets: [
        "Poly6 density + Spiky pressure gradient kernels",
        "Sub-stepping (4×) at 60fps for stability under stiff pressure",
        "Uniform grid neighbor search, O(n) in average case",
        "GPU-accelerated rendering with screen-space blur",
      ],
      codeLabel: "solver.cpp",
      code: `// Poly6 kernel (density)
float W(float r, float h) {
  if (r >= h) return 0.f;
  float x = h*h - r*r;
  return 315.f/(64.f*PI*pow(h,9)) * x*x*x;
}

// Semi-implicit Euler with sub-steps
for (int s = 0; s < SUBSTEPS; ++s) {
  computeDensityPressure();
  computeForces();     // pressure + viscosity + gravity
  integrate(dt / SUBSTEPS);
}`,
      pills: ["C++", "GLSL", "SPH", "Sub-stepping"],
    },
    {
      kicker: "Game",
      tags: ["Unity", "C#", "Deterministic"],
      title: "Loaded Dice",
      description:
        "A tactical roguelike where every roll is weighted, biased, and replayable. Built on a small, clean C# architecture: interfaces separate the RNG bus, dice sets, and effect resolvers so behavior stays testable and expansions stay cheap.",
      bullets: [
        "Interface-driven core with seedable deterministic RNG",
        "Weighted-sample dice service; effects resolve via visitor",
        "ScriptableObject-authored content with hot-reload in editor",
        "Full replay from seed + input log for debugging",
      ],
      codeLabel: "RollService.cs",
      code: `// Loaded Dice — deterministic RNG bus
public interface IRollService {
    RollResult Roll(DiceSet set, LoadProfile load);
}

public sealed class RollService : IRollService {
    private readonly IRandom _rng;
    public RollResult Roll(DiceSet set, LoadProfile load) =>
        set.Faces
           .WeightedSample(_rng, load.Weights)
           .Compose();
}`,
      pills: ["Unity", "C#", "DI", "ScriptableObject"],
    },
  ],
};

export const leadership = {
  eyebrow: "02 · Build & Lead",
  heading: "Web infrastructure as the shape of a community.",
  intro:
    "I built the digital homes for two of my school's largest student organizations — the platforms that turn scattered members into a working culture.",
  roles: [
    {
      role: "President · Computer Science Club",
      title: "A hub for builders.",
      description:
        "Redesigned the club's site into a persistent home for tutorials, project logs, and weekly hack-nights. Mentored a rotating cadre of underclassmen, standing up a code-review workflow so first-time contributors ship real features by their second meeting.",
      bullets: [
        "Grew active membership 3× across two years",
        "Ran 20+ workshops on systems, ML, and web infra",
        "Established mentorship pipeline for 12 junior members",
        "Sponsored two regional hackathon teams to placements",
      ],
      panelLabel: "csclub.school.edu",
      panelHeading: "CS Club · Spring",
      panelSub: "Build weird things. Ship on Fridays.",
      panelTags: ["Hack-night", "Mentorship"],
      tracks: ["Rust", "OS", "Web"],
    },
    {
      role: "VP · Economics Club",
      title: "Markets, made legible.",
      description:
        "Reframed the club around weekly market briefings, a student-run macro newsletter, and simulated portfolio competitions. The website became the operational core — event calendar, reading list, and archive of member analyses — all in one crisp, editorial layout.",
      bullets: [
        "Launched a bi-weekly student macro newsletter (~400 readers)",
        "Organized inter-school portfolio competition, 6 schools",
        "Built research reading-list system with 60+ curated papers",
        "Coached debate & speech teams to state-level qualifiers",
      ],
      panelLabel: "econclub.school.edu",
      panelHeading: "Weekly brief · Vol. 14",
      panelSub: "Rates, curves, and stories.",
      panelTags: ["+2.14% ▲"],
      stats: [
        { label: "Members", value: "180+" },
        { label: "Papers", value: "60" },
        { label: "Schools", value: "06" },
      ],
    },
  ],
};

export const gallery = {
  eyebrow: "03 · The Gallery",
  heading: "A quieter register.",
  intro:
    "Published poetry in Folio Magazine, and photography submitted to the Tom Kean Jr. Art Competition.",
  poem: {
    lines: [
      "And still, the ledger of small hours —",
      "a market of moths against the lamp,",
      "each wing a currency of light,",
      "spent, and spent again.",
    ],
    attribution: "Kartikeya Pant",
    source: "Folio Magazine, Vol. VII",
    date: "Published · 2025",
  },
  plates: [
    {
      src: "/assets/gallery-1.jpg",
      alt: "Silhouette against foggy window",
      plate: "Plate 01",
      caption: "Night, in transit",
    },
    {
      src: "/assets/gallery-2.jpg",
      alt: "Rain on glass with neon bokeh",
      plate: "Plate 02",
      caption: "Neon after rain",
    },
    {
      src: "/assets/gallery-3.jpg",
      alt: "Minimalist staircase in shadow",
      plate: "Plate 03",
      caption: "Ascent",
    },
    {
      src: "/assets/gallery-4.jpg",
      alt: "Dried leaves still life",
      plate: "Plate 04",
      caption: "Autumn, arranged",
    },
  ],
};

export const footer = {
  tagline: "Systems, markets, and the perspective in between.",
  elsewhere: [
    { label: "GitHub", href: site.githubUrl },
    { label: "LinkedIn", href: site.linkedinUrl },
    { label: "Email", href: `mailto:${site.email}` },
  ],
  sections: [
    { label: "Systems", href: "#systems" },
    { label: "Leadership", href: "#lead" },
    { label: "Gallery", href: "#gallery" },
  ],
};
