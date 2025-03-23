import { getJobById } from "@/lib/db";
import { notFound } from "next/navigation";
import {
  formatTimestamp,
  ensureHttpPrefix,
  extractHiringManagerNameFromLinkedIn,
} from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * Job detail page that displays information for a specific job
 */
export default async function JobDetailPage({ params }: Props) {
  const job = await getJobById((await params).id);

  if (!job) {
    notFound();
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <Link
        href="/jobs"
        className="text-blue-500 hover:text-blue-700 mb-6 inline-block"
      >
        ← Back to all jobs
      </Link>

      <div className="bg-[#0a1729] border border-[#1a2b4b] rounded-lg p-8">
        <div className="flex justify-between items-start flex-wrap mb-6">
          <div>
            {job.title && job.title !== "Untitled Job" && (
              <h1 className="text-3xl font-bold text-white">{job.title}</h1>
            )}
            <div className="flex items-center gap-2 mt-2">
              {job.companyName && (
                <span className="text-gray-300 font-medium">
                  {job.companyName}
                </span>
              )}
              <span className="text-gray-500 text-sm">
                {formatTimestamp(job.timestamp)}
              </span>
            </div>
          </div>

          <a
            href={`${
              job.isShared ? job.postURL : ensureHttpPrefix(job.applicationURL)
            }`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0"
          >
            <Button className="bg-white text-[#050e1d] hover:bg-gray-200">
              {job.isShared ? "View Job" : "Apply"}
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {job.location && (
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Location:</span>
              <span className="text-white font-medium">{job.location}</span>
            </div>
          )}

          {job.type && (
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Job Type:</span>
              <span className="text-white font-medium px-3 py-1 bg-[#1a2b4b] rounded-full text-sm">
                {job.type}
              </span>
            </div>
          )}

          {job.salary && (
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Salary:</span>
              <span className="text-white font-medium">{job.salary}</span>
            </div>
          )}
        </div>

        {job.description && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Job Description
            </h2>
            <div className="text-gray-300 whitespace-pre-line">
              {job.description}
            </div>
          </div>
        )}

        {job.hiringManagerProfileURL && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Hiring Manager
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">
                {extractHiringManagerNameFromLinkedIn(
                  job.hiringManagerProfileURL
                )}
              </span>
              <a
                href={job.hiringManagerProfileURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 flex items-center gap-2"
              >
                <span>View Profile</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {job.source && (
          <div className="mt-8 pt-6 border-t border-[#1a2b4b]">
            <p className="text-sm text-gray-400">
              Source:{" "}
              <a
                href={job.postURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400"
              >
                {job.source}
              </a>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
