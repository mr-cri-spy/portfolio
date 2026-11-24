import type { CoverFlow } from "../types";

const tagTone: Record<string, string> = {
  AI: "bg-[#C15F3C] text-white",
  Human: "bg-[#6B7A5E] text-white",
};

/**
 * A drawn cover for product projects: the product's core flow as numbered steps.
 * Used instead of a screenshot so every visual on the site shows something real.
 */
export default function FlowCover({ flow }: { flow: CoverFlow }) {
  return (
    <div className="relative h-full min-h-[300px] bg-[#1F1E1C] text-white p-7 sm:p-9 flex flex-col overflow-hidden">
      {/* blueprint grid + warm glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div aria-hidden="true" className="absolute -top-28 -right-28 w-80 h-80 rounded-full bg-[#C15F3C]/25 blur-3xl" />

      <p className="relative text-[11px] uppercase tracking-[0.22em] text-[#E8B9A4] font-semibold">{flow.caption}</p>

      <ol className="relative mt-6 flex-1 flex flex-col justify-center">
        {flow.steps.map((step, i) => {
          const isLast = i === flow.steps.length - 1;
          return (
            <li key={step.label} className="relative flex items-start gap-3.5 pb-4 last:pb-0">
              {!isLast && <span aria-hidden="true" className="absolute left-[13px] top-7 bottom-0 w-px bg-white/15" />}
              <span className="relative z-10 w-7 h-7 shrink-0 rounded-full border border-white/25 bg-[#2A2926] text-[11px] font-mono flex items-center justify-center text-white/80">
                {i + 1}
              </span>
              <span className="pt-1 text-sm sm:text-[15px] font-medium leading-snug text-white/95">{step.label}</span>
              {step.tag && (
                <span
                  className={`mt-1 ml-auto shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                    tagTone[step.tag] ?? "bg-white/15 text-white"
                  }`}
                >
                  {step.tag}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {flow.footer && <p className="relative mt-6 text-[11px] font-mono text-white/55">{flow.footer}</p>}
    </div>
  );
}
