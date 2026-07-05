import { useState, useMemo, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Calendar, ChevronDown, ChevronUp, Lock, Send, Check, AlertCircle, Eye } from "lucide-react";
import { certificationsData } from "../data";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { isValidEmail } from "../utils/validation";
import { apiUrl } from "../utils/api";
import type { Certification } from "../types";

const certImages = import.meta.glob("../assets/certificates/*.webp", { eager: true, import: "default" }) as Record<string, string>;

function resolveCertImage(name?: string): string | undefined {
  if (!name) return undefined;
  const match = Object.entries(certImages).find(([path]) => path.endsWith(`/${name}.webp`));
  return match?.[1];
}

const INITIAL_COUNT = 4;
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdlkooa";
const UNLOCK_KEY = "cert-access-unlocked";

type AccessForm = { name: string; email: string; reason: string; preferredTime: string };
const emptyAccessForm: AccessForm = { name: "", email: "", reason: "", preferredTime: "" };

export default function Certificates() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.05, rootMargin: "0px 0px -60px 0px" });
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Certification | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(() => sessionStorage.getItem(UNLOCK_KEY) === "1");
  const [accessForm, setAccessForm] = useState<AccessForm>(emptyAccessForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "error" | "invalid-email">("idle");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return certificationsData.filter(
      (c) => c.title.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q)
    );
  }, [query]);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > INITIAL_COUNT;

  const handleAccessRequest = async (e: FormEvent) => {
    e.preventDefault();
    if (!accessForm.name || !accessForm.email) {
      setStatus("error");
      return;
    }
    if (!isValidEmail(accessForm.email)) {
      setStatus("invalid-email");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Certificate access request from ${accessForm.name}`,
          formType: "certificate-access",
          name: accessForm.name,
          email: accessForm.email,
          reason: accessForm.reason || "Not provided",
          preferredTime: accessForm.preferredTime || "Not provided",
          requestedCertificate: selected?.title || "Unknown",
        }),
      });

      // Track in Notion too; best-effort, doesn't block unlock if it fails.
      fetch(apiUrl("/api/track-lead"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: accessForm.name,
          email: accessForm.email,
          source: "Certificate Access",
          certificateRequested: selected?.title || "Unknown",
          message: [
            accessForm.reason && `Reason: ${accessForm.reason}`,
            accessForm.preferredTime && `Preferred meeting time: ${accessForm.preferredTime}`,
          ]
            .filter(Boolean)
            .join(" | "),
        }),
      }).catch(() => {});

      if (res.ok) {
        sessionStorage.setItem(UNLOCK_KEY, "1");
        setIsUnlocked(true);
        setStatus("idle");
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
    <section id="certificates" className="py-24 sm:py-32 bg-[#F4F1EA]">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref as any} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C15F3C] font-semibold">Credentials</span>
            <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#262624] mt-3">
              Certifications.
            </h2>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#83807A]" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowAll(false);
              }}
              placeholder="Search credentials..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#E6E2D8] text-sm text-[#262624] placeholder-[#83807A] focus:outline-none focus:border-[#C15F3C]/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visible.map((cert, i) => {
            const thumb = resolveCertImage(cert.thumbUrl);
            return (
              <motion.button
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (i % INITIAL_COUNT) * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(cert)}
                className="card-surface rounded-2xl overflow-hidden text-left cursor-pointer flex flex-col hover:border-[#D4B876] hover:shadow-[0_16px_36px_-14px_rgba(176,141,63,0.3)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F4F1EA] border-b border-[#E6E2D8]">
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={cert.title}
                      loading="lazy"
                      className={`w-full h-full object-cover object-top transition-all duration-300 ${
                        isUnlocked ? "" : "blur-md scale-105"
                      }`}
                    />
                  ) : null}
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/20">
                      <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                        <Lock className="w-3.5 h-3.5 text-[#262624]" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-white drop-shadow">
                        View certificate
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-[#262624] leading-snug mb-1.5">{cert.title}</h3>
                  <p className="text-xs text-[#83807A]">{cert.issuer}</p>
                  <p className="text-xs text-[#83807A] mt-1 font-mono">{cert.date}</p>
                </div>
              </motion.button>
            );
          })}

          {filtered.length === 0 && (
            <p className="col-span-full text-center text-sm text-[#83807A] py-12">
              No credentials match "{query}".
            </p>
          )}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E6E2D8] text-[#262624] text-sm font-medium hover:border-[#C15F3C]/40 hover:bg-[#F3E3D9] transition-colors cursor-pointer"
            >
              <span>{showAll ? "Show less" : `View more (${filtered.length - INITIAL_COUNT})`}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelected(null);
                setAccessForm(emptyAccessForm);
                setStatus("idle");
              }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#FAF9F5] border border-[#E6E2D8] rounded-2xl shadow-2xl scrollbar-thin"
            >
              {isUnlocked ? (
                (() => {
                  const full = resolveCertImage(selected.imageUrl);
                  return full ? (
                    <div className="bg-[#F4F1EA] border-b border-[#E6E2D8]">
                      <img src={full} alt={selected.title} className="w-full h-auto" />
                    </div>
                  ) : null;
                })()
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F4F1EA] border-b border-[#E6E2D8]">
                  {(() => {
                    const full = resolveCertImage(selected.imageUrl);
                    return full ? (
                      <img src={full} alt="" className="w-full h-full object-cover blur-xl scale-110" />
                    ) : null;
                  })()}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <Lock className="w-6 h-6 text-[#262624]" />
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setSelected(null);
                  setAccessForm(emptyAccessForm);
                  setStatus("idle");
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 border border-[#E6E2D8] text-[#55534D] hover:text-[#262624] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 md:p-8">
                <h3 className="text-xl font-serif text-[#262624] mb-1">{selected.title}</h3>
                <p className="text-sm text-[#55534D] mb-4">{selected.issuer}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#83807A] mb-5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {selected.date}
                  </span>
                  {isUnlocked && selected.credentialId && (
                    <span className="font-mono break-all">ID: {selected.credentialId}</span>
                  )}
                </div>

                {selected.description && (
                  <p className="text-sm text-[#55534D] leading-relaxed mb-5">{selected.description}</p>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-medium bg-[#F0EDE4] text-[#55534D] rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {!isUnlocked && (
                  <div className="border-t border-[#E6E2D8] pt-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="w-4 h-4 text-[#C15F3C]" />
                      <h4 className="text-sm font-semibold text-[#262624]">Want to view the full certificate?</h4>
                    </div>
                    <p className="text-xs text-[#83807A] mb-4">
                      Share your details and Kiran will know you're interested. The certificate unlocks
                      immediately for the rest of your visit.
                    </p>

                    <form onSubmit={handleAccessRequest} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={accessForm.name}
                          onChange={(e) => setAccessForm({ ...accessForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-[#262624] placeholder-[#83807A] text-sm focus:outline-none focus:border-[#C15F3C]/60 transition-colors"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Email address"
                          value={accessForm.email}
                          onChange={(e) => setAccessForm({ ...accessForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-[#262624] placeholder-[#83807A] text-sm focus:outline-none focus:border-[#C15F3C]/60 transition-colors"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Why are you interested in this certificate? (optional)"
                        value={accessForm.reason}
                        onChange={(e) => setAccessForm({ ...accessForm, reason: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-[#262624] placeholder-[#83807A] text-sm focus:outline-none focus:border-[#C15F3C]/60 transition-colors resize-none"
                      />
                      <input
                        type="text"
                        placeholder="Preferred day/time to talk, if you'd like a call (optional)"
                        value={accessForm.preferredTime}
                        onChange={(e) => setAccessForm({ ...accessForm, preferredTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6E2D8] text-[#262624] placeholder-[#83807A] text-sm focus:outline-none focus:border-[#C15F3C]/60 transition-colors"
                      />

                      {status === "error" && (
                        <div className="p-3 rounded-xl bg-[#FBEAE3] border border-[#F0CFC0] text-[#8A3A22] text-xs flex items-center gap-2">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>Please fill in your name and email, then try again.</span>
                        </div>
                      )}

                      {status === "invalid-email" && (
                        <div className="p-3 rounded-xl bg-[#FBEAE3] border border-[#F0CFC0] text-[#8A3A22] text-xs flex items-center gap-2">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>That email address doesn't look valid. Please double-check it.</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm transition-all duration-300 cursor-pointer rounded-full ${
                          isSubmitting
                            ? "bg-[#F0EDE4] text-[#83807A] cursor-not-allowed"
                            : "bg-[#C15F3C] text-white hover:bg-[#A84C2C] active:scale-95 shadow-sm"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            <span>Unlocking...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Unlock certificate</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {isUnlocked && (
                  <div className="flex items-center gap-2 text-xs text-[#6B7A5E] pt-4 border-t border-[#E6E2D8]">
                    <Check className="w-3.5 h-3.5" />
                    <span>Access unlocked for this visit</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
