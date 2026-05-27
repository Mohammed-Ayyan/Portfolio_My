import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle, Copy } from "@phosphor-icons/react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EMAIL = "mohammedayyan.dev@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const onChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Name, email and message are required.");
      return;
    }
    setStatus("sending");
    try {
      await axios.post(`${API}/contact`, form);
      setStatus("sent");
      toast.success("Message received. I will be in touch shortly.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3500);
    } catch (err) {
      console.error(err);
      setStatus("error");
      toast.error("Something went wrong. Please try again.");
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative w-full overflow-hidden bg-[#08080A] py-28 sm:py-36 lg:py-52"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D97736]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(217,119,54,0.13),transparent_34%)]" />

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-14">
        <div className="text-center">
          <div className="mb-8 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
            <span className="h-px w-10 bg-[#D97736]" />
            Contact / Closing Frame
            <span className="h-px w-10 bg-[#D97736]" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
            data-testid="contact-headline"
            className="font-display text-5xl font-bold uppercase leading-[0.95] text-[#F2F0EA] sm:text-7xl lg:text-8xl"
          >
            Let's build
            <br />
            <em className="not-italic text-[#D97736]">something</em>
            <br />
            unforgettable together.
          </motion.h2>
          <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-[#A9A69F] sm:text-lg">
            Creating immersive digital experiences through motion, interaction,
            and engineering. Open to collaborations, creative projects, and
            innovative digital experiences.
          </p>
        </div>

        <form onSubmit={submit} data-testid="contact-form" className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-x-12 gap-y-2 sm:grid-cols-2">
          {[
            { id: "cf-name", name: "name", type: "text", label: "Name", required: true },
            { id: "cf-email", name: "email", type: "email", label: "Email", required: true },
            { id: "cf-subject", name: "subject", type: "text", label: "Project / Subject", required: false, wide: true },
          ].map((field) => (
            <div key={field.id} className={`float-field ${field.wide ? "sm:col-span-2" : ""}`}>
              <input id={field.id} name={field.name} type={field.type} placeholder=" " value={form[field.name]} onChange={onChange} required={field.required} autoComplete="off" />
              <label htmlFor={field.id}>{field.label}</label>
            </div>
          ))}

          <div className="float-field sm:col-span-2">
            <textarea id="cf-message" name="message" rows={4} placeholder=" " value={form.message} onChange={onChange} required />
            <label htmlFor="cf-message">Message</label>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:col-span-2 sm:flex-row sm:items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8A8A93]">
              Secure form / thoughtful replies
            </span>
            <button
              type="submit"
              disabled={status === "sending"}
              data-testid="contact-submit"
              data-cursor="hover"
              data-cursor-label={status === "sent" ? "Sent" : "Send"}
              className="group relative inline-flex h-14 min-w-[220px] items-center justify-center overflow-hidden rounded-full border border-[#E8E8E3]/20 px-8 font-mono text-xs uppercase tracking-[0.22em] text-[#E8E8E3] transition-colors duration-500 hover:border-[#D97736] disabled:opacity-60"
            >
              <span className={`absolute inset-0 bg-[#D97736] transition-transform duration-700 ease-dramatic ${status === "sending" || status === "sent" ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"}`} />
              <span className={`relative z-10 flex items-center gap-2 ${status === "sending" || status === "sent" ? "text-[#08080A]" : "group-hover:text-[#08080A]"}`}>
                {status === "sending" && "Transmitting..."}
                {status === "sent" && (
                  <>
                    <CheckCircle size={16} weight="light" /> Received
                  </>
                )}
                {(status === "idle" || status === "error") && (
                  <>
                    Send Message <ArrowUpRight size={14} weight="light" />
                  </>
                )}
              </span>
            </button>
          </div>
        </form>

        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-px bg-[#E8E8E3]/10 sm:grid-cols-3">
          <button type="button" onClick={copyEmail} data-testid="contact-copy-email" data-cursor-label="Copy" data-cursor="hover" className="group flex items-center justify-between gap-3 bg-[#0B0B0D] p-6 text-left transition-colors hover:bg-[#141417]">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8A8A93]">Email</div>
              <div className="mt-1 font-display text-base text-[#E8E8E3]">{EMAIL}</div>
            </div>
            <Copy size={18} weight="light" className="text-[#8A8A93] group-hover:text-[#D97736]" />
          </button>
          {[
            { label: "GitHub", value: "github.com/mohammed-ayyan", href: "https://github.com" },
            { label: "LinkedIn", value: "Mohammed Ayyan", href: "https://linkedin.com" },
          ].map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" data-cursor="hover" className="group flex items-center justify-between gap-3 bg-[#0B0B0D] p-6 transition-colors hover:bg-[#141417]">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8A8A93]">{item.label}</div>
                <div className="mt-1 font-display text-base text-[#E8E8E3]">{item.value}</div>
              </div>
              <ArrowUpRight size={18} weight="light" className="text-[#8A8A93] transition-transform group-hover:rotate-45 group-hover:text-[#D97736]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
