"use client";

import { useState } from "react";
import { Job } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface DeleteJobDialogProps {
  job: Job;
  onClose: () => void;
  onJobDeleted: (jobId: string) => void;
}

export function DeleteJobDialog({ job, onClose, onJobDeleted }: DeleteJobDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/jobs/${job.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onJobDeleted(job.id);
        onClose();
      } else {
        addToast("Failed to delete job", "error");
      }
    } catch (error) {
      addToast("An error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Delete Job
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete "{job.title}" at {job.company}? This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
