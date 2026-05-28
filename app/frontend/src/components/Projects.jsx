import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "appointment",
    n: "01",
    title: "Immersive Appointment Booking Platform",
    role: "MERN Product Build / Booking Workflow",
    description:
      "A production-style scheduling platform that turns services, availability, booking, and confirmation into one guided flow.",
    problem: "Manual appointment handling creates missed leads, unclear availability, and slow customer follow-up.",
    backend: "Express REST APIs, protected booking routes, validation, and admin-ready service endpoints.",
    database: "MongoDB collections for services, time slots, bookings, customers, and booking status history.",
    deployment: "Vercel-ready frontend, Render-ready API, and environment-based configuration.",
    performance: "Lean booking payloads, lazy UI states, responsive calendar rendering, and optimistic form feedback.",
    features: ["Booking APIs", "JWT-ready admin", "MongoDB models", "Validation"],
    contributions:
      "Built reusable booking modules, API-connected form states, service filtering, and cinematic confirmation flows.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    links: { demo: "#", github: "#" },
    image: "https://static.prod-images.emergentagent.com/jobs/cf9019cd-6c7d-4f33-aa3f-d18161c8b2d7/images/b47e1069248cb06912cd8575d75204d25385bba547880540d7c3d3fe31520646.png",
  },
  {
    id: "real-estate",
    n: "02",
    title: "Interactive Real Estate Experience",
    role: "Full-Stack Listing Platform / Motion UI",
    description:
      "A premium property discovery experience with cinematic listing previews, search filters, lead capture, and detail pages.",
    problem: "Real estate discovery often feels static, overloaded, and disconnected from the buyer journey.",
    backend: "REST endpoints for listings, filters, saved properties, lead capture, and admin listing management.",
    database: "MongoDB listing schema with price, location, media, amenities, availability, and lead records.",
    deployment: "Static frontend on Vercel with an API service ready for Render and media/CDN storage.",
    performance: "Lazy-loaded listing visuals, reduced layout shift, scroll reveals, and responsive image treatment.",
    features: ["Listing APIs", "Search filters", "Lead capture", "Saved state"],
    contributions:
      "Created the listing data structure, motion-driven cards, responsive detail layout, and filter-ready interface.",
    tech: ["React", "Express", "MongoDB", "GSAP", "REST APIs"],
    links: { demo: "#", github: "#" },
    image: "https://static.prod-images.emergentagent.com/jobs/cf9019cd-6c7d-4f33-aa3f-d18161c8b2d7/images/c016d4389f66ac722e15d1a5fb6fdec290c3079eebcecde7a0dfb2f5f68b8d50.png",
  },
  {
    id: "security",
    n: "03",
    title: "Encryption & Security Toolkit",
    role: "Security Utility / Backend Logic",
    description:
      "A focused developer toolkit for hashing, token inspection, encryption demos, and security workflow validation.",
    problem: "Security utilities are often scattered or too technical for quick validation during development.",
    backend: "Node utility endpoints for hashing, token validation patterns, and error-safe responses.",
    database: "Optional MongoDB audit records for saved operations, timestamps, and user-owned sessions.",
    deployment: "Environment-driven secrets, isolated API routes, and deployable Node service structure.",
    performance: "Compact request payloads, copy-safe result states, minimal re-renders, and clear errors.",
    features: ["Hashing flows", "JWT inspection", "Protected utilities", "Copy-safe UI"],
    contributions:
      "Translated security actions into a calm product UI with predictable API feedback and readable result states.",
    tech: ["React", "Node.js", "Express", "JWT", "Crypto"],
    links: { demo: "#", github: "#" },
    image: "https://static.prod-images.emergentagent.com/jobs/cf9019cd-6c7d-4f33-aa3f-d18161c8b2d7/images/be98528eb94d53bbf0bd219b0f1665b222004eca1ae9edbf5de1cbc2ec25e990.png",
  },
  {
    id: "waste-tracker",
    n: "04",
    title: "Waste Reduction Tracker",
    role: "MERN Dashboard / Data Experience",
    description:
      "A sustainability dashboard that helps users track reduction habits, visualize progress, and build measurable outcomes.",
    problem: "Habit data becomes meaningless without clear feedback, goal context, and lightweight progress tracking.",
    backend: "Express APIs for entries, goals, summaries, authenticated history updates, and category data.",
    database: "MongoDB models for users, entries, categories, targets, and monthly aggregate snapshots.",
    deployment: "Vercel-ready frontend, Render-ready backend, and MongoDB Atlas-compatible data layer.",
    performance: "Memoized summaries, lightweight chart data, optimized state updates, and mobile-first spacing.",
    features: ["Auth-ready tracking", "MongoDB entries", "Goal analytics", "Dashboard summaries"],
    contributions:
      "Designed the dashboard structure, backend-ready data model, chart summaries, and progress interactions.",
    tech: ["React", "Node.js", "MongoDB", "Charts", "Tailwind"],
    links: { demo: "#", github: "#" },
    image: "https://static.prod-images.emergentagent.com/jobs/cf9019cd-6c7d-4f33-aa3f-d18161c8b2d7/images/b47e1069248cb06912cd8575d75204d25385bba547880540d7c3d3fe31520646.png",
  },
];

