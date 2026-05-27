import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "project_1",
    n: "01",
    title: "Aura Digital",
    role: "Creative Direction · WebGL",
    description:
      "An immersive WebGL platform turning live audio into procedural light fields. Shipped with custom GLSL shaders and a real-time editor.",
    tech: ["R3F", "GLSL", "Lenis", "GSAP"],
    url: "https://static.prod-images.emergentagent.com/jobs/cf9019cd-6c7d-4f33-aa3f-d18161c8b2d7/images/b47e1069248cb06912cd8575d75204d25385bba547880540d7c3d3fe31520646.png",
  },
  {
    id: "project_2",
    n: "02",
    title: "Monolith",
    role: "3D Direction · Frontend Lead",
    description:
      "Architecture showcase for an experimental studio. Each project a sculpted scene, choreographed by scroll.",
    tech: ["Three.js", "Framer", "Next", "Cabinet"],
    url: "https://static.prod-images.emergentagent.com/jobs/cf9019cd-6c7d-4f33-aa3f-d18161c8b2d7/images/c016d4389f66ac722e15d1a5fb6fdec290c3079eebcecde7a0dfb2f5f68b8d50.png",
  },
  {
    id: "project_3",
    n: "03",
    title: "Obsidian",
    role: "E‑commerce · Art Direction",
    description:
      "Hardware boutique with editorial product cinematics. Physically-based shading meets a quiet, magazine-grade layout.",
    tech: ["Stripe", "R3F", "Sanity", "GSAP"],
    url: "https://static.prod-images.emergentagent.com/jobs/cf9019cd-6c7d-4f33-aa3f-d18161c8b2d7/images/be98528eb94d53bbf0bd219b0f1665b222004eca1ae9edbf5de1cbc2ec25e990.png",
  },
  {
    id: "project_4",
    n: "04",
    title: "Nightshift",
    role: "Brand · Microsite",
    description:
      "After-hours digital gallery presenting contemporary motion artists. Built for slow, attentive viewing.",
    tech: ["Lenis", "Motion", "Sanity"],
    url: "https://static.prod-images.emergentagent.com/jobs/cf9019cd-6c7d-4f33-aa3f-d18161c8b2d7/images/b47e1069248cb06912cd8575d75204d25385bba547880540d7c3d3fe31520646.png",
  },
];

export default function Projects() {
  const trackRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;
      const totalScroll = () => track.scrollWidth - window.innerWidth + 80;
      const tween = gsap.to(track, {
        x: () => -totalScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${totalScroll()}`,
          scrub: 0.8,
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
    <section
      id="projects"
      data-testid="projects-section"
      className="relative w-full bg-[#0B0B0D] py-24 sm:py-32"
    >
      {/* Section header */}
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
              <span className="h-px w-10 bg-[#D97736]" />
              Selected Work — 2022/2026
            </div>
            <h2
              data-testid="projects-headline"
              className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-[#E8E8E3] sm:text-6xl lg:text-7xl"
            >
              Things <em className="not-italic text-[#D97736]">built</em>
              <br />
              with care.
            </h2>
          </div>
          <p className="max-w-md text-[#8A8A93]">
            A non-exhaustive set of recent work — chosen for what they taught me
            about feel, restraint and craft.
          </p>
        </div>
      </div>

      {/* Horizontal scroll on desktop */}
      <div
        ref={wrapRef}
        className="relative mt-20 hidden h-[100svh] overflow-hidden lg:block"
        data-testid="projects-horizontal-wrap"
      >
        <div
          ref={trackRef}
          className="horizontal-track flex h-full items-center gap-12 pl-14 pr-24"
          style={{ width: "max-content" }}
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
          <div className="flex h-full w-[60vw] flex-col items-start justify-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
              End — Index
            </div>
            <p className="mt-4 font-display text-5xl font-bold leading-[1] text-[#E8E8E3]">
              More on request.
            </p>
            <button
              type="button"
              data-cursor="hover"
              data-testid="projects-end-cta"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-10 inline-flex items-center gap-2 border-b border-[#E8E8E3]/30 pb-1 font-mono text-xs uppercase tracking-[0.24em] text-[#E8E8E3] transition-colors hover:text-[#D97736] hover:border-[#D97736]"
            >
              Request the archive <ArrowUpRight size={14} weight="light" />
            </button>
          </div>
        </div>
      </div>

      {/* Vertical fallback for mobile/tablet */}
      <div className="mt-16 grid grid-cols-1 gap-16 px-6 sm:px-10 lg:hidden">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} variant="mobile" />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, variant }) {
  const isMobile = variant === "mobile";
  return (
    <article
      data-testid={`project-card-${project.id}`}
      data-cursor-label="Open"
      className={`group relative ${
        isMobile
          ? "w-full"
          : "h-[75vh] w-[68vw] max-w-[1100px] flex-shrink-0"
      }`}
    >
      <div className="relative h-full w-full overflow-hidden bg-[#1a1a1f]">
        <img
          src={project.url}
          alt={project.title}
          loading="lazy"
          className={`h-full w-full object-cover transition-all duration-slow ease-out group-hover:scale-[1.04] group-hover:brightness-110 ${
            isMobile ? "aspect-[16/10]" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/80 via-transparent to-[#0B0B0D]/20" />
        <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-10 lg:p-12">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8E8E3]/80">
              {project.n} / {String(projects.length).padStart(2, "0")}
            </span>
            <ArrowUpRight
              size={28}
              weight="light"
              className="text-[#E8E8E3] transition-transform duration-700 group-hover:rotate-45"
            />
          </div>
          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
              {project.role}
            </div>
            <h3 className="font-display text-4xl font-bold uppercase tracking-tight text-[#E8E8E3] sm:text-5xl lg:text-6xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-md text-sm text-[#E8E8E3]/80 sm:text-base">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="border border-[#E8E8E3]/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#E8E8E3]/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
