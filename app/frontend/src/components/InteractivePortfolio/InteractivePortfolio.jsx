import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolBox from "./ToolBox";
import CommitTimeline from "./CommitTimeline";
import Canvas from "./Canvas";
import "./InteractivePortfolio.css";

export default function InteractivePortfolio() {
  const [activeTool, setActiveTool] = useState("select");
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [annotations, setAnnotations] = useState([]);

  const handleToolChange = useCallback((tool) => {
    setActiveTool(tool);
  }, []);

  const handleCommitSelect = useCallback((commit) => {
    setSelectedCommit(commit);
  }, []);

  const addAnnotation = useCallback((annotation) => {
    setAnnotations((prev) => [...prev, annotation]);
  }, []);

  const clearAnnotations = useCallback(() => {
    setAnnotations([]);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="interactive-portfolio-section relative w-full overflow-hidden bg-[#08080A] py-20"
    >
      <div className="interactive-portfolio-container mx-auto max-w-full px-0">
        {/* Grid Background */}
        <div className="portfolio-grid-bg absolute inset-0" />

        {/* Three-Panel Layout */}
        <div className="interactive-portfolio-layout relative flex h-screen gap-px bg-[#E8E8E3]/5">
          {/* Left Sidebar - Toolbox */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="toolbox-panel w-[280px] border-r border-[#E8E8E3]/10 bg-[#0B0B0D] py-8 px-4"
          >
            <ToolBox activeTool={activeTool} onToolChange={handleToolChange} />
          </motion.div>

          {/* Center - Canvas Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="canvas-panel flex-1 overflow-y-auto bg-[#08080A]"
          >
            <Canvas
              activeTool={activeTool}
              selectedCommit={selectedCommit}
              annotations={annotations}
              onAddAnnotation={addAnnotation}
              onClearAnnotations={clearAnnotations}
            />
          </motion.div>

          {/* Right Sidebar - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="timeline-panel w-[300px] border-l border-[#E8E8E3]/10 bg-[#0B0B0D] overflow-y-auto py-8 px-4"
          >
            <CommitTimeline
              selectedCommit={selectedCommit}
              onCommitSelect={handleCommitSelect}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
