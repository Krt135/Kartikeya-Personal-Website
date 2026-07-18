export const site = {
  name: "Kartikeya Pant",
  title: "Kartikeya Pant — Systems, Markets & Perspective",
  tagline: "PORTFOLIO · 2026",
  headline: {
    prefix: "Building",
    accents: ["systems", "markets", "perspective"],
    connectors: [", analyzing ", ", and capturing "],
    suffix: ".",
  },
  bio: "Student Developer & Economist · Published Poet · Community Leader. Working at the intersection of computer science, economics, and creative arts — from fluid simulators to the pages of Folio.",
  stats: [
    { label: "FIELDS", value: "03" },
    { label: "PROJECTS", value: "12+" },
    { label: "PUBLISHED", value: "Folio" },
  ],
  links: {
    github: "https://github.com/",
    linkedin: "#",
    email: "mailto:hello@example.com",
    cv: "#",
  },
  nav: [
    { label: "Systems", href: "#systems" },
    { label: "Leadership", href: "#lead" },
    { label: "Gallery", href: "#gallery" },
  ],
} as const;

export const projects = [
  {
    badge: "SIMULATION",
    tags: "C++ · OPENGL · PHYSICS",
    title: "SPH Fluid Simulator",
    description:
      "A smoothed-particle hydrodynamics engine solving incompressible flow with the Poly6/Spiky kernel family. Sub-stepped semi-implicit integration keeps the fluid stable at high particle counts; spatial hashing keeps neighbor search linear in practice.",
    bullets: [
      "Poly6 density + Spiky pressure gradient kernels",
      "Sub-stepping (4×) at 60fps for stability under stiff pressure",
      "Uniform grid neighbor search, O(n) in average case",
      "GPU-accelerated rendering with screen-space blur",
    ],
    codeFile: "SOLVER.CPP",
    code: `// Poly6 kernel (density)
float W(float r, float h) {
  if (r >= h) return 0.f;
  float x = h*h - r*r;
  return 315.f/(64.f*PI*pow(h,9)) * x*x*x;
}

// Semi-implicit Euler with sub-steps
for (int s = 0; s < SUBSTEPS; ++s) {
  computeDensityPressure();
  computeForces();     // pressure + viscosity +
  integratePositions();
}`,
  },
  {
    badge: "GAME",
    tags: "UNITY · C# · DETERMINISTIC",
    title: "Loaded Dice",
    description:
      "A tactical roguelike where every roll is weighted, biased, and replayable. Built on a small, clean C# architecture: interfaces separate the RNG bus, dice sets, and effect resolvers so behavior stays testable and deterministic.",
    bullets: [
      "Interface-driven core with seedable deterministic RNG",
      "Weighted-sample dice service; effects resolve via visitor",
      "ScriptableObject-authored content with hot-reload in editor",
      "Full replay from seed + input log for debugging",
    ],
    codeFile: "ROLLSERVICE.CS",
    code: `// Loaded Dice — deterministic RNG bus
public interface IRollService {
    RollResult Roll(DiceSet set, LoadProfile load);
}

public sealed class RollService : IRollService {
    private readonly IRandom _rng;
    public RollResult Roll(DiceSet set, LoadProfile load) =>
        set.Faces
           .WeightedSample(_rng, load.Bias);
}`,
  },
] as const;

export const leadership = [
  {
    role: "PRESIDENT · COMPUTER SCIENCE CLUB",
    title: "A hub for builders.",
    description:
      "Redesigned the club's site into a persistent home for tutorials, project logs, and weekly hack-nights. Mentored a rotating cadre of underclassmen, standing up a code-review workflow so first-time contributors ship real features by their second meeting.",
    bullets: [
      "Grew active membership 3× across two years",
      "Ran 20+ workshops on systems, ML, and web infra",
      "Established mentorship pipeline for 12 junior members",
      "Sponsored two regional hackathon teams to placements",
    ],
    preview: {
      domain: "csclub.school.edu",
      season: "CS CLUB · SPRING",
      headline: ["Build weird things.", "Ship on Fridays."],
      tags: ["HACK-NIGHT", "MENTORSHIP"],
      tracks: ["Rust", "OS", "Web"],
    },
  },
  {
    role: "VP · ECONOMICS CLUB",
    title: "Markets, made legible.",
    description:
      "Reframed the club around weekly market briefings, a student-run macro newsletter, and simulated portfolio competitions. The website became the operational core — event calendar, reading list, and archive of member analyses — all in one crisp, editorial layout.",
    bullets: [
      "Launched a bi-weekly student macro newsletter (~400 readers)",
      "Organized inter-school portfolio competition, 6 schools",
      "Built research reading-list system with 60+ curated papers",
      "Coached debate & speech teams to state-level qualifiers",
    ],
    preview: {
      domain: "econclub.school.edu",
      season: "ECON CLUB · FALL",
      headline: ["Read the tape.", "Write the brief."],
      tags: ["MACRO", "NEWSLETTER"],
      tracks: ["Rates", "FX", "Policy"],
    },
  },
] as const;

export const gallery = {
  label: "03 · THE GALLERY",
  title: "A quieter register.",
  subtitle:
    "Published poetry in Folio Magazine, and photography submitted to the Tom Kean Jr. Art Competition.",
  poem: {
    lines: [
      "And still, the ledger of small hours —",
      "a market of moths against the lamp,",
      "each wing a currency of light,",
      "spent, and spent again.",
    ],
    author: "Kartikeya Pant",
    publication: "Folio Magazine, Vol. VII",
    year: "PUBLISHED · 2025",
  },
  items: [
    {
      plate: "01",
      title: "Night, in transit",
      alt: "Silhouette against foggy window",
      src: "/assets/gallery-1-Cgcc_Jlj.jpg",
      span: "tall" as const,
    },
    {
      plate: "02",
      title: "Neon after rain",
      alt: "Rain on glass with neon bokeh",
      src: "/assets/gallery-2-CM1Fgm5m.jpg",
      span: "wide" as const,
    },
    {
      plate: "03",
      title: "Ascent",
      alt: "Minimalist staircase in shadow",
      src: "/assets/gallery-3-DovHO82Q.jpg",
      span: "wide" as const,
    },
    {
      plate: "04",
      title: "Autumn, arranged",
      alt: "Dried leaves still life",
      src: "/assets/gallery-4-D320SlCf.jpg",
      span: "tall" as const,
    },
  ],
} as const;

export const sections = {
  systems: {
    label: "01 · CODE & SYSTEMS",
    title: "Engineered for physics, tuned for play.",
    subtitle:
      "Two projects at opposite ends of the systems spectrum — one obeys Navier-Stokes, the other bends probability.",
  },
  leadership: {
    label: "02 · BUILD & LEAD",
    title: "Web infrastructure as the shape of a community.",
    subtitle:
      "I built the digital homes for two of my school's largest student organizations — the platforms that turn scattered members into a working culture.",
  },
} as const;
