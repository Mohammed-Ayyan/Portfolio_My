import { motion } from "framer-motion";
import { CheckCircle, Warning } from "@phosphor-icons/react";

const performanceMetrics = {
  appointment: {
    lighthouse: 94,
    lcp: "1.2s",
    fid: "45ms",
    cls: 0.05,
    fcp: "0.8s",
  },
  "real-estate": {
    lighthouse: 88,
    lcp: "1.8s",
    fid: "60ms",
    cls: 0.08,
    fcp: "1.1s",
  },
};

export default function PerformanceAuditorContent({ selectedProject }) {
  const metrics =
    performanceMetrics[selectedProject?.id] || performanceMetrics.appointment;

  const getScoreColor = (score) => {
    if (score >= 90) return "#4CAF50";
    if (score >= 50) return "#FFC107";
    return "#F44336";
  };

  const getMetricStatus = (metric, value) => {
    const thresholds = {
      lcp: { good: "2.5s", warning: "4s" },
      fid: { good: "100ms", warning: "300ms" },
      cls: { good: 0.1, warning: 0.25 },
      fcp: { good: "1.8s", warning: "3s" },
    };
    return true;
  };

  return (
    <div className="performance-auditor-content">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736] mb-3">
          Performance Auditor / Metrics & Vitals
        </div>
        <p className="text-base text-[#A9A69F] max-w-2xl">
          Monitor performance metrics, Web Vitals, and optimization insights for
          your deployed applications.
        </p>
      </div>

      {/* Lighthouse Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 border border-[#E8E8E3]/10 rounded p-8 bg-[#101014] text-center"
      >
        <div className="mb-4">
          <div
            className="w-40 h-40 rounded-full mx-auto flex items-center justify-center font-bold text-5xl relative"
            style={{
              background: `conic-gradient(${getScoreColor(metrics.lighthouse)} 0% ${(metrics.lighthouse / 100) * 360}deg, rgba(255,255,255,0.1) ${(metrics.lighthouse / 100) * 360}deg 360deg)`,
              border: `4px solid ${getScoreColor(metrics.lighthouse)}`,
            }}
          >
            {metrics.lighthouse}
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#E8E8E3] mb-2">
          Lighthouse Score
        </h3>
        <p className="text-[12px] text-[#A9A69F]">
          Overall performance audit score
        </p>
      </motion.div>

      {/* Core Web Vitals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D97736] mb-4">
          Core Web Vitals
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: "LCP",
              value: metrics.lcp,
              label: "Largest Contentful Paint",
              good: true,
            },
            {
              name: "FID",
              value: metrics.fid,
              label: "First Input Delay",
              good: true,
            },
            {
              name: "CLS",
              value: metrics.cls,
              label: "Cumulative Layout Shift",
              good: true,
            },
            {
              name: "FCP",
              value: metrics.fcp,
              label: "First Contentful Paint",
              good: true,
            },
          ].map((vital, i) => (
            <motion.div
              key={vital.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`border rounded p-4 ${
                vital.good
                  ? "border-green-500/30 bg-green-500/5"
                  : "border-yellow-500/30 bg-yellow-500/5"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {vital.good ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <Warning size={16} className="text-yellow-500" />
                )}
                <span className="font-mono text-[12px] font-bold text-[#D97736]">
                  {vital.name}
                </span>
              </div>
              <p className="text-2xl font-bold text-[#E8E8E3] mb-1">
                {vital.value}
              </p>
              <p className="text-[10px] text-[#8A8A93]">{vital.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border border-[#D97736]/20 bg-[#D97736]/5 rounded p-6 mb-8"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D97736] mb-4">
          Performance Insights
        </div>

        <div className="space-y-3 text-[12px]">
          <div className="flex items-start gap-3">
            <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-[#A9A69F]">
              <strong>Optimized Images:</strong> Using next/image for automatic
              optimization
            </span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-[#A9A69F]">
              <strong>Code Splitting:</strong> React lazy loading for faster
              initial load
            </span>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-[#A9A69F]">
              <strong>Caching Strategy:</strong> Service workers and browser
              caching enabled
            </span>
          </div>
          <div className="flex items-start gap-3">
            <Warning size={16} className="text-yellow-500 flex-shrink-0 mt-0.5" />
            <span className="text-[#A9A69F]">
              <strong>Database Queries:</strong> Consider adding pagination to
              list endpoints
            </span>
          </div>
        </div>
      </motion.div>

      {/* Optimization Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D97736] mb-4">
          Optimization History
        </div>

        <div className="space-y-3">
          {[
            { date: "2024-06-15", action: "Implemented lazy loading", score: "+5" },
            { date: "2024-06-10", action: "Optimized bundle size", score: "+8" },
            { date: "2024-06-05", action: "Added caching strategy", score: "+6" },
            { date: "2024-06-01", action: "Initial audit", score: "—" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border border-[#E8E8E3]/10 rounded hover:bg-[#E8E8E3]/3 transition-colors"
            >
              <div>
                <p className="text-[11px] text-[#E8E8E3]">{item.action}</p>
                <p className="text-[9px] text-[#7A7A82]">{item.date}</p>
              </div>
              <span className="text-[11px] font-mono text-[#D97736]">
                {item.score}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {[
          {
            title: "API Optimization",
            tasks: ["Add response compression", "Implement pagination", "Use CDN"],
          },
          {
            title: "Frontend Optimization",
            tasks: ["Minify CSS/JS", "Lazy load images", "Code splitting"],
          },
        ].map((rec, i) => (
          <div key={i} className="border border-[#E8E8E3]/10 rounded p-4 bg-[#101014]">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#D97736] mb-3">
              {rec.title}
            </h4>
            <ul className="space-y-1">
              {rec.tasks.map((task, j) => (
                <li key={j} className="text-[11px] text-[#A9A69F]">
                  ✓ {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
