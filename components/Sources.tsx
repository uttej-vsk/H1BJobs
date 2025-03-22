import { MessageSquare, Linkedin, Users, Building, Globe } from "lucide-react";

const sources = [
  {
    name: "Social Media Groups",
    description:
      "We aggregate H1B job posts from WhatsApp groups, Telegram channels, and Facebook communities.",
    icon: MessageSquare,
  },
  {
    name: "LinkedIn Posts",
    description:
      "Our system monitors LinkedIn for H1B job opportunities shared by recruiters and professionals.",
    icon: Linkedin,
  },
  {
    name: "Influencer Networks",
    description:
      "We partner with immigration influencers who share valuable H1B job opportunities.",
    icon: Users,
  },
  {
    name: "Company Career Pages",
    description:
      "We track H1B-friendly companies' career pages for new openings and sponsorship opportunities.",
    icon: Building,
  },
  {
    name: "Recruiter Submissions",
    description:
      "Recruiters can directly submit H1B sponsorship opportunities to our platform.",
    icon: Users,
  },
  {
    name: "Job Boards",
    description:
      "We scan specialized job boards for positions explicitly mentioning H1B sponsorship.",
    icon: Globe,
  },
];

export default function Sources() {
  return (
    <section className="container py-24 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-[58rem] text-center mb-16">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Our Data Sources
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          We're building the most comprehensive H1B job database by aggregating
          information from multiple sources
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((source) => (
          <div
            key={source.name}
            className="flex flex-col p-6 rounded-lg border bg-background"
          >
            <source.icon className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-medium text-lg mb-2">{source.name}</h3>
            <p className="text-muted-foreground">{source.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
