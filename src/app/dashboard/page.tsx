"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Job } from "@/types";
import { DashboardStats } from "@/components/DashboardStats";
import { JobList } from "@/components/JobList";
import { JobForm } from "@/components/forms/JobForm";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addToast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    fetchJobs();
  }, [session, status, router]);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      addToast("Failed to fetch jobs", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobCreated = (newJob: Job) => {
    setJobs([newJob, ...jobs]);
    setShowJobForm(false);
    addToast("Job created successfully", "success");
  };

  const handleJobUpdated = (updatedJob: Job) => {
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
    addToast("Job updated successfully", "success");
  };

  const handleJobDeleted = (jobId: string) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    addToast("Job deleted successfully", "success");
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Jobs Tracker
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <button
              onClick={() => setShowJobForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Job
            </button>
          </div>

          <DashboardStats jobs={jobs} />

          <div className="mt-8">
            <JobList
              jobs={jobs}
              onJobUpdated={handleJobUpdated}
              onJobDeleted={handleJobDeleted}
            />
          </div>
        </div>
      </main>

      {showJobForm && (
        <JobForm
          onClose={() => setShowJobForm(false)}
          onJobCreated={handleJobCreated}
        />
      )}
    </div>
  );
}
