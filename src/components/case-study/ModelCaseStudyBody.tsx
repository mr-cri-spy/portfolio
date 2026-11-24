import { CheckCircle2 } from "lucide-react";
import type { ModelCaseStudy } from "../../types";
import Section from "./Section";
import SpecGrid from "./SpecGrid";
import StatTile from "./StatTile";
import RoadmapStepper from "./RoadmapStepper";
import ArchitectureDiagram from "./ArchitectureDiagram";

/** Body of a research/model case study (SHNU-LLM). */
export default function ModelCaseStudyBody({ cs }: { cs: ModelCaseStudy }) {
  return (
    <>
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
    </>
  );
}
