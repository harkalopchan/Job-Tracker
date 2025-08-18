"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Job, Stage, Priority } from "@/types";
import { JobFormData } from "@/lib/validations";
import { DashboardStats } from "@/components/DashboardStats";
import { JobList } from "@/components/JobList";
import { JobForm } from "@/components/forms/JobForm";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { AdminPanel } from "@/components/AdminPanel";
import { useToast } from "@/hooks/use-toast";
import { useOptimisticUpdates } from "@/hooks/use-optimistic-updates";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addToast } = useToast();
  const { optimisticUpdate, optimisticCreate, optimisticDelete, isUpdating } = useOptimisticUpdates<Job>();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState<Stage | "">("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "">("");
  const [showJobForm, setShowJobForm] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    fetchJobs();
  }, [session, status, router]);

  useEffect(() => {
    let filtered = [...jobs];

    if (searchTerm) {
      filtered = filtered.filter(
        job =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (stageFilter) {
      filtered = filtered.filter(job => job.stage === stageFilter);
    }

    if (priorityFilter) {
      filtered = filtered.filter(job => job.priority === priorityFilter);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, stageFilter, priorityFilter]);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      }
    } catch (error) {
      addToast("Failed to fetch jobs", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobCreated = async (jobData: JobFormData) => {
    try {
      const updatedJobs = await optimisticCreate(
        jobs,
        async (formData) => {
          const response = await fetch("/api/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          if (!response.ok) throw new Error("Failed to create job");
          return response.json();
        },
        jobData,
        { onSuccess: setJobs }
      );
      setShowJobForm(false);
    } catch (error) {
      addToast("Failed to create job", "error");
    }
  };

  const handleJobUpdated = async (updatedJob: Job) => {
    try {
      await optimisticUpdate(
        jobs,
        async (updatedJobs) => {
          const response = await fetch(`/api/jobs/${updatedJob.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedJob),
          });
          if (!response.ok) throw new Error("Failed to update job");
          return updatedJobs;
        },
        updatedJob,
        "id",
        updatedJob.id,
        { onSuccess: setJobs }
      );
    } catch (error) {
      addToast("Failed to update job", "error");
    }
  };

  const handleJobDeleted = async (jobId: string) => {
    try {
      await optimisticDelete(
        jobs,
        async (id) => {
          const response = await fetch(`/api/jobs/${id}`, {
            method: "DELETE",
          });
          if (!response.ok) throw new Error("Failed to delete job");
        },
        "id",
        jobId,
        { onSuccess: setJobs }
      );
    } catch (error) {
      addToast("Failed to delete job", "error");
    }
  };

  const handleSearchChange = (search: string) => setSearchTerm(search);
  const handleStageFilterChange = (stage: Stage | "") => setStageFilter(stage);
  const handlePriorityFilterChange = (priority: Priority | "") => setPriorityFilter(priority);
  const handleClearFilters = () => {
    setSearchTerm("");
    setStageFilter("");
    setPriorityFilter("");
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/auth/signin");
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Jobs Tracker</h1>
              <p className="text-gray-600">Welcome back, {session.user.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              {session.user.role === "ADMIN" && (
                <button
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  {showAdminPanel ? "Hide Admin" : "Admin Panel"}
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Panel */}
        {showAdminPanel && session.user.role === "ADMIN" && (
          <div className="mb-8">
            <AdminPanel />
          </div>
        )}

        {/* Dashboard Stats */}
        <div className="mb-8">
          <DashboardStats jobs={jobs} />
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <SearchAndFilters
            onSearchChange={handleSearchChange}
            onStageFilterChange={handleStageFilterChange}
            onPriorityFilterChange={handlePriorityFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Job Form Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowJobForm(!showJobForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            {showJobForm ? "Cancel" : "Add New Job"}
          </button>
        </div>

        {/* Job Form */}
        {showJobForm && (
          <div className="mb-8">
            <JobForm
              onJobCreated={handleJobCreated}
              onClose={() => setShowJobForm(false)}
            />
          </div>
        )}

        {/* Job List */}
        <div>
                      <JobList
              jobs={filteredJobs}
              onJobUpdated={handleJobUpdated}
              onJobDeleted={handleJobDeleted}
            />
        </div>
      </div>
    </div>
  );
}
