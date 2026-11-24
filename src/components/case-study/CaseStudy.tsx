import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X, Github, ExternalLink, Lock } from "lucide-react";
import type { Project } from "../../types";
import { developerProfile } from "../../data";
import { useModalA11y } from "../../hooks/useModalA11y";
import ModelCaseStudyBody from "./ModelCaseStudyBody";
import ProductCaseStudyBody from "./ProductCaseStudyBody";

interface CaseStudyProps {
  project: Project;
  coverSrc?: string;
  onClose: () => void;
}

export default function CaseStudy({ project, coverSrc, onClose }: CaseStudyProps) {
  const cs = project.caseStudy!;
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  useModalA11y(true, dialogRef, onClose);

  // The dialog instance is reused when the hash switches case studies; start each one at the top.
  useEffect(() => {
    dialogRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  // No router on this site, so the case study gets its own tab title while open.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${cs.title} · Case Study | ${developerProfile.name}`;
    return () => {
      document.title = previousTitle;
    };
  }, [cs.title]);

  const linkClass =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C15F3C]";

  return (
    <div className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center sm:p-4">
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
        aria-labelledby="case-study-title"
        tabIndex={-1}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-4xl h-full sm:h-auto sm:max-h-[92vh] overflow-y-auto overflow-x-hidden bg-[#FAF9F5] sm:border border-[#E6E2D8] sm:rounded-2xl shadow-2xl scrollbar-thin focus:outline-none"
      >
        <button
          onClick={onClose}
          aria-label="Close case study"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 border border-[#E6E2D8] text-[#55534D] hover:text-[#262624] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C15F3C]"
        >
          <X className="w-4 h-4" />
        </button>

        {cs.kind === "model" && coverSrc && (
          <img
            src={coverSrc}
            alt={project.coverAlt ?? project.title}
            width={1200}
            height={600}
            className="w-full aspect-[2/1] object-cover bg-[#0b1530]"
          />
        )}

        <div className="px-5 sm:px-10 py-8 sm:py-10 space-y-12">
          <header className="space-y-3 pr-10">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C15F3C] font-semibold">{cs.eyebrow}</span>
            <h2 id="case-study-title" className="text-4xl sm:text-5xl font-serif font-[800] tracking-[-0.02em] text-[#262624]">
              {cs.title}
            </h2>
            <p className="text-lg text-[#55534D] leading-relaxed max-w-2xl">{cs.subtitle}</p>
            {cs.kind === "product" && (
              <p className="text-sm text-[#55534D] max-w-2xl">
                <span className="font-semibold text-[#262624]">My role: </span>
                {cs.role}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} bg-[#262624] text-white hover:bg-[#3A3835]`}
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  <span>{project.demoLabel ?? "Live demo"}</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} ${
                    project.demoUrl
                      ? "border border-[#E6E2D8] text-[#262624] hover:bg-[#F0EDE4]"
                      : "bg-[#262624] text-white hover:bg-[#3A3835]"
                  }`}
                >
                  <Github className="w-4 h-4" aria-hidden="true" />
                  <span>GitHub</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              {!project.githubUrl && project.repoNote && (
                <span className="inline-flex items-center gap-1.5 text-xs text-[#83807A]">
                  <Lock className="w-3 h-3" aria-hidden="true" />
                  {project.repoNote}
                </span>
              )}
            </div>
          </header>

          {cs.kind === "model" ? <ModelCaseStudyBody cs={cs} /> : <ProductCaseStudyBody cs={cs} />}
        </div>
      </motion.div>
    </div>
  );
}
