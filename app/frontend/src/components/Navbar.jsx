import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Index", target: "hero" },
  { label: "Story", target: "about" },
  { label: "Work", target: "projects" },
  { label: "Craft", target: "skills" },
  { label: "Contact", target: "contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY && y > 200);
      lastY = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        data-testid="main-navbar"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "glass" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10 lg:px-14">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            data-testid="nav-logo"
            data-cursor="hover"
            className="group flex items-center gap-3"
          >
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-[#E8E8E3]/30 transition-transform duration-700 group-hover:rotate-180" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#D97736]" />
            </span>
            <span className="font-display text-sm font-semibold tracking-[0.18em] uppercase text-[#E8E8E3]">
              Kael — Studio
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-10 md:flex">
            {links.map((l, i) => (
              <li key={l.target}>
                <button
                  type="button"
                  data-testid={`nav-link-${l.target}`}
                  data-cursor="hover"
                  onClick={() => scrollTo(l.target)}
                  className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#8A8A93] hover:text-[#E8E8E3] transition-colors link-underline"
                >
                  <span className="mr-2 text-[#4A4A52]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <span className="h-2 w-2 rounded-full bg-[#D97736] shadow-[0_0_12px_rgba(217,119,54,0.7)] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8A8A93]">
              Available — 2026
            </span>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            data-testid="nav-menu-toggle"
            data-cursor="hover"
            className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-6 bg-[#E8E8E3] transition-transform duration-500 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-[#E8E8E3] transition-transform duration-500 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#0B0B0D]/95 backdrop-blur-2xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.button
                key={l.target}
                type="button"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.08 * i, duration: 0.6 }}
                onClick={() => scrollTo(l.target)}
                data-testid={`mobile-nav-link-${l.target}`}
                className="font-display text-4xl font-medium uppercase tracking-tight text-[#E8E8E3]"
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
