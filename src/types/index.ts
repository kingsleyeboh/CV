export type CountryPerspective = 'international' | 'australia' | 'uk' | 'eu';

export type ProjectCategory =
  | 'All'
  | 'Fitted Kitchens'
  | 'Kitchen Islands'
  | 'Wardrobes & Storage'
  | 'Pantry & Storage'
  | 'Custom Furniture'
  | 'Cabinet Assembly'
  | 'On-site Installation';

export interface ProjectImage {
  url: string;
  caption: string;
  isPlaceholder?: boolean;
}

export interface BeforeAfterComparison {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  location: string;
  projectType: string;
  completionDate: string;
  summary: string;
  description: string;
  materials: string[];
  responsibilities: string[];
  technicalHighlights: string[];
  images: ProjectImage[];
  featuredImage: string;
  beforeAfter?: BeforeAfterComparison;
  isDemonstrationPlaceholder?: boolean;
}

export interface WorkflowStep {
  step: string;
  number: string;
  title: string;
  description: string;
  details: string[];
  keyTools: string[];
}

export interface SkillCategory {
  categoryName: string;
  isPrimary: boolean;
  description: string;
  skills: {
    name: string;
    level: string;
    detail: string;
  }[];
}
