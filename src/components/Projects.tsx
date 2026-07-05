import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, X, Check, Lock, Send, AlertCircle, Eye } from "lucide-react";
import { projectsData } from "../data";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { isValidEmail } from "../utils/validation";
import { apiUrl } from "../utils/api";
import type { Project } from "../types";

const localProjectImages = import.meta.glob("../assets/images/project-*.webp", { eager: true, import: "default" }) as Record<string, string>;

function resolveProjectImage(imageUrl: string): string {
  if (imageUrl.startsWith("http") || imageUrl.startsWith("data:")) return imageUrl;
  const match = Object.entries(localProjectImages).find(([path]) => path.endsWith(`/${imageUrl}.webp`));
  return match?.[1] || imageUrl;
}

const categories = ["All", ...Array.from(new Set(projectsData.map((p) => p.category)))];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzdlkooa";
const CODE_UNLOCK_KEY = "code-access-unlocked";

type AccessForm = { name: string; email: string; reason: string; preferredTime: string };
const emptyAccessForm: AccessForm = { name: "", email: "", reason: "", preferredTime: "" };

export default function Projects() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.05, rootMargin: "0px 0px -60px 0px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCodeUnlocked, setIsCodeUnlocked] = useState(() => sessionStorage.getItem(CODE_UNLOCK_KEY) === "1");
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [accessForm, setAccessForm] = useState<AccessForm>(emptyAccessForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "error" | "invalid-email">("idle");

  const filtered = projectsData.filter((p) => activeCategory === "All" || p.category === activeCategory);

  const closeModal = () => {
    setSelectedProject(null);
    setShowAccessForm(false);
    setAccessForm(emptyAccessForm);
    setStatus("idle");
  };

  const handleViewCodeClick = () => {
    if (isCodeUnlocked && selectedProject?.githubUrl) {
      window.open(selectedProject.githubUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setShowAccessForm(true);
  };

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
          _subject: `Code access request from ${accessForm.name}`,
          formType: "code-access",
          name: accessForm.name,
          email: accessForm.email,
          reason: accessForm.reason || "Not provided",
          preferredTime: accessForm.preferredTime || "Not provided",
          requestedProject: selectedProject?.title || "Unknown",
        }),
      });

      fetch(apiUrl("/api/track-lead"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: accessForm.name,
          email: accessForm.email,
          source: "Code Access",
          certificateRequested: selectedProject?.title || "Unknown",
          message: [
            accessForm.reason && `Reason: ${accessForm.reason}`,
            accessForm.preferredTime && `Preferred meeting time: ${accessForm.preferredTime}`,
          ]
            .filter(Boolean)
            .join(" | "),
        }),
      }).catch(() => {});

      if (res.ok) {
        sessionStorage.setItem(CODE_UNLOCK_KEY, "1");
        setIsCodeUnlocked(true);
        setShowAccessForm(false);
        setStatus("idle");
        if (selectedProject?.githubUrl) {
          window.open(selectedProject.githubUrl, "_blank", "noopener,noreferrer");
        }
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
    <section id="projects" className="py-24 sm:py-32 bg-[#F4F1EA]">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref as any} className="mb-12 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C15F3C] font-semibold">Work</span>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#262624] mt-3">
            Selected projects.
          </h2>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#262624] text-white"
                  : "bg-white border border-[#E6E2D8] text-[#55534D] hover:text-[#262624]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 16px 36px -14px rgba(38, 38, 36, 0.18)" }}
              className="card-surface rounded-2xl overflow-hidden flex flex-col cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F1EA]">
                <img
                  src={resolveProjectImage(project.imageUrl)}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {project.status === "ongoing" && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#B08D3F] text-white text-[10px] font-semibold uppercase tracking-wide shadow-sm">
                    Ongoing
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-medium text-[#C15F3C] uppercase tracking-wide mb-2">
                  {project.category}
                </span>
                <h3 className="text-lg font-semibold text-[#262624] mb-2">{project.title}</h3>
                <p className="text-sm text-[#55534D] leading-relaxed mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium bg-[#F0EDE4] text-[#55534D] rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2.5 py-1 text-xs font-medium text-[#83807A]">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#FAF9F5] border border-[#E6E2D8] rounded-2xl shadow-2xl scrollbar-thin"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={resolveProjectImage(selectedProject.imageUrl)}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 border border-[#E6E2D8] text-[#55534D] hover:text-[#262624] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-[#C15F3C] uppercase tracking-wide">
                      {selectedProject.category}
                    </span>
                    {selectedProject.status === "ongoing" && (
                      <span className="px-2 py-0.5 rounded-full bg-[#C15F3C]/10 text-[#C15F3C] text-[10px] font-semibold uppercase tracking-wide">
                        Ongoing
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-serif text-[#262624] mt-1">{selectedProject.title}</h3>
                </div>

                <p className="text-[#55534D] leading-relaxed">{selectedProject.longDescription}</p>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#83807A] font-semibold mb-3">
                    Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#55534D]">
                        <Check className="w-4 h-4 text-[#6B7A5E] mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#83807A] font-semibold mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium bg-[#F0EDE4] text-[#55534D] rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {(selectedProject.githubUrl || selectedProject.demoUrl) && (
                  <div className="flex gap-3 pt-2">
                    {selectedProject.githubUrl && (
                      <button
                        onClick={handleViewCodeClick}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#262624] text-white text-sm font-medium hover:bg-[#3A3835] transition-colors cursor-pointer"
                      >
                        {isCodeUnlocked ? <Github className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                        <span>View code</span>
                      </button>
                    )}
                    {selectedProject.demoUrl && selectedProject.demoUrl !== "#" && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E6E2D8] text-[#262624] text-sm font-medium hover:bg-[#F0EDE4] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live demo</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Code access request form */}
                <AnimatePresence>
                  {showAccessForm && !isCodeUnlocked && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#E6E2D8] pt-6">
                        <div className="flex items-center gap-2 mb-1">
                          <Eye className="w-4 h-4 text-[#C15F3C]" />
                          <h4 className="text-sm font-semibold text-[#262624]">Want to view the source code?</h4>
                        </div>
                        <p className="text-xs text-[#83807A] mb-4">
                          Share your details and Kiran will know you're interested. The GitHub repo opens
                          immediately and unlocks for the rest of your visit.
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
                            placeholder="Why are you interested in this code? (optional)"
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
                                <span>Unlock &amp; view code</span>
                              </>
                            )}
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
