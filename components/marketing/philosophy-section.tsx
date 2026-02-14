import { Sparkles, Smile, Heart } from "lucide-react";
import type { Pillar } from "@/lib/types";

const pillars: Pillar[] = [
  {
    icon: "sparkles",
    title: "Beauty",
    description:
      "External radiance that reflects internal health. A beauty that is natural, confident, and sustainable.",
  },
  {
    icon: "smile",
    title: "Happiness",
    description:
      "Emotional balance and genuine joy. The ability to spread positivity and mental well-being to others.",
  },
  {
    icon: "heart",
    title: "Wellness",
    description:
      "Physical strength, nutritional discipline, and a lifestyle committed to holistic living and longevity.",
  },
];

function PillarIcon({ icon }: { icon: string }): React.ReactElement {
  const className = "h-7 w-7 text-accent";
  switch (icon) {
    case "sparkles":
      return <Sparkles className={className} />;
    case "smile":
      return <Smile className={className} />;
    case "heart":
      return <Heart className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export function PhilosophySection(): React.ReactElement {
  return (
    <section className="bg-wellness-green px-4 py-20 md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 flex flex-col items-start justify-between gap-12 md:flex-row">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-bold tracking-widest text-accent uppercase">
              Our Philosophy
            </p>
            <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              The Wellness Ambassador
            </h2>
          </div>
          <div className="flex-1">
            <p className="border-l-2 border-accent pl-6 text-lg font-light leading-relaxed text-white/80">
              We are not just looking for a queen; we are searching for a woman
              who embodies the perfect balance of mind, body, and spirit. Someone
              who inspires others to live a healthier, happier life through her
              own example.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group rounded-xl border border-white/5 bg-wellness-card p-8 transition-all duration-300 hover:bg-[#124d36]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-accent/20">
                <PillarIcon icon={pillar.icon} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
