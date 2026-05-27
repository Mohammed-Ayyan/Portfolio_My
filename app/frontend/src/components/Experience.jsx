import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="relative w-full overflow-hidden bg-[#0B0B0D] py-28 sm:py-36 lg:py-48"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
              <span className="h-px w-10 bg-[#D97736]" />
              Experience / Internship
            </div>
            <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] text-[#F2F0EA] sm:text-6xl">
              Backend thinking that strengthens frontend craft.
            </h2>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
            className="relative border border-[#E8E8E3]/10 bg-[#101014] p-6 sm:p-10 lg:col-span-6 lg:col-start-7 lg:p-12"
          >
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#D97736] via-[#D97736]/20 to-transparent" />
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">Technotut</div>
            <h3 className="mt-5 font-display text-3xl font-semibold uppercase leading-tight text-[#E8E8E3] sm:text-4xl">
              Backend Developer Intern
            </h3>
            <p className="mt-6 text-base leading-relaxed text-[#A9A69F]">
              Worked with backend concepts, API structures, and data handling
              patterns while learning how stable server-side systems support
              polished product experiences.
            </p>

            <div className="mt-10 grid gap-px bg-[#E8E8E3]/10 sm:grid-cols-3">
              {[
                {
                  title: "Overview",
                  text: "Supported backend workflows and learned how product data moves through real systems.",
                },
                {
                  title: "Responsibilities",
                  text: "Worked around APIs, server logic, database thinking, and debugging practices.",
                },
                {
                  title: "Key learnings",
                  text: "Improved collaboration between frontend interfaces and backend contracts.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#0B0B0D] p-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D97736]">{item.title}</div>
                  <p className="mt-4 text-sm leading-relaxed text-[#9C9992]">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
