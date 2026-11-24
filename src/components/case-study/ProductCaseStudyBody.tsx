import { CheckCircle2, CircleDashed } from "lucide-react";
import type { ProductCaseStudy } from "../../types";
import Section from "./Section";
import SpecGrid from "./SpecGrid";
import StatTile from "./StatTile";

const screenImages = import.meta.glob("../../assets/images/screen-*.webp", { eager: true, import: "default" }) as Record<
  string,
  string
>;

function screenSrc(key: string): string | undefined {
  return Object.entries(screenImages).find(([path]) => path.endsWith(`/screen-${key}.webp`))?.[1];
}

const tagTone: Record<string, string> = {
  AI: "bg-[#F3E3D9] text-[#A84C2C]",
  Human: "bg-[#EEF3EA] text-[#56634B]",
};

/** Body of a product case study (Blue Bright HR, Lenj). */
export default function ProductCaseStudyBody({ cs }: { cs: ProductCaseStudy }) {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {cs.stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      {cs.screens?.map((shot) => {
        const src = screenSrc(shot.key);
        return src ? (
          <figure key={shot.key} className="space-y-2">
            <img
              src={src}
              alt={shot.alt}
              loading="lazy"
              className="w-full rounded-2xl border border-[#E6E2D8] shadow-sm bg-[#0b0b17]"
            />
            <figcaption className="text-xs text-[#83807A]">{shot.caption}</figcaption>
          </figure>
        ) : null;
      })}

      <Section id="cs-why" title="Why it exists">
        <p className="text-[#55534D] leading-relaxed max-w-3xl">{cs.why}</p>
      </Section>

      <Section id="cs-flow" title="How it works">
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {cs.flow.map((step, i) => (
            <li key={step.label} className="bg-white border border-[#EFEBE1] rounded-2xl p-4 flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-mono text-[#83807A]">{String(i + 1).padStart(2, "0")}</span>
                {step.tag && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                      tagTone[step.tag] ?? "bg-[#F0EDE4] text-[#55534D]"
                    }`}
                  >
                    {step.tag}
                  </span>
                )}
              </div>
              <h4 className="text-sm font-semibold text-[#262624] mb-1.5">{step.label}</h4>
              <p className="text-xs text-[#55534D] leading-relaxed">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="cs-decisions" title="Engineering decisions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cs.decisions.map((d, i) => (
            <article
              key={d.title}
              className={`bg-white border border-[#EFEBE1] rounded-2xl p-5 ${
                cs.decisions.length % 2 === 1 && i === cs.decisions.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <h4 className="text-base font-semibold text-[#262624] mb-2">{d.title}</h4>
              <p className="text-sm text-[#55534D] leading-relaxed">{d.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="cs-stack" title="Stack">
        <SpecGrid items={cs.stack} />
      </Section>

      <Section id="cs-status" title="Where it stands">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-[#EFEBE1] rounded-2xl p-5">
            <h4 className="text-xs uppercase tracking-wider text-[#83807A] font-semibold mb-3">Built</h4>
            <ul className="space-y-2.5">
              {cs.status.built.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#262624]">
                  <CheckCircle2 className="w-4 h-4 text-[#6B7A5E] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-[#EFEBE1] rounded-2xl p-5">
            <h4 className="text-xs uppercase tracking-wider text-[#83807A] font-semibold mb-3">Next</h4>
            <ul className="space-y-2.5">
              {cs.status.next.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#55534D]">
                  <CircleDashed className="w-4 h-4 text-[#B08D3F] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
