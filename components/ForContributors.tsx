import { Button } from "@/components/ui/button";
import { Share2, Users, TrendingUp, Award } from "lucide-react";

const benefits = [
  {
    title: "Expand Your Reach",
    description:
      "Share your H1B job opportunities with a targeted audience of qualified candidates.",
    icon: Share2,
  },
  {
    title: "Build Your Network",
    description:
      "Connect with H1B job seekers and other professionals in your industry.",
    icon: Users,
  },
  {
    title: "Increase Visibility",
    description:
      "Get recognition as a valuable contributor to the H1B community.",
    icon: TrendingUp,
  },
  {
    title: "Make an Impact",
    description:
      "Help talented professionals find opportunities that match their skills and visa requirements.",
    icon: Award,
  },
];

export default function ForContributors() {
  return (
    <section className="container py-24 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-4xl mb-6">
            For Recruiters, Influencers & Companies
          </h2>
          <p className="text-muted-foreground sm:text-lg mb-8">
            Help connect talented H1B professionals with the right
            opportunities. Share job openings, provide insights, and make a
            difference in someone's career journey.
          </p>
          <Button size="lg" className="mb-4">
            Become a Contributor
          </Button>
          <p className="text-sm text-muted-foreground">
            Join our network of recruiters, immigration influencers, and
            H1B-friendly companies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-background p-6 rounded-lg border">
              <benefit.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-medium text-lg mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
