"use client";

import { useState, useMemo, useCallback } from "react";
import type { Metadata } from "next";
import { ContestantVoteCard } from "@/components/voting/contestant-vote-card";
import { Leaderboard } from "@/components/voting/leaderboard";
import { VoteConfirmDialog } from "@/components/voting/vote-confirm-dialog";
import { contestants as initialContestants } from "@/lib/data/contestants";
import type { Contestant } from "@/lib/types";

export default function VotingPage(): React.ReactElement {
  const [contestants, setContestants] = useState(initialContestants);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const selectedContestant = useMemo(
    () => contestants.find((c) => c.id === selectedId) ?? null,
    [contestants, selectedId]
  );

  const handleVoteClick = useCallback((id: string): void => {
    setSelectedId(id);
    setDialogOpen(true);
  }, []);

  const handleConfirm = useCallback((): void => {
    if (selectedId) {
      setContestants((prev) =>
        prev.map((c) =>
          c.id === selectedId ? { ...c, votes: c.votes + 1 } : c
        )
      );
    }
    setDialogOpen(false);
    setSelectedId(null);
  }, [selectedId]);

  const handleClose = useCallback((): void => {
    setDialogOpen(false);
    setSelectedId(null);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-wellness-green px-4 py-16 text-center md:px-10">
        <div className="mx-auto max-w-3xl space-y-4">
          <p className="text-sm font-bold tracking-widest text-accent uppercase">
            People&apos;s Choice
          </p>
          <h1 className="text-4xl font-black text-white md:text-5xl">
            Vote for Your Favorite
          </h1>
          <p className="text-lg font-light text-white/80">
            Support your favorite contestant in Miss Wellness World Thailand
            2026.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Leaderboard */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Leaderboard contestants={contestants} />
              </div>
            </div>

            {/* Contestant Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  All Contestants ({contestants.length})
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {contestants.map((contestant) => (
                  <ContestantVoteCard
                    key={contestant.id}
                    contestant={contestant}
                    onVote={handleVoteClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <VoteConfirmDialog
        contestant={selectedContestant}
        open={dialogOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
