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
    x: "5%", y: "8%",
    depth: "near",
    eyebrow: "CLIENT_EDGE // PORT_3000",
    title: "UI & SSR Engine",
    points: ["React Rendering", "Next.js Routing", "SSR Optimization"],
  },
  {
    id: "api",
    label: "API Layer",
    whisper: "V8_EXEC_POOL",
    telemetry: "REST_ACTIVE",
    desc: "NODE ORCHESTRATOR",
    metric: "8ms",
    x: "66%", y: "8%",
    depth: "far",
    eyebrow: "API_ROUTING // V8_EXEC",
    title: "API Orchestration",
    points: ["Express Middleware", "REST Endpoints", "Request Validation", "Response Handling"],
  },
  {
    id: "db",
    label: "Data Horizon",
    whisper: "REPLICA_SET",
    telemetry: "PIPELINE_OK",
    desc: "MONGO SECURE",
    metric: "14ms",
    x: "5%", y: "64%",
    depth: "mid",
    eyebrow: "DATA_HORIZON // REPLICA",
    title: "MongoDB & Secure",
    points: ["Data Storage", "Index Optimization", "Aggregation Pipeline", "Replica Synchronization"],
  },
  {
    id: "dsa",
    label: "DSA Logic",
    whisper: "BST_RESOLVE",
    telemetry: "RESONANCE",
    desc: "OPTIMAL SOLVER",
    metric: "O(log n)",
    x: "61%", y: "66%",
    depth: "near",
    href: "https://leetcode.com/u/ZasFksu4HE/",
    eyebrow: "DSA_SOLVER // BST_CONSTELLATION",
    title: "Algorithmic Shard",
    points: ["Problem Solving", "DSA Patterns", "Complexity Analysis", "Optimization Logic"],
  },
  {
    id: "auth",
    label: "Auth Trace",
    whisper: "JWT_SESSION",
    telemetry: "ACCESS_LOCK",
    desc: "SECURE FLOW",
    metric: "valid",
    x: "73%", y: "43%",
    depth: "ghost",
    eyebrow: "AUTH_LAYER // SECURE",
    title: "Auth Layer",
    points: ["JWT Verification", "Session Management", "Role Protection"],
  },
  {
    id: "deploy",
    label: "Edge Deploy",
    whisper: "BUILD_RELEASE",
    telemetry: "EDGE_READY",
    desc: "SHIP LAYER",
    metric: "live",
    x: "41%", y: "80%",
    depth: "mid",
    eyebrow: "DEPLOYMENT_PIPELINE",
    title: "Deployment Pipeline",
    points: ["Build", "Test", "Optimize", "Deploy"],
  },
  {
    id: "cache",
    label: "Cache Echo",
    whisper: "MEMO_STATE",
    telemetry: "HOT_PATH",
    desc: "FAST RECALL",
    metric: "O(1)",
    x: "4%", y: "42%",
    depth: "ghost",
    eyebrow: "SYSTEM_NERVES",
    title: "Runtime Feed",
    points: ["128 Active", "24 Synapses", "98% Stable"],
  },
];

const reactorNodes = [
  { x: "45%", y: "37%", label: "</>" },
  { x: "31%", y: "47%", label: "DB" },
  { x: "68%", y: "36%", label: "API" },
  { x: "53%", y: "68%", label: "JS" },
  { x: "79%", y: "62%", label: "AUTH" },
  { x: "38%", y: "73%", label: "OPS" },
  { x: "24%", y: "55%", label: "SSR" },
  { x: "86%", y: "29%", label: "AI" },
];

const memoryConfig = neuralMemories.reduce((acc, m) => { acc[m.id] = m; return acc; }, {});

/* ─── Organic Branching Neural Pathways ──────────────────────────── */
const neuralPaths = [
  // Primary fibers: each memory → core
  { from: "ui", d: "M 7 26 C 17 17, 28 25, 37 21 C 46 17, 49 24, 57 25 C 66 26, 68 34, 74 41" },
  { from: "ui", d: "M 10 31 C 20 39, 31 34, 39 42 C 47 51, 56 47, 66 55 C 74 61, 81 58, 92 64" },
  { from: "api", d: "M 61 13 C 53 18, 51 25, 43 28 C 33 32, 29 41, 20 44 C 13 46, 10 53, 6 60" },
  { from: "api", d: "M 66 11 C 76 18, 80 26, 76 34 C 72 42, 76 48, 86 52 C 92 55, 95 61, 98 68" },
  // Branching sub-fibers (asymmetric splits)
  { from: "db", d: "M 24 69 C 33 62, 37 69, 45 63 C 52 57, 58 58, 66 55 C 74 52, 77 47, 84 44" },
  { from: "db", d: "M 20 66 C 14 72, 20 82, 31 82 C 43 82, 45 75, 54 76 C 65 78, 70 85, 82 83" },
  { from: "dsa", d: "M 75 52 C 69 47, 68 38, 60 36 C 50 34, 47 42, 39 42 C 30 42, 26 34, 18 35" },
  { from: "dsa", d: "M 78 54 C 83 62, 74 70, 67 72 C 58 75, 51 70, 44 74 C 37 78, 35 88, 25 91" },
  { from: "auth", d: "M 41 38 C 45 29, 54 31, 59 36 C 64 42, 61 49, 66 55 C 71 61, 80 60, 87 67" },
  { from: "deploy", d: "M 63 81 C 54 76, 51 84, 42 80 C 32 76, 30 66, 20 66 C 11 67, 7 75, 3 84" },
  { from: "cache", d: "M 7 49 C 16 53, 21 48, 27 54 C 33 61, 41 58, 48 52 C 56 45, 63 46, 75 52" },
  // Cross-connections (synaptic bridges)
  { from: null, d: "M 3 18 C 16 8, 33 10, 43 17 C 55 24, 66 18, 79 25 C 90 31, 96 42, 99 52" },
  { from: null, d: "M 1 70 C 15 62, 25 68, 35 59 C 46 49, 55 54, 66 45 C 78 35, 84 30, 97 34" },
  { from: null, d: "M 14 96 C 28 83, 41 92, 54 83 C 67 74, 77 80, 93 73" },
  { from: null, d: "M 31 6 C 29 20, 36 29, 48 31 C 61 33, 59 43, 69 48 C 79 53, 89 49, 98 58" },
  { from: null, d: "M 12 40 C 19 28, 31 30, 39 34 C 49 39, 53 31, 61 36 C 69 41, 65 53, 72 61 C 78 68, 90 66, 96 77" },
  { from: null, d: "M 5 57 C 17 55, 21 64, 30 66 C 42 69, 46 59, 57 61 C 70 63, 79 75, 94 70" },
];

