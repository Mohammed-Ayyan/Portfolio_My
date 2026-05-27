import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import MagneticButton from "@/components/MagneticButton";
import Scene3D from "@/components/Scene3D";

export default function Hero() {
  const headlineRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      headlineRef.current?.classList.add("in-view");
    }, 250);
    return () => clearTimeout(t);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const words = [
    "Designing",
    "immersive",
    "digital",
    "experiences",
    "that",
    "feel",
    "alive.",
  ];

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* 3D Canvas in background */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Vignette gradient */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#0B0B0D_85%)]" />

      {/* Top meta band */}
      <div className="absolute top-24 left-0 right-0 z-20 flex justify-between px-6 sm:px-10 lg:px-14 font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A93]">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          data-testid="hero-meta-location"
        >
          ◇ Lisbon — 38.7223° N
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="hidden sm:inline-block"
        >
          Portfolio / Vol. 04 — MMXXVI
        </motion.span>
      </div>

      {/* Headline */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-6 pb-24 sm:px-10 lg:px-14 lg:pb-32">
        <div className="mb-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]"
          >
            <span className="h-px w-8 bg-[#D97736]" />
            Independent designer × creative engineer
          </motion.div>

          <h1
            ref={headlineRef}
            data-testid="hero-headline"
            className="font-display text-[clamp(2.6rem,9vw,7.5rem)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#E8E8E3]"
          >
            {words.map((w, i) => (
              <span key={i} className="reveal-word mr-[0.18em]">
                <span style={{ transitionDelay: `${0.45 + i * 0.08}s` }}>
                  {i === 2 ? <em className="not-italic text-[#D97736]">{w}</em> : w}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className="max-w-md text-base sm:text-lg font-light leading-relaxed text-[#8A8A93]"
          >
            I'm <span className="text-[#E8E8E3]">Kael Moreau</span>, a designer and
            creative developer crafting cinematic interfaces, real-time 3D
            experiences and editorial moments for studios that care about feel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              onClick={scrollToProjects}
              data-testid="hero-cta-projects"
              data-cursor-label="Explore"
            >
              View Projects
              <ArrowUpRight size={16} weight="light" />
            </MagneticButton>
            <MagneticButton
              onClick={scrollToContact}
              variant="outline"
              data-testid="hero-cta-contact"
              data-cursor-label="Write"
            >
              Start a Conversation
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        data-testid="hero-scroll-indicator"
        data-cursor="hover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A93]"
      >
        <span>Scroll</span>
        <span className="relative flex h-10 w-px bg-[#4A4A52] overflow-hidden">
          <motion.span
            animate={{ y: [-40, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-4 bg-[#D97736]"
          />
        </span>
        <ArrowDown size={14} weight="light" />
      </motion.button>
    </section>
  );
}
