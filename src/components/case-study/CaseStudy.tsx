import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X, Github, CheckCircle2, ImageIcon } from "lucide-react";
import type { Project } from "../../types";
import { useModalA11y } from "../../hooks/useModalA11y";
import SpecGrid from "./SpecGrid";
import StatTile from "./StatTile";
import RoadmapStepper from "./RoadmapStepper";
import ArchitectureDiagram from "./ArchitectureDiagram";

interface CaseStudyProps {
  project: Project;
  coverSrc: string;
  onClose: () => void;
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="space-y-4">
      <h3 id={id} className="text-xl sm:text-2xl font-serif font-[700] tracking-tight text-[#262624]">
        {title}
      </h3>
      {children}
    </section>
  );
}

/** Dashed box marking where a real screenshot will go. */
function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#E6E2D8] bg-[#F4F1EA] px-4 py-10 text-center text-sm text-[#83807A]">
      <ImageIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default function CaseStudy({ project, coverSrc, onClose }: CaseStudyProps) {
  const cs = project.caseStudy!;
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  useModalA11y(true, dialogRef, onClose);

  // No router on this site, so the case study gets its own tab title while open.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${cs.title} — Case Study | Kiran M`;
    return () => {
      document.title = previousTitle;
    };
  }, [cs.title]);

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

        <img
          src={coverSrc}
          alt={project.coverAlt ?? project.title}
          width={1200}
          height={600}
          className="w-full aspect-[2/1] object-cover bg-[#0b1530]"
        />

        <div className="px-5 sm:px-10 py-8 sm:py-10 space-y-12">
          {/* Header */}
          <header className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C15F3C] font-semibold">{cs.eyebrow}</span>
            <h2 id="case-study-title" className="text-4xl sm:text-5xl font-serif font-[800] tracking-[-0.02em] text-[#262624]">
              {cs.title}
            </h2>
            <p className="text-lg text-[#55534D] leading-relaxed max-w-2xl">{cs.subtitle}</p>
            {project.githubUrl && (
              <div className="pt-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#262624] text-white text-sm font-medium hover:bg-[#3A3835] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C15F3C]"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            )}
          </header>

          <Section id="cs-why" title="Why I built it">
            <p className="text-[#55534D] leading-relaxed max-w-3xl">{cs.why}</p>
          </Section>

          <Section id="cs-architecture" title="Architecture">
            <SpecGrid items={cs.architecture} />
            <div className="bg-white border border-[#EFEBE1] rounded-2xl p-4 sm:p-6">
              <ArchitectureDiagram />
            </div>
          </Section>

          <Section id="cs-tokenizer" title="Tokenizer">
            <p className="text-[#55534D] leading-relaxed max-w-3xl">{cs.tokenizer}</p>
          </Section>

          <Section id="cs-training" title={cs.training.heading}>
            <ul className="space-y-2">
              {cs.training.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#55534D]">
                  <span className="inline-block mt-2 w-1.5 h-1.5 rounded-full bg-[#6B7A5E] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ImagePlaceholder label="Training / validation loss curve from the v0.2 run — screenshot to be added" />
          </Section>

          <Section id="cs-engineering" title="Engineering for free-tier GPUs">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {cs.engineering.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#262624]">
                  <CheckCircle2 className="w-4 h-4 text-[#6B7A5E] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-base font-serif font-[700] text-[#C15F3C]">{cs.engineering.takeaway}</p>
          </Section>

          <Section id="cs-evaluation" title="Evaluation">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cs.evaluation.stats.map((stat) => (
                <StatTile key={stat.label} {...stat} />
              ))}
            </div>
            <p className="text-sm text-[#83807A]">{cs.evaluation.alsoMeasures}</p>
            <p className="text-[#55534D] leading-relaxed max-w-3xl">{cs.evaluation.decoding}</p>
            <ImagePlaceholder label="Sample generation from the evaluation notebook — screenshot to be added (optional)" />
          </Section>

          <Section id="cs-experiment" title={cs.experiment.heading}>
            <blockquote className="border-l-4 border-[#C15F3C] bg-[#F3E3D9]/60 rounded-r-2xl px-5 py-4 text-lg font-serif font-[600] text-[#262624]">
              {cs.experiment.question}
            </blockquote>
            <p className="text-[#55534D] leading-relaxed max-w-3xl">{cs.experiment.body}</p>
          </Section>

          <Section id="cs-roadmap" title="Roadmap">
            <RoadmapStepper steps={cs.roadmap} />
          </Section>

          <p className="text-xs text-[#83807A] leading-relaxed border-t border-[#E6E2D8] pt-6">{cs.status}</p>
        </div>
      </motion.div>
    </div>
  );
}
