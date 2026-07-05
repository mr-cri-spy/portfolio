import { motion } from "motion/react";
import { skillsData } from "../data";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const categories = Array.from(new Set(skillsData.map((s) => s.category)));

export default function Skills() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.05, rootMargin: "0px 0px -60px 0px" });

  return (
    <section id="skills" className="py-24 sm:py-32 bg-[#F4F1EA]">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref as any} className="mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C15F3C] font-semibold">Skills</span>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#262624] mt-3">
            The toolkit.
          </h2>
          <p className="text-[#55534D] text-lg mt-4 leading-relaxed">
            A working set of languages, frameworks, and platforms I use to take AI systems from notebook to production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.06 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#262624] mb-5 pb-2 border-b border-[#E6E2D8]">
                {category}
              </h3>
              <div className="space-y-4">
                {skillsData
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-[#55534D] font-medium">{skill.name}</span>
                        <span className="text-xs text-[#83807A] font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#E6E2D8] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                          className="h-full bg-[#6B7A5E] rounded-full"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
