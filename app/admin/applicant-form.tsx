"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ApplicantStatus } from "./actions";

const STATUS_OPTIONS: { value: ApplicantStatus; label: string }[] = [
  { value: "draft", label: "แบบร่าง" },
  { value: "submitted", label: "ส่งแล้ว" },
  { value: "under_review", label: "กำลังตรวจ" },
  { value: "approved", label: "อนุมัติ" },
  { value: "rejected", label: "ปฏิเสธ" },
];

type DefaultValues = {
  name_th: string;
  name_en: string;
  photo_full_url: string;
  address_province: string;
  status: ApplicantStatus;
};

export function ApplicantForm({
  action,
  defaultValues,
  submitLabel = "บันทึก",
  deleteAction,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues: DefaultValues;
  submitLabel?: string;
  deleteAction?: () => Promise<void>;
}): React.ReactElement {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      await action(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setPending(false);
    }
  }

  async function handleDelete(): Promise<void> {
    if (!deleteAction) return;
    if (!confirm("ต้องการลบผู้สมัครนี้?")) return;
    setError(null);
    setPending(true);
    try {
      await deleteAction();
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name_th">ชื่อ (ไทย)</Label>
        <Input
          id="name_th"
          name="name_th"
          defaultValue={defaultValues.name_th}
          placeholder="ชื่อภาษาไทย"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name_en">ชื่อ (EN)</Label>
        <Input
          id="name_en"
          name="name_en"
          defaultValue={defaultValues.name_en}
          placeholder="English name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="photo_full_url">URL รูป</Label>
        <Input
          id="photo_full_url"
          name="photo_full_url"
          type="url"
          defaultValue={defaultValues.photo_full_url}
          placeholder="https://..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address_province">จังหวัด</Label>
        <Input
          id="address_province"
          name="address_province"
          defaultValue={defaultValues.address_province}
          placeholder="จังหวัด"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">สถานะ</Label>
        <select
          id="status"
          name="status"
          defaultValue={defaultValues.status}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "กำลังบันทึก…" : submitLabel}
        </Button>
        {deleteAction && (
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={pending}>
            ลบ
          </Button>
        )}
      </div>
    </form>
  );
}
