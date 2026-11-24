import { motion } from "motion/react";
import { Layers, ShieldCheck, Database, Brain, Mail, MapPin, Phone } from "lucide-react";
import { developerProfile } from "../data";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const highlights = [
  {
    icon: Layers,
    title: "Product engineering",
    text: "TypeScript, React and Next.js front to back: data model, API routes, auth, billing and the interface people actually use.",
  },
  {
    icon: ShieldCheck,
    title: "LLM features that fail gracefully",
    text: "Structured JSON outputs, streaming, timeouts with deterministic fallbacks and human review where decisions matter.",
  },
  {
    icon: Database,
    title: "Python, APIs & data",
    text: "FastAPI services, PostgreSQL with row-level security, webhooks and integrations with CRMs, WhatsApp and payment providers.",
  },
  {
    icon: Brain,
    title: "Models, not just APIs",
    text: "Pretrained a 34M-parameter Transformer from scratch, with an evaluation harness and hash-verified, reproducible data.",
  },
];

export default function About() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: "0px 0px -80px 0px" });

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#FAF9F5]">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref as any} className="mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-[#C15F3C] font-semibold">About</span>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#262624] mt-3">
            A little context.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left - bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-[#55534D] text-lg leading-relaxed">{developerProfile.bio}</p>

            <div className="space-y-3 pt-4 border-t border-[#E6E2D8]">
              <div className="flex items-center gap-3 text-sm text-[#55534D]">
                <MapPin className="w-4 h-4 text-[#C15F3C]" />
                <span>{developerProfile.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#55534D]">
                <Mail className="w-4 h-4 text-[#C15F3C]" />
                <a href={`mailto:${developerProfile.email}`} className="hover:text-[#262624] transition-colors">
                  {developerProfile.email}
                </a>
              </div>
              {developerProfile.phone && (
                <div className="flex items-center gap-3 text-sm text-[#55534D]">
                  <Phone className="w-4 h-4 text-[#C15F3C]" />
                  <span>{developerProfile.phone}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right - highlight cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="card-surface rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F3E3D9] flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#C15F3C]" />
                </div>
                <h3 className="text-base font-semibold text-[#262624] mb-1.5">{item.title}</h3>
                <p className="text-sm text-[#55534D] leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
