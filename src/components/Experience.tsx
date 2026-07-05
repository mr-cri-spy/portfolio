import { motion } from "motion/react";
import { experienceData } from "../data";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export default function Experience() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.05, rootMargin: "0px 0px -50px 0px" });

  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#FAF9F5]">
      <div ref={ref as any} className="max-w-4xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C15F3C] font-semibold">Experience</span>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#262624] mt-3">
            Where I've worked.
          </h2>
        </div>

        <div className="relative border-l border-[#E6E2D8] ml-3 md:ml-4 space-y-12">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -12 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative pl-8 md:pl-10 text-left"
            >
              <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#C15F3C] ring-4 ring-[#F3E3D9]" />

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-[#262624] flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#83807A]" />
                      <span>{exp.role}</span>
                    </h3>
                    <div className="text-sm font-medium text-[#55534D]">{exp.company}</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="flex items-center gap-1.5 bg-[#FFFFFF] border border-[#E6E2D8] px-2.5 py-1 uppercase tracking-wide text-[#83807A] rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-[#FFFFFF] border border-[#E6E2D8] px-2.5 py-1 uppercase tracking-wide text-[#83807A] rounded-full">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 pt-1">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-sm text-[#55534D] leading-relaxed">
                      <span className="inline-block mt-2 w-1.5 h-1.5 rounded-full bg-[#6B7A5E] shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-medium text-[#55534D] bg-[#F0EDE4] rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
