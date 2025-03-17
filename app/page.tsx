import JobList from "./jobs/page";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex gap-5 flex-wrap items-center justify-center ">
      <section className="w-5xl">
        <Hero />
        <JobList />
      </section>
    </main>
  );
}
