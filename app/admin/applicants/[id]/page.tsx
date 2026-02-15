import { notFound } from "next/navigation";
import Link from "next/link";
import { getApplicant, updateApplicant, deleteApplicant } from "../../actions";
import { ApplicantForm } from "../../applicant-form";
import { Button } from "@/components/ui/button";

export default async function EditApplicantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
  const { id } = await params;
  const { data: applicant, error: getError } = await getApplicant(id);

  if (getError || !applicant) {
    notFound();
  }

  async function submit(formData: FormData): Promise<void> {
    "use server";
    const result = await updateApplicant(id, {
      name_th: (formData.get("name_th") as string) ?? "",
      name_en: (formData.get("name_en") as string) ?? "",
      photo_full_url: (formData.get("photo_full_url") as string) ?? "",
      address_province: (formData.get("address_province") as string) ?? "",
      status: (formData.get("status") as "draft" | "submitted" | "under_review" | "approved" | "rejected") ?? applicant.status,
    });
    if (result.error) throw new Error(result.error);
  }

  async function remove(): Promise<void> {
    "use server";
    const result = await deleteApplicant(id);
    if (result.error) throw new Error(result.error);
    const { redirect } = await import("next/navigation");
    redirect("/admin");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin">← กลับ</Link>
        </Button>
        <h1 className="text-2xl font-bold">แก้ไขผู้สมัคร</h1>
      </div>
      <ApplicantForm
        action={submit}
        defaultValues={{
          name_th: applicant.name_th ?? "",
          name_en: applicant.name_en ?? "",
          photo_full_url: applicant.photo_full_url ?? "",
          address_province: applicant.address_province ?? "",
          status: applicant.status,
        }}
        submitLabel="บันทึกการแก้ไข"
        deleteAction={remove}
      />
    </div>
  );
}
