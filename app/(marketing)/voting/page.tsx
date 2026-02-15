"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ContestantVoteCard } from "@/components/voting/contestant-vote-card";
import { Leaderboard } from "@/components/voting/leaderboard";
import { VoteConfirmDialog } from "@/components/voting/vote-confirm-dialog";
import { BuyCreditsSheet } from "@/components/voting/buy-credits-sheet";
import { createClient } from "@/lib/supabase/client";
import { mapRowToContestant } from "@/lib/data/voting-contestants";
import { getVoteCredits, submitVote } from "./actions";
import { VOTE_AMOUNT } from "@/lib/constants/voting";
import type { Contestant } from "@/lib/types";
import { contestants as fallbackContestants } from "@/lib/data/contestants";

const SELECT_COLS = "id,name_th,photo_full_url,vote_count,address_province";

export default function VotingPage(): React.ReactElement {
  const router = useRouter();
  const [contestants, setContestants] = useState<Contestant[]>(fallbackContestants);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [buySheetOpen, setBuySheetOpen] = useState(false);
  const [voteCredits, setVoteCredits] = useState<number | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const selectedContestant = contestants.find((c) => c.id === selectedId) ?? null;

  const fetchContestants = useCallback(async () => {
    const supabase = createClient();
    const { data: rows, error } = await supabase
      .from("mww_applications")
      .select(SELECT_COLS)
      .order("vote_count", { ascending: false });

    if (error || !rows?.length) {
      return;
    }
    const list = (rows as Array<{
      id: string;
      name_th: string | null;
      photo_full_url: string | null;
      vote_count: number;
      address_province: string | null;
    }>).map((row, i) =>
      mapRowToContestant(
        {
          id: row.id,
          name_th: row.name_th,
          photo_full_url: row.photo_full_url,
          vote_count: row.vote_count,
          address_province: row.address_province,
        },
        i
      )
    );
    setContestants(list);
  }, []);

  const refreshCredits = useCallback(async () => {
    const result = await getVoteCredits();
    if ("credits" in result) {
      setVoteCredits(result.credits);
    } else {
      setVoteCredits(null);
    }
  }, []);

  useEffect(() => {
    fetchContestants();
  }, [fetchContestants]);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("mww_applications_votes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "mww_applications",
        },
        () => {
          fetchContestants();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchContestants]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setAuthChecked(true);
      if (user) {
        refreshCredits();
      } else {
        setVoteCredits(null);
      }
    });
  }, [refreshCredits]);

  const handleVoteClick = useCallback(
    (id: string) => {
      if (!authChecked) return;
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) {
          router.push("/login?redirect=/voting");
          return;
        }
        const credits = voteCredits ?? 0;
        if (credits < VOTE_AMOUNT) {
          setBuySheetOpen(true);
          return;
        }
        setSelectedId(id);
        setDialogOpen(true);
      });
    },
    [authChecked, voteCredits, router]
  );

  const handleConfirmVote = useCallback(async () => {
    if (!selectedId) return;
    const result = await submitVote(selectedId);
    if (result.success) {
      setVoteCredits(result.remainingCredits);
      setContestants((prev) =>
        prev.map((c) =>
          c.id === selectedId ? { ...c, votes: c.votes + VOTE_AMOUNT } : c
        )
      );
      setDialogOpen(false);
      setSelectedId(null);
    } else {
      throw new Error(result.error);
    }
  }, [selectedId]);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setSelectedId(null);
  }, []);

  return (
    <>
      <section className="bg-wellness-green px-4 py-16 text-center md:px-10">
        <div className="mx-auto max-w-3xl space-y-4">
          <p className="text-sm font-bold tracking-widest text-accent uppercase">
            People&apos;s Choice
          </p>
          <h1 className="text-4xl font-black text-white md:text-5xl">
            Vote for Your Favorite
          </h1>
          <p className="text-lg font-light text-white/80">
            Support your favorite contestant in Miss Wellness World Thailand 2026.
          </p>
          {authChecked && voteCredits === null && (
            <p className="text-sm text-white/90">
              ล็อกอินด้วย Google เพื่อโหวตหรือซื้อเครดิต —{" "}
              <a href="/login?redirect=/voting" className="font-semibold underline">
                Sign in with Google to Vote
              </a>
            </p>
          )}
          {voteCredits !== null && (
            <p className="text-sm font-semibold text-white">
              เครดิตของคุณ: {voteCredits} credits
              <button
                type="button"
                onClick={() => setBuySheetOpen(true)}
                className="ml-2 underline"
              >
                เติมเครดิต
              </button>
            </p>
          )}
        </div>
      </section>

      <section className="px-4 py-12 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Leaderboard contestants={contestants} />
              </div>
            </div>
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
        onClose={handleCloseDialog}
        onConfirm={handleConfirmVote}
        voteCredits={voteCredits ?? 0}
        creditsRequired={VOTE_AMOUNT}
      />

      <BuyCreditsSheet open={buySheetOpen} onOpenChange={setBuySheetOpen} />
    </>
  );
}
