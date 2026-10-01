export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  features: string[];
  imageUrl: string;
  category: string;
  status?: "ongoing";
  // Flagship-project extras: a featured project spans the full grid width,
  // shows metric chips, and opens a dedicated case study instead of the
  // generic detail modal.
  featured?: boolean;
  badge?: string;
  coverAlt?: string;
  metrics?: string[];
  caseStudy?: CaseStudy;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface RoadmapStep {
  label: string;
  state: "done" | "active" | "upcoming";
}

export interface CaseStudy {
  eyebrow: string;
  title: string;
  subtitle: string;
  why: string;
  architecture: SpecItem[];
  tokenizer: string;
  training: { heading: string; items: string[] };
  engineering: { items: string[]; takeaway: string };
  evaluation: { stats: StatItem[]; alsoMeasures: string; decoding: string };
  experiment: { heading: string; question: string; body: string };
  roadmap: RoadmapStep[];
  status: string;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Profile {
  name: string;
  title: string;
  subTitle: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  bio: string;
  location: string;
  phone?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills: string[];
  verificationUrl?: string;
  description?: string;
  imageUrl?: string;
  thumbUrl?: string;
}
