"use client";

import { useEffect, useState, useMemo } from "react";
import { getAllJobs } from "@/app/actions";
import { formatTimestamp, ensureHttpPrefix } from "@/lib/utils";
import { useRouter } from "next/navigation";
import JobFilter from "./JobFilter";
import { FilterValues } from "@/lib/types";

interface Job {
  _id: string;
  title: string;
  companyName: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  applicationURL: string;
  timestamp: string;
}

const JobListings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>({
    searchTerm: "",
    jobType: "",
    location: "",
  });
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getAllJobs()
      .then((result) => {
        console.log("Jobs fetched:", result);
        setJobs(result);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load jobs");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Apply filters to jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Filter by search term (check title and company name)
      const matchesSearchTerm =
        !filters.searchTerm ||
        job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        job.companyName
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        job.description
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase());

      // Filter by job type
      const matchesJobType = !filters.jobType || job.type === filters.jobType;

      // Filter by location
      const matchesLocation =
        !filters.location ||
        job.location.toLowerCase().includes(filters.location.toLowerCase());

      // Job must match all active filters
      return matchesSearchTerm && matchesJobType && matchesLocation;
    });
  }, [jobs, filters]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  if (loading) {
    return <div className="text-center my-8">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 my-8">{error}</div>;
  }

  if (jobs.length === 0) {
    return <div className="text-center my-8">No jobs found.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Filter component */}
      <JobFilter onFilterChange={handleFilterChange} />

      {/* Results count */}
      <div className="mb-4 text-gray-600">
        Total {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center my-8 py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No jobs match your filter criteria</p>
          <button
            className="mt-4 text-blue-600 hover:text-blue-800"
            onClick={() =>
              setFilters({ searchTerm: "", jobType: "", location: "" })
            }
          >
            Reset Filters
          </button>
        </div>
      ) : (
        filteredJobs.map((job) => (
          <div
            key={job._id}
            className="flex justify-between items-center border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow mb-4 cursor-pointer hover:bg-gray-100"
          >
            <div
              className="container cursor-pointer"
              onClick={() => {
                router.push(`/jobs/${job._id}`);
              }}
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>

              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium mt-2">
                  {job.companyName}
                </span>
                <span className="text-gray-500 text-sm mt-2">
                  Added {formatTimestamp(job.timestamp)}
                </span>
              </div>

              <div className="flex items-center mt-3 text-gray-600">
                <span className="mr-4">{job.location}</span>
                <span
                  className={`px-2 py-1 ${
                    job.type !== "" && "bg-gray-100 text-gray-700"
                  } rounded-full text-sm`}
                >
                  {job.type}
                </span>
              </div>
            </div>

            <div className="ml-4 shrink-0">
              <a
                href={ensureHttpPrefix(job.applicationURL)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors whitespace-nowrap"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default JobListings;
