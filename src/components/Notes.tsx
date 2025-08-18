"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "@/lib/validations";
import { Note } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { formatDateTime } from "@/utils/helpers";

interface NotesProps {
  jobId: string;
  notes: Note[];
  onNoteAdded: (note: Note) => void;
}

export function Notes({ jobId, notes, onNoteAdded }: NotesProps) {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      content: "",
      jobId: jobId,
    },
  });

  const onSubmit = async (data: { content: string }) => {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          jobId,
        }),
      });

      if (response.ok) {
        const newNote = await response.json();
        onNoteAdded(newNote);
        reset();
        setIsAddingNote(false);
        addToast("Note added successfully", "success");
      } else {
        addToast("Failed to add note", "error");
      }
    } catch (error) {
      addToast("An error occurred", "error");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Notes</h3>
        <button
          onClick={() => setIsAddingNote(!isAddingNote)}
          className="px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          {isAddingNote ? "Cancel" : "Add Note"}
        </button>
      </div>

      {isAddingNote && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <textarea
            {...register("content")}
            rows={3}
            placeholder="Add a note about this job application..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.content && (
            <p className="text-red-500 text-xs">{errors.content.message}</p>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setIsAddingNote(false);
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
              {isSubmitting ? "Adding..." : "Add Note"}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-sm">No notes yet. Add your first note above.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{note.content}</p>
                  <div className="flex items-center mt-2 space-x-2 text-xs text-gray-500">
                    <span>{note.user.name}</span>
                    <span>•</span>
                    <span>{formatDateTime(note.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
