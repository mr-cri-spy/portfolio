import { Profile, Project, Skill, Experience, Certification } from "./types";

export const developerProfile: Profile = {
  name: "Kiran M",
  title: "AI/ML Engineer | LLM Developer | Generative AI Specialist",
  subTitle: "Specializing in Large Language Models, fine-tuning, voice AI, RAG systems, and enterprise automation.",
  email: "kiraj8899@gmail.com",
  github: "https://github.com/mr-cri-spy",
  linkedin: "https://linkedin.com/in/kiran-m-36334b343",
  resumeUrl: "#",
  bio: "AI/ML Engineer with hands-on experience across LLM fine-tuning, voice AI, RAG systems, and enterprise automation. Currently concentrating on Quantum Machine Learning (QML) and building interactive learning platforms to democratize quantum-classical neural network architectures. Comfortable working across the full stack of an AI system, including model fine-tuning, backend APIs, DevOps deployment, and testing. Passionate about building scalable, ethical, human-centered AI solutions.",
  location: "Bengaluru, India",
  phone: "+91-8867324156"
};

export const skillsData: Skill[] = [
  // Programming Languages
  { name: "Python", level: 95, category: "Programming Languages" },
  { name: "SQL", level: 88, category: "Programming Languages" },
  { name: "Bash", level: 80, category: "Programming Languages" },

  // AI/ML & LLMs
  { name: "Large Language Models", level: 92, category: "AI/ML & LLMs" },
  { name: "LLM Architectures (GPT, BERT)", level: 90, category: "AI/ML & LLMs" },
  { name: "Transformer Blocks", level: 89, category: "AI/ML & LLMs" },
  { name: "Attention Algorithm", level: 88, category: "AI/ML & LLMs" },
  { name: "LLM Pretraining", level: 85, category: "AI/ML & LLMs" },
  { name: "Prompt Engineering", level: 95, category: "AI/ML & LLMs" },
  { name: "Fine-tuning (LoRA/QLoRA)", level: 94, category: "AI/ML & LLMs" },
  { name: "Model Optimization", level: 88, category: "AI/ML & LLMs" },
  { name: "Inference Optimization", level: 86, category: "AI/ML & LLMs" },
  { name: "Conversational AI", level: 92, category: "AI/ML & LLMs" },
  { name: "Voice AI (ASR)", level: 90, category: "AI/ML & LLMs" },
  { name: "Multimodal AI Concepts", level: 88, category: "AI/ML & LLMs" },
  { name: "RAG Concepts", level: 91, category: "AI/ML & LLMs" },
  { name: "Machine Learning", level: 90, category: "AI/ML & LLMs" },
  { name: "Deep Learning", level: 89, category: "AI/ML & LLMs" },
  { name: "Quantum Machine Learning (QML)", level: 85, category: "AI/ML & LLMs" },

  // ML Theory & Interpretability
  { name: "Explainable AI", level: 85, category: "ML Theory & Interpretability" },
  { name: "Mechanistic Interpretability", level: 82, category: "ML Theory & Interpretability" },
  { name: "Principal Component Analysis (PCA)", level: 87, category: "ML Theory & Interpretability" },
  { name: "Dimension Reduction", level: 86, category: "ML Theory & Interpretability" },
  { name: "High-Dimensional Clustering", level: 84, category: "ML Theory & Interpretability" },
  { name: "Advanced Cosine Similarity Applications", level: 88, category: "ML Theory & Interpretability" },

  // Frameworks & Libraries
  { name: "PyTorch", level: 90, category: "Frameworks & Libraries" },
  { name: "TensorFlow", level: 80, category: "Frameworks & Libraries" },
  { name: "Hugging Face Transformers", level: 92, category: "Frameworks & Libraries" },
  { name: "Scikit-Learn", level: 85, category: "Frameworks & Libraries" },

  // Chatbots & GenAI
  { name: "Vector Search (FAISS, Qdrant basics)", level: 87, category: "Chatbots & GenAI" },
  { name: "WhatsApp Business API", level: 89, category: "Chatbots & GenAI" },
  { name: "Website Chatbots", level: 91, category: "Chatbots & GenAI" },
  { name: "CRM Integration", level: 85, category: "Chatbots & GenAI" },

  // Tools & Platforms
  { name: "Git", level: 90, category: "Tools & Platforms" },
  { name: "GitHub", level: 92, category: "Tools & Platforms" },
  { name: "Google Colab", level: 95, category: "Tools & Platforms" },
  { name: "Jupyter Notebook", level: 93, category: "Tools & Platforms" },
  { name: "VS Code", level: 90, category: "Tools & Platforms" },
  { name: "Linux", level: 85, category: "Tools & Platforms" },

  // Cloud & Deployment
  { name: "Docker", level: 83, category: "Cloud & Deployment" },
  { name: "API-based model serving", level: 88, category: "Cloud & Deployment" },
  { name: "GCP concepts", level: 80, category: "Cloud & Deployment" },
  { name: "CI/CD basics", level: 78, category: "Cloud & Deployment" }
];

