import { Check } from "lucide-react";
import type { RoadmapStep } from "../../types";

const stateLabel: Record<RoadmapStep["state"], string> = {
  done: "Done",
  active: "In progress",
  upcoming: "Planned",
};

/** Horizontal stepper on desktop, vertical list on mobile. */
export default function RoadmapStepper({ steps }: { steps: RoadmapStep[] }) {
  return (
    <ol className="flex flex-col md:flex-row md:items-start gap-0">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={step.label} className="relative flex md:flex-col md:flex-1 items-start md:items-center gap-3 md:gap-2 pb-5 md:pb-0">
            {/* connector line: vertical on mobile, horizontal on desktop */}
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute left-[11px] top-6 bottom-0 w-px md:left-[calc(50%+12px)] md:right-[calc(-50%+12px)] md:top-[11px] md:bottom-auto md:w-auto md:h-px bg-[#E6E2D8]"
              />
            )}
            <span
              className={`relative z-10 w-6 h-6 shrink-0 rounded-full flex items-center justify-center ${
                step.state === "done"
                  ? "bg-[#6B7A5E] text-white"
                  : step.state === "active"
                    ? "bg-[#C15F3C] ring-4 ring-[#F3E3D9]"
                    : "bg-white border border-[#E6E2D8]"
              }`}
            >
              {step.state === "done" && <Check className="w-3.5 h-3.5" />}
              {step.state === "active" && <span className="w-2 h-2 rounded-full bg-white" />}
            </span>
            <div className="md:text-center md:px-1">
              <div className={`text-sm font-medium ${step.state === "upcoming" ? "text-[#83807A]" : "text-[#262624]"}`}>
                {step.label}
              </div>
              <div className="text-[11px] uppercase tracking-wide text-[#83807A] mt-0.5">{stateLabel[step.state]}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
