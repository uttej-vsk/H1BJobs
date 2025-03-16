import { Button } from "@/components/ui/button";
import Link from "next/link";
import JobList from "./jobs/page";
import Filters from "@/components/Filters";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <section>
        <Hero />
        <Filters />
        <JobList />
      </section>
    </main>
  );
}