export const projectsData: Project[] = [
  {
    id: "asr-voice-model",
    title: "ASR Voice Model for Indian Languages",
    description: "Built a speech recognition pipeline supporting Hindi and English for use in voice AI agents.",
    longDescription: "Built a speech recognition pipeline supporting Hindi and English for use in voice AI agents. Worked on real-time audio processing for voice-based customer interactions.",
    technologies: ["Python", "Voice AI (ASR)", "PyTorch", "Real-time Audio Processing", "Hindi & English Speech Corpora"],
    githubUrl: "https://github.com/mr-cri-spy",
    demoUrl: "#",
    features: [
      "Built a speech recognition pipeline supporting Hindi and English for use in voice AI agents",
      "Worked on real-time audio processing for voice-based customer interactions"
    ],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    category: "Speech AI"
  },
  {
    id: "rag-chatbot",
    title: "Website RAG Chatbot",
    description: "Built a retrieval-augmented chatbot connecting a vector database to an LLM for context-aware answers.",
    longDescription: "Built a retrieval-augmented chatbot connecting a vector database to an LLM for context-aware, document-grounded answers. Focused on response accuracy and reducing hallucination through grounded retrieval.",
    technologies: ["Python", "RAG Concepts", "Vector Search (FAISS)", "Large Language Models", "Website Chatbots"],
    githubUrl: "https://github.com/mr-cri-spy",
    demoUrl: "#",
    features: [
      "Built a retrieval-augmented chatbot connecting a vector database to an LLM for context-aware, document-grounded answers",
      "Focused on response accuracy and reducing hallucination through grounded retrieval"
    ],
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600",
    category: "Conversational AI"
  },
  {
    id: "hr-screening",
    title: "AI HR Screening Tool",
    description: "Built an NLP-based system to screen resumes and match candidates against job requirements.",
    longDescription: "Built an NLP-based system to screen resumes and match candidates against job requirements. Focused on highly accurate keyword-in-context matching, semantics similarity scoring, and dynamic scoring rules.",
    technologies: ["Python", "NLP Concepts", "Scikit-Learn", "Prompt Engineering", "Resume Screening Automation"],
    githubUrl: "https://github.com/mr-cri-spy",
    demoUrl: "#",
    features: [
      "Built an NLP-based system to screen resumes and match candidates against job requirements",
      "Assists HR managers by shortlisting high-relevance candidates using semantic similarity metrics"
    ],
    imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600",
    category: "Enterprise Automation"
  },
  {
    id: "mind-clone",
    title: "Multimodal 'Mind Clone' AI System",
    description: "Designed a personalized AI system mimicking thinking style, response patterns, and unique reasoning behaviors.",
    longDescription: "Designed a personalized AI system that mimics thinking style, response patterns, and reasoning behavior. Integrated LLM fine-tuning with custom datasets representing personal knowledge and communication style. Explored multimodal extensions for future voice and visual interaction.",
    technologies: ["Python", "Hugging Face Transformers", "Fine-tuning (LoRA/QLoRA)", "Custom Datasets", "Multimodal AI Concepts"],
    githubUrl: "https://github.com/mr-cri-spy",
    demoUrl: "#",
    features: [
      "Designed a personalized AI system that mimics thinking style, response patterns, and reasoning behavior",
      "Integrated LLM fine-tuning with custom datasets representing personal knowledge and communication style",
      "Explored multimodal extensions for future voice and visual interaction"
    ],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    category: "Multimodal AI"
  },
  {
    id: "agentic-ai-systems",
    title: "Agentic AI Systems",
    description: "Built a range of autonomous multi-agent systems, from a hotel booking agent to debate-simulation and receptionist agents, using CrewAI, LangChain, and LangGraph.",
    longDescription: "Designed and built multiple autonomous agent systems across different domains, including a hotel booking agent, debate-simulation agents modeling opposing legal arguments, an AI receptionist/front-desk management agent, and AI anchor-style presenter agents. Used CrewAI and LangGraph to orchestrate multi-agent workflows with defined roles, tools, and handoffs, LangChain for tool integration and retrieval, and the Model Context Protocol (MCP) and Agent-to-Agent (A2A) protocol for structured agent communication. Used LangSmith for tracing, debugging, and evaluating agent runs.",
    technologies: ["CrewAI", "LangChain", "LangGraph", "MCP", "A2A Protocol", "LangSmith", "Python", "Multi-Agent Orchestration"],
    githubUrl: "https://github.com/mr-cri-spy",
    demoUrl: "#",
    features: [
      "Built a hotel booking agent that handles multi-turn reservation conversations and tool calls",
      "Designed debate-simulation agents that argue opposing legal positions in a structured back-and-forth",
      "Built an AI receptionist / front-desk management agent for handling routine inquiries and routing",
      "Built AI anchor-style presenter agents for generating and delivering structured narration",
      "Orchestrated multi-agent handoffs and tool use with CrewAI and LangGraph",
      "Used MCP and the A2A protocol for structured, standardized agent-to-agent and agent-to-tool communication",
      "Used LangSmith to trace, debug, and evaluate agent behavior across runs"
    ],
    imageUrl: "project-agentic-ai",
    category: "Agentic AI"
  },
  {
    id: "custom-llm-build",
    title: "Building a Custom LLM",
    description: "Ongoing personal project to build a custom large language model from the ground up, drawing on hands-on LLM experience from his internship.",
    longDescription: "Currently building a custom large language model as an independent project, applying and extending what he learned working hands-on with LLMs during his internship. It's actively in progress, covering data preparation, training/fine-tuning decisions, and evaluation as the project develops.",
    technologies: ["Python", "PyTorch", "Large Language Models", "Fine-tuning (LoRA/QLoRA)", "Hugging Face Transformers"],
    githubUrl: "https://github.com/mr-cri-spy",
    demoUrl: "#",
    features: [
      "Applying hands-on LLM training and fine-tuning experience from his internship to an independent build",
      "Actively in progress, with architecture, training, and evaluation decisions ongoing"
    ],
    imageUrl: "project-custom-llm",
    category: "LLM Research",
    status: "ongoing"
  }
];

