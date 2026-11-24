import type { Profile, Project, SkillGroup, Experience, Education, Certification } from "./types.js";

export const developerProfile: Profile = {
  name: "Kiran M B",
  title: "Full-Stack AI Product Engineer",
  subTitle: "TypeScript · React · Python · LLM agents",
  email: "kiraj8899@gmail.com",
  github: "https://github.com/mr-cri-spy",
  linkedin: "https://linkedin.com/in/kiran-m-36334b343",
  resumeUrl: "#",
  bio: "Product-minded full-stack engineer. Since 2023 I've built software for real users: 30+ websites and apps as a freelancer during my MCA, AI products and agents as a product and AI engineer at Mashnu AI, and forward-deployed AI work with client teams at Naaz AI Labs. I build end to end (data model, API, React interface and the AI features in between), as in Blue Bright HR (multi-tenant AI hiring), Flybird (AI social media management) and Lenj (a challenge platform with privacy enforced in Postgres and 300+ automated tests). To understand the layer underneath, I also pretrained a small language model from scratch. Available to start immediately and open to relocating to the UK.",
  location: "Mysore, India",
  availability: "Available now · open to relocating to the UK",
};

export const skillGroups: SkillGroup[] = [
  {
    name: "Product engineering",
    skills: ["TypeScript", "JavaScript", "React", "Next.js (App Router)", "Vite", "Tailwind CSS", "Radix UI", "Recharts", "Node.js", "Express"],
  },
  {
    name: "Backend & data",
    skills: [
      "Python",
      "FastAPI",
      "REST APIs",
      "Webhooks",
      "PostgreSQL (row-level security)",
      "Supabase",
      "Drizzle ORM",
      "Prisma",
      "SQL",
      "SQLAlchemy & Alembic",
      "Redis & Celery",
      "Pydantic",
      "Zod",
      "Stripe & Razorpay",
    ],
  },
  {
    name: "LLM features & agents",
    skills: [
      "LLM agents",
      "Tool calling",
      "Structured (JSON) outputs",
      "Streaming",
      "RAG",
      "Embeddings",
      "Vector DBs (Qdrant, FAISS, Pinecone)",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "MCP",
      "LangSmith",
      "Evals & guardrails",
    ],
  },
  {
    name: "Voice & conversational AI",
    skills: ["Voice agents (STT → LLM → TTS)", "WhatsApp Business API", "Website chatbots", "CRM integration"],
  },
  {
    name: "Models & training",
    skills: [
      "PyTorch",
      "Hugging Face Transformers",
      "Pretraining from scratch",
      "LoRA / QLoRA fine-tuning",
      "BPE tokenizers",
      "Evaluation (perplexity, bits-per-byte)",
    ],
  },
  {
    name: "Testing & delivery",
    skills: ["Vitest", "Playwright", "pytest", "GitHub Actions", "Docker", "Vercel", "Render", "Git & GitHub", "Linux & Bash", "GCP", "AWS (exposure)"],
  },
];

