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
}

export interface Skill {
  name: string;
  level: number; // 0 - 100
  category: string;
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