export const experienceData: Experience[] = [
  {
    id: "exp1",
    role: "AI/ML Engineer",
    company: "Naaz AI Labs",
    location: "Bengaluru, India",
    period: "January 2026 – June 2026",
    description: [
      "Trained and fine-tuned ASR (Automatic Speech Recognition) voice models for Indian languages, including Hindi and English, for use in voice-based AI products.",
      "Built AI voice calling agents combining speech-to-text, LLM response generation, and text-to-speech for customer-facing automation.",
      "Developed WhatsApp AI agents using the WhatsApp Business API for conversational automation and customer engagement.",
      "Built website AI chatbots using RAG (Retrieval-Augmented Generation) architecture with vector database integration for accurate, context-aware responses.",
      "Built an AI-powered HR tool to assist with resume screening and candidate shortlisting using NLP-based matching.",
      "Developed CRM automation workflows to connect AI agents with lead tracking and customer data systems.",
      "Handled DevOps responsibilities including containerization (Docker), deployment pipelines, and environment setup for AI applications.",
      "Performed testing and QA across AI systems to validate response accuracy and system reliability before deployment.",
      "Practiced vibe coding for fast prototyping, rapidly iterating from idea to working AI agent."
    ],
    skills: ["Voice AI (ASR)", "WhatsApp Business API", "Website Chatbots", "RAG Concepts", "Docker", "DevOps", "Testing & QA", "Vibe Coding"]
  },
  {
    id: "exp2",
    role: "LLM Intern",
    company: "Tulcuz",
    location: "India / Remote",
    period: "June 2025 – December 2025",
    description: [
      "Worked on training and fine-tuning Large Language Models using modern transformer architectures.",
      "Implemented LoRA and QLoRA techniques to fine-tune models with reduced memory and compute cost.",
      "Optimized LLM performance through prompt engineering, parameter tuning, and inference optimization.",
      "Built experimental pipelines for custom LLM behavior aligned with specific knowledge and reasoning patterns.",
      "Collaborated on multimodal AI concepts, combining text understanding with other modalities.",
      "Gained hands-on experience with LLM deployment workflows, evaluation metrics, and model lifecycle management."
    ],
    skills: ["Large Language Models", "LoRA/QLoRA", "Model Optimization", "Prompt Engineering", "Multimodal AI Concepts", "Deployment Workflows"]
  },
  {
    id: "exp3",
    role: "AI Content Creator",
    company: "Medium & Instagram",
    location: "Online",
    period: "2025 – Present",
    description: [
      "AI content creator sharing AI/ML learning and experiments on Medium & Instagram.",
      "Continuous learner in LLMs, Multimodal AI, and Advanced NLP.",
      "Publish tutorials, experimental insights, and guides to demystify complex neural network and Generative AI concepts for a global audience."
    ],
    skills: ["Technical Writing", "LLM Learning", "Multimodal AI", "Advanced NLP", "Community Engagement"]
  }
];

