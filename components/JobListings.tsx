"use client";

import { useEffect, useState } from "react";
import { getAllJobs } from "@/app/actions";
import { formatTimestamp, ensureHttpPrefix } from "@/lib/utils";

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

  console.log(jobs);

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
    <div className="container mx-auto py-8">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="flex justify-between items-center border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow mb-4"
        >
          <div className="container">
            <h3 className="text-xl font-semibold">{job.title}</h3>

            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium mt-2">
                {job.companyName}
              </span>
              <span className="text-gray-500 text-sm mt-2">
                {formatTimestamp(job.timestamp)}
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
      ))}
    </div>
  );
};

export default JobListings;
