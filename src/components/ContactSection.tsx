import { useState, type FormEvent } from 'react';
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PROFILE } from '@/src/data/portfolio';

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) return;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${senderName.trim()}`);
    const body = encodeURIComponent(
      `Name: ${senderName.trim()}\nEmail: ${senderEmail.trim()}\n\n${message.trim()}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setSenderName('');
    setSenderEmail('');
    setMessage('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative border-t border-white/10 bg-[#050505] pt-24 pb-12 md:pt-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        {/* Dramatic Contact Headline */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-white/10 pb-12"
        >
          <p className="font-mono-tabular text-xs font-medium tracking-[0.2em] text-[#DC1E2E] uppercase">
            05. Get In Touch
          </p>
          <h2
            className="mt-4 font-display text-6xl leading-[0.88] font-extrabold tracking-tight text-white uppercase sm:text-8xl lg:text-[7.5rem]"
            style={{ textWrap: 'balance' }}
          >
            LET&apos;S WORK <span className="text-[#DC1E2E]">TOGETHER.</span>
          </h2>
        </motion.div>

        {/* Contact Grid: Direct Channels + Message Composer */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Links */}
          <div className="flex flex-col justify-between space-y-10 lg:col-span-5">
            <div className="space-y-4">
              <p className="max-w-md text-base leading-relaxed text-zinc-300">
                Open to AI engineering collaborations, software development internships, and ambitious web builds. Reach out directly via LinkedIn or email.
              </p>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-8">
              {/* LinkedIn Primary Card Link */}
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-white/15 bg-[#0B0B0C] px-6 py-5 transition-colors duration-150 hover:border-[#DC1E2E]"
              >
                <div>
                  <p className="text-xs tracking-[0.14em] text-zinc-400 uppercase">
                    LinkedIn Profile
                  </p>
                  <p className="mt-1 text-base font-semibold text-white transition-colors group-hover:text-[#DC1E2E]">
                    Shanmukha Vaibhav Tatipaka
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#DC1E2E]" />
              </a>

              {/* Email Direct Row + Copy Button */}
              <div className="flex flex-col justify-between gap-4 border border-white/15 bg-[#0B0B0C] px-6 py-5 sm:flex-row sm:items-center">
                <div className="min-w-0">
                  <p className="text-xs tracking-[0.14em] text-zinc-400 uppercase">
                    Email Address
                  </p>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="mt-1 flex items-center gap-2 truncate text-sm font-medium text-white transition-colors hover:text-[#DC1E2E] sm:text-base"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[#DC1E2E]" />
                    <span className="truncate">{PROFILE.email}</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 border border-white/15 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-zinc-200 uppercase whitespace-nowrap shrink-0 transition-colors hover:border-[#DC1E2E] hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#DC1E2E]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Interactive Message Form */}
          <div className="border border-white/10 bg-[#0B0B0C] p-6 sm:p-8 lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.16em] text-zinc-400 uppercase">
              Direct Inquiry
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs tracking-[0.12em] text-zinc-400 uppercase"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => {
                      setSenderName(e.target.value);
                      setSubmitted(false);
                    }}
                    placeholder="Enter your name"
                    className="mt-2 w-full border border-white/15 bg-[#050505] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#DC1E2E] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs tracking-[0.12em] text-zinc-400 uppercase"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => {
                      setSenderEmail(e.target.value);
                      setSubmitted(false);
                    }}
                    placeholder="you@example.com"
                    className="mt-2 w-full border border-white/15 bg-[#050505] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#DC1E2E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs tracking-[0.12em] text-zinc-400 uppercase"
                >
                  Project or Opportunity Details
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setSubmitted(false);
                  }}
                  placeholder="Tell me about your idea, role, or collaboration..."
                  className="mt-2 w-full resize-none border border-white/15 bg-[#050505] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#DC1E2E] focus:outline-none"
                />
              </div>

              <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-[#DC1E2E] px-6 py-3.5 text-xs font-semibold tracking-[0.16em] text-white uppercase whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#b91624] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Send Message</span>
                  <Send className="h-3.5 w-3.5" />
                </button>

                {submitted && (
                  <p className="text-xs text-zinc-300">
                    Mail draft prepared for {PROFILE.email}.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Quiet Editorial Footer */}
        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>
            © 2026 {PROFILE.fullName} · {PROFILE.institution}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 tracking-[0.14em] text-zinc-400 uppercase transition-colors hover:text-[#DC1E2E]"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
