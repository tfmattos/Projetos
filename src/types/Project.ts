export interface Project {
  id: string;
  name: string;
  description: string;
  softwareType: 'web' | 'mobile' | 'desktop' | 'api' | 'database' | 'devops';
  status: 'planning' | 'in-progress' | 'testing' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate: string;
  team: string[];
  technologies: string[];
  progress: number;
  milestones: Milestone[];
  epics: Epic[];
  hasCostBenefit: boolean;
  costBenefit?: CostBenefit;
  createdAt: string;
  updatedAt: string;
}

export interface Epic {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'in-progress' | 'testing' | 'completed' | 'on-hold';
  progress: number;
  features: Feature[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'in-progress' | 'testing' | 'completed' | 'on-hold';
  progress: number;
  assignedTo?: string;
}

export interface CostBenefit {
  estimatedCost: number;
  actualCost?: number;
  estimatedReturn: number;
  actualReturn?: number;
  currency: 'BRL' | 'USD' | 'EUR';
  costType: 'avoided' | 'investment' | 'operational';
  description: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  type: 'planning' | 'development' | 'testing' | 'deployment' | 'review';
}

export interface ProjectFormData {
  name: string;
  description: string;
  softwareType: Project['softwareType'];
  status: Project['status'];
  priority: Project['priority'];
  startDate: string;
  endDate: string;
  team: string[];
  technologies: string[];
  milestones: Milestone[];
  epics: Epic[];
  hasCostBenefit: boolean;
  costBenefit?: CostBenefit;
}