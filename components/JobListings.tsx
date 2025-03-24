"use client";

import { useEffect, useState, useMemo } from "react";
import { getAllJobs } from "@/app/actions";
import {
  formatTimestamp,
  ensureHttpPrefix,
  extractHiringManagerNameFromLinkedIn,
} from "@/lib/utils";
import { useRouter } from "next/navigation";
import JobFilter from "./JobFilter";
import { FilterValues } from "@/lib/types";
import { Linkedin } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  companyName: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  applicationURL: string;
  posted_job_timestamp: string;
  shared_job_timestamp: string;
  isShared: boolean;
  source: string;
  postURL: string;
  recruiterProfileURL: string;
  hiringManagerProfileURL: string;
  sharedJobTitle: string;
  sharedJobType: string;
  sharedCompanyName: string;
  timestamp?: string;
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
      .catch((err: Error) => {
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
        job?.title?.toLowerCase()?.includes(filters.searchTerm.toLowerCase()) ||
        job?.companyName
          ?.toLowerCase()
          ?.includes(filters.searchTerm.toLowerCase()) ||
        job?.description
          ?.toLowerCase()
          .includes(filters.searchTerm.toLowerCase());

      // Filter by job type
      const matchesJobType = !filters.jobType || job?.type === filters.jobType;

      // Filter by location
      const matchesLocation =
        !filters.location ||
        job?.location?.toLowerCase()?.includes(filters.location.toLowerCase());

      // Job must match all active filters
      return matchesSearchTerm && matchesJobType && matchesLocation;
    });
  }, [jobs, filters]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  if (loading) {
    return <div className="text-center my-8 text-white">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 my-8">{error}</div>;
  }

  if (jobs.length === 0) {
    return <div className="text-center my-8 text-white">No jobs found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      {/* Filter component */}
      <JobFilter onFilterChange={handleFilterChange} />

      {/* Results count */}
      <div className="mb-4 text-gray-400">
        Total {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center my-8 py-10 bg-[#071428] rounded-lg border border-[#1a2b4b]">
          <p className="text-gray-400">No jobs match your filter criteria</p>
          <button
            className="mt-4 text-[#3b5998] hover:text-blue-400"
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
            className="flex justify-between items-center border border-[#1a2b4b] bg-[#071428] rounded-lg p-6 hover:bg-[#0a1729] transition-all mb-4 cursor-pointer"
          >
            <div
              className="container cursor-pointer"
              onClick={() => {
                router.push(`/jobs/${job._id}`);
              }}
            >
              <div className="flex">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  {job.title || job.source === "linkedin" ? (
                    <Linkedin className="w-4 h-4 mr-2" />
                  ) : (
                    `${
                      job.source.charAt(0).toUpperCase() + job.source.slice(1)
                    } job`
                  )}
                </h3>
                <span className=" rounded-xl px-2 py-1 text-sm text-center bg-[#1a2b4b] text-gray-300">
                  {job.sharedJobType}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-300 font-medium mt-2">
                  {job.isShared && !job.companyName
                    ? "Shared Job"
                    : job.companyName}
                </span>
                <span className="text-gray-500 text-sm mt-2">
                  Added{" "}
                  {formatTimestamp(
                    job.posted_job_timestamp || job.shared_job_timestamp
                  )}
                </span>
              </div>

              <div className="flex items-center mt-3 text-gray-400">
                <span className="mr-4">{job.location}</span>
                <span
                  className={`${
                    job.type
                      ? "px-2 py-1 bg-[#1a2b4b] text-gray-300 rounded-full"
                      : ""
                  } text-sm`}
                >
                  {job.type}
                </span>
              </div>
              {job.hiringManagerProfileURL ? (
                <div className="flex items-center mt-4 text-gray-400">
                  <span className="mr-4">Hiring Manager</span>
                  <span
                    className={`px-2 py-1 ${
                      job.type !== "" && "bg-[#1a2b4b] text-gray-300"
                    } rounded-full text-sm`}
                  >
                    <a
                      href={job.hiringManagerProfileURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#3b5998]"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {extractHiringManagerNameFromLinkedIn(
                        job.hiringManagerProfileURL
                      )}
                    </a>
                  </span>
                </div>
              ) : (
                <div className="flex items-center mt-4 text-gray-400">
                  <span className="mr-4">Recruiter Details</span>
                  <span
                    className={`px-2 py-1 ${
                      job.type !== "" && "bg-[#1a2b4b] text-gray-300"
                    } rounded-full text-sm`}
                  >
                    <a
                      href={job.recruiterProfileURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#3b5998]"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {extractHiringManagerNameFromLinkedIn(
                        job.recruiterProfileURL
                      )}
                    </a>
                  </span>
                </div>
              )}
            </div>

            <div className="ml-4 shrink-0">
              <a
                href={
                  job.isShared
                    ? job.postURL
                    : ensureHttpPrefix(job.applicationURL)
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#3b5998] text-white px-4 py-2 rounded hover:bg-[#2d4373] transition-colors whitespace-nowrap"
              >
                {job.isShared ? "View Post" : "Apply Now"}
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default JobListings;
