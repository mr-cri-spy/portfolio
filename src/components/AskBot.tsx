import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, RotateCcw, Send, Sparkles } from "lucide-react";
import { apiUrl } from "../utils/api";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  isError?: boolean;
}

const STARTER_PROMPTS = [
  "What does Kiran do?",
  "What are his top skills?",
  "Is he available for a call next week?",
  "What has he built?",
];

const STORAGE_KEY = "askbot-live-transcript-v1";
const WELCOME_MESSAGE =
  "Hi, I'm Kiran's AI assistant. Ask me anything about his skills, projects, experience, or availability for a call.";

function loadStoredMessages(): Message[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function AskBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadStoredMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    if (messages.length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const userMessage: Message = { id: `${Date.now()}-u`, role: "user", text: trimmed };
    const history = messages.map((m) => ({ role: m.role === "bot" ? "model" : "user", text: m.text }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch(apiUrl("/api/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-b`,
          role: "bot",
          text: data.reply || "Sorry, something went wrong. Please try again.",
          isError: !res.ok,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-b`,
          role: "bot",
          text: "Couldn't reach the assistant. Check your connection and try again.",
          isError: true,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleReset = () => {
    setMessages([]);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[380px] max-w-[90vw] h-[560px] max-h-[75vh] bg-white border border-[#E6E2D8] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E6E2D8] bg-[#FAF9F5] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#262624] flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-[#262624]">Ask Kiran's AI</p>
                  <p className="text-[10px] text-[#83807A]">Live assistant, may take a moment to reply</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="p-1.5 rounded-full hover:bg-[#F0EDE4] text-[#55534D] cursor-pointer"
                    aria-label="Reset conversation"
                    title="Start over"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#F0EDE4] text-[#55534D] cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Transcript */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-sm text-[#55534D] leading-relaxed pb-1">{WELCOME_MESSAGE}</div>
              )}

              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-[#262624] text-white rounded-br-md"
                          : m.isError
                          ? "bg-[#FBEAE3] border border-[#F0CFC0] text-[#8A3A22] rounded-bl-md"
                          : "bg-[#FAF9F5] border border-[#E6E2D8] text-[#55534D] rounded-bl-md"
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isSending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#FAF9F5] border border-[#E6E2D8] rounded-2xl rounded-bl-md px-3.5 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C15F3C] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C15F3C] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C15F3C] animate-bounce" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Starter prompts */}
            {messages.length === 0 && (
              <div className="px-4 pb-3 shrink-0">
                <div className="flex flex-wrap gap-1.5">
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="px-3 py-1.5 rounded-full bg-[#FAF9F5] border border-[#E6E2D8] text-xs font-medium text-[#262624] hover:border-[#C15F3C]/40 hover:bg-[#F3E3D9]/30 transition-colors cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-[#E6E2D8] p-3 shrink-0 bg-[#FAF9F5] flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={isSending}
                className="flex-1 px-3.5 py-2.5 rounded-full bg-white border border-[#E6E2D8] text-sm text-[#262624] placeholder-[#83807A] focus:outline-none focus:border-[#C15F3C]/60 transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="w-10 h-10 rounded-full bg-[#C15F3C] text-white flex items-center justify-center shrink-0 hover:bg-[#A84C2C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#262624] text-white shadow-xl hover:bg-[#3A3835] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
        aria-label="Ask Kiran's AI assistant"
        title="Ask Kiran's AI assistant"
      >
        {isOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
      </motion.button>
    </div>
  );
}
