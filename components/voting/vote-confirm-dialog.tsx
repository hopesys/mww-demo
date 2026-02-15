"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Contestant } from "@/lib/types";

interface VoteConfirmDialogProps {
  contestant: Contestant | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  voteCredits: number;
  creditsRequired: number;
}

export function VoteConfirmDialog({
  contestant,
  open,
  onClose,
  onConfirm,
  voteCredits,
  creditsRequired,
}: VoteConfirmDialogProps): React.ReactElement {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canVote = voteCredits >= creditsRequired;

  async function handleConfirm(): Promise<void> {
    if (!contestant || !canVote) return;
    setError(null);
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "โหวตไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Vote</DialogTitle>
          <DialogDescription>
            {contestant ? (
              <>
                โหวตให้ <strong>{contestant.name}</strong> ({contestant.code}) ใช้{" "}
                <strong>{creditsRequired} credits</strong>
                {voteCredits >= 0 && (
                  <> — เครดิตคงเหลือ: {voteCredits}</>
                )}
              </>
            ) : (
              "Select a contestant to vote for."
            )}
          </DialogDescription>
        </DialogHeader>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!contestant || !canVote || loading}
            className="bg-accent font-bold text-white hover:bg-yellow-600"
          >
            {loading ? "กำลังโหวต…" : canVote ? "Confirm Vote" : "เครดิตไม่พอ"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
