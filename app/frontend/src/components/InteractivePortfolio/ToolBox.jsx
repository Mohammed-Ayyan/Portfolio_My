import { motion } from "framer-motion";
import {
  SelectionPlus,
  Code,
  Network,
  Database,
  Rocket,
  PencilLine,
  GitBranch,
  Gauge,
} from "@phosphor-icons/react";

const tools = [
  {
    id: "select",
    name: "Selection",
    icon: SelectionPlus,
    description: "Explore & highlight projects",
    color: "#D97736",
  },
  {
    id: "code",
    name: "Code Inspector",
    icon: Code,
    description: "View source code & endpoints",
    color: "#D97736",
  },
  {
    id: "api",
    name: "API Monitor",
    icon: Network,
    description: "See REST API calls",
    color: "#D97736",
  },
  {
    id: "database",
    name: "Database Viewer",
    icon: Database,
    description: "MongoDB schemas & data",
    color: "#D97736",
  },
  {
    id: "deploy",
    name: "Deployment",
    icon: Rocket,
    description: "Build & deployment logs",
    color: "#D97736",
  },
  {
    id: "sketch",
    name: "Sketch/Draw",
    icon: PencilLine,
    description: "Annotate & add notes",
    color: "#D97736",
  },
  {
    id: "merge",
    name: "Merge Tool",
    icon: GitBranch,
    description: "Git commits & branches",
    color: "#D97736",
  },
  {
    id: "performance",
    name: "Performance",
    icon: Gauge,
    description: "Metrics & Web Vitals",
    color: "#D97736",
  },
];

export default function ToolBox({ activeTool, onToolChange }) {
  return (
    <div className="toolbox">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736] mb-2">
          Developer Tools
        </div>
        <div className="h-px w-8 bg-[#D97736]" />
      </div>

      <div className="space-y-2">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;

          return (
            <motion.button
              key={tool.id}
              onClick={() => onToolChange(tool.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`tool-button group relative w-full px-4 py-3 text-left transition-all duration-300 ${
                isActive
                  ? "border-l-2 border-[#D97736] bg-[#D97736]/8"
                  : "border-l-2 border-transparent hover:border-[#D97736]/40 hover:bg-[#E8E8E3]/3"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={20}
                  weight={isActive ? "fill" : "light"}
                  className={`transition-colors ${isActive ? "text-[#D97736]" : "text-[#8A8A93]"}`}
                />
                <div className="flex-1 min-w-0">
                  <div className={`font-mono text-[10px] uppercase tracking-[0.18em] ${isActive ? "text-[#D97736]" : "text-[#8A8A93]"}`}>
                    {tool.name}
                  </div>
                  <div className="text-[8px] text-[#5A5A62] truncate group-hover:text-[#7A7A82] transition-colors">
                    {tool.description}
                  </div>
                </div>
              </div>

              {isActive && (
                <motion.div
                  layoutId="active-tool-indicator"
                  className="absolute inset-0 rounded pointer-events-none"
                  style={{
                    border: "1px solid #D97736",
                    opacity: 0.15,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tool Info Section */}
      <motion.div
        key={activeTool}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
        className="mt-10 border-t border-[#E8E8E3]/10 pt-6"
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#D97736] mb-3">
          Tool Info
        </div>
        <div className="space-y-3">
          {(() => {
            const tool = tools.find((t) => t.id === activeTool);
            if (!tool) return null;

            const toolInfoMap = {
              select: "Click projects to view details and highlight sections of your work.",
              code: "Inspect component code, API endpoints, and backend logic with syntax highlighting.",
              api: "Monitor REST API calls, request/response formats, and HTTP methods.",
              database: "Explore MongoDB schemas, collections, and data relationships.",
              deploy: "View Vercel/Render deployment logs and environment variables.",
              sketch: "Draw and annotate on your projects to add visual notes.",
              merge: "See git commit history, branches, and PR information.",
              performance: "Check Lighthouse scores, Web Vitals, and performance metrics.",
            };

            return (
              <p className="text-[11px] leading-relaxed text-[#7A7A82]">
                {toolInfoMap[activeTool]}
              </p>
            );
          })()}
        </div>
      </motion.div>
    </div>
  );
}
