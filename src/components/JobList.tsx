import { useState } from "react";
import { Job } from "@/types";
import { formatDate, stageColors, priorityColors, stageLabels, priorityLabels } from "@/utils/helpers";
import { JobForm } from "./forms/JobForm";
import { DeleteJobDialog } from "./DeleteJobDialog";

interface JobListProps {
  jobs: Job[];
  onJobUpdated: (job: Job) => void;
  onJobDeleted: (jobId: string) => void;
}

export function JobList({ jobs, onJobUpdated, onJobDeleted }: JobListProps) {
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJob, setDeletingJob] = useState<Job | null>(null);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {jobs.map((job) => (
          <li key={job.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">
                        {job.company.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {job.title}
                      </p>
                      <div className="ml-2 flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stageColors[job.stage]}`}>
                          {stageLabels[job.stage]}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[job.priority]}`}>
                          {priorityLabels[job.priority]}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <p>{job.company}</p>
                      {job.location && (
                        <>
                          <span className="mx-1">•</span>
                          <p>{job.location}</p>
                        </>
                      )}
                      {job.salary && (
                        <>
                          <span className="mx-1">•</span>
                          <p>{job.salary}</p>
                        </>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      Applied: {formatDate(job.appliedAt)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingJob(job)}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingJob(job)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {editingJob && (
        <JobForm
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onJobUpdated={onJobUpdated}
        />
      )}

      {deletingJob && (
        <DeleteJobDialog
          job={deletingJob}
          onClose={() => setDeletingJob(null)}
          onJobDeleted={onJobDeleted}
        />
      )}
    </div>
  );
}
