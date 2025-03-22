import { MessageSquare, Search, Clock, AlertTriangle } from "lucide-react";

const painPoints = [
  {
    icon: <MessageSquare className="h-8 w-8 text-white" />,
    title: "Scattered Information",
    description:
      "H1B job opportunities are spread across WhatsApp groups, Telegram channels, LinkedIn posts, and company websites.",
  },
  {
    icon: <Search className="h-8 w-8 text-white" />,
    title: "Time-Consuming Search",
    description:
      "Job seekers spend countless hours searching through multiple platforms to find relevant H1B opportunities.",
  },
  {
    icon: <Clock className="h-8 w-8 text-white" />,
    title: "Missed Opportunities",
    description:
      "With information scattered, many qualified candidates miss out on perfect job matches due to lack of visibility.",
  },
  {
    icon: <AlertTriangle className="h-8 w-8 text-white" />,
    title: "Verification Challenges",
    description:
      "It's difficult to verify which companies genuinely sponsor H1B visas without extensive research.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 md:py-32 bg-[#071428]/30">
      <div className="mx-auto max-w-[58rem] text-center mb-16">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-white">
          Are you having trouble finding H1B jobs?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {painPoints.map((point, index) => (
          <div
            key={index}
            className="bg-[#0a1729] p-6 rounded-lg border border-[#1a2b4b]"
          >
            <div className="flex items-center gap-4 mb-4">
              {point.icon}
              <h3 className="text-xl font-semibold text-white">
                {point.title}
              </h3>
            </div>
            <p className="text-gray-400">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
