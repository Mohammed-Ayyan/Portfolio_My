import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Eraser, PencilSimple, Palette } from "@phosphor-icons/react";

const colors = ["#D97736", "#E8E8E3", "#FF6B6B", "#4CAF50", "#2196F3"];

export default function SketchToolContent({ annotations, onAddAnnotation, onClearAnnotations }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(colors[0]);
  const [mode, setMode] = useState("draw");
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = 500;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    setContext(ctx);
  }, []);

  const handleMouseDown = (e) => {
    if (!context) return;
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    context.beginPath();
    context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !context) return;
    const rect = canvasRef.current.getBoundingClientRect();

    if (mode === "draw") {
      context.strokeStyle = color;
      context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      context.stroke();
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (context) {
      context.closePath();
    }
  };

  const handleErase = () => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="sketch-tool-content">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736] mb-3">
          Sketch Tool / Annotate & Draw
        </div>
        <p className="text-base text-[#A9A69F] max-w-2xl">
          Draw annotations directly on your portfolio canvas. Use different
          colors to highlight, mark up, and add visual notes to your work.
        </p>
      </div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center gap-4 flex-wrap"
      >
        {/* Draw/Erase Mode */}
        <div className="flex items-center gap-2 border border-[#E8E8E3]/10 rounded p-2">
          <button
            onClick={() => setMode("draw")}
            className={`p-2 rounded transition-colors ${
              mode === "draw"
                ? "bg-[#D97736] text-[#08080A]"
                : "text-[#8A8A93] hover:text-[#E8E8E3]"
            }`}
          >
            <PencilSimple size={18} />
          </button>
          <button
            onClick={() => setMode("erase")}
            className={`p-2 rounded transition-colors ${
              mode === "erase"
                ? "bg-[#D97736] text-[#08080A]"
                : "text-[#8A8A93] hover:text-[#E8E8E3]"
            }`}
          >
            <Eraser size={18} />
          </button>
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-2">
          <Palette size={16} className="text-[#8A8A93]" />
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded border-2 transition-all ${
                color === c
                  ? "border-white scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Clear Button */}
        <button
          onClick={handleErase}
          className="ml-auto px-4 py-2 text-[11px] uppercase tracking-[0.18em] border border-[#D97736] text-[#D97736] hover:bg-[#D97736]/10 rounded transition-colors"
        >
          Clear Canvas
        </button>
      </motion.div>

      {/* Canvas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border border-[#D97736]/30 rounded bg-[#101014] overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full cursor-crosshair bg-gradient-to-br from-[#0B0B0D] to-[#101014]"
          style={{ height: "500px" }}
        />
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 border border-[#D97736]/20 bg-[#D97736]/5 rounded p-6"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D97736] mb-4">
          Sketch Tool Guide
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px] text-[#A9A69F]">
          <div>
            <p className="font-semibold text-[#E8E8E3] mb-1">How to Use:</p>
            <ul className="space-y-1 text-[11px]">
              <li>• Click "Draw" to start drawing annotations</li>
              <li>• Select a color from the palette</li>
              <li>• Drag on canvas to create marks</li>
              <li>• Use "Erase" mode to remove drawings</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#E8E8E3] mb-1">Best For:</p>
            <ul className="space-y-1 text-[11px]">
              <li>• Highlighting key features</li>
              <li>• Adding visual notes</li>
              <li>• Marking problem areas</li>
              <li>• Creating hand-drawn explanations</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Annotations List */}
      {annotations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D97736] mb-4">
            Saved Annotations ({annotations.length})
          </div>
          <div className="space-y-2">
            {annotations.map((ann, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-3 border border-[#E8E8E3]/10 rounded bg-[#101014]"
              >
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: ann.color }}
                />
                <span className="text-[11px] text-[#A9A69F]">
                  Annotation {i + 1} — {ann.timestamp}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
