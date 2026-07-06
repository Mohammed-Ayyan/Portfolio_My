import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, commitTimeline } from "../../data/commits";
import SelectionToolContent from "./tools/SelectionToolContent";
import CodeInspectorContent from "./tools/CodeInspectorContent";
import APIMonitorContent from "./tools/APIMonitorContent";
import DatabaseViewerContent from "./tools/DatabaseViewerContent";
import DeploymentConsoleContent from "./tools/DeploymentConsoleContent";
import SketchToolContent from "./tools/SketchToolContent";
import MergeToolContent from "./tools/MergeToolContent";
import PerformanceAuditorContent from "./tools/PerformanceAuditorContent";
import "./Canvas.css";

export default function Canvas({
  activeTool,
  selectedCommit,
  annotations,
  onAddAnnotation,
  onClearAnnotations,
}) {
  const [selectedProject, setSelectedProject] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (selectedCommit?.projectId) {
      setSelectedProject(
        projects.find((p) => p.id === selectedCommit.projectId) || null
      );
    }
  }, [selectedCommit]);

  const renderToolContent = () => {
    const toolProps = {
      selectedCommit,
      selectedProject,
      annotations,
      onAddAnnotation,
      onClearAnnotations,
    };

    const contentMap = {
      select: <SelectionToolContent {...toolProps} />,
      code: <CodeInspectorContent {...toolProps} />,
      api: <APIMonitorContent {...toolProps} />,
      database: <DatabaseViewerContent {...toolProps} />,
      deploy: <DeploymentConsoleContent {...toolProps} />,
      sketch: <SketchToolContent ref={canvasRef} {...toolProps} />,
      merge: <MergeToolContent {...toolProps} />,
      performance: <PerformanceAuditorContent {...toolProps} />,
    };

    return contentMap[activeTool] || <DefaultContent />;
  };

  return (
    <div className="canvas-container relative w-full h-full overflow-hidden flex flex-col">
      {/* Canvas Header */}
      <motion.div
        key={`${activeTool}-${selectedCommit?.id}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="canvas-header border-b border-[#E8E8E3]/10 bg-[#0B0B0D] sticky top-0 z-10 px-8 py-6"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736] mb-2">
              Canvas / Active View
            </div>
            <h2 className="text-2xl font-bold text-[#E8E8E3]">
              {activeTool.charAt(0).toUpperCase() + activeTool.slice(1)} Tool
            </h2>
            {selectedCommit && (
              <p className="text-[13px] text-[#A9A69F] mt-2">
                Viewing: {selectedCommit.message}
              </p>
            )}
          </div>
          {annotations.length > 0 && (
            <motion.button
              onClick={onClearAnnotations}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.18em] border border-[#D97736] text-[#D97736] hover:bg-[#D97736]/8 rounded transition-colors"
            >
              Clear ({annotations.length})
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Canvas Content */}
      <motion.div
        key={activeTool}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 overflow-y-auto px-8 py-12"
      >
        <div className="canvas-content max-w-6xl mx-auto">
          {renderToolContent()}
        </div>
      </motion.div>
    </div>
  );
}

function DefaultContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-24"
    >
      <div className="text-6xl mb-4">👋</div>
      <h3 className="text-2xl font-bold text-[#E8E8E3] mb-4">
        Welcome to Interactive Canvas
      </h3>
      <p className="text-[#A9A69F] max-w-md mx-auto mb-6">
        Select a tool from the left panel and a commit from the timeline to
        explore my portfolio through different perspectives.
      </p>
      <div className="space-y-2 text-sm text-[#8A8A93]">
        <p>• Try the Selection tool to view projects</p>
        <p>• Use Code Inspector to see implementation details</p>
        <p>• Monitor API calls and database schemas</p>
        <p>• Check deployment and performance metrics</p>
      </div>
    </motion.div>
  );
}
