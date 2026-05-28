import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, DownloadSimple, GithubLogo } from "@phosphor-icons/react";
import MagneticButton from "@/components/MagneticButton";

/* ─── Neural Memory Clusters (Borderless Computational Memories) ──── */
const neuralMemories = [
  {
    id: "ui",
    label: "UI & SSR",
    whisper: "EDGE_COMPILING",
    telemetry: "RENDER_FLOW",
    desc: "CLIENT ENGINE",
    metric: "32ms",
    x: "6%", y: "8%",
  },
  {
    id: "api",
    label: "API Layer",
    whisper: "V8_EXEC_POOL",
    telemetry: "REST_ACTIVE",
    desc: "NODE ORCHESTRATOR",
    metric: "8ms",
    x: "68%", y: "10%",
  },
  {
    id: "db",
    label: "Data Horizon",
    whisper: "REPLICA_SET",
    telemetry: "PIPELINE_OK",
    desc: "MONGO SECURE",
    metric: "14ms",
    x: "4%", y: "72%",
  },
  {
    id: "dsa",
    label: "DSA Logic",
    whisper: "BST_RESOLVE",
    telemetry: "RESONANCE",
    desc: "OPTIMAL SOLVER",
    metric: "O(log n)",
    x: "62%", y: "70%",
    href: "https://leetcode.com/u/ZasFksu4HE/",
  },
];

const memoryConfig = neuralMemories.reduce((acc, m) => { acc[m.id] = m; return acc; }, {});

/* ─── Organic Branching Neural Pathways ──────────────────────────── */
const neuralPaths = [
  // Primary fibers: each memory → core
  { from: "ui",  d: "M 14 16 C 18 28, 30 36, 50 50" },
  { from: "api", d: "M 82 18 C 74 30, 62 40, 50 50" },
  { from: "db",  d: "M 18 80 C 24 68, 36 58, 50 50" },
  { from: "dsa", d: "M 76 78 C 68 68, 58 58, 50 50" },
  // Branching sub-fibers (asymmetric splits)
  { from: "ui",  d: "M 14 16 C 22 20, 28 18, 38 22" },
  { from: "ui",  d: "M 14 16 C 10 26, 16 34, 22 42" },
  { from: "api", d: "M 82 18 C 86 28, 82 36, 74 42" },
  { from: "api", d: "M 82 18 C 72 16, 64 20, 58 28" },
  { from: "db",  d: "M 18 80 C 14 70, 18 62, 26 56" },
  { from: "db",  d: "M 18 80 C 28 84, 38 80, 44 74" },
  { from: "dsa", d: "M 76 78 C 82 70, 84 62, 78 54" },
  { from: "dsa", d: "M 76 78 C 66 82, 56 78, 50 72" },
  // Cross-connections (synaptic bridges)
  { from: null, d: "M 38 22 C 44 26, 52 24, 58 28" },
  { from: null, d: "M 22 42 C 24 48, 26 52, 26 56" },
  { from: null, d: "M 74 42 C 76 48, 78 52, 78 54" },
  { from: null, d: "M 44 74 C 48 74, 50 72, 50 72" },
];

/* ─── Synapse Junction Points ────────────────────────────────────── */
const synapseJunctions = [
  { cx: 50, cy: 50, r: 1.4, primary: true },
  { cx: 38, cy: 22, r: 0.8 }, { cx: 58, cy: 28, r: 0.8 },
  { cx: 22, cy: 42, r: 0.7 }, { cx: 74, cy: 42, r: 0.7 },
  { cx: 26, cy: 56, r: 0.7 }, { cx: 78, cy: 54, r: 0.7 },
  { cx: 44, cy: 74, r: 0.7 }, { cx: 50, cy: 72, r: 0.6 },
];

/* ─── Floating Computational Whispers ────────────────────────────── */
const whispers = [
  { text: "0x7F2A", x: "32%", y: "28%" },
  { text: "api.resolve()", x: "72%", y: "38%" },
  { text: "SHA-256", x: "16%", y: "58%" },
  { text: "dp.memo()", x: "78%", y: "64%" },
  { text: "REQ → 200", x: "44%", y: "18%" },
  { text: "idx.scan()", x: "28%", y: "86%" },
  { text: "O(n log n)", x: "84%", y: "82%" },
];

