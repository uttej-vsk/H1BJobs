import JobListings from "@/components/JobListings";

/**
 * Jobs page that displays all job listings
 */
export default function JobsPage() {
  return (
    <main className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <JobListings />
      </div>
    </main>
  );
}
