
export interface Education {
  school: string;
  location: string;
  degree: string;
  date: string;
  gpa?: string;
  details?: string;
}

export interface Experience {
  company: string;
  location: string;
  role: string;
  date: string;
  bullets: string[];
}

export interface Project {
  title: string;
  description: string;
}

export interface ResumeData {
  name: string;
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    portfolio: string;
  };
  education: Education[];
  skills: {
    languages: string[];
    hardware: string[];
    applications: string[];
    other: string[];
  };
  experience: Experience[];
  projects: Project[];
  leadership: Experience[];
}
