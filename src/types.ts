export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  /** Button label for demoUrl, e.g. "Live app" or "Staging app". */
  demoLabel?: string;
  /** Shown instead of a GitHub button when the code is private. */
  repoNote?: string;
  features: string[];
  /** Local image key (src/assets/images/<key>.webp) or absolute URL. Optional when coverFlow is set. */
  imageUrl?: string;
  category: string;
  status?: "ongoing";
  // Flagship-project extras: a featured project spans the full grid width,
  // shows metric chips, and opens a dedicated case study instead of the
  // generic detail modal.
  featured?: boolean;
  badge?: string;
  coverAlt?: string;
  /** Drawn cover (a product's core flow) used instead of an image. */
  coverFlow?: CoverFlow;
  /** Real screenshot used as the cover: key of src/assets/images/screen-<key>.webp. */
  coverScreen?: string;
  /** Short label shown on a screenshot cover, e.g. "Staging app". */
  coverLabel?: string;
  /** Drawn header for compact cards that have no screenshot. */
  cardArt?: "chat" | "browsers" | "graph";
  metrics?: string[];
  caseStudy?: CaseStudy;
}

export interface CoverFlow {
  caption: string;
  steps: { label: string; tag?: string }[];
  footer?: string;
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

/** Case study for a model / research project (SHNU-LLM). */
export interface ModelCaseStudy {
  kind: "model";
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

/** Case study for a shipped product (Blue Bright HR, Lenj). */
export interface ProductCaseStudy {
  kind: "product";
  eyebrow: string;
  title: string;
  subtitle: string;
  role: string;
  why: string;
  stats: StatItem[];
  flow: { label: string; detail: string; tag?: string }[];
  stack: SpecItem[];
  decisions: { title: string; body: string }[];
  status: { built: string[]; next: string[] };
  /** Real screenshots: key of src/assets/images/screen-<key>.webp. */
  screens?: { key: string; alt: string; caption: string }[];
}

export type CaseStudy = ModelCaseStudy | ProductCaseStudy;

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface Profile {
  name: string;
  title: string;
  subTitle: string;
  email: string;
  github: string;
  linkedin: string;
  x?: string;
  medium?: string;
  resumeUrl: string;
  bio: string;
  location: string;
  /** One line on availability and relocation, used by the hero and the chat assistant. */
  availability: string;
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
