"use client";

import React from "react";
import { JobType } from "@/types";

interface FilterProps {
  onFilterChange: (filters: FilterValues) => void;
  jobTypes: JobType;
}

export interface FilterValues {
  searchTerm: string;
  jobType: string;
  location: string;
}

/**
 * Component for filtering job listings
 * Provides controls for filtering by job type, location, and search term
 */
const JobFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState<FilterValues>({
    searchTerm: "",
    jobType: "",
    location: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const updatedFilters = {
      ...filters,
      [name]: value,
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle form reset
  const handleReset = () => {
    const resetFilters = {
      searchTerm: "",
      jobType: "",
      location: "",
    };

    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search term filter */}
        <div>
          <label
            htmlFor="searchTerm"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search
          </label>
          <input
            type="text"
            id="searchTerm"
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleChange}
            placeholder="Search job title or company"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Job type filter */}
        <div>
          <label
            htmlFor="jobType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={filters.jobType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        {/* Location filter */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            placeholder="Filter by location"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Reset button */}
      <div className="mt-4 text-right">
        <button
          type="button"
          onClick={handleReset}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilter;
