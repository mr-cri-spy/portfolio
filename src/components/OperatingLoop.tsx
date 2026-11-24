import { motion } from "motion/react";
import { Users, Database, Rocket, Sparkles } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const steps = [
  {
    num: "01",
    title: "Discover before building",
    description: "Talk to the people doing the job, map the workflow and its edge cases, and test the riskiest assumptions with a quick prototype before writing production code.",
    output: "Problem, success metric, prototype",
    icon: Users,
  },
  {
    num: "02",
    title: "Model the data first",
    description: "Schema, tenancy and permissions come before screens, so security lives in the database and not only in the UI.",
    output: "Schema + RLS policies",
    icon: Database,
  },
  {
    num: "03",
    title: "Ship a thin slice",
    description: "One path working end to end (database, API, React UI, deployed), then widen it. Tests and CI from the first week, and a check that it moved the outcome we agreed on.",
    output: "Deployed vertical slice",
    icon: Rocket,
  },
  {
    num: "04",
    title: "Add AI where it earns its place",
    description: "Structured outputs, streaming, timeouts with fallbacks and evals, so AI makes the product better without making it fragile.",
    output: "JSON outputs + fallbacks + evals",
    icon: Sparkles,
  },
];

export default function OperatingLoop() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F5]">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref as any} className="mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C15F3C] font-semibold">Process</span>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#262624] mt-3">
            How I work.
          </h2>
          <p className="text-[#55534D] text-lg mt-4 leading-relaxed">
            Shaped by Marty Cagan's <em>Inspired</em>: discover before you build, take on the biggest risks first (will
            people use it, can they use it, can we build it, does it work for the business), and judge the work by
            outcomes, not output.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E6E2D8] flex items-center justify-center">
                  <step.icon className="w-4.5 h-4.5 text-[#C15F3C]" />
                </div>
                <span className="text-3xl font-serif text-[#83807A]">{step.num}</span>
              </div>
              <h3 className="text-base font-semibold text-[#262624] mb-2">{step.title}</h3>
              <p className="text-sm text-[#55534D] leading-relaxed mb-3">{step.description}</p>
              <span className="text-xs font-mono text-[#83807A]">→ {step.output}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
