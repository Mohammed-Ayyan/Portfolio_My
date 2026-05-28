export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid="site-footer"
      className="relative w-full border-t border-[#E8E8E3]/10 bg-[#08080A]"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14">
        <div className="flex items-center gap-4">
          <span className="relative flex h-8 w-8 items-center justify-center border border-[#E8E8E3]/20">
            <span className="h-1.5 w-1.5 bg-[#D97736]" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#8A8A93]">
            Mohammed Ayyan / Cinematic MERN stack portfolio / {year}
          </span>
        </div>
        <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8A8A93] sm:flex-row sm:gap-8">
          <span>React + Node + Express + MongoDB</span>
          <span>APIs / Auth / Motion / Deployment</span>
        </div>
      </div>
    </footer>
  );
}
