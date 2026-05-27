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
    role: "Frontend Architecture / Interaction Design",
    description:
      "A polished booking experience designed around clarity, trust, and low-friction scheduling with motion-led state changes.",
    features: ["Guided booking flow", "Responsive calendar UI", "Service filtering", "Confirmation journey"],
    contributions:
      "Built reusable booking modules, refined responsive layouts, and designed micro-interactions that make each step feel immediate.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "API Integration"],
    image: "https://static.prod-images.emergentagent.com/jobs/cf9019cd-6c7d-4f33-aa3f-d18161c8b2d7/images/b47e1069248cb06912cd8575d75204d25385bba547880540d7c3d3fe31520646.png",
  },
  {
    id: "real-estate",
    n: "02",
    title: "Interactive Real Estate Experience",
    role: "Creative Frontend / Motion Systems",
    description:
      "A cinematic property exploration interface with editorial layouts, layered previews, and smooth transitions between discovery states.",
    features: ["Property storytelling", "Immersive gallery states", "Location-led browsing", "Premium detail pages"],
    contributions:
      "Created motion-driven property cards, scroll pacing, and responsive visual hierarchy for high-value listings.",
    tech: ["Next.js", "GSAP", "ScrollTrigger", "Responsive UI"],
    image: "https://static.prod-images.emergentagent.com/jobs/cf9019cd-6c7d-4f33-aa3f-d18161c8b2d7/images/c016d4389f66ac722e15d1a5fb6fdec290c3079eebcecde7a0dfb2f5f68b8d50.png",
  },
  {
    id: "security",
    n: "03",
    title: "Encryption & Security Toolkit",
    role: "Frontend Engineering / Product Interface",
    description:
      "A focused utility interface for encryption workflows, designed to make technical security actions feel understandable and controlled.",
    features: ["Encryption utilities", "Clean input flows", "Result states", "Copy-safe interactions"],
    contributions:
      "Translated complex actions into a calm interface with clear hierarchy, predictable feedback, and privacy-first interaction patterns.",
    tech: ["React", "JavaScript", "Security Concepts", "UX Systems"],
    image: "https://static.prod-images.emergentagent.com/jobs/cf9019cd-6c7d-4f33-aa3f-d18161c8b2d7/images/be98528eb94d53bbf0bd219b0f1665b222004eca1ae9edbf5de1cbc2ec25e990.png",
  },
  {
    id: "waste-tracker",
    n: "04",
    title: "Waste Reduction Tracker",
    role: "Frontend Developer / Data Experience",
    description:
      "A sustainability-focused tracking experience that turns everyday reduction habits into readable progress and meaningful action.",
    features: ["Habit tracking", "Reduction insights", "Goal states", "Progress storytelling"],
    contributions:
      "Designed the interface structure, reusable data sections, and subtle feedback patterns that encourage continued engagement.",
    tech: ["React", "Charts", "Tailwind CSS", "State Management"],
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
    <section
      id="projects"
      data-testid="projects-section"
      className="relative w-full overflow-hidden bg-[#08080A] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
              <span className="h-px w-10 bg-[#D97736]" />
              Selected Work / Case Studies
            </div>
            <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] text-[#F2F0EA] sm:text-6xl lg:text-7xl">
              Projects shaped as immersive product stories.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-[#A9A69F] lg:col-span-4 lg:col-start-9">
            Each project is presented through role, contribution, features, and
            stack because the craft lives in both the interface and the systems
            behind it.
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
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
                Next / Collaboration
              </div>
              <span className="h-12 w-12 border-r border-t border-[#E8E8E3]/25" />
            </div>
            <div className="relative z-10">
              <p className="max-w-lg font-display text-5xl font-semibold uppercase leading-[0.95] text-[#E8E8E3]">
                Open to building the next cinematic web experience.
              </p>
              <button
                type="button"
                data-cursor="hover"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-10 inline-flex items-center gap-3 border-b border-[#D97736]/60 pb-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[#D97736] transition-colors hover:text-[#E8E8E3]"
              >
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
  return (
    <article
      data-testid={`project-card-${project.id}`}
      data-cursor-label="View"
      className={`project-card group relative overflow-hidden border border-[#E8E8E3]/10 bg-[#101014] ${
        mobile ? "min-h-[680px]" : "h-[74vh] w-[72vw] max-w-[1120px] flex-shrink-0"
      }`}
    >
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-45 grayscale transition-all duration-slow group-hover:scale-[1.035] group-hover:opacity-60 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,10,0.95),rgba(8,8,10,0.72)_46%,rgba(8,8,10,0.2))]" />
      <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-9 lg:p-12">
        <div className="flex items-start justify-between gap-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
            {project.n} / 04
          </div>
          <ArrowUpRight size={28} weight="light" className="text-[#E8E8E3] transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#D97736]">{project.role}</div>
            <h3 className="max-w-3xl font-display text-4xl font-bold uppercase leading-[0.95] text-[#F2F0EA] sm:text-5xl lg:text-6xl">
              {project.title}
            </h3>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#D5D2CA]">
              {project.description}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#9C9992]">
              {project.contributions}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#8A8A93]">Features</div>
              <div className="flex flex-wrap gap-2">
                {project.features.map((feature) => (
                  <span key={feature} className="border border-[#E8E8E3]/15 bg-[#08080A]/60 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#D5D2CA]">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#8A8A93]">Stack</div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs text-[#D97736]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
