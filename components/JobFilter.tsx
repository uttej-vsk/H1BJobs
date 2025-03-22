"use client";

import { FilterProps, FilterValues } from "@/lib/types";
import React from "react";

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
    <div className="bg-[#071428] border border-[#1a2b4b] rounded-lg p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search term filter */}
        <div>
          <label
            htmlFor="searchTerm"
            className="block text-sm font-medium text-gray-300 mb-1"
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
            className="w-full border border-[#1a2b4b] bg-[#050e1d] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3b5998] focus:border-[#3b5998] placeholder-gray-500"
          />
        </div>

        {/* Job type filter */}
        <div>
          <label
            htmlFor="jobType"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={filters.jobType}
            onChange={handleChange}
            className="w-full border border-[#1a2b4b] bg-[#050e1d] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3b5998] focus:border-[#3b5998]"
          >
            <option value="">All Types</option>
            <option value="full-time">Full-Time</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        {/* Location filter */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-300 mb-1"
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
            className="w-full border border-[#1a2b4b] bg-[#050e1d] text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3b5998] focus:border-[#3b5998] placeholder-gray-500"
          />
        </div>
      </div>

      {/* Reset button */}
      <div className="mt-4 text-right">
        <button
          type="button"
          onClick={handleReset}
          className="text-sm text-[#3b5998] hover:text-blue-400"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilter;
