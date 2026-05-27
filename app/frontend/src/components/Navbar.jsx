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
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-500 ${scrolled ? "glass" : ""}`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10 lg:px-14">
          <button type="button" onClick={() => scrollTo("hero")} data-testid="nav-logo" data-cursor="hover" className="group flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center border border-[#E8E8E3]/20">
              <span className="h-1.5 w-1.5 bg-[#D97736] transition-transform duration-500 group-hover:scale-[1.8]" />
            </span>
            <span className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[#E8E8E3]">
              Mohammed Ayyan
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
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-[#08080A]/96 backdrop-blur-2xl lg:hidden"
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
                className="font-display text-4xl font-medium uppercase text-[#E8E8E3]"
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
