"use client";

import { useState } from "react";
import { Stage, Priority } from "@/types";

interface SearchAndFiltersProps {
  onSearchChange: (search: string) => void;
  onStageFilterChange: (stage: Stage | "") => void;
  onPriorityFilterChange: (priority: Priority | "") => void;
  onClearFilters: () => void;
}

export function SearchAndFilters({
  onSearchChange,
  onStageFilterChange,
  onPriorityFilterChange,
  onClearFilters,
}: SearchAndFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedStage, setSelectedStage] = useState<Stage | "">("");
  const [selectedPriority, setSelectedPriority] = useState<Priority | "">("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  const handleStageChange = (stage: Stage | "") => {
    setSelectedStage(stage);
    onStageFilterChange(stage);
  };

  const handlePriorityChange = (priority: Priority | "") => {
    setSelectedPriority(priority);
    onPriorityFilterChange(priority);
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedStage("");
    setSelectedPriority("");
    onClearFilters();
  };

  const hasActiveFilters = search || selectedStage || selectedPriority;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Search & Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
          Search Jobs
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search by company, title, or description..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stage Filter */}
        <div>
          <label htmlFor="stage-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Stage
          </label>
          <select
            id="stage-filter"
            value={selectedStage}
            onChange={(e) => handleStageChange(e.target.value as Stage | "")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Stages</option>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            id="priority-filter"
            value={selectedPriority}
            onChange={(e) => handlePriorityChange(e.target.value as Priority | "")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Search: &quot;{search}&quot;
              <button
                onClick={() => handleSearchChange("")}
                className="ml-1.5 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
          {selectedStage && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Stage: {selectedStage}
              <button
                onClick={() => handleStageChange("")}
                className="ml-1.5 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
          {selectedPriority && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Priority: {selectedPriority}
              <button
                onClick={() => handlePriorityChange("")}
                className="ml-1.5 text-yellow-600 hover:text-yellow-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
