import { Trophy } from "lucide-react";
import type { Contestant } from "@/lib/types";

interface LeaderboardProps {
  contestants: Contestant[];
}

export function Leaderboard({ contestants }: LeaderboardProps): React.ReactElement {
  const TOP_COUNT = 5;
  const sorted = [...contestants].sort((a, b) => b.votes - a.votes).slice(0, TOP_COUNT);

  const rankColors = [
    "text-yellow-500",
    "text-gray-400",
    "text-amber-700",
    "text-muted-foreground",
    "text-muted-foreground",
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-accent" />
        <h2 className="text-lg font-bold">Leaderboard</h2>
      </div>
      <div className="space-y-3">
        {sorted.map((contestant, index) => (
          <div
            key={contestant.id}
            className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-secondary"
          >
            <span
              className={`text-2xl font-black ${rankColors[index]}`}
            >
              {index + 1}
            </span>
            <div className="flex-1">
              <p className="font-semibold">{contestant.name}</p>
              <p className="text-xs text-muted-foreground">
                {contestant.code} &middot; {contestant.province}
              </p>
            </div>
            <span className="font-bold text-primary">
              {contestant.votes.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
