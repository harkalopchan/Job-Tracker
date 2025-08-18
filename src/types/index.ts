export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
  description?: string;
  salary?: string;
  url?: string;
  stage: "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  appliedAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  notes: Note[];
  tags: JobTag[];
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  jobId?: string;
  job?: Job;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  jobs: JobTag[];
}

export interface JobTag {
  id: string;
  jobId: string;
  tagId: string;
  job: Job;
  tag: Tag;
}

export interface DashboardStats {
  totalJobs: number;
  appliedJobs: number;
  interviewJobs: number;
  offerJobs: number;
  rejectedJobs: number;
  withdrawnJobs: number;
}

// NextAuth type declarations
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }
  
  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}
