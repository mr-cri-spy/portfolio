import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import OperatingLoop from "./components/OperatingLoop";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certificates from "./components/Certificates";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import AskBot from "./components/AskBot";
import { useLanguage } from "./context/LanguageContext";
import { developerProfile } from "./data";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  User,
  Layout,
  GraduationCap,
  FileText,
  Award,
  Sparkles,
  Check,
  Home,
} from "lucide-react";

export default function App() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; message: string; type: "success" | "error" }[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; type: "success" | "error" }>;
      if (customEvent.detail) {
        const { message, type } = customEvent.detail;
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
      }
    };
    window.addEventListener("portfolio-toast", handleToastEvent);
    return () => window.removeEventListener("portfolio-toast", handleToastEvent);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["home", "about", "skills", "projects", "experience", "certificates", "testimonials", "blog", "contact"];
      const scrollPos = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const navItems = [
    { id: "about", label: t("nav_about") },
    { id: "skills", label: t("nav_skills") },
    { id: "projects", label: t("nav_projects") },
    { id: "experience", label: t("nav_experience") },
    { id: "certificates", label: t("nav_certificates") },
    { id: "testimonials", label: t("nav_testimonials") },
    { id: "blog", label: t("nav_blog") },
    { id: "contact", label: t("nav_contact") },
  ];

  const mobileNavItems = [
    { id: "home", label: t("nav_home"), icon: <Home className="w-4 h-4" /> },
    { id: "about", label: t("nav_about"), icon: <User className="w-4 h-4" /> },
    { id: "skills", label: t("nav_skills"), icon: <Layout className="w-4 h-4" /> },
    { id: "projects", label: t("nav_projects"), icon: <FileText className="w-4 h-4" /> },
    { id: "experience", label: t("nav_experience"), icon: <GraduationCap className="w-4 h-4" /> },
    { id: "certificates", label: t("nav_certificates"), icon: <Award className="w-4 h-4" /> },
    { id: "testimonials", label: t("nav_testimonials"), icon: <Sparkles className="w-4 h-4" /> },
    { id: "blog", label: t("nav_blog"), icon: <FileText className="w-4 h-4" /> },
    { id: "contact", label: t("nav_contact"), icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#262624] flex flex-col font-sans antialiased overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF9F5]/90 border-b border-[#E6E2D8] backdrop-blur-md py-3 shadow-sm"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <span className="text-2xl font-serif font-[800] tracking-[-0.02em] text-[#262624]">
              Kirana.
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? "bg-[#262624] text-white font-medium"
                    : "text-[#55534D] hover:text-[#262624] hover:bg-[#F0EDE4]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavigate("contact")}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#C15F3C] text-white text-sm font-medium hover:bg-[#A84C2C] hover:ring-2 hover:ring-[#D4B876]/50 transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              <span>Let's talk</span>
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full bg-white border border-[#E6E2D8] text-[#55534D] hover:text-[#262624] transition-all cursor-pointer flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 lg:hidden bg-black/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] max-w-[85vw] h-full z-50 lg:hidden bg-[#FAF9F5] border-l border-[#E6E2D8] p-6 flex flex-col shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E6E2D8]">
                <span className="text-xl font-serif font-[800] tracking-[-0.02em] text-[#262624]">Kirana.</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full bg-white border border-[#E6E2D8] text-[#55534D] cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col space-y-1">
                {mobileNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-colors cursor-pointer ${
                      activeSection === item.id
                        ? "bg-[#262624] text-white"
                        : "text-[#55534D] hover:bg-[#F0EDE4]"
                    }`}
                  >
                    <span className={activeSection === item.id ? "text-white" : "text-[#83807A]"}>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-grow">
        <Hero onNavigate={handleNavigate} />
        <About />
        <Skills />
        <OperatingLoop />
        <Projects />
        <Experience />
        <Certificates />
        <Testimonials />
        <Blog />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-12 bg-[#F4F1EA] border-t border-[#E6E2D8] text-[#83807A] text-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
            <span className="font-serif font-semibold text-base text-[#262624]">
              {developerProfile.name} &copy; {new Date().getFullYear()}
            </span>
            <span className="text-xs text-[#83807A]">Built with care in Bengaluru, India</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={developerProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#E6E2D8] bg-white flex items-center justify-center text-[#55534D] hover:text-[#C15F3C] hover:border-[#C15F3C]/40 transition-colors duration-200"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={developerProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#E6E2D8] bg-white flex items-center justify-center text-[#55534D] hover:text-[#C15F3C] hover:border-[#C15F3C]/40 transition-colors duration-200"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${developerProfile.email}`}
              className="w-10 h-10 rounded-full border border-[#E6E2D8] bg-white flex items-center justify-center text-[#55534D] hover:text-[#C15F3C] hover:border-[#C15F3C]/40 transition-colors duration-200"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      <AskBot />

      {/* Toasts */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-[#E6E2D8] bg-white text-[#262624] shadow-lg pointer-events-auto select-none text-sm font-medium"
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#EEF3EA] text-[#6B7A5E] shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
