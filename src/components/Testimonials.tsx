import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, AlertCircle, Send } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { isValidEmail, isValidPhone } from "../utils/validation";
import { countryCodes } from "../utils/countryCodes";
import { apiUrl } from "../utils/api";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdlkooa";

type FormState = {
  name: string;
  email: string;
  phone: string;
  relationship: string;
  comment: string;
};

const emptyForm: FormState = { name: "", email: "", phone: "", relationship: "", comment: "" };

export default function Testimonials() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.05, rootMargin: "0px 0px -60px 0px" });
  const [formData, setFormData] = useState<FormState>(emptyForm);
  const [dialCode, setDialCode] = useState("+91");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "invalid-email" | "invalid-phone">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment) {
      setStatus("error");
      return;
    }
    if (!isValidEmail(formData.email)) {
      setStatus("invalid-email");
      return;
    }
    const fullPhone = formData.phone.trim() ? `${dialCode} ${formData.phone.trim()}` : "";
    if (fullPhone && !isValidPhone(fullPhone)) {
      setStatus("invalid-phone");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New testimonial from ${formData.name}`,
          formType: "testimonial",
          name: formData.name,
          email: formData.email,
          phone: fullPhone || "Not provided",
          relationship: formData.relationship || "Not provided",
          comment: formData.comment,
        }),
      });

      fetch(apiUrl("/api/track-lead"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhone,
          source: "Testimonial",
          message: `${formData.relationship ? `(${formData.relationship}) ` : ""}${formData.comment}`,
        }),
      }).catch(() => {});

      if (res.ok) {
        setStatus("success");
        setFormData(emptyForm);
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
    <section id="testimonials" className="py-24 sm:py-32 bg-[#FAF9F5]">
      <div ref={ref as any} className="max-w-6xl mx-auto px-6">
        <div className="mb-12 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C15F3C] font-semibold">Reviews</span>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#262624] mt-3">
            Worked together?
          </h2>
        </div>

        {/* Share your experience form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="card-surface rounded-2xl p-7 md:p-8 max-w-3xl mx-auto"
        >
          <div className="mb-6 text-center">
            <h3 className="text-lg font-semibold text-[#262624] mb-1.5">Share your experience</h3>
            <p className="text-sm text-[#55534D]">
              Share a few words about your experience. Your contact details stay private; only your words may be
              featured here.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="t-name" className="text-xs font-medium uppercase tracking-wide text-[#83807A]">
                  Your name
                </label>
                <input
                  id="t-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8] text-[#262624] placeholder-[#83807A] text-sm focus:outline-none focus:border-[#C15F3C]/60 transition-colors duration-200"
                  placeholder="Crispy"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="t-email" className="text-xs font-medium uppercase tracking-wide text-[#83807A]">
                  Email <span className="normal-case text-[#83807A]">(private, not shown)</span>
                </label>
                <input
                  id="t-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8] text-[#262624] placeholder-[#83807A] text-sm focus:outline-none focus:border-[#C15F3C]/60 transition-colors duration-200"
                  placeholder="crishpy@gmail.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="t-phone" className="text-xs font-medium uppercase tracking-wide text-[#83807A]">
                  Phone <span className="normal-case text-[#83807A]">(private, optional)</span>
                </label>
                <div className="flex gap-2">
                  <select
                    aria-label="Country code"
                    value={dialCode}
                    onChange={(e) => setDialCode(e.target.value)}
                    className="px-2.5 py-3 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8] text-[#262624] text-sm focus:outline-none focus:border-[#C15F3C]/60 transition-colors duration-200 cursor-pointer shrink-0"
                  >
                    {countryCodes.map((c) => (
                      <option key={`${c.iso}-${c.dialCode}`} value={c.dialCode}>
                        {c.iso} {c.dialCode}
                      </option>
                    ))}
                  </select>
                  <input
                    id="t-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full min-w-0 px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8] text-[#262624] placeholder-[#83807A] text-sm focus:outline-none focus:border-[#C15F3C]/60 transition-colors duration-200"
                    placeholder="98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="t-relationship" className="text-xs font-medium uppercase tracking-wide text-[#83807A]">
                  How do you know Kiran?
                </label>
                <input
                  id="t-relationship"
                  type="text"
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8] text-[#262624] placeholder-[#83807A] text-sm focus:outline-none focus:border-[#C15F3C]/60 transition-colors duration-200"
                  placeholder="Colleague, manager, client..."
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="t-comment" className="text-xs font-medium uppercase tracking-wide text-[#83807A]">
                Your words
              </label>
              <textarea
                id="t-comment"
                required
                rows={4}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E6E2D8] text-[#262624] placeholder-[#83807A] text-sm focus:outline-none focus:border-[#C15F3C]/60 transition-colors resize-none duration-200"
                placeholder="Share what it was like working with Kiran..."
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
                  <span>Thank you. Your words have been sent to Kiran and may be featured here soon.</span>
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
                  <span>Something went wrong. Please fill in your name, email, and words, then try again.</span>
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

              {status === "invalid-phone" && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="p-4 rounded-xl bg-[#FBEAE3] border border-[#F0CFC0] text-[#8A3A22] text-sm flex items-center gap-2 leading-relaxed"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#C15F3C]" />
                  <span>That phone number doesn't look valid. Please double-check it, or leave it blank.</span>
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
                  <span>Submit your words</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
