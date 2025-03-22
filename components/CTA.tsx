import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="border-t border-[#1a2b4b]">
      <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-white">
          Ready to transform your H1B job search?
        </h2>
        <p className="max-w-[42rem] leading-normal text-gray-400 sm:text-xl sm:leading-8">
          Join H1BHub today and gain access to the most comprehensive database
          of H1B job opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button
            size="lg"
            className="bg-white text-[#050e1d] hover:bg-gray-200"
          >
            Join as Job Seeker
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#1a2b4b] text-white hover:bg-[#1a2b4b]"
          >
            Share Job Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
}