export const certificationsData: Certification[] = [
  {
    id: "cert-ollama-local-llm",
    title: "Zero to Hero in Ollama: Create Local LLM Applications",
    issuer: "Udemy — Start-Tech Academy",
    date: "Sep 29, 2025",
    credentialId: "UC-237c4ce1-df2a-43a1-a7b3-9986daeaf1f6",
    skills: ["Ollama", "Local LLMs", "LLM Applications"],
    description: "3 hours covering building and running local LLM applications with Ollama.",
    imageUrl: "cert-ollama-local-llm",
    thumbUrl: "cert-ollama-local-llm-thumb"
  },
  {
    id: "cert-ai-security-llm-hacking",
    title: "AI Security Bootcamp: LLM Hacking Basics",
    issuer: "Udemy",
    date: "Sep 22, 2025",
    credentialId: "UC-e0b12f41-f7f8-40ee-b30b-90013477c7f6",
    skills: ["AI Security", "LLM Vulnerabilities", "Prompt Injection"],
    description: "Introductory bootcamp on LLM security concepts and common attack vectors.",
    imageUrl: "cert-ai-security-llm-hacking",
    thumbUrl: "cert-ai-security-llm-hacking-thumb"
  },
  {
    id: "cert-deploying-llms-llmops",
    title: "Deploying LLMs: A Practical Guide to LLMOps in Production",
    issuer: "Udemy — The Fuzzy Scientist",
    date: "Sep 10, 2025",
    credentialId: "UC-c320fab8-182f-47b0-b23a-c894d685016c",
    skills: ["LLMOps", "Model Deployment", "Production AI"],
    description: "5 hours on practical LLMOps: deploying and operating large language models in production environments.",
    imageUrl: "cert-deploying-llms-llmops",
    thumbUrl: "cert-deploying-llms-llmops-thumb"
  },
  {
    id: "cert-math-datascience-genai",
    title: "Mathematics — Basics to Advanced for Data Science and GenAI",
    issuer: "Udemy — Krish Naik",
    date: "Nov 30, 2025",
    credentialId: "UC-2c8968f0-d6a2-4355-9616-c62ece1869e6",
    skills: ["Mathematics for ML", "Data Science", "Generative AI Foundations"],
    description: "23 hours covering the mathematical foundations behind data science and generative AI.",
    imageUrl: "cert-math-datascience-genai",
    thumbUrl: "cert-math-datascience-genai-thumb"
  },
  {
    id: "cert-genai-novice-master",
    title: "Industrial Training: Generative AI — Novice to Master",
    issuer: "EduLakes Solutions LLP",
    date: "Feb 3–14, 2025",
    credentialId: "ELSLLP/030225-14980208",
    skills: ["Generative AI", "Industrial Training"],
    description: "2-week (20 hour) live online industrial training covering generative AI from fundamentals to advanced practice.",
    imageUrl: "cert-genai-novice-master",
    thumbUrl: "cert-genai-novice-master-thumb"
  },
  {
    id: "cert-image-processing-dl",
    title: "Industrial Training: Image Processing and Deep Learning",
    issuer: "EduLakes Solutions LLP",
    date: "Jan 6–17, 2025",
    credentialId: "ELSLLP/060125-14804578",
    skills: ["Image Processing", "Deep Learning", "Computer Vision"],
    description: "2-week (20 hour) live online industrial training in image processing and deep learning, completed via Mangalore University.",
    imageUrl: "cert-image-processing-dl",
    thumbUrl: "cert-image-processing-dl-thumb"
  },
  {
    id: "cert-machine-learning-zero-hero",
    title: "Industrial Training: Machine Learning (Zero to Hero)",
    issuer: "EduLakes Solutions LLP",
    date: "Jan 20–31, 2025",
    credentialId: "ELSLLP/200125-14898944",
    skills: ["Machine Learning", "Industrial Training"],
    description: "2-week (20 hour) live online industrial training covering machine learning fundamentals through advanced topics.",
    imageUrl: "cert-machine-learning-zero-hero",
    thumbUrl: "cert-machine-learning-zero-hero-thumb"
  },
  {
    id: "cert-llms-mastery-transformers",
    title: "LLMs Mastery: Complete Guide to Transformers & Generative AI",
    issuer: "Udemy — The Fuzzy Scientist",
    date: "Aug 29, 2025",
    credentialId: "UC-f1956ff8-c7f2-44e6-a75c-4a74f690ee6d",
    skills: ["Large Language Models", "Transformers", "Generative AI"],
    description: "7.5 hours covering transformer architecture and generative AI end-to-end.",
    imageUrl: "cert-llms-mastery-transformers",
    thumbUrl: "cert-llms-mastery-transformers-thumb"
  },
  {
    id: "cert-intro-llms",
    title: "Intro to Large Language Models (LLMs)",
    issuer: "Udemy — 365 Careers",
    date: "Jul 28, 2025",
    credentialId: "UC-7b93b3f3-ea35-4075-8af2-9a5c7f82dae3",
    skills: ["Large Language Models", "AI Fundamentals"],
    description: "2.5 hours introducing the fundamentals of large language models.",
    imageUrl: "cert-intro-llms",
    thumbUrl: "cert-intro-llms-thumb"
  },
  {
    id: "cert-embedded-robotics",
    title: "Industrial Training: Embedded System with Robotics",
    issuer: "EduLakes Solutions LLP",
    date: "Nov 4–15, 2024",
    credentialId: "ELSLLP/041124-14362281",
    skills: ["Embedded Systems", "Robotics"],
    description: "2-week (20 hour) live online industrial training in embedded systems and robotics.",
    imageUrl: "cert-embedded-robotics",
    thumbUrl: "cert-embedded-robotics-thumb"
  },
  {
    id: "cert-ethical-hacking",
    title: "Complete Guide to Ethical Hacking",
    issuer: "Udemy — Stone River eLearning",
    date: "Feb 29, 2024",
    credentialId: "UC-8ace841d-9913-4781-a05e-6d274f65ad4b",
    skills: ["Ethical Hacking", "Security Fundamentals"],
    description: "42 hours covering the fundamentals and practice of ethical hacking.",
    imageUrl: "cert-ethical-hacking",
    thumbUrl: "cert-ethical-hacking-thumb"
  },
  {
    id: "cert-git-github-markdown",
    title: "Git, GitHub & Markdown Crash Course",
    issuer: "Udemy",
    date: "May 29, 2023",
    credentialId: "UC-a327701b-6917-4c0e-92e4-a33d26784a4c",
    skills: ["Git", "GitHub", "Markdown"],
    description: "1.5 hours covering Git version control, GitHub workflows, and Markdown.",
    imageUrl: "cert-git-github-markdown",
    thumbUrl: "cert-git-github-markdown-thumb"
  },
  {
    id: "cert-linux-command-line",
    title: "The Linux Command Line Bootcamp: Beginner To Power User",
    issuer: "Udemy — Colt Steele",
    date: "May 17, 2023",
    credentialId: "UC-8e5155d0-43e9-466e-8839-b721ada06345",
    skills: ["Linux", "Command Line", "Bash"],
    description: "16 hours covering the Linux command line from the basics through power-user workflows.",
    imageUrl: "cert-linux-command-line",
    thumbUrl: "cert-linux-command-line-thumb"
  }
];


