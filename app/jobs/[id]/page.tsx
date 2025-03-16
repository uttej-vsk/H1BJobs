import { getJobById } from "@/app/actions";
import { formatTimestamp, ensureHttpPrefix } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

interface JobDetailPageProps {
  params: {
    id: string;
  };
}

/**
 * Job detail page that displays information for a specific job
 */
export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = params;
  console.log(id);
  const job = await getJobById(id);
  console.log(job);
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

      <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-md">
        <div className="flex justify-between items-start flex-wrap mb-6">
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-gray-700 font-medium">
                {job.companyName}
              </span>
              <span className="text-gray-500 text-sm">
                {formatTimestamp(job.timestamp)}
              </span>
            </div>
          </div>

          <a
            href={ensureHttpPrefix(job.applicationURL)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Apply for this job
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Location:</span>
            <span className="font-medium">{job.location}</span>
          </div>

          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Job Type:</span>
            <span className="font-medium px-3 py-1 bg-gray-100 rounded-full text-sm">
              {job.type}
            </span>
          </div>

          {job.salary && (
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Salary:</span>
              <span className="font-medium text-green-600">{job.salary}</span>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <div className="text-gray-700 whitespace-pre-line">
            {job.description}
          </div>
        </div>
      </div>
    </main>
  );
}
