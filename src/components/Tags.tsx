"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tagSchema } from "@/lib/validations";
import { Tag, JobTag } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface TagsProps {
  jobId: string;
  jobTags: JobTag[];
  availableTags: Tag[];
  onTagsUpdated: (jobTags: JobTag[]) => void;
}

export function Tags({ jobId, jobTags, availableTags, onTagsUpdated }: TagsProps) {
  const [isAddingTag, setIsAddingTag] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(tagSchema),
  });

  const onSubmit = async (data: { name: string; color: string }) => {
    try {
      // First create the tag
      const tagResponse = await fetch("/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (tagResponse.ok) {
        const newTag = await tagResponse.json();
        
        // Then associate it with the job
        const jobTagResponse = await fetch(`/api/jobs/${jobId}/tags`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tagId: newTag.id }),
        });

        if (jobTagResponse.ok) {
          const newJobTag = await jobTagResponse.json();
          onTagsUpdated([...jobTags, newJobTag]);
          reset();
          setIsAddingTag(false);
          addToast("Tag added successfully", "success");
        } else {
          addToast("Failed to associate tag with job", "error");
        }
      } else {
        addToast("Failed to create tag", "error");
      }
    } catch (error) {
      addToast("An error occurred", "error");
    }
  };

  const removeTag = async (tagId: string) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}/tags/${tagId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onTagsUpdated(jobTags.filter(jt => jt.tagId !== tagId));
        addToast("Tag removed successfully", "success");
      } else {
        addToast("Failed to remove tag", "error");
      }
    } catch (error) {
      addToast("An error occurred", "error");
    }
  };

  const addExistingTag = async (tagId: string) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tagId }),
      });

      if (response.ok) {
        const newJobTag = await response.json();
        onTagsUpdated([...jobTags, newJobTag]);
        addToast("Tag added successfully", "success");
      } else {
        addToast("Failed to add tag", "error");
      }
    } catch (error) {
      addToast("An error occurred", "error");
    }
  };

  const unusedTags = availableTags.filter(
    tag => !jobTags.some(jt => jt.tagId === tag.id)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Tags</h3>
        <button
          onClick={() => setIsAddingTag(!isAddingTag)}
          className="px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          {isAddingTag ? "Cancel" : "Add Tag"}
        </button>
      </div>

      {isAddingTag && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              {...register("name")}
              type="text"
              placeholder="Tag name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              {...register("color")}
              type="color"
              className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
          {errors.color && (
            <p className="text-red-500 text-xs">{errors.color.message}</p>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsAddingTag(false);
                reset();
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Tag"}
            </button>
          </div>
        </form>
      )}

      {/* Existing tags on the job */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Current Tags</h4>
        {jobTags.length === 0 ? (
          <p className="text-gray-500 text-sm">No tags assigned yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {jobTags.map((jobTag) => (
              <div
                key={jobTag.id}
                className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: jobTag.tag.color + "20", color: jobTag.tag.color }}
              >
                <span>{jobTag.tag.name}</span>
                <button
                  onClick={() => removeTag(jobTag.tagId)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available tags to add */}
      {unusedTags.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Available Tags</h4>
          <div className="flex flex-wrap gap-2">
            {unusedTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => addExistingTag(tag.id)}
                className="px-3 py-1 rounded-full text-sm hover:opacity-80 transition-opacity"
                style={{ backgroundColor: tag.color + "20", color: tag.color }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
