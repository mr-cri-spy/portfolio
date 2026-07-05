import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { developerProfile } from "../data";
import { Mail, Github, Linkedin, Send, Check, Copy, AlertCircle } from "lucide-react";
import { showToast } from "../utils/toast";
import { isValidEmail } from "../utils/validation";
import { apiUrl } from "../utils/api";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "invalid-email">("idle");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerProfile.email);
    setCopied(true);
    showToast("Email address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }
    if (!isValidEmail(formData.email)) {
      setStatus("invalid-email");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mzdlkooa", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New contact message from ${formData.name}`,
          formType: "contact",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      fetch(apiUrl("/api/track-lead"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          source: "Contact Form",
          message: formData.message,
        }),
      }).catch(() => {});

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#F4F1EA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C15F3C] font-semibold">Contact</span>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#262624] mt-3">
            Let's build something.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left panel */}
          <div className="lg:col-span-5 flex flex-col justify-between p-7 md:p-8 bg-white border border-[#E6E2D8] rounded-2xl space-y-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#262624]">Let's craft something together.</h3>
              <p className="text-[#55534D] text-sm leading-relaxed">
                Whether it's a full-time role, a contract project, or just a conversation about AI engineering
                patterns, my inbox is always open.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F1EA] border border-[#E6E2D8] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="p-2.5 rounded-lg bg-white border border-[#E6E2D8] text-[#C15F3C] shrink-0">
                  <Mail className="w-4 h-4" />
                </span>
                <div className="text-left min-w-0">
                  <span className="text-[10px] font-medium text-[#83807A] uppercase block">Direct email</span>
                  <span className="text-sm font-semibold text-[#262624] truncate block">{developerProfile.email}</span>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white border border-[#E6E2D8] text-[#55534D] hover:text-[#262624] transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-[#6B7A5E]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#E6E2D8]">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#83807A]">Connect elsewhere</h4>
              <div className="flex items-center gap-3">
                <a
                  href={developerProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F4F1EA] border border-[#E6E2D8] text-[#55534D] hover:text-[#262624] hover:border-[#E6E2D8] transition-colors duration-200 text-sm font-medium"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={developerProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F4F1EA] border border-[#E6E2D8] text-[#55534D] hover:text-[#262624] hover:border-[#E6E2D8] transition-colors duration-200 text-sm font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 p-7 md:p-8 bg-white border border-[#E6E2D8] rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium uppercase tracking-wide text-[#83807A]">
                    Your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8] text-[#262624] placeholder-[#83807A] text-sm focus:outline-none focus:border-[#C15F3C]/60 transition-colors duration-200"
                    placeholder="Crispy"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-[#83807A]">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8] text-[#262624] placeholder-[#83807A] text-sm focus:outline-none focus:border-[#C15F3C]/60 transition-colors duration-200"
                    placeholder="crishpy@gmail.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-medium uppercase tracking-wide text-[#83807A]">
                  Your message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8] text-[#262624] placeholder-[#83807A] text-sm focus:outline-none focus:border-[#C15F3C]/60 transition-colors resize-none duration-200"
                  placeholder="Hi Kiran, I'd love to chat about an opportunity..."
                />
              </div>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-4 rounded-xl bg-[#EAEFE5] border border-[#D7E2CE] text-[#3E4A36] text-sm flex items-center gap-2 leading-relaxed"
                  >
                    <Check className="w-4 h-4 flex-shrink-0 text-[#6B7A5E]" />
                    <span>Message sent. I'll get back to you within 24 hours.</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-4 rounded-xl bg-[#FBEAE3] border border-[#F0CFC0] text-[#8A3A22] text-sm flex items-center gap-2 leading-relaxed"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#C15F3C]" />
                    <span>Please fill in all fields before sending.</span>
                  </motion.div>
                )}

                {status === "invalid-email" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-4 rounded-xl bg-[#FBEAE3] border border-[#F0CFC0] text-[#8A3A22] text-sm flex items-center gap-2 leading-relaxed"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#C15F3C]" />
                    <span>That email address doesn't look valid. Please double-check it.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 font-medium text-sm transition-all duration-300 cursor-pointer rounded-full ${
                  isSubmitting
                    ? "bg-[#E6E2D8] text-[#83807A] cursor-not-allowed"
                    : "bg-[#262624] text-white hover:bg-[#3A3835] active:scale-95 shadow-sm"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
