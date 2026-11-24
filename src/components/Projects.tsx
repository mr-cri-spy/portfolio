import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, X, Check, Briefcase, Bot, Code2, Globe, Sparkles, ArrowUpRight } from "lucide-react";
import { projectsData } from "../data";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useModalA11y } from "../hooks/useModalA11y";
import { trackEvent } from "../utils/analytics";
import { CASE_STUDY_HASH, caseStudyHref } from "../utils/caseStudy";
import type { Project } from "../types";
import FeaturedProjectCard from "./FeaturedProjectCard";
import CardArt from "./CardArt";

// The case study (and its diagrams) only loads when someone opens one.
const CaseStudy = lazy(() => import("./case-study/CaseStudy"));

const localProjectImages = import.meta.glob("../assets/images/project-*.webp", { eager: true, import: "default" }) as Record<string, string>;
const screenImages = import.meta.glob("../assets/images/screen-*.webp", { eager: true, import: "default" }) as Record<string, string>;

function resolveScreen(key?: string): string | undefined {
  if (!key) return undefined;
  return Object.entries(screenImages).find(([path]) => path.endsWith(`/screen-${key}.webp`))?.[1];
}

function resolveProjectImage(imageUrl?: string): string | undefined {
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith("http") || imageUrl.startsWith("data:")) return imageUrl;
  const match = Object.entries(localProjectImages).find(([path]) => path.endsWith(`/${imageUrl}.webp`));
  return match?.[1] || imageUrl;
}

const featuredProjects = projectsData.filter((p) => p.featured && p.caseStudy);
const otherProjects = projectsData.filter((p) => !(p.featured && p.caseStudy));

const categoryIcon: Record<string, typeof Briefcase> = {
  "Client work": Briefcase,
  Freelance: Globe,
  "Agents · R&D": Bot,
  "Open source": Code2,
};

function caseStudyFromHash(): Project | null {
  if (typeof window === "undefined") return null;
  const { hash } = window.location;
  if (!hash.startsWith(CASE_STUDY_HASH)) return null;
  let id: string;
  try {
    id = decodeURIComponent(hash.slice(CASE_STUDY_HASH.length));
  } catch {
    return null; // malformed escape such as "#work/%": ignore rather than crash the page
  }
  return projectsData.find((p) => p.id === id && p.caseStudy) ?? null;
}

export default function Projects() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.05, rootMargin: "0px 0px -60px 0px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(caseStudyFromHash);
  // True when the open case study added its own history entry, so closing should go Back.
  const openedByNavigation = useRef(false);

  useEffect(() => {
    const initial = caseStudyFromHash();
    if (initial) trackEvent("case_study_open", { project: initial.id, via: "link" });

    const sync = () => {
      const project = caseStudyFromHash();
      openedByNavigation.current = project !== null;
      setCaseStudyProject(project);
      if (project) trackEvent("case_study_open", { project: project.id });
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const openCaseStudy = (project: Project) => {
    window.location.hash = caseStudyHref(project.id).slice(1);
  };

  const closeCaseStudy = useCallback(() => {
    if (openedByNavigation.current) {
      // Pops the #work/… entry; the hashchange listener then closes the dialog.
      window.history.back();
      return;
    }
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    setCaseStudyProject(null);
  }, []);

  const closeDetail = useCallback(() => setSelectedProject(null), []);

  return (
    <section id="projects" className="py-24 sm:py-32 bg-[#F4F1EA]">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref as any} className="mb-12 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C15F3C] font-semibold">Work</span>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#262624] mt-3">Selected work.</h2>
          <p className="text-[#55534D] text-lg mt-4 leading-relaxed">
            Three products and a language model I designed and built end to end. Each case study covers the problem,
            the architecture, the trade-offs and what's still missing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, i) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              index={i}
              coverSrc={resolveProjectImage(project.imageUrl)}
              screenSrc={resolveScreen(project.coverScreen)}
              isVisible={isVisible}
              onOpenCaseStudy={() => openCaseStudy(project)}
            />
          ))}
        </div>

        {otherProjects.length > 0 && (
          <>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#262624] mt-16 mb-5 pb-2 border-b border-[#E6E2D8]">
              More work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {otherProjects.map((project, i) => {
                const Icon = categoryIcon[project.category] ?? Sparkles;
                return (
                  <motion.button
                    type="button"
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    whileHover={{ y: -4, boxShadow: "0 16px 36px -14px rgba(38, 38, 36, 0.18)" }}
                    className="card-surface rounded-2xl overflow-hidden flex flex-col text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C15F3C]"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.coverScreen ? (
                      <span className="block aspect-[2/1] w-full overflow-hidden border-b border-[#EFEBE1] bg-[#FAF9F5]">
                        <img
                          src={resolveScreen(project.coverScreen)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          width={1200}
                          height={600}
                          className="w-full h-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </span>
                    ) : project.cardArt ? (
                      <CardArt variant={project.cardArt} />
                    ) : null}
                    <span className="p-6 flex flex-col flex-1">
                    <span className="flex items-center justify-between mb-1.5">
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C15F3C] uppercase tracking-wide">
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        {project.category}
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 text-[#83807A] group-hover:text-[#C15F3C] transition-colors"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-lg font-semibold text-[#262624] mb-2">{project.title}</span>
                    <span className="text-sm text-[#55534D] leading-relaxed mb-4 flex-1">{project.description}</span>
                    <span className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2.5 py-1 text-xs font-medium bg-[#F0EDE4] text-[#55534D] rounded-full">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2.5 py-1 text-xs font-medium text-[#83807A]">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </>
        )}
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>
          {caseStudyProject && (
            <CaseStudy
              key="case-study"
              project={caseStudyProject}
              coverSrc={resolveProjectImage(caseStudyProject.imageUrl)}
              onClose={closeCaseStudy}
            />
          )}
        </AnimatePresence>
      </Suspense>

      <AnimatePresence>
        {selectedProject && <ProjectDetail project={selectedProject} onClose={closeDetail} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalA11y(true, dialogRef, onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#FAF9F5] border border-[#E6E2D8] rounded-2xl shadow-2xl scrollbar-thin focus:outline-none"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 border border-[#E6E2D8] text-[#55534D] hover:text-[#262624] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C15F3C]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 md:p-8 space-y-6">
          <div className="pr-10">
            <span className="text-xs font-medium text-[#C15F3C] uppercase tracking-wide">{project.category}</span>
            <h3 id="project-detail-title" className="text-2xl font-serif text-[#262624] mt-1">
              {project.title}
            </h3>
          </div>

          <p className="text-[#55534D] leading-relaxed">{project.longDescription}</p>

          {project.features.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#83807A] font-semibold mb-3">Highlights</h4>
              <ul className="space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-[#55534D]">
                    <Check className="w-4 h-4 text-[#6B7A5E] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#83807A] font-semibold mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1.5 text-xs font-medium bg-[#F0EDE4] text-[#55534D] rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {(project.githubUrl || project.demoUrl) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#262624] text-white text-sm font-medium hover:bg-[#3A3835] transition-colors"
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span>View code</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E6E2D8] text-[#262624] text-sm font-medium hover:bg-[#F0EDE4] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  <span>{project.demoLabel ?? "Live demo"}</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
