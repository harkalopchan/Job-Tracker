import { Job, Stage, Priority } from "@/types";

export const stageColors = {
  APPLIED: "bg-blue-100 text-blue-800",
  INTERVIEW: "bg-yellow-100 text-yellow-800",
  OFFER: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  WITHDRAWN: "bg-gray-100 text-gray-800",
};

export const priorityColors = {
  LOW: "bg-gray-100 text-gray-800",
  MEDIUM: "bg-blue-100 text-blue-800",
  HIGH: "bg-orange-100 text-orange-800",
  URGENT: "bg-red-100 text-red-800",
};

export const stageLabels = {
  APPLIED: "Applied",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
  WITHDRAWN: "Withdrawn",
};

export const priorityLabels = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getStageStats(jobs: Job[]) {
  return {
    total: jobs.length,
    applied: jobs.filter(job => job.stage === "APPLIED").length,
    interview: jobs.filter(job => job.stage === "INTERVIEW").length,
    offer: jobs.filter(job => job.stage === "OFFER").length,
    rejected: jobs.filter(job => job.stage === "REJECTED").length,
    withdrawn: jobs.filter(job => job.stage === "WITHDRAWN").length,
  };
}

export function getPriorityStats(jobs: Job[]) {
  return {
    low: jobs.filter(job => job.priority === "LOW").length,
    medium: jobs.filter(job => job.priority === "MEDIUM").length,
    high: jobs.filter(job => job.priority === "HIGH").length,
    urgent: jobs.filter(job => job.priority === "URGENT").length,
  };
}
