"use client";

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
  onConfirm: () => void;
}

export function VoteConfirmDialog({
  contestant,
  open,
  onClose,
  onConfirm,
}: VoteConfirmDialogProps): React.ReactElement {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Vote</DialogTitle>
          <DialogDescription>
            {contestant
              ? `Are you sure you want to vote for ${contestant.name} (${contestant.code})?`
              : "Select a contestant to vote for."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-accent font-bold text-white hover:bg-yellow-600"
          >
            Confirm Vote
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
