import { Button } from "@/components/ui/button";
import { ArrowUpRight, Filter, Globe2, ShieldCheck } from "lucide-react";

const features = [
  {
    name: "Centralized Platform",
    description:
      "All H1B job postings in one place, eliminating the need for scattered searches.",
    icon: Globe2,
  },
  {
    name: "Advanced Filtering",
    description:
      "Filter jobs by location, role, experience level, and specific visa requirements.",
    icon: Filter,
  },
  {
    name: "Verified Listings",
    description:
      "All postings are verified to ensure they come from companies with a history of visa sponsorship.",
    icon: ShieldCheck,
  },
  {
    name: "Direct Applications",
    description:
      "Apply directly to positions or get redirected to the original posting source.",
    icon: ArrowUpRight,
  },
];

export default function Solution() {
  return (
    <section className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-white">
          Our Solution
        </h2>
        <p className="mt-4 text-gray-400 sm:text-lg">
          H1BHub brings together all H1B job opportunities in one place, making
          the search process simpler and more efficient.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="relative overflow-hidden rounded-lg border border-[#1a2b4b] bg-[#0a1729] p-8"
          >
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8 text-white" />
              <h3 className="text-xl font-semibold text-white">
                {feature.name}
              </h3>
            </div>
            <p className="mt-2 text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button size="lg" className="bg-white text-[#050e1d] hover:bg-gray-200">
          Explore How It Works
        </Button>
      </div>
    </section>
  );
}
