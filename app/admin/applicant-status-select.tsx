"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateApplicantStatus } from "./actions";
import type { ApplicantStatus } from "./actions";

const STATUS_LABELS: Record<ApplicantStatus, string> = {
  draft: "แบบร่าง",
  submitted: "ส่งแล้ว",
  under_review: "กำลังตรวจ",
  approved: "อนุมัติ",
  rejected: "ปฏิเสธ",
};

const STATUS_OPTIONS: ApplicantStatus[] = [
  "draft",
  "submitted",
  "under_review",
  "approved",
  "rejected",
];

export function ApplicantStatusSelect({
  applicantId,
  currentStatus,
}: {
  applicantId: string;
  currentStatus: ApplicantStatus;
}): React.ReactElement {
  const [isPending, startTransition] = useTransition();

  function onValueChange(value: string): void {
    const status = value as ApplicantStatus;
    if (!STATUS_OPTIONS.includes(status)) return;
    startTransition(async () => {
      await updateApplicantStatus(applicantId, status);
    });
  }

  return (
    <Select
      value={currentStatus}
      onValueChange={onValueChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="สถานะ" />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((s) => (
          <SelectItem key={s} value={s}>
            {STATUS_LABELS[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
