import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { developerProfile } from "../data";
import { caseStudyHref } from "../utils/caseStudy";
// @ts-ignore
import kiranPortraitWebp from "../assets/images/kiran.webp";
// @ts-ignore
import kiranPortraitJpg from "../assets/images/kiran.jpg";

interface HeroProps {
  onNavigate: (section: string) => void;
}

const HEADLINE_LINES = ["AI products,", "built end to end:", "schema to screen."];

// Shortcuts straight into the case studies, for visitors who only have a minute.
const RECENT_BUILDS = [
  { id: "blue-bright-hr", name: "Blue Bright HR", line: "Multi-tenant AI hiring SaaS" },
  { id: "lenj", name: "Lenj", line: "Challenge platform · 300+ tests" },
  { id: "shnu-llm", name: "SHNU-LLM", line: "34M-param LLM, from scratch" },
];

const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
};

const headlineLine = {
  hidden: { opacity: 0, y: "100%" },
  show: {
    opacity: 1,
    y: "0%",
    transition: { type: "spring" as const, stiffness: 220, damping: 26, mass: 0.9 },
  },
};

export default function Hero({ onNavigate }: HeroProps) {
  const tags = ["TypeScript · React · Next.js", "Python · FastAPI", "PostgreSQL", "LLM agents · RAG"];

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [9, -9]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-9, 9]), springConfig);
  const glowX = useTransform(pointerX, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(pointerY, [0, 1], ["10%", "90%"]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scrollFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scrollShift = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), { stiffness: 120, damping: 24 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* Warm decorative glow accents */}
      <div className="absolute top-[-120px] right-[-120px] w-[500px] h-[500px] bg-[#F3E3D9] rounded-full opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-100px] w-[400px] h-[400px] bg-[#EAEFE5] rounded-full opacity-60 blur-3xl pointer-events-none" />

      <motion.div
        style={{ opacity: scrollFade, y: scrollShift }}
        className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center w-full min-w-0"
      >
        {/* Left column - text */}
        <div className="lg:col-span-7 min-w-0 flex flex-col items-start space-y-7 text-left w-full">
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="show"
            className="text-[42px] sm:text-6xl lg:text-[64px] leading-[1.05] font-serif font-[800] tracking-[-0.03em] text-[#262624] break-words"
          >
            {HEADLINE_LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  variants={headlineLine}
                  className={`block ${i === HEADLINE_LINES.length - 1 ? "text-[#C15F3C]" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-[#55534D] text-lg max-w-xl leading-relaxed"
          >
            I'm <span className="text-[#262624] font-medium">{developerProfile.name}</span>, a full-stack AI product
            engineer. I design and ship LLM-powered software end to end (data model, API, React interface and the AI
            features in between) in TypeScript and Python.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap gap-2 pt-1"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 text-xs font-medium bg-white text-[#55534D] border border-[#E6E2D8] rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-3"
          >
            <button
              onClick={() => onNavigate("contact")}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#262624] text-white text-sm font-medium rounded-full hover:bg-[#3A3835] transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("projects")}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#E6E2D8] text-[#262624] text-sm font-medium rounded-full hover:bg-[#F0EDE4] transition-all cursor-pointer active:scale-95"
            >
              <span>See selected work</span>
            </button>
          </motion.div>

          <motion.nav
            aria-label="Recent builds"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="w-full max-w-xl"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#83807A] font-semibold mb-3">Recent builds</p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {RECENT_BUILDS.map((item) => (
                <li key={item.id}>
                  <a
                    href={caseStudyHref(item.id)}
                    className="group block h-full rounded-xl border border-[#E6E2D8] bg-white/70 px-3.5 py-3 hover:border-[#C15F3C]/40 hover:bg-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C15F3C]"
                  >
                    <span className="flex items-center justify-between gap-2 text-sm font-semibold text-[#262624]">
                      {item.name}
                      <ArrowUpRight
                        className="w-3.5 h-3.5 shrink-0 text-[#83807A] group-hover:text-[#C15F3C] transition-colors"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="block text-xs text-[#55534D] mt-0.5 leading-snug">{item.line}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex items-center gap-2 text-sm text-[#83807A]"
          >
            <MapPin className="w-4 h-4" />
            <span>{developerProfile.location}</span>
          </motion.div>
        </div>

        {/* Right column - portrait, with mouse-tracked 3D tilt */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
          style={{ perspective: 1200 }}
        >
          <div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="relative w-full max-w-[340px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Backing card floats behind the portrait for layered depth */}
              <div
                className="absolute -inset-3 bg-[#C15F3C]/10 rounded-[2rem] rotate-2"
                style={{ transform: "translateZ(-40px)" }}
              />

              <div
                className="relative rounded-[1.75rem] overflow-hidden border border-[#E6E2D8] shadow-2xl bg-white aspect-[4/5]"
                style={{ transform: "translateZ(0px)" }}
              >
                <picture>
                  <source srcSet={kiranPortraitWebp} type="image/webp" />
                  <img
                    src={kiranPortraitJpg}
                    alt={`${developerProfile.name} portrait`}
                    className="w-full h-full object-cover object-top"
                    width={340}
                    height={425}
                    fetchPriority="high"
                  />
                </picture>

                {/* Light that follows the cursor across the glass-like surface */}
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay"
                  style={{
                    background: useMotionTemplate`radial-gradient(280px circle at ${glowX} ${glowY}, rgba(255,255,255,0.55), transparent 70%)`,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-1">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => onNavigate("projects")}
          className="p-2 rounded-full bg-white border border-[#E6E2D8] hover:border-[#C15F3C]/40 cursor-pointer text-[#83807A] hover:text-[#C15F3C] transition-all duration-300"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}
