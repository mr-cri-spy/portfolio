import { motion } from "motion/react";
import { GitBranch, Cpu, Search, Rocket } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const steps = [
  {
    num: "01",
    title: "Ingest & Structure",
    description: "Aggregating and sanitizing raw domain datasets, chat transcripts, or documentation into a balanced, high-fidelity fine-tuning corpus.",
    duration: "Week 1–2",
    icon: GitBranch,
  },
  {
    num: "02",
    title: "Fine-Tune & Align",
    description: "Applying efficient LoRA/QLoRA adapters onto open-source foundation models to shape specialized reasoning and tone.",
    duration: "Week 2–4",
    icon: Cpu,
  },
  {
    num: "03",
    title: "Index & Ground",
    description: "Building dense vector retrieval (FAISS, ChromaDB) so responses stay grounded in real, current context, minimizing drift and hallucination.",
    duration: "Week 4–5",
    icon: Search,
  },
  {
    num: "04",
    title: "Deploy & Optimize",
    description: "Shipping to production with containerized deployment, latency tuning, and continuous evaluation against real usage.",
    duration: "Week 5–6",
    icon: Rocket,
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
              <span className="text-xs font-mono text-[#83807A] uppercase tracking-wide">{step.duration}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
