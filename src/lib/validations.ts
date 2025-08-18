import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  description: z.string().optional(),
  salary: z.string().optional(),
  url: z.string().regex(/^https?:\/\/.+/, "Invalid URL format").optional().or(z.literal("")),
  stage: z.enum(["APPLIED", "INTERVIEW", "OFFER", "REJECTED", "WITHDRAWN"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
});

export const jobCreateSchema = jobSchema.extend({
  appliedAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const noteSchema = z.object({
  content: z.string().min(1, "Note content is required"),
  jobId: z.string().optional(),
});

export const tagSchema = z.object({
  name: z.string().min(1, "Tag name is required"),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
});

export const userSchema = z.object({
  email: z.string().min(1, "Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
});

export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type JobFormData = z.infer<typeof jobSchema>;
export type NoteFormData = z.infer<typeof noteSchema>;
export type TagFormData = z.infer<typeof tagSchema>;
export type UserFormData = z.infer<typeof userSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
