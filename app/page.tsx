import { Button } from "@/components/ui/button";
import Link from "next/link";
import JobList from "./jobs/page";
import Filters from "@/components/Filters";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <nav className="flex justify-end mx-5">
        <Button variant="secondary" className="bg-black text-white" asChild>
          <Link href="/post-job">Post a job</Link>
        </Button>
      </nav>
      <main className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <section>
          <div>
            <Hero />
            <Filters />
            <JobList />
          </div>
        </section>
      </main>
    </>
  );
}
