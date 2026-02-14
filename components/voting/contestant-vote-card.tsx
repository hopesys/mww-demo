"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Contestant } from "@/lib/types";

interface ContestantVoteCardProps {
  contestant: Contestant;
  onVote: (id: string) => void;
}

export function ContestantVoteCard({
  contestant,
  onVote,
}: ContestantVoteCardProps): React.ReactElement {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <Image
          src={contestant.imageUrl}
          alt={`${contestant.name} - ${contestant.code}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <Badge className="absolute top-3 left-3 bg-primary font-bold text-white">
          {contestant.code}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-bold">{contestant.name}</h3>
        <p className="text-sm text-muted-foreground">{contestant.province}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Heart className="h-4 w-4 text-pink-500" />
            {contestant.votes.toLocaleString()}
          </span>
          <Button
            size="sm"
            onClick={() => onVote(contestant.id)}
            className="bg-accent font-bold text-white hover:bg-yellow-600"
          >
            Vote
          </Button>
        </div>
      </div>
    </div>
  );
}
