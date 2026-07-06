import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projects } from "../../../data/commits";

export default function SelectionToolContent({ selectedCommit, selectedProject }) {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div className="selection-tool-content">
      <div className="mb-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736] mb-3">
          Selection Tool / Click to Explore
        </div>
        <p className="text-base text-[#A9A69F] max-w-2xl">
          Use this tool to select and explore your projects. Hover to preview,
          click to view detailed information about architecture, tech stack, and
          implementation.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {projects.map((project, index) => {
          const isHovered = hoveredProject === project.id;
          const isSelected = selectedProject?.id === project.id;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className={`group relative border rounded transition-all duration-300 p-6 cursor-pointer overflow-hidden ${
                isSelected
                  ? "border-[#D97736] bg-[#D97736]/8"
                  : isHovered
                    ? "border-[#E8E8E3]/40 bg-[#E8E8E3]/5"
                    : "border-[#E8E8E3]/10 bg-[#101014] hover:border-[#E8E8E3]/25"
              }`}
            >
              {/* Selection highlight effect */}
              {isSelected && (
                <motion.div
                  layoutId="selection-highlight"
                  className="absolute inset-0 border-2 border-[#D97736] pointer-events-none rounded"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Hover glow */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-[#D97736]/5 to-transparent rounded pointer-events-none"
                />
              )}

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-[12px] uppercase tracking-[0.24em] text-[#D97736]">
                    {project.n} / 04
                  </span>
                  <motion.div
                    initial={{ x: 0, y: 0 }}
                    animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
                  >
                    <ArrowUpRight
                      size={20}
                      weight="light"
                      className="text-[#E8E8E3]"
                    />
                  </motion.div>
                </div>

                <h3 className="text-lg font-bold text-[#E8E8E3] mb-2 leading-tight">
                  {project.title}
                </h3>

                <p className="text-sm text-[#A9A69F] mb-4">
                  {project.description}
                </p>

                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8A8A93] mb-3">
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-[9px] rounded bg-[#D97736]/10 text-[#D97736] border border-[#D97736]/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Project Details */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-[#D97736]/30 bg-[#D97736]/5 rounded p-8"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736] mb-4">
            Selected: {selectedProject.title}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D97736] mb-2">
                Role
              </div>
              <p className="text-[#E8E8E3] font-semibold">
                {selectedProject.role}
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D97736] mb-2">
                Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="text-[#D97736] text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-[#A9A69F] leading-relaxed">
            {selectedProject.description}
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            className="mt-6 px-4 py-2 text-[11px] uppercase tracking-[0.18em] border border-[#D97736] text-[#D97736] hover:bg-[#D97736] hover:text-[#08080A] rounded transition-colors"
          >
            View Full Case Study →
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
