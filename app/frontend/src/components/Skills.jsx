import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const categories = [
  {
    id: "frontend",
    label: "Frontend Development",
    tools: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Responsive UI"],
    note: "Component systems, polished interfaces, accessibility-minded layouts, and performance-aware implementation.",
  },
  {
    id: "motion",
    label: "Animation & Motion",
    tools: ["GSAP", "ScrollTrigger", "Framer Motion", "Lenis", "Timeline Design", "Micro-interactions"],
    note: "Motion systems that guide attention, create pacing, and make the interface feel cinematic without becoming loud.",
  },
  {
    id: "interactive",
    label: "3D & Interactive Development",
    tools: ["Three.js", "React Three Fiber", "WebGL Concepts", "Parallax", "Interactive Scenes"],
    note: "Lightweight depth, spatial interaction, and atmospheric presentation for immersive product moments.",
  },
  {
    id: "design",
    label: "UI/UX & Design",
    tools: ["Figma", "Visual Hierarchy", "Design Systems", "Editorial Layout", "Prototyping"],
    note: "Layouts shaped around readability, storytelling, premium spacing, and emotionally engaging flows.",
  },
  {
    id: "backend",
    label: "Backend Familiarity",
    tools: ["FastAPI", "Node APIs", "MongoDB", "Authentication Basics", "Data Modeling"],
    note: "Enough backend fluency to collaborate cleanly, reason about API contracts, and build complete product flows.",
  },
];

export default function Skills() {
  const [active, setActive] = useState(categories[0]);

  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative w-full overflow-hidden bg-[#08080A] py-28 sm:py-36 lg:py-48"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
              <span className="h-px w-10 bg-[#D97736]" />
              Craft / Systems
            </div>
            <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] text-[#F2F0EA] sm:text-6xl">
              A refined stack for expressive frontend work.
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-2xl text-base leading-relaxed text-[#A9A69F] sm:text-lg">
              Skills are grouped as working systems, not progress bars. The focus
              is on how each discipline contributes to immersive, responsive, and
              story-driven digital experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActive(category)}
                  data-cursor="hover"
                  className={`border px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
                    active.id === category.id
                      ? "border-[#D97736] bg-[#D97736] text-[#08080A]"
                      : "border-[#E8E8E3]/15 text-[#8A8A93] hover:border-[#E8E8E3]/45 hover:text-[#E8E8E3]"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px bg-[#E8E8E3]/10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="bg-[#0B0B0D] p-6 sm:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
                  Active discipline
                </div>
                <h3 className="mt-5 font-display text-4xl font-semibold uppercase leading-[0.95] text-[#E8E8E3] sm:text-5xl">
                  {active.label}
                </h3>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#A9A69F]">
                  {active.note}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-2 gap-px bg-[#E8E8E3]/10 sm:grid-cols-3">
            {active.tools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
                className="group min-h-[150px] bg-[#0B0B0D] p-5 transition-colors duration-500 hover:bg-[#131316]"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#4A4A52]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-8 font-display text-xl font-medium text-[#E8E8E3] transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl">
                  {tool}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
              Skill Orbit / Interactive Map
            </div>
            <h3 className="font-display text-4xl font-semibold uppercase leading-[0.95] text-[#E8E8E3] sm:text-5xl">
              A solar system of frontend craft.
            </h3>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#A9A69F]">
              Each orbit groups the tools around a discipline, showing how motion,
              interface design, 3D depth, and backend fluency support the core
              frontend experience.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
            className="lg:col-span-8"
          >
            <SkillOrbit />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillOrbit() {
  const orbits = [
    {
      label: "Frontend",
      className: "orbit-layer orbit-layer-1",
      offset: 0,
      skills: ["React", "Next.js", "TypeScript", "Tailwind"],
    },
    {
      label: "Motion",
      className: "orbit-layer orbit-layer-2",
      offset: 45,
      skills: ["GSAP", "Framer", "Lenis", "ScrollTrigger"],
    },
    {
      label: "Spatial",
      className: "orbit-layer orbit-layer-3",
      offset: 22,
      skills: ["Three.js", "R3F", "WebGL", "Depth"],
    },
  ];

  return (
    <div className="skill-orbit" aria-label="Interactive skills orbit">
      <div className="skill-orbit-core">
        <span>Mohammed</span>
        <strong>Ayyan</strong>
      </div>

      {orbits.map((orbit) => (
        <div key={orbit.label} className={orbit.className}>
          <span className="skill-orbit-label">{orbit.label}</span>
          {orbit.skills.map((skill, index) => (
            <div
              key={skill}
              className="orbit-node-anchor"
              style={{
                "--angle": `${orbit.offset + (index / orbit.skills.length) * 360}deg`,
              }}
            >
              <button type="button" data-cursor="hover" className="skill-orbit-node">
                <span>{orbit.label}</span>
                {skill}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
