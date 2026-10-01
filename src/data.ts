import { Profile, Project, SkillGroup, Experience, Certification } from "./types";

export const developerProfile: Profile = {
  name: "Kiran M",
  title: "AI/ML Engineer | LLM Developer | Generative AI Specialist",
  subTitle: "Specializing in Large Language Models, fine-tuning, voice AI, RAG systems, and enterprise automation.",
  email: "kiraj8899@gmail.com",
  github: "https://github.com/mr-cri-spy",
  linkedin: "https://linkedin.com/in/kiran-m-36334b343",
  resumeUrl: "#",
  bio: "AI/ML Engineer with hands-on experience across voice AI, RAG systems, enterprise automation, and LLMs, from LoRA/QLoRA fine-tuning to pretraining a language model from scratch. Comfortable working across the full stack of an AI system, including model training, backend APIs, DevOps deployment, and testing. Passionate about building scalable, ethical, human-centered AI solutions. Also exploring Quantum Machine Learning.",
  location: "Bengaluru, India"
};

export const skillGroups: SkillGroup[] = [
  {
    name: "LLMs & Training",
    skills: [
      "Large Language Models",
      "LLM Pretraining",
      "Fine-tuning (LoRA/QLoRA)",
      "Prompt Engineering",
      "Model & Inference Optimization",
      "Evaluation",
      "Multimodal AI",
      "Explainable AI",
      "PyTorch",
      "Hugging Face Transformers",
    ],
  },
  {
    name: "Voice & Conversational AI",
    skills: ["Voice AI (ASR)", "Conversational AI", "WhatsApp Business API", "Website Chatbots"],
  },
  {
    name: "RAG & Retrieval",
    skills: ["RAG Pipelines", "Vector Search (FAISS, Qdrant)", "Embeddings & Similarity Search"],
  },
  {
    name: "Agents & Automation",
    skills: ["CrewAI", "LangChain", "LangGraph", "MCP", "LangSmith", "CRM Integration"],
  },
  {
    name: "Backend & MLOps",
    skills: ["API-based Model Serving", "Docker", "CI/CD", "GCP", "Linux"],
  },
  {
    name: "Languages & Tools",
    skills: ["Python", "SQL", "Bash", "Scikit-Learn", "TensorFlow", "Git & GitHub", "Jupyter", "Google Colab"],
  },
];

export const projectsData: Project[] = [
  {
    id: "shnu-llm",
    title: "SHNU-LLM — A Language Model Built From Scratch",
    description: "A 33.9M-parameter decoder-only Transformer trained from random initialization — custom tokenizer, reproducible multi-session training on free GPUs, and a measured evaluation pipeline.",
    longDescription: "Building a language model from scratch — not fine-tuning a pretrained one.",
    technologies: ["Python", "PyTorch", "Transformers from scratch", "BPE Tokenizer", "Evaluation"],
    githubUrl: "https://github.com/mr-cri-spy/shnu-llm",
    features: [],
    imageUrl: "project-shnu-llm",
    coverAlt: "SHNU LLM logo: white and blue lettering framed by glowing circuit traces on a dark navy background",
    category: "LLM Research",
    status: "ongoing",
    featured: true,
    badge: "Active research",
    metrics: ["33.9M params", "PPL 23.94", "BPB 1.040", "117M tokens"],
    caseStudy: {
      eyebrow: "LLM Research · Active",
      title: "SHNU-LLM",
      subtitle: "Building a language model from scratch — not fine-tuning a pretrained one.",
      why: "I wanted to understand the full lifecycle of a language model — architecture, tokenization, data, training, decoding, and evaluation — by building every piece from random initialization. The long-term goal is an open-source model and training framework I can use to experiment with data quality, training strategy, decoding, and hallucination reduction.",
      architecture: [
        { label: "Type", value: "Decoder-only Transformer" },
        { label: "Parameters", value: "33.89M" },
        { label: "Layers", value: "8" },
        { label: "Hidden dim", value: "512" },
        { label: "Attention heads", value: "8" },
        { label: "Vocabulary", value: "16K (custom BPE)" },
        { label: "Context window", value: "512 tokens" },
        { label: "Positional encoding", value: "RoPE" },
        { label: "Normalization", value: "RMSNorm" },
        { label: "Feed-forward", value: "SwiGLU" },
        { label: "Embeddings", value: "Tied input/output" },
        { label: "Init", value: "Random (no pretrained weights)" },
      ],
      tokenizer: "I trained a 16,000-token BPE tokenizer from scratch. The tokenizer and its SHA-256 hash are frozen, so every experiment is exactly reproducible.",
      training: {
        heading: "Training run v0.2",
        items: [
          "Data: WikiText-103, ~117M training tokens",
          "20,000 optimizer steps",
          "AdamW · cosine LR decay with warmup · gradient accumulation · BF16",
          "Hardware: single NVIDIA T4 (free tier)",
          "Completed across 6 GPU sessions via checkpoint/resume",
        ],
      },
      engineering: {
        items: [
          "Checkpoint/resume",
          "Checkpoint integrity verification",
          "Dataset & tokenizer SHA-256 verification",
          "Config validation",
          "Training status tracking",
          "Multi-session launcher",
          "Experiment-specific run names",
          "Reproducibility tests",
        ],
        takeaway: "Six disconnected sessions, one continuous experiment.",
      },
      evaluation: {
        stats: [
          { label: "Validation loss", value: "3.175" },
          { label: "Perplexity", value: "23.94" },
          { label: "Bits-per-byte", value: "1.040" },
        ],
        alsoMeasures: "The pipeline also measures repetition, diversity, EOS behavior, generation quality, and context handling.",
        decoding: "In v0.2.1 I separated decoding from the model so I could measure its effect on fixed weights. Greedy decoding vs sampling (temperature / top-k / top-p), repetition penalty, and no-repeat n-gram blocking produced substantial differences in output quality.",
      },
      experiment: {
        heading: "Now: EXP-001 — data vs architecture",
        question: "Was v0.2 limited by its architecture, or by the amount and diversity of its data?",
        body: "Architecture, tokenizer, optimizer, LR schedule, seed, sequence length, effective batch size, and the 20K-step budget are held fixed. Only the data changes: WikiText + FineWeb-Edu, ~234M unique tokens. I measured a FineWeb held-out baseline on v0.2 first, so the comparison has an independent reference point.",
      },
      roadmap: [
        { label: "Better data", state: "active" },
        { label: "Better pretraining", state: "active" },
        { label: "Better evaluation", state: "upcoming" },
        { label: "Better reasoning", state: "upcoming" },
        { label: "Hallucination reduction", state: "upcoming" },
        { label: "Efficient inference", state: "upcoming" },
        { label: "Agent integration", state: "upcoming" },
      ],
      status: "SHNU-LLM is a research project, not a frontier model. The first from-scratch pretraining cycle, evaluation framework, and reproducibility infrastructure are complete; EXP-001 is in preparation.",
    },
  },
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
      "Performed testing and QA across AI systems to validate response accuracy and system reliability before deployment."
    ],
    skills: ["Voice AI (ASR)", "WhatsApp Business API", "Website Chatbots", "RAG Concepts", "Docker", "DevOps", "Testing & QA"]
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


