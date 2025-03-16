import JobListings from "@/components/JobListings";

/**
 * Jobs page that displays all job listings
 */
export default function JobsPage() {
  return (
    <main className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Job Listings</h1>
        <JobListings />
      </div>
    </main>
  );
}
