import { redirect } from "next/navigation";
import Link from "next/link";
import { createApplicant } from "../../actions";
import { ApplicantForm } from "../../applicant-form";
import { Button } from "@/components/ui/button";

export default function NewApplicantPage(): React.ReactElement {
  async function submit(formData: FormData): Promise<void> {
    "use server";
    const result = await createApplicant({
      name_th: (formData.get("name_th") as string) ?? "",
      name_en: (formData.get("name_en") as string) ?? "",
      photo_full_url: (formData.get("photo_full_url") as string) ?? "",
      address_province: (formData.get("address_province") as string) ?? "",
      status: (formData.get("status") as "draft" | "submitted" | "under_review" | "approved" | "rejected") ?? "draft",
    });
    if (result.error) {
      throw new Error(result.error);
    }
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin">← กลับ</Link>
        </Button>
        <h1 className="text-2xl font-bold">เพิ่มผู้สมัคร</h1>
      </div>
      <ApplicantForm
        action={submit}
        defaultValues={{
          name_th: "",
          name_en: "",
          photo_full_url: "",
          address_province: "",
          status: "draft",
        }}
        submitLabel="บันทึก"
      />
    </div>
  );
}
