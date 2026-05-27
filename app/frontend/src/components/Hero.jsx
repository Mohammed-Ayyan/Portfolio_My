import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import MagneticButton from "@/components/MagneticButton";
import Scene3D from "@/components/Scene3D";

const headlineLines = [
  ["Crafting", "immersive"],
  ["digital", "experiences"],
  ["through", "motion"],
  ["and", "code."],
];

export default function Hero() {
  const headlineRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => headlineRef.current?.classList.add("in-view"), 220);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <Scene3D />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,7,9,0.15),rgba(7,7,9,0.08)_42%,#08080a_100%)]" />

      <div className="absolute left-0 right-0 top-24 z-20 flex justify-between px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A93] sm:px-10 lg:px-14">
        <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}>
          Mohammed Ayyan / Frontend
        </motion.span>
        <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }} className="hidden sm:inline-block">
          Motion / Interaction / Engineering
        </motion.span>
      </div>

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-center px-6 pb-20 pt-36 sm:px-10 lg:px-14 lg:pb-24 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mb-6 flex max-w-4xl items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#D97736]"
        >
          <span className="h-px w-8 bg-[#D97736]" />
          Creative Frontend Developer / Interactive Web Engineer / Motion Experience Designer
        </motion.div>

        <h1
          ref={headlineRef}
          data-testid="hero-headline"
          className="max-w-[1120px] font-display text-[clamp(3rem,6.2vw,7.15rem)] font-black uppercase leading-[0.9] text-[#F2F0EA]"
        >
          {headlineLines.map((line, lineIndex) => (
            <span key={line.join("-")} className="block">
              {line.map((word, wordIndex) => {
                const index = lineIndex * 2 + wordIndex;
                const highlighted = ["immersive", "motion", "code."].includes(word);
                return (
                  <span key={word} className="reveal-word mr-[0.14em]">
                    <span style={{ transitionDelay: `${0.42 + index * 0.055}s` }}>
                      {highlighted ? (
                        <em className="not-italic text-[#D97736]">{word}</em>
                      ) : (
                        word
                      )}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-7 border-t border-[#E8E8E3]/10 pt-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className="max-w-2xl text-base font-light leading-relaxed text-[#B8B6AF] sm:text-lg"
          >
            Frontend developer specializing in cinematic web experiences,
            immersive interaction systems, and modern digital craftsmanship using
            technologies like Next.js, React, Three.js, GSAP, Framer Motion, and
            advanced animation workflows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.12 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton onClick={() => scrollTo("projects")} variant="solid" data-testid="hero-cta-projects" data-cursor-label="Explore">
              View Projects
              <ArrowUpRight size={16} weight="light" />
            </MagneticButton>
            <MagneticButton onClick={() => scrollTo("contact")} data-testid="hero-cta-contact" data-cursor-label="Write">
              Start a Conversation
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollTo("about")}
        data-testid="hero-scroll-indicator"
        data-cursor="hover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.35, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A93]"
      >
        <span>Enter</span>
        <span className="relative flex h-10 w-px overflow-hidden bg-[#4A4A52]">
          <motion.span animate={{ y: [-40, 40] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-x-0 h-4 bg-[#D97736]" />
        </span>
        <ArrowDown size={14} weight="light" />
      </motion.button>
    </section>
  );
}
