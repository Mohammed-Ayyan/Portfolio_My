import { motion, useScroll, useTransform } from "framer-motion";

export default function Scene3D() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.35], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.25]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="hero-atmosphere absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(217,119,54,0.18),transparent_28%),linear-gradient(115deg,#070709_0%,#101014_48%,#17110e_100%)]" />
      <div className="absolute inset-x-[-10%] top-[14%] h-px bg-gradient-to-r from-transparent via-[#E8E8E3]/25 to-transparent" />
      <div className="absolute bottom-[18%] left-[8%] right-[8%] h-[34vh] border border-[#E8E8E3]/10 bg-[#E8E8E3]/[0.025] backdrop-blur-[2px] hero-frame" />
      <div className="absolute bottom-[24%] left-[16%] h-[22vh] w-[30vw] min-w-[220px] border border-[#D97736]/25 bg-[#0B0B0D]/40 backdrop-blur-md hero-panel" />
      <div className="absolute bottom-[30%] right-[12%] hidden h-[18vh] w-[24vw] border border-[#E8E8E3]/10 bg-[#0B0B0D]/35 backdrop-blur-md md:block hero-panel-delayed" />
      <div className="absolute left-[10%] top-[22%] h-24 w-px bg-gradient-to-b from-transparent via-[#D97736]/70 to-transparent" />
      <div className="absolute right-[18%] top-[18%] h-16 w-16 border-r border-t border-[#E8E8E3]/20" />
    </motion.div>
  );
}
