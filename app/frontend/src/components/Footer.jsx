export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="relative w-full border-t border-[#E8E8E3]/10 bg-[#0B0B0D]"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-12 sm:px-10 lg:px-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-[#E8E8E3]/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#D97736]" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A93]">
            ◇ Studio Kael — All works under © {year}
          </span>
        </div>
        <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#8A8A93] sm:flex-row sm:gap-10">
          <span>Built in React + R3F + Lenis + GSAP</span>
          <span>v 4.0.1 — Vol. 04</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D97736] animate-pulse" />
            Online · CET
          </span>
        </div>
      </div>
    </footer>
  );
}
