"use client";

import { useEffect, useState } from "react";
import { getAllJobs } from "@/app/actions";

interface Job {
  _id: string;
  title: string;
  companyName: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  applicationURL: string;
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
      <h2 className="text-2xl font-bold mb-6">Available Jobs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-700 font-medium mt-2">{job.companyName}</p>

            <div className="flex items-center mt-3 text-gray-600">
              <span className="mr-4">{job.location}</span>
              <span>{job.type}</span>
            </div>

            {job.salary && (
              <p className="mt-2 text-green-600 font-medium">{job.salary}</p>
            )}

            <p className="mt-4 text-gray-600 line-clamp-3">{job.description}</p>

            <a
              href={ensureHttpPrefix(job.applicationURL)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to ensure URLs have http/https prefix
function ensureHttpPrefix(url: string): string {
  if (!url) return "#";

  // Check if URL already starts with http:// or https://
  if (url.match(/^https?:\/\//)) {
    return url;
  }

  // Add https:// prefix
  return `https://${url}`;
}

export default JobListings;