/* ─── Synapse Junction Points ────────────────────────────────────── */
const synapseJunctions = [
  { cx: 64, cy: 47, r: 1.35, primary: true },
  { cx: 37, cy: 21, r: 0.62 }, { cx: 74, cy: 41, r: 0.72 },
  { cx: 39, cy: 42, r: 0.78 }, { cx: 66, cy: 55, r: 0.8 },
  { cx: 20, cy: 66, r: 0.62 }, { cx: 84, cy: 44, r: 0.56 },
  { cx: 44, cy: 74, r: 0.58 }, { cx: 82, cy: 83, r: 0.52 },
  { cx: 27, cy: 54, r: 0.5 }, { cx: 57, cy: 61, r: 0.64 },
  { cx: 18, cy: 35, r: 0.46 }, { cx: 93, cy: 73, r: 0.48 },
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
  { text: "edge.warm()", x: "69%", y: "29%" },
  { text: "schema.trace", x: "33%", y: "70%" },
  { text: "dfs.branch()", x: "88%", y: "54%" },
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
                    />
                  </g>
                );
              })}

              {/* ═══ SYNAPSE JUNCTIONS ═══ */}
              {synapseJunctions.map((syn, i) => (
                <g key={`syn-${i}`}>
                  <circle cx={syn.cx} cy={syn.cy} r={syn.r} fill="rgba(217,119,54,0.15)" />
                  <circle cx={syn.cx} cy={syn.cy} r={syn.r * 0.5} fill="#D97736" opacity="0.5" className="reactor-synapse-dot" />
                  {syn.primary && (
                    <circle cx={syn.cx} cy={syn.cy} r={syn.r * 4} fill="none" stroke="rgba(217,119,54,0.08)" strokeWidth="0.3" />
                  )}
                </g>
              ))}

              {/* ═══ DSA CONSTELLATION (open subnet) ═══ */}
              <g className="dsa-constellation">
                <path d="M 72 46 C 77 43, 82 45, 86 50 C 91 56, 88 63, 94 68" className="dsa-organic-link" />
                <path d="M 72 46 C 69 54, 73 59, 68 66 C 63 73, 53 69, 47 76" className="dsa-organic-link" />
                <path d="M 86 50 C 81 57, 82 64, 76 70 C 70 77, 77 83, 70 89" className="dsa-organic-link dsa-organic-link-hot" />
                <path d="M 68 66 C 75 66, 82 72, 91 70 C 96 69, 98 74, 99 80" className="dsa-organic-link dsa-organic-link-soft" />
                <path d="M 47 76 C 58 86, 70 89, 83 82 C 91 78, 94 70, 99 68" className="dsa-organic-echo" />
                {[
                  [72, 46, 0.92, 0.58], [86, 50, 0.66, 0.4], [94, 68, 0.52, 0.26],
                  [68, 66, 0.72, 0.45], [47, 76, 0.46, 0.22], [76, 70, 0.6, 0.52],
                  [70, 89, 0.54, 0.65], [91, 70, 0.34, 0.2], [99, 80, 0.28, 0.15],
                ].map(([cx, cy, r, opacity]) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={cx === 70 ? "#F5A623" : "#D97736"} opacity={opacity} />
                ))}
                {/* search pulse through tree */}
                <circle cx="70" cy="89" r="1.2" fill="none" stroke="#F5A623" strokeWidth="0.3" opacity="0.45" />
              </g>
            </svg>

            <div className="reactor-pulse-field" aria-hidden="true">
              {reactorNodes.map((node, i) => (
                <span
                  key={node.label}
                  className="reactor-orb"
                  style={{ left: node.x, top: node.y, animationDelay: `${i * -0.55}s` }}
                >
                  {node.label}
                </span>
              ))}
            </div>

            {/* ═══ COMPUTATIONAL HEART — LIVING CORE ═══ */}
            <div className="nerve-heart-wrap" style={{ "--heart-x": "50%", "--heart-y": "52%" }}>
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
                  className={`nerve-memory reactor-panel reactor-panel-${mem.id} nerve-depth-${mem.depth || "mid"} ${isActive ? "nerve-memory-active" : ""}`}
                  style={{ left: mem.x, top: mem.y }}
                  onMouseEnter={() => setActiveShard(mem.id)}
                  onMouseLeave={() => setActiveShard(null)}
                >
                  <span className="nerve-mem-whisper">{mem.eyebrow || mem.whisper}</span>
                  <strong className="nerve-mem-label">{mem.title || mem.label}</strong>
                  <span className="reactor-panel-lines">
                    {mem.points?.map((point) => (
                      <small key={point}>{point}</small>
                    ))}
                  </span>
                  <small className="nerve-mem-diag">{mem.whisper} // {mem.metric}</small>
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
