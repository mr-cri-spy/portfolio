import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Clock, ArrowRight, X } from "lucide-react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string;
}

const categories = ["All", "Fine-Tuning", "RAG Systems", "Web Graphics"];

const articles: Article[] = [
  {
    id: "qlora-guide",
    title: "Demystifying QLoRA Adapter Configurations",
    category: "Fine-Tuning",
    readTime: "6 min read",
    date: "June 24, 2026",
    excerpt: "An in-depth look at parameter-efficient fine-tuning (PEFT), isolated adapters, and stabilizing gradient steps during LLaMA-3 calibration.",
    content: `In the era of massive open-source foundations, fully retraining an 8B or 70B parameter network is computationally prohibitive for individual developers. This is where Parameter-Efficient Fine-Tuning (PEFT) steps in, with Low-Rank Adaptation (LoRA) leading the charge.

Understanding the low-rank constraint

Instead of modifying the dense, frozen weight matrix of a model, LoRA parameterizes the weight update by factorizing it into two low-rank matrices A and B, where the rank r is much smaller than the original dimensions. During the forward pass, the output is simply the frozen weight applied to the input, plus a scaled low-rank correction. By freezing the base weights and only training A and B, trainable parameters drop by up to 99%.

Quantizing to 4-bit (QLoRA)

QLoRA takes LoRA further by quantizing the base weights into a specialized 4-bit NormalFloat (NF4) representation. This fits an 8B parameter model into less than 6GB of VRAM while preserving near-zero performance degradation.

Best practices for adapter stability:
1. Rank selection: standardize rank r=16 and scaling alpha=32 for conversational datasets. Too low a rank fails to capture dialect nuances; too high causes overfitting.
2. Target modules: always target all linear projection layers (q_proj, v_proj, k_proj, o_proj) to maximize adaptation capacity.
3. Learning rates: keep learning rates conservative (around 2e-4 for AdamW) to protect base semantic understanding from gradient explosion.`,
  },
  {
    id: "context-rag",
    title: "Mitigating Hallucination in Multi-Turn RAG Systems",
    category: "RAG Systems",
    readTime: "8 min read",
    date: "May 18, 2026",
    excerpt: "Building high-performance retrieval-augmented generation loops with dense local vector search (FAISS) and semantic recursive token splitters.",
    content: `Retrieval-Augmented Generation (RAG) is the gold standard for grounding model responses in proprietary data. However, as conversation turns extend, managing the context window without pulling irrelevant "noise" is a challenging optimization problem.

1. Smart semantic chunking

Most naive RAG implementations split files strictly by character count. This breaks apart coherent paragraphs, ruining semantic mapping. The fix is recursive character-based splitting that respects Markdown or structural headings, with a modest chunk size and small overlap so context isn't lost at boundaries.

2. Dense vector retrieval with FAISS

By transforming chunks into high-dimensional embeddings, we index them into a FAISS database. When a user submits a query, we run a cosine similarity search across the index, retrieve the top-K most relevant chunks, and concatenate them into the model's system context. This prevents output drift and keeps answers grounded in real source material.`,
  },
  {
    id: "webgl-canvas",
    title: "60 FPS Interactive Visuals on the Web",
    category: "Web Graphics",
    readTime: "5 min read",
    date: "April 2, 2026",
    excerpt: "Optimizing responsive canvas rendering, mouse parallax, and state machines for smooth real-time UI performance.",
    content: `Many sites suffer from lag when embedding custom canvas visuals due to garbage collection spikes and heavy CPU-bound math. Here's how to keep visual states flowing at a smooth 60 FPS.

The mouse parallax state machine

Attaching event listeners directly to window mouse movements triggers layout reflows, so instead, cache target mouse positions in a lightweight state ref and apply linear interpolation during the animation loop. This keeps motion feeling organic rather than jumpy.

Minimizing garbage collection

Never instantiate new objects inside a render loop body. Instead, pre-allocate a fixed pool of positions/particles during setup and reuse that memory continuously. This alone eliminates most frame drops caused by garbage collection pauses.`,
  },
];

export default function Blog() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.05, rootMargin: "0px 0px -60px 0px" });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<Article | null>(null);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || art.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section id="blog" className="py-24 sm:py-32 bg-[#F4F1EA]">
      <div ref={ref as any} className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C15F3C] font-semibold">Writing</span>
            <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-[#262624] mt-3">Notes.</h2>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#83807A]" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#E6E2D8] text-sm text-[#262624] placeholder-[#83807A] focus:outline-none focus:border-[#C15F3C]/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#262624] text-white"
                  : "bg-white border border-[#E6E2D8] text-[#55534D] hover:text-[#262624]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((article, i) => (
            <motion.button
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 16px 36px -14px rgba(38, 38, 36, 0.18)" }}
              onClick={() => setSelected(article)}
              className="card-surface rounded-2xl p-6 text-left cursor-pointer flex flex-col"
            >
              <span className="text-xs font-medium text-[#C15F3C] uppercase tracking-wide mb-3">
                {article.category}
              </span>
              <h3 className="text-base font-semibold text-[#262624] leading-snug mb-2">{article.title}</h3>
              <p className="text-sm text-[#55534D] leading-relaxed mb-4 flex-1">{article.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-[#83807A] pt-4 border-t border-[#E6E2D8]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1 text-[#C15F3C] font-medium">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.button>
          ))}

          {filteredArticles.length === 0 && (
            <p className="col-span-full text-center text-sm text-[#83807A] py-12">No articles match your search.</p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#FAF9F5] border border-[#E6E2D8] rounded-2xl shadow-2xl p-6 md:p-8 scrollbar-thin"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white border border-[#E6E2D8] text-[#55534D] hover:text-[#262624] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-xs font-medium text-[#C15F3C] uppercase tracking-wide">{selected.category}</span>
              <h3 className="text-2xl font-serif text-[#262624] mt-1 mb-2">{selected.title}</h3>
              <div className="flex items-center gap-4 text-xs text-[#83807A] mb-6">
                <span>{selected.date}</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {selected.readTime}
                </span>
              </div>

              <div className="space-y-4 text-sm text-[#55534D] leading-relaxed whitespace-pre-line">
                {selected.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
