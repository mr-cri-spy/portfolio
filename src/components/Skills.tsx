import { motion } from "motion/react";
import { skillGroups } from "../data";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: groupIndex * 0.06 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#262624] mb-4 pb-2 border-b border-[#E6E2D8]">
                {group.name}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium bg-white text-[#55534D] border border-[#E6E2D8] rounded-full"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
