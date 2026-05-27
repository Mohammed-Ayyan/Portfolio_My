import { useState } from "react";
import { motion } from "framer-motion";

const orbits = [
  {
    id: "frontend",
    label: "Frontend",
    radius: 110,
    duration: 28,
    skills: ["React", "Next", "TypeScript", "Vite", "Astro"],
  },
  {
    id: "creative",
    label: "Creative Dev",
    radius: 180,
    duration: 40,
    skills: ["GSAP", "Lenis", "Framer Motion", "WebGL", "GLSL"],
  },
  {
    id: "3d",
    label: "3D · Motion",
    radius: 260,
    duration: 55,
    skills: ["Three.js", "R3F", "Blender", "Houdini", "Cinema4D"],
  },
  {
    id: "design",
    label: "UI / UX",
    radius: 340,
    duration: 70,
    skills: ["Figma", "Editorial", "Type", "Systems", "Prototyping"],
  },
];

const categories = [
  { id: "all", label: "All Craft" },
  { id: "frontend", label: "Frontend" },
  { id: "creative", label: "Creative" },
  { id: "3d", label: "3D + Motion" },
  { id: "design", label: "Design" },
];

export default function Skills() {
  const [active, setActive] = useState("all");
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative w-full bg-[#0B0B0D] py-32 sm:py-40 lg:py-56 overflow-hidden"
    >
      {/* Header */}
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
              <span className="h-px w-10 bg-[#D97736]" />
              Craft — Disciplines
            </div>
            <h2
              data-testid="skills-headline"
              className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-[#E8E8E3] sm:text-6xl"
            >
              A constellation
              <br />
              of <em className="not-italic text-[#D97736]">tools</em>.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 self-end">
            <p className="text-[#8A8A93] text-base sm:text-lg leading-relaxed">
              Not a checklist — a working set. Each ring is a way of thinking
              about a problem. Hover a node, or filter to reorganise the orbit.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  data-testid={`skills-filter-${c.id}`}
                  data-cursor="hover"
                  onClick={() => setActive(c.id)}
                  className={`px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] border transition-all duration-500 ${
                    active === c.id
                      ? "border-[#D97736] text-[#0B0B0D] bg-[#D97736]"
                      : "border-[#E8E8E3]/20 text-[#8A8A93] hover:text-[#E8E8E3] hover:border-[#E8E8E3]/60"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Orbit */}
      <div className="relative mx-auto mt-24 flex h-[720px] w-full max-w-[900px] items-center justify-center">
        {/* Center sun */}
        <div className="absolute z-20 flex h-32 w-32 items-center justify-center rounded-full">
          <div className="absolute inset-0 rounded-full bg-[#D97736]/10 blur-3xl" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#D97736]/40 backdrop-blur-md">
            <div className="absolute inset-2 rounded-full border border-[#D97736]/20" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#E8E8E3] text-center leading-tight">
              Kael
              <br />
              ◇ 2026
            </span>
          </div>
        </div>

        {/* Orbit rings + nodes */}
        {orbits.map((o, oi) => {
          const dim = active !== "all" && active !== o.id;
          return (
            <div
              key={o.id}
              className="absolute"
              style={{
                width: o.radius * 2,
                height: o.radius * 2,
              }}
              data-testid={`orbit-${o.id}`}
            >
              {/* Ring */}
              <div
                className="absolute inset-0 rounded-full border transition-all duration-700"
                style={{
                  borderColor: dim
                    ? "rgba(232,232,227,0.04)"
                    : "rgba(232,232,227,0.12)",
                  borderStyle: "dashed",
                }}
              />
              {/* Rotating cluster */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: o.duration,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="absolute inset-0"
                style={{ opacity: dim ? 0.25 : 1 }}
              >
                {o.skills.map((s, i) => {
                  const angle = (i / o.skills.length) * Math.PI * 2;
                  const x = Math.cos(angle) * o.radius;
                  const y = Math.sin(angle) * o.radius;
                  const isHover = hovered === `${o.id}-${s}`;
                  return (
                    <motion.div
                      key={s}
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: o.duration,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                      className="absolute"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                      }}
                    >
                      <button
                        type="button"
                        onMouseEnter={() => setHovered(`${o.id}-${s}`)}
                        onMouseLeave={() => setHovered(null)}
                        data-cursor="hover"
                        data-testid={`skill-node-${o.id}-${s.toLowerCase()}`}
                        className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${
                          isHover
                            ? "border-[#D97736] bg-[#D97736]/20 scale-125 shadow-[0_0_24px_rgba(217,119,54,0.4)]"
                            : "border-[#E8E8E3]/20 bg-[#1a1a1f]/60 backdrop-blur-sm"
                        }`}
                      >
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#E8E8E3] whitespace-nowrap">
                          {s}
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </motion.div>
              {/* Orbit label */}
              <span
                className="absolute font-mono text-[9px] uppercase tracking-[0.3em]"
                style={{
                  left: "50%",
                  top: `calc(50% - ${o.radius}px - 18px)`,
                  transform: "translateX(-50%)",
                  color: dim ? "#4A4A52" : "#8A8A93",
                }}
              >
                ◇ {o.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Tech footnote strip */}
      <div className="mx-auto mt-16 max-w-[1600px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-2 gap-px bg-[#E8E8E3]/10 sm:grid-cols-4">
          {[
            { k: "Perf. budget", v: "≤ 90 KB JS" },
            { k: "Target FPS", v: "60 / 120" },
            { k: "Tooling", v: "Vite · Webpack" },
            { k: "Pipeline", v: "GitOps + CDN" },
          ].map((s) => (
            <div key={s.k} className="bg-[#0B0B0D] p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8A8A93]">
                {s.k}
              </div>
              <div className="mt-2 font-display text-xl font-medium text-[#E8E8E3]">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
