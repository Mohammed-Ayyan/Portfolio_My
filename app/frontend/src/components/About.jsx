import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const portrait =
  "/assets/mohammed-ayyan-portrait.png";

const story = [
  {
    overline: "01 / Product architecture",
    text: "I think through the full product path: interface states, API contracts, authentication rules, data models, and deployment constraints before the UI ever feels finished.",
  },
  {
    overline: "02 / MERN engineering",
    text: "I build with React, Node.js, Express, MongoDB, authentication patterns, REST APIs, and performance-minded component systems that keep expressive work usable.",
  },
  {
    overline: "03 / Experience quality",
    text: "The goal is not decoration. It is scalable software with a cinematic surface: fast, readable, responsive, reliable, and memorable.",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -70]);

  return (
    <section
      id="about"
      ref={sectionRef}
      data-testid="about-section"
      className="relative w-full overflow-hidden py-28 sm:py-36 lg:py-52"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8E8E3]/15 to-transparent" />
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 sm:px-10 lg:grid-cols-12 lg:px-14">
        <div className="lg:col-span-5">
          <motion.div style={{ y }} className="sticky top-28">
            <div className="about-portrait relative aspect-[3/4] w-full overflow-hidden border border-[#E8E8E3]/10 bg-[#101014]">
              <img
                src={portrait}
                alt="Cinematic portrait of Mohammed Ayyan"
                data-testid="about-portrait"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center grayscale contrast-125 brightness-[0.72]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,8,10,0.55),transparent_48%),radial-gradient(circle_at_70%_30%,rgba(217,119,54,0.14),transparent_28%)]" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.26em] text-[#E8E8E3]/80">
                <span>M. Ayyan / 2026</span>
                <span>Code / Motion</span>
              </div>
              <div className="absolute left-5 top-5 h-7 w-7 border-l border-t border-[#E8E8E3]/35" />
              <div className="absolute right-5 top-5 h-7 w-7 border-r border-t border-[#E8E8E3]/35" />
              <div className="absolute bottom-5 left-5 h-7 w-7 border-b border-l border-[#E8E8E3]/35" />
              <div className="absolute bottom-5 right-5 h-7 w-7 border-b border-r border-[#E8E8E3]/35" />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-px bg-[#E8E8E3]/10">
              {[
                { k: "Focus", v: "Motion" },
                { k: "Stack", v: "React" },
                { k: "Mode", v: "Story" },
              ].map((item) => (
                <div key={item.k} className="bg-[#08080A] p-4 sm:p-5">
                  <div className="font-display text-xl font-semibold text-[#E8E8E3] sm:text-2xl">{item.v}</div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[#8A8A93]">{item.k}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-7 lg:pl-12">
          <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
            <span className="h-px w-10 bg-[#D97736]" />
            About / Story
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.95, ease: [0.77, 0, 0.175, 1] }}
            data-testid="about-headline"
            className="font-display text-4xl font-bold leading-[1.02] text-[#F2F0EA] sm:text-5xl lg:text-6xl"
          >
            Working at the intersection of{" "}
            <span className="text-[#D97736]">full-stack</span> architecture,
            motion, and product experience.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.95, delay: 0.08, ease: [0.77, 0, 0.175, 1] }}
            className="mt-10 max-w-3xl text-base leading-relaxed text-[#A9A69F] sm:text-lg"
          >
            Mohammed Ayyan builds immersive MERN stack applications where
            backend logic, MongoDB data, authentication, API design, cinematic
            motion, and interaction design merge into polished digital products.
          </motion.p>

          <div className="mt-16 space-y-10">
            {story.map((item, index) => (
              <motion.article
                key={item.overline}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.85, delay: index * 0.08, ease: [0.77, 0, 0.175, 1] }}
                className="border-t border-[#E8E8E3]/10 pt-8"
              >
                <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#D97736]">
                  {item.overline}
                </div>
                <p className="max-w-3xl text-base leading-relaxed text-[#A9A69F] sm:text-lg">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 border-y border-[#E8E8E3]/10 py-8 marquee">
        <div className="marquee-track font-display text-4xl font-medium uppercase text-[#E8E8E3]/75 sm:text-6xl">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex gap-12">
              {["Cinematic", "/", "Responsive", "/", "Interactive", "/", "Atmospheric", "/", "Engineered", "/"].map((item, index) => (
                <span key={`${group}-${index}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
