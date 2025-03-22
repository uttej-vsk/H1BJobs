import JobListings from "@/components/JobListings";
import JobListHero from "@/components/JobsListHero";

/**
 * Jobs page that displays all job listings
 */
export default function JobsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background gradient elements */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050e1d] via-[#071428] to-[#050e1d]" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Content container */}
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="relative z-10 flex flex-col gap-8 py-16">
          <JobListings />
        </div>
      </div>
    </main>
  );
}
