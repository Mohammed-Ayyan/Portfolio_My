import { motion } from "framer-motion";
import { GitBranch, CheckCircle, Clock } from "@phosphor-icons/react";
import { commitTimeline } from "../../../data/commits";

export default function MergeToolContent({ selectedCommit }) {
  const recentCommits = commitTimeline.slice(0, 8);

  return (
    <div className="merge-tool-content">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736] mb-3">
          Merge Tool / Git History
        </div>
        <p className="text-base text-[#A9A69F] max-w-2xl">
          Explore your git commit history, branches, and development timeline.
          Each commit represents a milestone in building your MERN stack skills
          and projects.
        </p>
      </div>

      {/* Branch Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        {[
          { name: "main", commits: 12, description: "Production branch" },
          {
            name: "develop",
            commits: 8,
            description: "Development branch",
          },
        ].map((branch, i) => (
          <div
            key={i}
            className="border border-[#E8E8E3]/10 rounded p-4 bg-[#101014]"
          >
            <div className="flex items-center gap-2 mb-2">
              <GitBranch size={16} className="text-[#D97736]" />
              <h3 className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#D97736]">
                {branch.name}
              </h3>
            </div>
            <p className="text-[12px] text-[#A9A69F]">
              {branch.description}
            </p>
            <p className="text-[11px] text-[#7A7A82] mt-2">
              {branch.commits} commits
            </p>
          </div>
        ))}
      </motion.div>

      {/* Commit History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D97736] mb-4">
          Recent Commits
        </div>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#D97736]/40 to-transparent" />

          <div className="space-y-4">
            {recentCommits.map((commit, index) => (
              <motion.div
                key={commit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative pl-20 p-4 border rounded transition-all ${
                  selectedCommit?.id === commit.id
                    ? "border-[#D97736] bg-[#D97736]/8"
                    : "border-[#E8E8E3]/10 hover:border-[#E8E8E3]/25 bg-[#101014]"
                }`}
              >
                {/* Commit dot */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#D97736] bg-[#0B0B0D]"
                  style={{
                    boxShadow: selectedCommit?.id === commit.id
                      ? "0 0 8px #D97736"
                      : "none",
                  }}
                />

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E8E8E3] flex-1">
                      {commit.message}
                    </h4>
                    <span className="text-[9px] text-[#7A7A82] flex-shrink-0">
                      {commit.date}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#A9A69F]">
                    {commit.description}
                  </p>

                  {commit.tech && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {commit.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[8px] px-2 py-1 rounded bg-[#D97736]/15 text-[#D97736]"
                        >
                          {t}
                        </span>
                      ))}
                      {commit.tech.length > 3 && (
                        <span className="text-[8px] px-2 py-1 text-[#7A7A82]">
                          +{commit.tech.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* PR Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border border-[#D97736]/20 bg-[#D97736]/5 rounded p-6"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D97736] mb-4">
          Pull Requests & Merges
        </div>

        <div className="space-y-3">
          {[
            {
              title: "Appointment Platform MVP",
              status: "Merged",
              branch: "feature/appointment-system",
            },
            {
              title: "Real Estate Search Filters",
              status: "Merged",
              branch: "feature/listing-filters",
            },
            {
              title: "Security Toolkit Launch",
              status: "Merged",
              branch: "feature/security-tools",
            },
          ].map((pr, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-3 pb-3 border-b border-[#E8E8E3]/10 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-mono text-[11px] text-[#E8E8E3]">
                  {pr.title}
                </p>
                <p className="text-[9px] text-[#7A7A82] mt-1">{pr.branch}</p>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-green-500 flex-shrink-0">
                <CheckCircle size={12} weight="fill" />
                {pr.status}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Commits", value: "47" },
          { label: "Branches", value: "6" },
          { label: "PRs Merged", value: "12" },
          { label: "Development Time", value: "6 months" },
        ].map((stat, i) => (
          <div key={i} className="border border-[#E8E8E3]/10 rounded p-4 text-center">
            <p className="text-3xl font-bold text-[#D97736]">{stat.value}</p>
            <p className="text-[11px] text-[#8A8A93] mt-2">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
