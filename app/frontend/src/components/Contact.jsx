import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle, Copy } from "@phosphor-icons/react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EMAIL = "hello@kaelmoreau.studio";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Name, email and message are required.");
      return;
    }
    setStatus("sending");
    try {
      await axios.post(`${API}/contact`, form);
      setStatus("sent");
      toast.success("Message received. I'll be in touch shortly.");
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
      className="relative w-full bg-[#0B0B0D] py-32 sm:py-40 lg:py-56"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D97736]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-14">
        <div className="text-center">
          <div className="mb-8 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736]">
            <span className="h-px w-10 bg-[#D97736]" />
            Contact — Begin
            <span className="h-px w-10 bg-[#D97736]" />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
            data-testid="contact-headline"
            className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-[#E8E8E3] sm:text-7xl lg:text-8xl"
          >
            Let's build
            <br />
            <em className="not-italic text-[#D97736]">something</em>
            <br />
            unforgettable.
          </motion.h2>
          <p className="mx-auto mt-8 max-w-xl text-base sm:text-lg font-light leading-relaxed text-[#8A8A93]">
            Commissions, collaborations or quiet hellos — all welcome. Most
            replies within 48 hours.
          </p>
        </div>

        <form
          onSubmit={submit}
          data-testid="contact-form"
          className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-x-12 gap-y-2 sm:grid-cols-2"
        >
          <div className="float-field">
            <input
              id="cf-name"
              name="name"
              type="text"
              placeholder=" "
              value={form.name}
              onChange={onChange}
              data-testid="contact-input-name"
              required
              autoComplete="off"
            />
            <label htmlFor="cf-name">Name</label>
          </div>
          <div className="float-field">
            <input
              id="cf-email"
              name="email"
              type="email"
              placeholder=" "
              value={form.email}
              onChange={onChange}
              data-testid="contact-input-email"
              required
              autoComplete="off"
            />
            <label htmlFor="cf-email">Email</label>
          </div>
          <div className="float-field sm:col-span-2">
            <input
              id="cf-subject"
              name="subject"
              type="text"
              placeholder=" "
              value={form.subject}
              onChange={onChange}
              data-testid="contact-input-subject"
              autoComplete="off"
            />
            <label htmlFor="cf-subject">Project / Subject</label>
          </div>
          <div className="float-field sm:col-span-2">
            <textarea
              id="cf-message"
              name="message"
              rows={4}
              placeholder=" "
              value={form.message}
              onChange={onChange}
              data-testid="contact-input-message"
              required
            />
            <label htmlFor="cf-message">Message</label>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:col-span-2 sm:flex-row sm:items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8A8A93]">
              ◇ Encrypted in transit · stored privately
            </span>
            <button
              type="submit"
              disabled={status === "sending"}
              data-testid="contact-submit"
              data-cursor="hover"
              data-cursor-label={status === "sent" ? "Sent" : "Send"}
              className="group relative inline-flex h-14 min-w-[220px] items-center justify-center overflow-hidden border border-[#E8E8E3]/20 px-8 font-mono text-xs uppercase tracking-[0.24em] text-[#E8E8E3] transition-colors duration-500 hover:border-[#D97736] disabled:opacity-60 rounded-full"
            >
              <span
                className={`absolute inset-0 bg-[#D97736] transition-transform duration-700 ease-dramatic ${
                  status === "sending" || status === "sent"
                    ? "translate-y-0"
                    : "translate-y-full group-hover:translate-y-0"
                }`}
              />
              <span
                className={`relative z-10 flex items-center gap-2 ${
                  status === "sending" || status === "sent" ? "text-[#0B0B0D]" : "group-hover:text-[#0B0B0D]"
                }`}
              >
                {status === "sending" && "Transmitting…"}
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

        {/* Quick contact strip */}
        <div className="mx-auto mt-24 grid max-w-3xl grid-cols-1 gap-px bg-[#E8E8E3]/10 sm:grid-cols-3">
          <button
            type="button"
            onClick={copyEmail}
            data-testid="contact-copy-email"
            data-cursor-label="Copy"
            data-cursor="hover"
            className="group flex items-center justify-between gap-3 bg-[#0B0B0D] p-6 text-left transition-colors hover:bg-[#1a1a1f]"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8A8A93]">
                Email
              </div>
              <div className="mt-1 font-display text-base text-[#E8E8E3]">{EMAIL}</div>
            </div>
            <Copy size={18} weight="light" className="text-[#8A8A93] group-hover:text-[#D97736]" />
          </button>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            data-testid="contact-social-twitter"
            data-cursor="hover"
            className="group flex items-center justify-between gap-3 bg-[#0B0B0D] p-6 transition-colors hover:bg-[#1a1a1f]"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8A8A93]">
                Social
              </div>
              <div className="mt-1 font-display text-base text-[#E8E8E3]">@kael.studio</div>
            </div>
            <ArrowUpRight size={18} weight="light" className="text-[#8A8A93] group-hover:text-[#D97736] group-hover:rotate-45 transition-transform" />
          </a>
          <a
            href="https://read.cv"
            target="_blank"
            rel="noreferrer"
            data-testid="contact-social-cv"
            data-cursor="hover"
            className="group flex items-center justify-between gap-3 bg-[#0B0B0D] p-6 transition-colors hover:bg-[#1a1a1f]"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8A8A93]">
                Long-form
              </div>
              <div className="mt-1 font-display text-base text-[#E8E8E3]">read.cv / kael</div>
            </div>
            <ArrowUpRight size={18} weight="light" className="text-[#8A8A93] group-hover:text-[#D97736] group-hover:rotate-45 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
