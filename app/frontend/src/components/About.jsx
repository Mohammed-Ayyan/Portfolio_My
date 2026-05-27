import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const portrait =
  "https://static.prod-images.emergentagent.com/jobs/cf9019cd-6c7d-4f33-aa3f-d18161c8b2d7/images/ca5a179dba738b06ed1dabd435532d8e6b1b88d85b9110cc67195020eab29c48.png";

const paragraphs = [
  {
    overline: "01 — Philosophy",
    text: "I believe interfaces should feel emotional, tactile, and unmistakably human. Every transition is a sentence; every motion, a breath.",
  },
  {
    overline: "02 — Process",
    text: "I work between strategy, design and code — sketching in Figma, prototyping in R3F, refining in production. The medium changes; the obsession with feel does not.",
  },
  {
    overline: "03 — Practice",
    text: "Eight years building for studios, founders and cultural institutions. Recent partners: Aether Studio, Monochrome.io, Atlas Collective, Nightshift Gallery.",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal-block") || [];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        });
      },
      { threshold: 0.25 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      data-testid="about-section"
      className="relative w-full py-32 sm:py-40 lg:py-56"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 sm:px-10 lg:grid-cols-12 lg:px-14 lg:gap-12">
        {/* Sticky portrait */}
        <div className="lg:col-span-5">
          <div className="sticky top-32">
            <motion.div
              style={{ y, scale }}
              className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1a1f]"
            >
              <img
                ref={portraitRef}
                src={portrait}
                alt="Portrait of Kael Moreau"
                data-testid="about-portrait"
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8E8E3]/80">
                <span>K. Moreau ◇ MMXXVI</span>
                <span>32.04N — 118.07E</span>
              </div>
              <div className="absolute top-5 left-5 h-6 w-6 border-l border-t border-[#E8E8E3]/40" />
              <div className="absolute top-5 right-5 h-6 w-6 border-r border-t border-[#E8E8E3]/40" />
              <div className="absolute bottom-5 left-5 h-6 w-6 border-l border-b border-[#E8E8E3]/40" />
              <div className="absolute bottom-5 right-5 h-6 w-6 border-r border-b border-[#E8E8E3]/40" />
            </motion.div>

            <div className="mt-8 grid grid-cols-3 gap-px bg-[#E8E8E3]/10">
              {[
                { k: "Years", v: "08" },
                { k: "Clients", v: "47" },
                { k: "Awwwards", v: "11" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="bg-[#0B0B0D] p-5"
                  data-testid={`about-stat-${s.k.toLowerCase()}`}
                >
                  <div className="font-display text-3xl font-bold text-[#E8E8E3]">
                    {s.v}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A8A93]">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div className="lg:col-span-7 lg:pl-12">
          <div className="reveal-block mb-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
            <span className="h-px w-10 bg-[#D97736]" />
            About — Story
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
            data-testid="about-headline"
            className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-[#E8E8E3] sm:text-5xl lg:text-6xl"
          >
            Working at the seam between{" "}
            <span className="text-[#D97736]">code</span>, motion and
            <em className="not-italic"> the feeling of being there.</em>
          </motion.h2>

          <div className="mt-16 space-y-14">
            {paragraphs.map((p, i) => (
              <motion.div
                key={p.overline}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: [0.77, 0, 0.175, 1] }}
                data-testid={`about-paragraph-${i}`}
              >
                <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
                  {p.overline}
                </div>
                <p className="font-display text-2xl font-light leading-[1.35] text-[#E8E8E3] sm:text-3xl">
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-24 border-y border-[#E8E8E3]/10 py-10 marquee">
        <div className="marquee-track font-display text-5xl font-medium uppercase tracking-tight text-[#E8E8E3]/80 sm:text-7xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-16">
              {[
                "Cinematic",
                "◇",
                "Editorial",
                "◇",
                "Real-time",
                "◇",
                "Tactile",
                "◇",
                "Atmospheric",
                "◇",
              ].map((t, i) => (
                <span key={`${k}-${i}`}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