export default function DeveloperIdentity() {
  const [activeShard, setActiveShard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => { el.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const scrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="identity"
      data-testid="developer-identity-section"
      className="identity-signal-section relative w-full overflow-hidden bg-[#06060A] py-24 sm:py-32 lg:py-48"
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

      <div className="relative mx-auto grid max-w-[1640px] grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:items-center lg:gap-6 lg:px-14">

        {/* ═══ LEFT — CINEMATIC TYPOGRAPHY ═══ */}
        <div className="relative z-10 lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
            className="sig-overline mb-7"
          >
            <span className="sig-overline-dash" />
            Signal System / MERN Runtime
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, delay: 0.06, ease: [0.77, 0, 0.175, 1] }}
            className="sig-heading"
          >
            <span className="sig-heading-line">Mohammed</span>
            <span className="sig-heading-line sig-heading-accent">Ayyan<span className="sig-heading-dot">.</span></span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.77, 0, 0.175, 1] }}
            className="sig-body mt-8"
          >
            Full-stack MERN engineer orchestrating production ecosystems —
            connecting performant user interfaces with secure REST APIs,
            robust backend execution, optimized data architectures, and
            disciplined algorithmic problem-solving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.26, ease: [0.77, 0, 0.175, 1] }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <MagneticButton onClick={scrollToProjects} variant="solid" data-cursor-label="Work" data-testid="view-projects-btn">
              View Projects <ArrowUpRight size={16} weight="light" />
            </MagneticButton>
            <MagneticButton as="a" href="/resume.pdf" variant="outline" data-cursor-label="Resume" data-testid="resume-btn">
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

        {/* ═══ RIGHT — LIVING DIGITAL NERVOUS SYSTEM ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, delay: 0.06, ease: [0.77, 0, 0.175, 1] }}
          className="relative z-10 lg:col-span-7"
        >
          <div className="sig-system relative min-h-[740px]">

            {/* ═══ ATMOSPHERIC PARTICLES ═══ */}
            <div className="sig-dust" aria-hidden="true">
              {[...Array(24)].map((_, i) => (
                <div key={i} className={`sig-mote mote-${(i % 18) + 1}`} style={i >= 18 ? { left: `${12 + i * 4}%`, top: `${20 + i * 3}%`, animationDelay: `${-i * 1.3}s` } : undefined} />
              ))}
            </div>

            {/* ═══ VOLUMETRIC ENVIRONMENTAL LAYERS ═══ */}
            <div className="sig-sys-bloom" aria-hidden="true" />
            <div className="sig-sys-depth-fog" aria-hidden="true" />
            <div className="nerve-ambient-haze" aria-hidden="true" />

            <div data-testid="bg-trace-logs" style={{ display: "none" }} />

            {/* ═══ ORGANIC BRANCHING NEURAL PATHWAYS ═══ */}
            <svg className="sig-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <filter id="sig-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="nerve-soft" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="0.6" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <linearGradient id="nerve-fade" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D97736" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#D97736" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Render all neural fibers */}
              {neuralPaths.map((fiber, idx) => {
                const isActive = fiber.from && activeShard === fiber.from;
                const isBridge = fiber.from === null;
                return (
                  <g key={`fiber-${idx}`}>
                    {/* Ghost trace */}
                    <path d={fiber.d} fill="none" stroke="rgba(217,119,54,0.02)" strokeWidth="1.8" />
                    {/* Fiber body */}
                    <path
                      d={fiber.d} fill="none"
                      stroke={isActive ? "rgba(217,119,54,0.35)" : isBridge ? "rgba(217,119,54,0.04)" : "rgba(232,232,227,0.02)"}
                      strokeWidth={isActive ? "0.7" : isBridge ? "0.25" : "0.35"}
                      className="nerve-fiber"
                    />
                    {/* Glowing overlay */}
                    <path
                      d={fiber.d} fill="none"
                      stroke={isActive ? "rgba(217,119,54,0.6)" : "rgba(217,119,54,0.06)"}
                      strokeWidth={isActive ? "0.9" : "0.2"}
                      strokeDasharray={isActive ? "3 5" : "6 14"}
                      strokeLinecap="round"
                      className="nerve-glow-line"
                      filter={isActive ? "url(#sig-glow)" : "url(#nerve-soft)"}
                    />
                    {/* Pulse packet */}
                    {!isBridge && (
                      <circle
                        r={isActive ? "1.1" : "0.55"}
                        fill="#F5A623"
                        opacity={isActive ? "0.95" : "0.3"}
                        filter="url(#nerve-soft)"
                      >
                        <animateMotion
                          dur={isActive ? "0.9s" : `${2.8 + idx * 0.25}s`}
                          repeatCount="indefinite"
                          path={fiber.d}
                          begin={`${idx * 0.18}s`}
                        />
                      </circle>
                    )}
                    {/* Trailing decay particle */}
                    {!isBridge && idx < 4 && (
                      <circle r="0.4" fill="#D97736" opacity={isActive ? "0.7" : "0.12"}>
                        <animateMotion
                          dur={isActive ? "1.2s" : `${3.6 + idx * 0.3}s`}
                          repeatCount="indefinite"
                          path={fiber.d}
                          begin={`${idx * 0.18 + 0.5}s`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* ═══ SYNAPSE JUNCTIONS ═══ */}
              {synapseJunctions.map((syn, i) => (
                <g key={`syn-${i}`}>
                  <circle cx={syn.cx} cy={syn.cy} r={syn.r} fill="rgba(217,119,54,0.15)" filter="url(#nerve-soft)" />
                  <circle cx={syn.cx} cy={syn.cy} r={syn.r * 0.5} fill="#D97736" opacity="0.5">
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                  {syn.primary && (
                    <circle cx={syn.cx} cy={syn.cy} r={syn.r * 3} fill="none" stroke="rgba(217,119,54,0.08)" strokeWidth="0.3">
                      <animate attributeName="r" values={`${syn.r * 2};${syn.r * 5};${syn.r * 2}`} dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.15;0.03;0.15" dur="4s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              ))}

              {/* ═══ DSA CONSTELLATION (open subnet) ═══ */}
              <g className="dsa-constellation" filter="url(#nerve-soft)">
                <line x1="70" y1="74" x2="64" y2="80" stroke="rgba(217,119,54,0.12)" strokeWidth="0.4" />
                <line x1="70" y1="74" x2="78" y2="82" stroke="rgba(217,119,54,0.12)" strokeWidth="0.4" />
                <line x1="64" y1="80" x2="58" y2="86" stroke="rgba(217,119,54,0.08)" strokeWidth="0.3" />
                <line x1="64" y1="80" x2="68" y2="88" stroke="rgba(217,119,54,0.08)" strokeWidth="0.3" />
                <line x1="78" y1="82" x2="74" y2="90" stroke="rgba(217,119,54,0.08)" strokeWidth="0.3" />
                <line x1="78" y1="82" x2="84" y2="88" stroke="rgba(217,119,54,0.08)" strokeWidth="0.3" />
                {/* constellation pads */}
                <circle cx="70" cy="74" r="0.9" fill="#D97736" opacity="0.6" />
                <circle cx="64" cy="80" r="0.7" fill="#D97736" opacity="0.4" />
                <circle cx="78" cy="82" r="0.7" fill="#D97736" opacity="0.4" />
                <circle cx="58" cy="86" r="0.5" fill="#D97736" opacity="0.25" />
                <circle cx="68" cy="88" r="0.5" fill="#D97736" opacity="0.25" />
                <circle cx="74" cy="90" r="0.6" fill="#F5A623" opacity="0.7" />
                <circle cx="84" cy="88" r="0.5" fill="#D97736" opacity="0.25" />
                {/* search pulse through tree */}
                <circle r="0.7" fill="#F5A623" opacity="0" filter="url(#sig-glow)">
                  <animateMotion dur="4.2s" repeatCount="indefinite" path="M 70 74 L 78 82 L 74 90" />
                  <animate attributeName="opacity" values="0;0.9;0.9;0" dur="4.2s" repeatCount="indefinite" keyTimes="0;0.1;0.75;1" />
                </circle>
                {/* target ripple */}
                <circle cx="74" cy="90" r="1.2" fill="none" stroke="#F5A623" strokeWidth="0.3" opacity="0">
                  <animate attributeName="r" values="1;3.5;1" dur="4.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;0;0.6;0" dur="4.2s" repeatCount="indefinite" keyTimes="0;0.7;0.8;1" />
                </circle>
              </g>
            </svg>

            {/* ═══ COMPUTATIONAL HEART — LIVING CORE ═══ */}
            <div className="nerve-heart-wrap">
              {/* Expanding resonance ripples */}
              <div className="nerve-ripple ripple-1" aria-hidden="true" />
              <div className="nerve-ripple ripple-2" aria-hidden="true" />
              <div className="nerve-ripple ripple-3" aria-hidden="true" />

              <div className="nerve-heart-bloom" aria-hidden="true" />

              {/* Orbital rings */}
              <div className="nerve-ring ring-a" />
              <div className="nerve-ring ring-b" />
              <div className="nerve-ring ring-c" />

              {/* Core nucleus */}
              <div className={`nerve-core ${activeShard ? "nerve-core-active" : ""}`}>
                <div className="nerve-core-inner-glow" />
                <div className="nerve-core-content">
                  <AnimatePresence mode="wait">
                    {activeShard ? (
                      <motion.div
                        key={`heart-${activeShard}`}
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="nerve-telemetry"
                      >
                        <span className="nerve-tele-label">{memoryConfig[activeShard].telemetry}</span>
                        <strong className="nerve-tele-desc">{memoryConfig[activeShard].desc}</strong>
                        <small className="nerve-tele-metric">{memoryConfig[activeShard].metric}</small>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="heart-idle"
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="nerve-telemetry"
                      >
                        <span className="nerve-tele-label">SYSTEM_CORE</span>
                        <strong className="nerve-tele-desc">MERN ACTIVE</strong>
                        <small className="nerve-tele-metric">RUNTIME ALIVE</small>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* ═══ BORDERLESS NEURAL MEMORY CLUSTERS ═══ */}
            {neuralMemories.map((mem) => {
              const Tag = mem.href ? "a" : "div";
              const isActive = activeShard === mem.id;
              return (
                <Tag
                  key={mem.id}
                  href={mem.href}
                  target={mem.href ? "_blank" : undefined}
                  rel={mem.href ? "noreferrer" : undefined}
                  data-cursor={mem.href ? "hover" : undefined}
                  data-testid={mem.id === "dsa" ? "leetcode-node" : undefined}
                  className={`nerve-memory nerve-memory-${mem.id} ${isActive ? "nerve-memory-active" : ""}`}
                  style={{ left: mem.x, top: mem.y }}
                  onMouseEnter={() => setActiveShard(mem.id)}
                  onMouseLeave={() => setActiveShard(null)}
                >
                  <span className="nerve-mem-whisper">{mem.whisper}</span>
                  <strong className="nerve-mem-label">{mem.label}</strong>
                  <small className="nerve-mem-diag">{mem.diagnostic || mem.metric}</small>
                </Tag>
              );
            })}

            {/* ═══ FLOATING COMPUTATIONAL WHISPERS ═══ */}
            {whispers.map((w, i) => (
              <span
                key={`whisper-${i}`}
                className="nerve-whisper"
                style={{ left: w.x, top: w.y, animationDelay: `${i * 1.8}s` }}
                aria-hidden="true"
              >{w.text}</span>
            ))}

          </div>
        </motion.div>
      </div>
    </section>
  );
}
