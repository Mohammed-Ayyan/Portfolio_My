import { motion } from "framer-motion";
import { Terminal, CheckCircle, Warning } from "@phosphor-icons/react";

export default function DeploymentConsoleContent({ selectedProject }) {
  const deploymentLogs = [
    { type: "success", time: "14:32:05", message: "✓ Build started" },
    { type: "info", time: "14:32:10", message: "Installing dependencies..." },
    { type: "success", time: "14:32:45", message: "✓ Dependencies installed" },
    { type: "info", time: "14:32:46", message: "Building application..." },
    { type: "success", time: "14:33:15", message: "✓ Build completed (2.5s)" },
    { type: "success", time: "14:33:16", message: "✓ Tests passed (12/12)" },
    { type: "info", time: "14:33:17", message: "Deploying to production..." },
    { type: "success", time: "14:33:25", message: "✓ Frontend deployed to Vercel" },
    { type: "success", time: "14:33:35", message: "✓ Backend deployed to Render" },
    { type: "success", time: "14:33:40", message: "✓ Environment variables loaded" },
  ];

  return (
    <div className="deployment-console-content">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736] mb-3">
          Deployment Console / Build Logs
        </div>
        <p className="text-base text-[#A9A69F] max-w-2xl">
          View deployment pipeline status, build logs, and environment
          configuration for production deployments.
        </p>
      </div>

      {/* Deployment Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        {[
          {
            label: "Frontend",
            status: "Live",
            url: "vercel.app",
            color: "green",
          },
          { label: "Backend API", status: "Live", url: "render.com", color: "green" },
          { label: "Database", status: "Connected", url: "mongodb.com", color: "green" },
        ].map((service, i) => (
          <div
            key={i}
            className="border border-[#E8E8E3]/10 rounded p-4 bg-[#101014]"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-500" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8A8A93]">
                {service.label}
              </span>
            </div>
            <p className="font-mono text-[12px] text-[#D97736]">
              {service.status}
            </p>
            <p className="text-[11px] text-[#7A7A82] mt-1">{service.url}</p>
          </div>
        ))}
      </motion.div>

      {/* Build Console Output */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border border-[#E8E8E3]/10 rounded bg-[#0B0B0D] p-6 font-mono text-[11px]"
      >
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#E8E8E3]/10">
          <Terminal size={16} className="text-[#D97736]" />
          <span className="text-[#D97736] font-bold">BUILD CONSOLE</span>
          <span className="text-[#7A7A82] ml-auto">Deployment successful</span>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {deploymentLogs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              className={`flex items-start gap-3 ${
                log.type === "success"
                  ? "text-green-400"
                  : log.type === "warning"
                    ? "text-yellow-400"
                    : "text-[#A9A69F]"
              }`}
            >
              <span className="text-[#7A7A82] flex-shrink-0">[{log.time}]</span>
              <span>{log.message}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Environment Variables */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 border border-[#D97736]/20 bg-[#D97736]/5 rounded p-6"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D97736] mb-4">
          Environment Variables
        </div>
        <div className="space-y-2 text-[11px] font-mono">
          <div className="text-[#A9A69F]">
            <span className="text-[#D97736]">NODE_ENV</span>=production
          </div>
          <div className="text-[#A9A69F]">
            <span className="text-[#D97736]">REACT_APP_API_URL</span>=
            https://api.example.com
          </div>
          <div className="text-[#A9A69F]">
            <span className="text-[#D97736]">MONGODB_URI</span>=
            mongodb+srv://...
          </div>
          <div className="text-[#A9A69F]">
            <span className="text-[#D97736]">JWT_SECRET</span>=••••••••••
          </div>
          <div className="text-[#A9A69F]">
            <span className="text-[#D97736]">CORS_ORIGIN</span>=
            https://example.com
          </div>
        </div>
      </motion.div>

      {/* Deployment Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { name: "Frontend", service: "Vercel", status: "Deployed" },
          { name: "Backend", service: "Render", status: "Deployed" },
          { name: "Database", service: "MongoDB Atlas", status: "Active" },
        ].map((item, i) => (
          <div key={i} className="border border-[#E8E8E3]/10 rounded p-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D97736] mb-2">
              {item.name}
            </h4>
            <p className="text-[12px] text-[#A9A69F]">{item.service}</p>
            <p className="text-[11px] text-green-500 mt-1">✓ {item.status}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
