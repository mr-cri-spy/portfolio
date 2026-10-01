import { motion } from "motion/react";
import { ArrowRight, Github, Star } from "lucide-react";
import type { Project } from "../types";

interface FeaturedProjectCardProps {
  project: Project;
  coverSrc: string;
  isVisible: boolean;
  onOpenCaseStudy: () => void;
}

/** Full-width flagship card: cover on the left, summary, metrics and actions on the right. */
export default function FeaturedProjectCard({ project, coverSrc, isVisible, onOpenCaseStudy }: FeaturedProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      aria-labelledby={`${project.id}-title`}
      className="md:col-span-2 rounded-2xl overflow-hidden bg-white gold-accent-border grid grid-cols-1 lg:grid-cols-2"
    >
      <div className="relative bg-[#0b1530]">
        <img
          src={coverSrc}
          alt={project.coverAlt ?? project.title}
          width={1200}
          height={600}
          className="w-full h-full aspect-[2/1] lg:aspect-auto object-cover"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C15F3C] text-white text-[10px] font-semibold uppercase tracking-wide shadow-sm">
          <Star className="w-3 h-3" fill="currentColor" strokeWidth={0} aria-hidden="true" />
          Featured
        </span>
      </div>

      <div className="p-6 sm:p-8 flex flex-col">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className="text-xs font-medium text-[#C15F3C] uppercase tracking-wide">{project.category}</span>
          {project.badge && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F6EFDD] text-[#8A6D2B] text-[10px] font-semibold uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B08D3F]" aria-hidden="true" />
              {project.badge}
            </span>
          )}
        </div>

        <h3 id={`${project.id}-title`} className="text-xl sm:text-2xl font-serif font-[700] tracking-tight text-[#262624] mb-3">
          {project.title}
        </h3>
        <p className="text-sm text-[#55534D] leading-relaxed mb-5">{project.description}</p>

        {project.metrics && (
          <ul className="flex flex-wrap gap-2 mb-5" aria-label="Key metrics">
            {project.metrics.map((metric) => (
              <li
                key={metric}
                className="px-2.5 py-1 text-xs font-mono text-[#262624] bg-[#F3E3D9] border border-[#C15F3C]/20 rounded-md"
              >
                {metric}
              </li>
            ))}
          </ul>
        )}

        <ul className="flex flex-wrap gap-1.5 mb-6" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li key={tech} className="px-2.5 py-1 text-xs font-medium bg-[#F0EDE4] text-[#55534D] rounded-full">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenCaseStudy}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C15F3C] text-white text-sm font-medium hover:bg-[#A84C2C] transition-colors cursor-pointer active:scale-95 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#262624]"
          >
            <span>Read case study</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E6E2D8] text-[#262624] text-sm font-medium hover:bg-[#F0EDE4] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C15F3C]"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              <span>GitHub</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
        {project.status === "ongoing" && (
          <p className="text-xs text-[#83807A] mt-3">Still building — follow progress on GitHub.</p>
        )}
      </div>
    </motion.article>
  );
}