export default function Projects() {
  const trackRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return undefined;

      const totalScroll = () => Math.max(0, track.scrollWidth - window.innerWidth + 120);
      const tween = gsap.to(track, {
        x: () => -totalScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${totalScroll()}`,
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="projects" data-testid="projects-section" className="relative w-full overflow-hidden bg-[#08080A] py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
              <span className="h-px w-10 bg-[#D97736]" />
              Selected Work / Full-Stack Case Studies
            </div>
            <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] text-[#F2F0EA] sm:text-6xl lg:text-7xl">
              Production-minded software with cinematic interfaces.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-[#A9A69F] lg:col-span-4 lg:col-start-9">
            Each case study shows product purpose, API thinking, authentication,
            database structure, deployment path, and performance decisions.
          </p>
        </div>
      </div>

      <div ref={wrapRef} className="relative mt-20 hidden h-[100svh] overflow-hidden lg:block">
        <div ref={trackRef} className="horizontal-track flex h-full items-center gap-10 pl-14 pr-32" style={{ width: "max-content" }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <div className="project-outro relative flex h-[74vh] w-[42vw] min-w-[520px] flex-col justify-between overflow-hidden border border-[#E8E8E3]/10 bg-[#101014] p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(217,119,54,0.16),transparent_28%)]" />
            <div className="project-outro-frame absolute inset-10 border border-[#E8E8E3]/10" />
            <div className="relative z-10 flex items-start justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">Next / Collaboration</div>
              <span className="h-12 w-12 border-r border-t border-[#E8E8E3]/25" />
            </div>
            <div className="relative z-10">
              <p className="max-w-lg font-display text-5xl font-semibold uppercase leading-[0.95] text-[#E8E8E3]">
                Open to building scalable products with expressive frontend detail.
              </p>
              <button type="button" data-cursor="hover" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="mt-10 inline-flex items-center gap-3 border-b border-[#D97736]/60 pb-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[#D97736] transition-colors hover:text-[#E8E8E3]">
                Start a conversation <ArrowUpRight size={15} weight="light" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1600px] grid-cols-1 gap-10 px-6 sm:px-10 lg:hidden">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} mobile />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, mobile = false }) {
  const details = [
    ["Problem", project.problem],
    ["Backend", project.backend],
    ["Database", project.database],
    ["Deploy", project.deployment],
    ["Performance", project.performance],
  ];

  return (
    <article data-testid={`project-card-${project.id}`} data-cursor-label="View" className={`project-card group relative overflow-hidden border border-[#E8E8E3]/10 bg-[#101014] ${mobile ? "min-h-[860px]" : "h-[78vh] w-[76vw] max-w-[1240px] flex-shrink-0"}`}>
      <img src={project.image} alt={project.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35 grayscale transition-all duration-slow group-hover:scale-[1.035] group-hover:opacity-48 group-hover:grayscale-0" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,10,0.96),rgba(8,8,10,0.82)_52%,rgba(8,8,10,0.36))]" />
      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-9 lg:p-12">
        <div className="flex items-start justify-between gap-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">{project.n} / 04</div>
          <ArrowUpRight size={28} weight="light" className="text-[#E8E8E3] transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        <div className="grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#D97736]">{project.role}</div>
            <h3 className="max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] text-[#F2F0EA] sm:text-5xl lg:text-6xl">{project.title}</h3>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#D5D2CA]">{project.description}</p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#9C9992]">{project.contributions}</p>
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#8A8A93]">Technical Highlights</div>
              <div className="grid gap-2 sm:grid-cols-2">
                {details.map(([label, value]) => (
                  <p key={label} className="border border-[#E8E8E3]/10 bg-[#08080A]/55 p-3 text-xs leading-relaxed text-[#A9A69F]">
                    <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#D97736]">{label}</span>
                    {value}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#8A8A93]">Features</div>
              <div className="flex flex-wrap gap-2">
                {project.features.map((feature) => (
                  <span key={feature} className="border border-[#E8E8E3]/15 bg-[#08080A]/60 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#D5D2CA]">{feature}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {project.tech.map((tech) => (
                <span key={tech} className="text-xs text-[#D97736]">{tech}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={project.links.demo} className="project-link" data-cursor="hover">Live demo <ArrowUpRight size={13} weight="light" /></a>
              <a href={project.links.github} className="project-link" data-cursor="hover">GitHub <ArrowUpRight size={13} weight="light" /></a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
