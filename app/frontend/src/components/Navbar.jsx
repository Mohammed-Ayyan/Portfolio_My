import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Index", target: "hero" },
  { label: "Story", target: "about" },
  { label: "Work", target: "projects" },
  { label: "Craft", target: "skills" },
  { label: "Experience", target: "experience" },
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
      setHidden(y > lastY && y > 260);
      lastY = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        data-testid="main-navbar"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
        className={`nav-shell fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "is-scrolled" : ""}`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <button type="button" onClick={() => scrollTo("hero")} data-testid="nav-logo" data-cursor="hover" className="brand-lockup group flex min-w-0 items-center gap-3">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark-core" />
              <span className="brand-mark-signal brand-mark-signal-a" />
              <span className="brand-mark-signal brand-mark-signal-b" />
            </span>
            <span className="brand-wordmark font-display text-sm font-semibold uppercase text-[#E8E8E3]">
              <span>Mohammed</span>
              <span>Ayyan</span>
            </span>
          </button>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((link, index) => (
              <li key={link.target}>
                <button
                  type="button"
                  data-testid={`nav-link-${link.target}`}
                  data-cursor="hover"
                  onClick={() => scrollTo(link.target)}
                  className="link-underline font-mono text-[10px] uppercase tracking-[0.22em] text-[#8A8A93] transition-colors hover:text-[#E8E8E3]"
                >
                  <span className="mr-2 text-[#4A4A52]">{String(index + 1).padStart(2, "0")}</span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <span className="h-1.5 w-1.5 bg-[#D97736]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8A8A93]">
              Open to collaborations
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            data-testid="nav-menu-toggle"
            data-cursor="hover"
            className="nav-menu-button flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-6 bg-[#E8E8E3] transition-transform duration-500 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-[#E8E8E3] transition-transform duration-500 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
            className="mobile-nav-panel fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 bg-[#08080A]/97 lg:hidden"
          >
            {links.map((link, index) => (
              <motion.button
                key={link.target}
                type="button"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.06 * index, duration: 0.55 }}
                onClick={() => scrollTo(link.target)}
                data-testid={`mobile-nav-link-${link.target}`}
                className="font-display text-[clamp(2rem,10vw,3.5rem)] font-medium uppercase leading-none text-[#E8E8E3]"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
