import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HERO_BG_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA6Y3lJ4vNqTh3j3Jp-foo-0tCNW2YDE2aeQVw9Xc6SMi6oWmZYwACFApEkuvCdsmh6eZ3cwXJ5_rHI0Ca1xqCGNNfDFB_fzX8X_V7X-sizILWsStU5l01ApyqLAGXyDr97RCwOKokfTkpNAQpiLjv0YRUVm5v6xdVkR9lZaTGxGC1X_A3SIj3q6abdJh56qmmZADt5XGnINNGn21mdq5VRdjGj8Z-4OxEbdFivlx0Q4ATilpL7q1BomFZKZ0G3ESiq6P7IAB2IRU8";

export function HeroSection(): React.ReactElement {
  return (
    <section className="relative w-full">
      <div
        className="relative flex h-[600px] w-full items-center justify-center bg-cover bg-center bg-no-repeat md:h-[700px]"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 82, 57, 0.3) 0%, rgba(10, 82, 57, 0.6) 100%), url("${HERO_BG_URL}")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-wellness-green/90 via-wellness-green/20 to-transparent" />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center space-y-8 px-4 text-center">
          <div className="animate-fade-in-up space-y-4">
            <Badge
              variant="outline"
              className="border-accent/40 bg-accent/20 text-sm font-bold tracking-wider text-yellow-300 uppercase"
            >
              Applications Open
            </Badge>
            <h1 className="text-5xl font-black leading-tight tracking-[-0.02em] text-white md:text-7xl">
              Beauty with Wellness
              <br />
              <span className="font-thai text-4xl font-normal text-accent md:text-6xl">
                สวยสร้างสุข
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white/90 md:text-xl">
              The Official Stage for Miss Wellness World 2026.{" "}
              <br className="hidden md:block" />
              Redefining beauty through holistic health and inner balance.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="animate-fade-in-up animation-delay-200 h-14 rounded-full bg-accent px-8 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-yellow-600 hover:shadow-accent/50 md:text-lg"
          >
            <Link href="/apply">Apply for 2026</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
