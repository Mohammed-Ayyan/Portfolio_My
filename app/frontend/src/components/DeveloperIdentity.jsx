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
    x: "4%", y: "13%",
  },
  {
    id: "api",
    label: "API Layer",
    whisper: "V8_EXEC_POOL",
    telemetry: "REST_ACTIVE",
    desc: "NODE ORCHESTRATOR",
    metric: "8ms",
    x: "71%", y: "7%",
  },
  {
    id: "db",
    label: "Data Horizon",
    whisper: "REPLICA_SET",
    telemetry: "PIPELINE_OK",
    desc: "MONGO SECURE",
    metric: "14ms",
    x: "9%", y: "74%",
  },
  {
    id: "dsa",
    label: "DSA Logic",
    whisper: "BST_RESOLVE",
    telemetry: "RESONANCE",
    desc: "OPTIMAL SOLVER",
    metric: "O(log n)",
    x: "67%", y: "67%",
    href: "https://leetcode.com/u/ZasFksu4HE/",
  },
];

const memoryConfig = neuralMemories.reduce((acc, m) => { acc[m.id] = m; return acc; }, {});

/* ─── Organic Branching Neural Pathways ──────────────────────────── */
const neuralPaths = [
  // Primary fibers: each memory → core
  { from: "ui", d: "M 10 21 C 17 25, 18 34, 28 37 C 38 41, 38 48, 50 50" },
  { from: "ui", d: "M 12 24 C 8 33, 15 40, 21 46 C 27 52, 35 51, 42 56" },
  { from: "ui", d: "M 9 19 C 18 13, 28 19, 36 16 C 43 14, 45 20, 51 22" },
  { from: "api", d: "M 82 16 C 76 24, 72 27, 66 35 C 61 42, 56 43, 50 50" },
  // Branching sub-fibers (asymmetric splits)
  { from: "api", d: "M 83 18 C 89 29, 83 38, 75 43 C 67 48, 64 55, 56 57" },
  { from: "api", d: "M 79 14 C 70 12, 63 18, 58 27 C 53 34, 48 34, 42 39" },
  { from: "db", d: "M 20 82 C 24 71, 19 62, 29 57 C 38 52, 41 55, 50 50" },
  { from: "db", d: "M 17 79 C 29 83, 36 76, 43 72 C 50 68, 49 60, 57 56" },
  { from: "db", d: "M 21 84 C 16 73, 12 66, 19 58 C 24 51, 19 45, 25 39" },
  { from: "dsa", d: "M 78 75 C 70 72, 69 64, 62 61 C 56 58, 56 53, 50 50" },
  { from: "dsa", d: "M 77 76 C 85 67, 83 56, 75 52 C 68 49, 66 42, 58 39" },
  { from: "dsa", d: "M 75 73 C 66 82, 58 77, 52 72 C 46 67, 41 70, 35 64" },
  // Cross-connections (synaptic bridges)
  { from: null, d: "M 36 16 C 43 27, 52 23, 58 27 C 67 33, 67 41, 75 43" },
  { from: null, d: "M 21 46 C 29 44, 34 49, 42 56 C 49 63, 50 66, 43 72" },
  { from: null, d: "M 25 39 C 34 34, 39 38, 42 39 C 49 41, 51 34, 58 39" },
  { from: null, d: "M 57 56 C 64 60, 68 57, 75 52 C 80 49, 83 52, 87 59" },
  { from: null, d: "M 35 64 C 43 61, 50 64, 56 57 C 62 50, 68 50, 75 52" },
  { from: null, d: "M 51 22 C 47 30, 54 35, 50 43 C 47 48, 48 51, 50 50" },
];

/* ─── Synapse Junction Points ────────────────────────────────────── */
const synapseJunctions = [
  { cx: 50, cy: 50, r: 1.4, primary: true },
  { cx: 36, cy: 16, r: 0.75 }, { cx: 58, cy: 27, r: 0.8 },
  { cx: 21, cy: 46, r: 0.65 }, { cx: 75, cy: 43, r: 0.72 },
  { cx: 42, cy: 56, r: 0.65 }, { cx: 75, cy: 52, r: 0.7 },
  { cx: 43, cy: 72, r: 0.68 }, { cx: 57, cy: 56, r: 0.62 },
  { cx: 25, cy: 39, r: 0.55 }, { cx: 87, cy: 59, r: 0.5 },
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
  { text: "heap.relax()", x: "56%", y: "84%" },
  { text: "jwt.verify", x: "5%", y: "44%" },
  { text: "hydrate()", x: "58%", y: "18%" },
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
                    <path d={fiber.d} fill="none" stroke="rgba(217,119,54,0.018)" strokeWidth="2.4" className="nerve-fiber-haze" />
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
                      strokeDasharray={isActive ? "2.8 5.6" : "4 15 1 8"}
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
                    {!isBridge && idx % 2 === 0 && (
                      <circle r={isActive ? "0.75" : "0.32"} fill="#D97736" opacity={isActive ? "0.75" : "0.16"}>
                        <animateMotion
                          dur={isActive ? "1.45s" : `${5.8 + idx * 0.18}s`}
                          repeatCount="indefinite"
                          path={fiber.d}
                          begin={`${idx * 0.23 + 0.85}s`}
                        />
                        <animate attributeName="opacity" values="0;0.55;0.12;0" dur={isActive ? "1.45s" : `${5.8 + idx * 0.18}s`} repeatCount="indefinite" />
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
                <path d="M 70 74 C 66 76, 66 79, 64 80 C 61 82, 61 85, 58 86" className="dsa-organic-link" />
                <path d="M 70 74 C 75 75, 75 80, 78 82 C 82 84, 81 88, 84 88" className="dsa-organic-link" />
                <path d="M 64 80 C 66 83, 66 86, 68 88" className="dsa-organic-link dsa-organic-link-soft" />
                <path d="M 78 82 C 75 84, 76 88, 74 90" className="dsa-organic-link dsa-organic-link-hot" />
                <path d="M 58 86 C 62 91, 70 92, 74 90 C 79 88, 80 84, 84 88" className="dsa-organic-echo" />
                {[
                  [70, 74, 0.9, 0.62], [64, 80, 0.72, 0.42], [78, 82, 0.7, 0.42],
                  [58, 86, 0.48, 0.25], [68, 88, 0.48, 0.28], [74, 90, 0.65, 0.72],
                  [84, 88, 0.48, 0.25], [62, 91, 0.32, 0.18], [81, 78, 0.28, 0.16],
                ].map(([cx, cy, r, opacity]) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={cx === 74 ? "#F5A623" : "#D97736"} opacity={opacity} />
                ))}
                {/* search pulse through tree */}
                <circle r="0.7" fill="#F5A623" opacity="0" filter="url(#sig-glow)">
                  <animateMotion dur="4.2s" repeatCount="indefinite" path="M 70 74 C 75 75, 75 80, 78 82 C 75 84, 76 88, 74 90" />
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
