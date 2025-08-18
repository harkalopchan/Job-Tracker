import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DashboardStats } from "@/components/DashboardStats";

describe("DashboardStats", () => {
  const mockJobs = [
    {
      id: "1",
      title: "Frontend Developer",
      company: "TechCorp",
      stage: "APPLIED" as const,
      priority: "HIGH" as const,
      appliedAt: new Date(),
      updatedAt: new Date(),
      userId: "user1",
      user: { id: "user1", name: "Test User", email: "test@yourdomain.com", role: "USER" as const, createdAt: new Date(), updatedAt: new Date() },
      notes: [],
      tags: [],
    },
  ];

  it("renders job statistics correctly", () => {
    render(<DashboardStats jobs={mockJobs} />);
    
    expect(screen.getByText("Total Jobs")).toBeInTheDocument();
    expect(screen.getByText("Applied")).toBeInTheDocument();
    
    // Check that the total jobs count is 1
    const totalJobsElement = screen.getByText("Total Jobs").closest("div")?.querySelector("dd");
    expect(totalJobsElement).toHaveTextContent("1");
    
    // Check that the applied jobs count is 1
    const appliedJobsElement = screen.getByText("Applied").closest("div")?.querySelector("dd");
    expect(appliedJobsElement).toHaveTextContent("1");
  });

  it("shows zero for stages with no jobs", () => {
    render(<DashboardStats jobs={mockJobs} />);
    
    expect(screen.getByText("Interviews")).toBeInTheDocument();
    expect(screen.getByText("Offers")).toBeInTheDocument();
    
    // Check that interviews count is 0
    const interviewsElement = screen.getByText("Interviews").closest("div")?.querySelector("dd");
    expect(interviewsElement).toHaveTextContent("0");
    
    // Check that offers count is 0
    const offersElement = screen.getByText("Offers").closest("div")?.querySelector("dd");
    expect(offersElement).toHaveTextContent("0");
  });

  it("renders all expected stat cards", () => {
    render(<DashboardStats jobs={mockJobs} />);
    
    expect(screen.getByText("Total Jobs")).toBeInTheDocument();
    expect(screen.getByText("Applied")).toBeInTheDocument();
    expect(screen.getByText("Interviews")).toBeInTheDocument();
    expect(screen.getByText("Offers")).toBeInTheDocument();
  });
});
