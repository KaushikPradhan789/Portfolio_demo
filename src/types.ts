export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  techStack: string[];
  category: 'web' | 'ai-ml' | 'trading';
  highlights: string[];
  links: {
    github?: string;
    live?: string;
  };
}

export interface Skill {
  name: string;
  category: 'frontend' | 'tools' | 'specialization';
  level: number; // percentage or level index (1-5)
  iconName: string;
  description?: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}
