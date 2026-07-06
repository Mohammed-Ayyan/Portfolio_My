import { motion, AnimatePresence } from "framer-motion";
import { commitTimeline } from "../../data/commits";
import { Check, GitBranch } from "@phosphor-icons/react";

export default function CommitTimeline({ selectedCommit, onCommitSelect }) {
  const getTypeColor = (type) => {
    const colors = {
      skill: "#D97736",
      project: "#E8E8E3",
      experience: "#8A8A93",
      milestone: "#D97736",
    };
    return colors[type] || "#D97736";
  };

  const getTypeLabel = (type) => {
    const labels = {
      skill: "Skill",
      project: "Project",
      experience: "Experience",
      milestone: "Milestone",
    };
    return labels[type] || type;
  };

  return (
    <div className="commit-timeline">
      <div className="mb-8 sticky top-0 bg-[#0B0B0D] z-20 pb-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736] mb-2">
          Career Timeline
        </div>
        <div className="h-px w-12 bg-[#D97736]" />
        <p className="text-[10px] text-[#8A8A93] mt-4 leading-relaxed">
          Career progression as git commits—skills, projects, and milestones
        </p>
      </div>

      <div className="space-y-3 relative">
        {/* Timeline spine */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#D97736]/40 via-[#D97736]/20 to-transparent" />

        <AnimatePresence mode="popLayout">
          {commitTimeline.map((commit, index) => {
            const isSelected = selectedCommit?.id === commit.id;

            return (
              <motion.button
                key={commit.id}
                onClick={() => onCommitSelect(commit)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`commit-item group relative w-full pl-16 pr-2 py-3 text-left transition-all duration-300 ${
                  isSelected
                    ? "bg-[#D97736]/8 border border-[#D97736]/30 rounded"
                    : "border border-transparent hover:border-[#E8E8E3]/10 hover:bg-[#E8E8E3]/3 rounded"
                }`}
              >
                {/* Commit dot */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: getTypeColor(commit.type),
                    backgroundColor: isSelected
                      ? getTypeColor(commit.type)
                      : "#08080A",
                    boxShadow: isSelected
                      ? `0 0 12px ${getTypeColor(commit.type)}40`
                      : "none",
                  }}
                />

                <div className="flex items-start gap-2">
                  <div className="text-2xl flex-shrink-0 mt-0.5">
                    {commit.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div
                        className="font-mono text-[8px] uppercase tracking-[0.18em] px-2 py-1 rounded flex-shrink-0"
                        style={{
                          backgroundColor: `${getTypeColor(commit.type)}20`,
                          color: getTypeColor(commit.type),
                        }}
                      >
                        {getTypeLabel(commit.type)}
                      </div>
                      {isSelected && (
                        <Check
                          size={14}
                          weight="bold"
                          className="text-[#D97736] flex-shrink-0"
                        />
                      )}
                    </div>

                    <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#E8E8E3] leading-tight mb-1 line-clamp-2 group-hover:text-[#F2F0EA] transition-colors">
                      {commit.message}
                    </h4>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] text-[#8A8A93]">
                        {commit.date}
                      </span>
                      {commit.duration && (
                        <span className="text-[8px] text-[#5A5A62]">
                          • {commit.duration}
                        </span>
                      )}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1 mb-1">
                      {commit.tech.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[8px] text-[#D97736] bg-[#D97736]/10 px-1.5 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                      {commit.tech.length > 2 && (
                        <span className="text-[8px] text-[#8A8A93]">
                          +{commit.tech.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Expanded details when selected */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 pt-3 border-t border-[#E8E8E3]/10 space-y-2"
                      >
                        <p className="text-[9px] leading-relaxed text-[#A9A69F]">
                          {commit.description}
                        </p>

                        {commit.features && (
                          <div>
                            <div className="text-[8px] uppercase tracking-[0.16em] text-[#D97736] mb-1">
                              Features
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {commit.features.map((f) => (
                                <span
                                  key={f}
                                  className="text-[8px] px-1.5 py-0.5 rounded border border-[#D97736]/30 text-[#D97736]"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {commit.projectId && (
                          <div className="text-[9px] text-[#D97736] pt-1 border-t border-[#E8E8E3]/10 mt-2 pt-2">
                            ✓ View in canvas to explore
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
