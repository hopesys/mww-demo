"use server";

import { createClient } from "@/lib/supabase/server";

const VOTE_AMOUNT = 1;

export type VoteResult =
  | { success: true; remainingCredits: number }
  | { success: false; error: string };

export async function getVoteCredits(): Promise<{ credits: number } | { error: string }> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "not_authenticated" };
  }

  const { data, error } = await supabase
    .from("users")
    .select("vote_credits")
    .eq("id", user.id)
    .single();

  if (error || data == null) {
    return { error: error?.message ?? "user_not_found" };
  }

  const credits = Number(data.vote_credits) ?? 0;
  return { credits };
}

export async function submitVote(applicantId: string): Promise<VoteResult> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "not_authenticated" };
  }

  const { data, error } = await supabase.rpc("vote_for_applicant", {
    p_user_id: user.id,
    p_applicant_id: applicantId,
    p_amount: VOTE_AMOUNT,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  const result = data as { success?: boolean; error?: string; remaining_credits?: number } | null;
  if (!result || result.success !== true) {
    return {
      success: false,
      error: (result?.error as string) ?? "vote_failed",
    };
  }

  return {
    success: true,
    remainingCredits: Number(result.remaining_credits) ?? 0,
  };
}

export { VOTE_AMOUNT };
