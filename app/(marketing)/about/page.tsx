import type { Metadata } from "next";
import { Gem, Eye, Target } from "lucide-react";
import { TeamCard } from "@/components/about/team-card";
import { teamMembers } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Miss Wellness World, our mission, vision, and the team behind the global wellness movement.",
};

export default function AboutPage(): React.ReactElement {
  return (
    <>
      {/* Hero */}
      <section className="bg-wellness-green px-4 py-20 text-center md:px-10">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-sm font-bold tracking-widest text-accent uppercase">
            About Us
          </p>
          <h1 className="text-4xl font-black text-white md:text-5xl">
            Beauty with Wellness
          </h1>
          <p className="text-lg font-light leading-relaxed text-white/80">
            Miss Wellness World is an international pageant aiming to find women
            who can be role models for wellness across 30+ countries. A new
            compass pointing towards sustainable beauty and true happiness.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="px-4 py-20 md:px-10">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-primary">Vision</h2>
            <p className="leading-relaxed text-muted-foreground">
              Through a shared commitment to well-being, creativity, and
              collaboration, Miss Wellness World inspires a global movement that
              elevates personal health, nurtures resilient communities, and
              fosters sustainable impact for future generations.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-primary">Mission</h2>
            <p className="leading-relaxed text-muted-foreground">
              To discover, empower, and connect women globally who embody the
              highest values of wellness, innovation, and authentic leadership.
            </p>
          </div>
        </div>
      </section>

      {/* The Crown */}
      <section className="bg-secondary px-4 py-20 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-bold tracking-widest text-primary uppercase">
              The Symbol
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">The Crown</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                <Gem className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold">Emerald Green</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Represents Nature and Healing — reflecting the heart of
                  Wellness that connects humans with nature and self-restoration.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <Gem className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold">Pearl</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Represents Wisdom and Compassion — reflecting inner beauty, a
                  gentle spirit, and the intelligence of the titleholder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="px-4 py-20 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-bold tracking-widest text-primary uppercase">
              Leadership
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">Executive Team</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
