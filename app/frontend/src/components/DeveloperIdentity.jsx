import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, DownloadSimple, GithubLogo } from "@phosphor-icons/react";
import MagneticButton from "@/components/MagneticButton";

const identityWhispers = [
  { text: "API / REST", className: "identity-whisper-api" },
  { text: "MONGO INDEX", className: "identity-whisper-db" },
  { text: "EDGE DEPLOY", className: "identity-whisper-edge" },
  { text: "O(log n)", className: "identity-whisper-dsa" },
];

const identityDust = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${6 + ((index * 19) % 88)}%`,
  top: `${8 + ((index * 29) % 80)}%`,
  delay: `${index * -0.85}s`,
}));

export default function DeveloperIdentity() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;
    const onMove = (event) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="identity"
      data-testid="developer-identity-section"
      className="identity-signal-section relative w-full overflow-hidden bg-[#06060A] py-24 sm:py-32 lg:py-40"
    >
      <div className="sig-env-grid" aria-hidden="true" />
      <div className="sig-env-scan" aria-hidden="true" />
      <div className="sig-env-spotlight" aria-hidden="true" />
      <div className="sig-env-fog sig-fog-warm" aria-hidden="true" />
      <div className="sig-env-fog sig-fog-cool" aria-hidden="true" />
      <div className="sig-env-fog sig-fog-mid" aria-hidden="true" />
      <div className="sig-env-vignette" aria-hidden="true" />
      <div className="sig-env-haze" aria-hidden="true" />
      <div className="sig-env-noise" aria-hidden="true" />

      <div className="identity-dust" aria-hidden="true">
        {identityDust.map((point) => (
          <span key={point.id} style={{ left: point.left, top: point.top, animationDelay: point.delay }} />
        ))}
      </div>

      {identityWhispers.map((whisper) => (
        <span key={whisper.className} className={`identity-whisper ${whisper.className}`} aria-hidden="true">
          {whisper.text}
        </span>
      ))}

      <div className="identity-centered relative z-10 mx-auto flex min-h-[72vh] max-w-[1320px] items-center justify-center px-6 text-center sm:px-10 lg:min-h-[78vh] lg:px-14">
        <div className="identity-copy relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
            className="sig-overline mb-7 justify-center"
          >
            <span className="sig-overline-dash" />
            MERN Stack / Full-Stack Engineer
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, delay: 0.06, ease: [0.77, 0, 0.175, 1] }}
            className="sig-heading"
          >
            <span className="sig-heading-line">Mohammed</span>
            <span className="sig-heading-line sig-heading-accent">
              Ayyan<span className="sig-heading-dot">.</span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.77, 0, 0.175, 1] }}
            className="sig-body identity-body mx-auto mt-8"
          >
            Full-stack MERN engineer orchestrating production ecosystems,
            connecting performant user interfaces with secure REST APIs, robust
            backend execution, optimized data architectures, and disciplined
            algorithmic problem-solving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.26, ease: [0.77, 0, 0.175, 1] }}
            className="identity-actions mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap"
          >
            <MagneticButton onClick={scrollToProjects} variant="outline" data-cursor-label="Work" data-testid="view-projects-btn">
              View Projects <ArrowUpRight size={16} weight="light" />
            </MagneticButton>
            <MagneticButton as="a" href="/resume.pdf" download="Mohammed-Ayyan-Resume.pdf" variant="outline" data-cursor-label="Resume" data-testid="resume-btn">
              Resume <DownloadSimple size={16} weight="light" />
            </MagneticButton>
            <MagneticButton as="a" href="https://github.com" target="_blank" rel="noreferrer" variant="outline" data-cursor-label="GitHub" data-testid="github-btn">
              GitHub <GithubLogo size={16} weight="light" />
            </MagneticButton>
            <MagneticButton as="a" href="https://leetcode.com/u/ZasFksu4HE/" target="_blank" rel="noreferrer" variant="outline" data-cursor-label="LeetCode" data-testid="leetcode-btn">
              LeetCode <ArrowUpRight size={16} weight="light" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