export const projectsData: Project[] = [
  {
    id: "blue-bright-hr",
    title: "Blue Bright HR — AI Hiring Platform",
    description:
      "A multi-tenant B2B SaaS where AI drafts the job post, runs the first-round interview and scores the transcript, and a recruiter makes every decision.",
    longDescription:
      "A multi-tenant hiring platform built end to end in Next.js, TypeScript and Postgres, with LLM features for job descriptions, interviews and evaluation.",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Supabase Postgres", "Groq · Llama 3.3 70B", "Razorpay & Stripe", "Vercel"],
    demoUrl: "https://blue-bright-hr.vercel.app",
    demoLabel: "Live app",
    repoNote: "Private repo · happy to walk through the code",
    features: [],
    category: "B2B SaaS · LLM features",
    featured: true,
    badge: "End-to-end build",
    coverFlow: {
      caption: "Hiring pipeline",
      steps: [
        { label: "Post a job", tag: "AI" },
        { label: "Candidate applies" },
        { label: "AI interview", tag: "AI" },
        { label: "Scored report", tag: "AI" },
        { label: "Recruiter decides", tag: "Human" },
      ],
      footer: "org_id + row-level security on 11/11 tables",
    },
    metrics: ["42 API routes", "11 tables · RLS on all", "5 AI agents", "TypeScript strict"],
    caseStudy: {
      kind: "product",
      eyebrow: "Product · B2B SaaS · LLM features",
      title: "Blue Bright HR",
      subtitle:
        "A multi-tenant hiring platform where AI drafts job descriptions, runs first-round interviews and summarises candidates, and a recruiter makes every decision.",
      role: "Designed and built end to end: data model, API, UI, LLM features, billing and deployment.",
      why: "Hiring at small and mid-sized companies stalls on busywork: writing job posts, reading CVs, scheduling and running first-round interviews. Blue Bright HR automates that pipeline end to end, so recruiters spend their time on decisions instead of admin.",
      stats: [
        { value: "42", label: "API routes" },
        { value: "11/11", label: "Tables with row-level security" },
        { value: "5", label: "AI agents on one shared UI" },
        { value: "6 s", label: "LLM timeout before a template fallback" },
      ],
      flow: [
        {
          label: "Post a job",
          tag: "AI",
          detail: "The recruiter names the role; the LLM drafts the job description and a weighted evaluation rubric as structured JSON.",
        },
        {
          label: "Candidate applies",
          detail: "Public careers page, no account needed. The CV's text is extracted and the candidate gets a unique interview link.",
        },
        {
          label: "AI interview",
          tag: "AI",
          detail: "Text or video-and-voice. Questions adapt to the CV and the role, and replies stream in real time. Consent is logged before it starts.",
        },
        {
          label: "Scored report",
          tag: "AI",
          detail: "The transcript is scored into a structured report: a HIRE / MAYBE / REJECT recommendation with strengths and gaps.",
        },
        {
          label: "Recruiter decides",
          tag: "Human",
          detail: "Dashboard with scores, transcripts and a hiring funnel. Shortlisting and rejection stay with the recruiter.",
        },
      ],
      stack: [
        { label: "Frontend", value: "Next.js 16 (App Router) · React 19 · TypeScript strict · Recharts" },
        { label: "Backend", value: "42 route handlers · session auth · internal service secret" },
        { label: "Data", value: "Supabase Postgres · 11 tables, RLS on every one" },
        { label: "AI", value: "Groq · Llama 3.3 70B · JSON mode · token streaming · face-api.js" },
        { label: "Billing", value: "Razorpay & Stripe · plan tiers · verified, idempotent webhooks" },
        { label: "Delivery", value: "Vercel · deploys on every push to main" },
      ],
      decisions: [
        {
          title: "Tenant isolation in two layers",
          body: "Every tenant table carries org_id with row-level security. API routes use a service-role client that bypasses RLS, so each route also scopes its queries to the caller's organisation, with RLS as the backstop. Auditing that pattern surfaced a real cross-tenant bug (a route used the first organisation in the database instead of the caller's), which I fixed.",
        },
        {
          title: "LLM output is data, not prose",
          body: "Job descriptions, rubrics and evaluations come back in JSON mode and are parsed before they reach the database or the UI. Job-description generation races a 6-second timeout: if the model is slow, the recruiter gets a sensible template instead of a spinner.",
        },
        {
          title: "Payments that are safe to retry",
          body: "A trial and three paid tiers gate active jobs, monthly AI interviews and seats on the server. Payment webhooks are signature-verified, and each event is recorded so a redelivered webhook is never applied twice.",
        },
        {
          title: "Configuration over custom code",
          body: "Notifications are configured per organisation, per event and per channel (WhatsApp, SMS, voice, email). Five HR agents share one AgentCommandCenter component, and a second product vertical runs on the same tenant and auth foundation.",
        },
        {
          title: "Privacy by default in proctoring",
          body: "Candidates opt in before the interview starts and the consent is logged. Face detection runs client-side with face-api.js, so the camera frames used for that check never leave the browser.",
        },
      ],
      status: {
        built: [
          "Core flow working end to end: job post, application, AI interview, scored report, recruiter review",
          "Auth, multi-tenancy, plan limits and hiring analytics",
          "Payment and messaging integrations (WhatsApp, SMS, voice) written with signature checks",
        ],
        next: [
          "Connect live payment and messaging provider accounts",
          "Move interview reminders to a scheduler",
          "Wire CV-to-job matching into the recruiter UI",
        ],
      },
    },
  },
  {
    id: "lenj",
    title: "Lenj — Social Challenge Platform",
    description:
      "Set a measurable goal, post progress, submit evidence a human reviewer checks, and earn a trophy marked verified or self-reported. Privacy is enforced in Postgres, and every push runs 300+ automated tests in CI.",
    longDescription:
      "A full-stack TypeScript product with database-enforced privacy, a moderation console, a media pipeline and an automated test suite that runs on every push.",
    technologies: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL 16 (RLS)", "Drizzle ORM", "Zod", "Vitest", "Playwright", "Docker", "GitHub Actions"],
    demoUrl: "https://lenj.mashnu.com",
    demoLabel: "Staging app",
    repoNote: "Private repo · happy to walk through the code",
    features: [],
    category: "Consumer web app",
    featured: true,
    badge: "In staging",
    coverFlow: {
      caption: "Challenge loop",
      steps: [
        { label: "Set a challenge" },
        { label: "Post progress" },
        { label: "Submit evidence" },
        { label: "Human review", tag: "Human" },
        { label: "Trophy: verified or self-reported" },
      ],
      footer: "290 unit & integration · 44 browser tests",
    },
    metrics: ["104 API routes", "290 unit & integration tests", "44 Playwright tests", "24 migrations"],
    caseStudy: {
      kind: "product",
      eyebrow: "Product · Full-stack TypeScript",
      title: "Lenj",
      subtitle:
        "A social challenge platform: set a measurable goal with a deadline, post progress, submit evidence a human reviewer checks, and earn a trophy that says plainly whether the result was verified or self-reported.",
      role: "Designed, built and run: product, schema, API, UI, tests, CI and deployment. I also made and edited Lenj's ads, which are running publicly.",
      why: "Lenj's core promise is that a trophy means something: every result is labelled verified (evidence checked by a person) or self-reported. Many users are young, so privacy and safety had to be part of the product from day one, not an add-on.",
      stats: [
        { value: "104", label: "API routes" },
        { value: "290", label: "Unit & integration tests" },
        { value: "44", label: "Playwright browser tests" },
        { value: "24", label: "Database migrations" },
      ],
      flow: [
        { label: "Set a challenge", detail: "A measurable goal with a deadline, public or private." },
        {
          label: "Post progress",
          detail: "Updates the community can cheer on. Photos and videos go through a media pipeline that strips EXIF and GPS data.",
        },
        {
          label: "Submit evidence",
          detail: "Evidence stays private to reviewers, enforced by Postgres row-level security rather than by the UI.",
        },
        {
          label: "Human review",
          tag: "Human",
          detail: "Reviewer-conflict checks, claims and disputes that escalate to a second admin.",
        },
        { label: "Trophy", detail: "Marked verified or self-reported, so it means what it says." },
      ],
      stack: [
        { label: "Frontend", value: "Next.js 16 (App Router) · React 19 · TypeScript" },
        { label: "Backend", value: "104 route handlers · Zod validation · Argon2 password hashing" },
        { label: "Data", value: "PostgreSQL 16 · row-level security · Drizzle ORM · 24 migrations" },
        { label: "Media", value: "S3-compatible storage (Cloudflare R2) · sharp · ffmpeg" },
        { label: "Testing", value: "Vitest on a real Postgres · Playwright browser journeys" },
        { label: "Delivery", value: "Docker · GitHub Actions · Render + Neon (staging)" },
      ],
      decisions: [
        {
          title: "Privacy enforced in the database",
          body: "Row-level security does the enforcing. Integration tests run as the non-owner app role and try to read another user's private evidence with raw SQL; it is denied. In production the server refuses to start if its database connection could bypass RLS.",
        },
        {
          title: "Audit before launch",
          body: "A release-readiness audit found a serious privacy defect (private and under-18 accounts were visible on other people's public challenges) and four abuse or resilience issues: forgeable IP rate limiting, unbounded request bodies, reset-email flooding and a slow mail server blocking requests. Each fix ships with a regression test that fails on the old code.",
        },
        {
          title: "CI that mirrors production",
          body: "Every push runs type checks, lint, formatting, unit and integration tests on PostgreSQL 16, a production build, Playwright browser tests and a Docker image check in GitHub Actions. The first CI run caught a hydration bug that local runs had hidden.",
        },
        {
          title: "Built to run on free tiers",
          body: "Render, Neon and Cloudflare R2 shaped the design: a database-free liveness endpoint keeps health checks from waking the database, and a staging workflow migrates, checks the database, deploys and smoke-tests in one run.",
        },
      ],
      status: {
        built: [
          "Full MVP: challenges, progress, evidence review, trophies, social feed, moderation console, data export and deletion",
          "Staging environment at lenj.mashnu.com, deployed through a GitHub Actions workflow",
          "Ads made and edited in-house, running publicly",
        ],
        next: ["Production launch", "In-app recording and editing for challenge videos"],
      },
    },
  },
  {
    id: "flybird",
    title: "Flybird — AI Social Media Management SaaS",
    description:
      "An AI-native workspace for small businesses and agencies: plan a campaign, generate on-brand posts for Instagram, Facebook and LinkedIn, approve, schedule and measure. AI drafts never publish without a person's approval.",
    longDescription:
      "A multi-tenant marketing SaaS with a FastAPI backend, a React/TypeScript front end and Postgres row-level security, built in test-gated sprints.",
    technologies: ["React", "TypeScript", "Vite", "FastAPI", "PostgreSQL (FORCE RLS)", "SQLAlchemy & Alembic", "Redis & Celery"],
    repoNote: "Private repo · code and docs walkthrough on request",
    features: [],
    category: "B2B SaaS · Generative AI",
    featured: true,
    badge: "Internal sandbox",
    coverFlow: {
      caption: "Create once, grow everywhere",
      steps: [
        { label: "Plan a campaign" },
        { label: "Generate on-brand posts", tag: "AI" },
        { label: "Review & approve", tag: "Human" },
        { label: "Schedule" },
        { label: "Measure" },
      ],
      footer: "drafts can't publish without approval",
    },
    metrics: ["500+ backend tests", "143 frontend tests", "31/35 tables · FORCE RLS", "Human approval gate"],
    caseStudy: {
      kind: "product",
      eyebrow: "Product · B2B SaaS · Generative AI",
      title: "Flybird",
      subtitle:
        "An AI-native social media workspace for small businesses and agencies: plan a campaign, generate platform-specific posts in the brand's own voice, approve, schedule and measure, all in one place.",
      role: "Product owner and architect: scope, architecture, security model and release gates, delivered in test-gated sprints.",
      why: "Small businesses need to post consistently on several platforms, in one recognisable voice, usually without a marketing team. Flybird turns a campaign plan into platform-specific drafts in the business's own voice, and keeps a person in charge of everything that gets published.",
      stats: [
        { value: "500+", label: "Backend tests" },
        { value: "143", label: "Frontend tests" },
        { value: "31/35", label: "Tables with forced row-level security" },
        { value: "14/14", label: "Cross-tenant isolation checks" },
      ],
      flow: [
        { label: "Plan", detail: "Campaign planning with goals, audience and industry presets." },
        {
          label: "Generate",
          tag: "AI",
          detail: "Platform-specific drafts in the business's brand voice, with quality evaluation and per-plan AI quotas.",
        },
        {
          label: "Approve",
          tag: "Human",
          detail: "Every AI draft stays a draft until a person explicitly approves it.",
        },
        {
          label: "Schedule",
          detail: "A least-privilege scheduler sees only approved posts; publishing adapters fail closed.",
        },
        { label: "Measure", detail: "Campaign analytics and notifications in the same workspace." },
      ],
      stack: [
        { label: "Frontend", value: "React · TypeScript · Vite" },
        { label: "Backend", value: "FastAPI (Python) · modular monolith" },
        { label: "Data", value: "PostgreSQL · SQLAlchemy · Alembic · FORCE RLS" },
        { label: "Jobs", value: "Redis · Celery" },
        { label: "Integrations", value: "AI, social and billing providers behind interfaces with offline test doubles" },
        { label: "Quality", value: "pytest · frontend tests · browser journeys · Ruff · Mypy" },
      ],
      decisions: [
        {
          title: "Human approval as an invariant",
          body: "AI output is always a draft. Publishing needs explicit approval, and the scheduler runs as a least-privilege database role that cannot read drafts or promote them, so the rule holds even if application code has a bug.",
        },
        {
          title: "Tenant isolation enforced by Postgres",
          body: "31 of 35 tables use row-level security with FORCE RLS; the other four are global by design. Two-tenant test vectors and pooled-connection lifecycle tests check that one customer's context never leaks into another's request.",
        },
        {
          title: "Runs and tests without paid APIs",
          body: "AI, social publishing and billing providers sit behind interfaces with deterministic offline implementations, so the whole product runs and is tested locally at no cost, and live adapters fail closed.",
        },
        {
          title: "Secrets and auditability",
          body: "Connected-account tokens are encrypted at rest, sensitive actions are written to an audit log, and operations are idempotent so retries are safe.",
        },
        {
          title: "Evidence-gated releases",
          body: "Every sprint closes with a written evidence record: test results, security checks, open risks and what is not yet proven. Claims stay labelled as verified, simulated or pending.",
        },
      ],
      status: {
        built: [
          "Campaign planning, brand voice, AI generation with quality evaluation, approvals, scheduling, analytics, notifications and onboarding",
          "Internal sandbox validated end to end with synthetic businesses across six industries",
        ],
        next: [
          "Connect live Instagram, Facebook and LinkedIn accounts",
          "External beta with real businesses",
          "Live billing",
        ],
      },
    },
  },
  {
    id: "shnu-llm",
    title: "SHNU-LLM — A Language Model Built From Scratch",
    description:
      "A 33.9M-parameter decoder-only Transformer trained from random initialization: custom tokenizer, reproducible multi-session training on free GPUs, and a measured evaluation pipeline.",
    longDescription: "Building a language model from scratch, not fine-tuning a pretrained one.",
    technologies: ["Python", "PyTorch", "Transformers from scratch", "BPE Tokenizer", "Evaluation"],
    githubUrl: "https://github.com/mr-cri-spy/shnu-llm",
    features: [],
    imageUrl: "project-shnu-llm",
    coverAlt: "SHNU LLM logo: white and blue lettering framed by glowing circuit traces on a dark navy background",
    category: "LLM research",
    status: "ongoing",
    featured: true,
    badge: "Active research",
    metrics: ["33.9M params", "PPL 23.94", "BPB 1.040", "35 tests"],
    caseStudy: {
      kind: "model",
      eyebrow: "LLM Research · Active",
      title: "SHNU-LLM",
      subtitle: "Building a language model from scratch, not fine-tuning a pretrained one.",
      why: "I wanted to understand the full lifecycle of a language model (architecture, tokenization, data, training, decoding and evaluation) by building every piece from random initialization. The long-term goal is an open-source model and training framework I can use to experiment with data quality, training strategy, decoding and hallucination reduction.",
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
      tokenizer:
        "I trained a 16,000-token BPE tokenizer from scratch. The tokenizer and its SHA-256 hash are frozen, so every experiment is exactly reproducible.",
      training: {
        heading: "Training run v0.2",
        items: [
          "Data: WikiText-103, ~117M training tokens",
          "20,000 optimizer steps",
          "AdamW · cosine LR decay with warmup · gradient accumulation · BF16",
          "Hardware: single NVIDIA T4 (free tier)",
          "Completed across 6 GPU sessions via checkpoint/resume",
          "Released as v0.2.0 with 35 automated tests",
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
        alsoMeasures: "The pipeline also measures repetition, diversity, EOS behavior, generation quality and context handling.",
        decoding:
          "In v0.2.1 I separated decoding from the model so I could measure its effect on fixed weights. Greedy decoding vs sampling (temperature / top-k / top-p), repetition penalty and no-repeat n-gram blocking produced substantial differences in output quality.",
      },
      experiment: {
        heading: "EXP-001: data vs architecture (closed)",
        question: "Was v0.2 limited by its architecture, or by the amount and diversity of its data?",
        body: "Everything was held fixed except the data: WikiText-103 plus FineWeb-Edu, with every dataset file hash-verified before training. The run completed, but against the thresholds set before it started the verdict was FAIL, so v0.2.0 stays the baseline. An improvement on FineWeb-Edu text is recorded only as a secondary finding, because the change in data distribution confounds it, and the generation-repetition failure is documented. A negative result, reported as one.",
      },
      roadmap: [
        { label: "Pretraining v0.2.0", state: "done" },
        { label: "Evaluation harness", state: "done" },
        { label: "EXP-001 data test", state: "done" },
        { label: "Inference foundation", state: "done" },
        { label: "Checkpoint bridge", state: "active" },
        { label: "EXP-003 data mixing", state: "upcoming" },
        { label: "Assistant platform", state: "upcoming" },
      ],
      status:
        "SHNU-LLM is a research project, not a frontier model. The first from-scratch pretraining cycle, evaluation framework and reproducibility tooling are complete. EXP-001 closed with a negative result; current work is on the inference side: converting training checkpoints into a model-only format for serving.",
    },
  },
  {
    id: "client-ai-agents",
    title: "Voice, WhatsApp & RAG Agents",
    description:
      "Client AI work at Naaz AI Labs: voice workflows (speech-to-text → LLM → text-to-speech), WhatsApp agents, RAG chatbots and CRM automations, built as Python/FastAPI services.",
    longDescription:
      "AI features delivered for client businesses at Naaz AI Labs, connecting LLMs to the systems those businesses already run on: phone calls, WhatsApp, websites and CRMs.",
    technologies: ["Python", "FastAPI", "RAG", "Vector DBs", "WhatsApp Business API", "Voice AI", "CRM integration"],
    features: [
      "Built Python/FastAPI services and API integrations that connect LLM features to clients' existing business systems",
      "Built RAG applications (retrieval, embeddings, vector stores) for grounded, document-based answers",
      "Developed voice-AI workflows combining speech-to-text, LLM processing and text-to-speech",
      "Contributed to agent and automation workflows that act through external tools: CRM processes, WhatsApp messaging and follow-ups",
      "Worked with client stakeholders from discovery to delivery and iterated on their feedback",
    ],
    category: "Client work",
  },
  {
    id: "agentic-ai-systems",
    title: "Multi-Agent Experiments",
    description:
      "Hotel-booking, front-desk and debate-simulation agents built to learn multi-agent orchestration: CrewAI and LangGraph workflows, tool calling, MCP and LangSmith tracing.",
    longDescription:
      "A set of agent systems built to learn how multi-agent workflows behave in practice: roles, tools, handoffs, and how to trace and debug them.",
    technologies: ["CrewAI", "LangGraph", "LangChain", "MCP", "A2A Protocol", "LangSmith", "Python"],
    features: [
      "A hotel-booking agent that handles multi-turn reservation conversations and tool calls",
      "Debate-simulation agents that argue opposing legal positions in a structured back-and-forth",
      "An AI receptionist / front-desk agent for routine inquiries and routing",
      "Multi-agent handoffs and tool use orchestrated with CrewAI and LangGraph",
      "MCP and the A2A protocol for structured agent-to-agent and agent-to-tool communication",
      "LangSmith tracing to debug and evaluate agent runs",
    ],
    category: "Agents · R&D",
  },
  {
    id: "portfolio-assistant",
    title: "This Site + AI Assistant",
    description:
      "React 19, TypeScript and Vite, with a chat assistant grounded in this site's own data that falls back across free LLM models when one is rate-limited.",
    longDescription:
      "The site you're on. The assistant's system prompt is generated from the same typed data the pages render, so the two can't drift apart.",
    technologies: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Vercel Functions", "Express", "OpenRouter"],
    githubUrl: "https://github.com/mr-cri-spy/portfolio",
    features: [
      "Typed content model (src/data.ts) drives both the pages and the assistant's system prompt",
      "Server-side LLM calls with an ordered fallback across free OpenRouter models",
      "Deployed as one Vercel project: static site plus /api functions",
      "Self-hostable Express server with Helmet and rate limiting",
    ],
    category: "Open source",
  },
];

export const experienceData: Experience[] = [
  {
    id: "naaz",
    role: "AI Engineer · Forward-Deployed & Product Engineering",
    company: "Naaz AI Labs",
    location: "Bengaluru, India",
    period: "January 2026 – November 2026",
    description: [
      "Worked forward-deployed with client teams from discovery to delivery, turning business requirements into LLM features shipped as Python/FastAPI services and API integrations into their existing systems.",
      "Built RAG applications (retrieval, embeddings, vector stores) and voice-AI workflows combining speech-to-text, LLM processing and text-to-speech.",
      "Built agent and automation workflows that act through external tools: CRM processes, WhatsApp messaging and follow-ups.",
      "Tested application behaviour and model outputs, refining prompts and workflows for relevance and reliability, and iterated with clients on their feedback.",
    ],
    skills: ["Forward-deployed engineering", "Python", "FastAPI", "LLM integration", "RAG", "Voice AI", "WhatsApp Business API", "CRM automation"],
  },
  {
    id: "mashnu",
    role: "Product Engineer & AI Engineer",
    company: "Mashnu AI",
    location: "Bengaluru · Remote",
    period: "January 2025 – December 2025",
    description: [
      "Built AI-employee products that combine conversational interfaces, business logic and automation, and AI assistants with API/CRM integrations and RAG retrieval.",
      "Prototyped and shipped AI features in Python with Hugging Face tooling, LangChain and backend components.",
      "Ran client requirement analysis, solution demos and post-delivery refinements.",
    ],
    skills: ["Product engineering", "Python", "LangChain", "Hugging Face", "RAG", "API & CRM integrations"],
  },
  {
    id: "freelance",
    role: "Freelance Web & App Developer",
    company: "Freelance · alongside my MCA",
    location: "Mysore · Remote",
    period: "2023 – 2025",
    description: [
      "Built 30+ websites and web applications for small businesses and end users, including Taksha Studios and Sai Vihaar Inn & Suites.",
      "Owned each project end to end: requirements, build, launch and post-launch changes.",
    ],
    skills: ["Websites & web apps", "Client delivery"],
  },
  {
    id: "ravi-infotech",
    role: "System & Network Engineer",
    company: "Ravi Infotech",
    companyUrl: "https://raviinfotech.net/",
    location: "Mysore, India",
    period: "2022 – 2023",
    description: [
      "Installed, configured and maintained desktops, laptops and Windows and Office environments for business clients; diagnosed and fixed hardware and software faults.",
      "Set up and troubleshot cabled and wireless networks, including routers, switches, Wi-Fi and point-to-point links.",
      "Handled backups, data recovery and malware removal, and gave on-site and remote support under annual maintenance contracts.",
    ],
    skills: ["Windows & Office", "Hardware", "LAN / Wi-Fi", "Backups & recovery", "IT support"],
  },
];

export const educationData: Education[] = [
  {
    id: "mca",
    degree: "Master of Computer Applications (MCA)",
    institution: "Mangalore University",
    period: "2023 – 2025",
  },
  {
    id: "bca",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "BGS First Grade College, University of Mysore",
    period: "2019 – 2022",
  },
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


