"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";

export type ApplicantStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected";

export type ApplicantRow = {
  id: string;
  name_th: string | null;
  name_en: string | null;
  photo_full_url: string | null;
  vote_count: number;
  address_province: string | null;
  status: ApplicantStatus;
  user_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ApplicantFormData = {
  name_th: string;
  name_en: string;
  photo_full_url: string;
  address_province: string;
  status: ApplicantStatus;
};

async function ensureAdmin(): Promise<ReturnType<typeof createClient>> {
  const role = await getCurrentUserRole();
  if (role !== "admin") {
    throw new Error("forbidden");
  }
  return createClient();
}

export async function listApplicants(): Promise<{
  data: ApplicantRow[] | null;
  error: string | null;
}> {
  try {
    await ensureAdmin();
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("mww_applications")
      .select("id,name_th,name_en,photo_full_url,vote_count,address_province,status,user_id,created_at,updated_at")
      .order("created_at", { ascending: false });

    if (error) return { data: null, error: error.message };
    return { data: (data ?? []) as ApplicantRow[], error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "list_failed";
    return { data: null, error: msg };
  }
}

export async function createApplicant(
  form: ApplicantFormData
): Promise<{ data: ApplicantRow | null; error: string | null }> {
  try {
    const supabase = await ensureAdmin();
    const { data, error } = await supabase
      .from("mww_applications")
      .insert({
        name_th: form.name_th.trim() || null,
        name_en: form.name_en.trim() || null,
        photo_full_url: form.photo_full_url.trim() || null,
        address_province: form.address_province.trim() || null,
        status: form.status,
        vote_count: 0,
      })
      .select("id,name_th,name_en,photo_full_url,vote_count,address_province,status,user_id,created_at,updated_at")
      .single();

    if (error) return { data: null, error: error.message };
    revalidatePath("/admin");
    revalidatePath("/voting");
    return { data: data as ApplicantRow, error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "create_failed";
    return { data: null, error: msg };
  }
}

export async function updateApplicant(
  id: string,
  form: ApplicantFormData
): Promise<{ error: string | null }> {
  try {
    const supabase = await ensureAdmin();
    const { error } = await supabase
      .from("mww_applications")
      .update({
        name_th: form.name_th.trim() || null,
        name_en: form.name_en.trim() || null,
        photo_full_url: form.photo_full_url.trim() || null,
        address_province: form.address_province.trim() || null,
        status: form.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) return { error: error.message };
    revalidatePath("/admin");
    revalidatePath("/admin/applicants/" + id);
    revalidatePath("/voting");
    return { error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "update_failed";
    return { error: msg };
  }
}

export async function updateApplicantStatus(
  id: string,
  status: ApplicantStatus
): Promise<{ error: string | null }> {
  try {
    const supabase = await ensureAdmin();
    const { error } = await supabase
      .from("mww_applications")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) return { error: error.message };
    revalidatePath("/admin");
    revalidatePath("/admin/applicants/" + id);
    return { error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "update_failed";
    return { error: msg };
  }
}

export async function deleteApplicant(id: string): Promise<{ error: string | null }> {
  try {
    const supabase = await ensureAdmin();
    const { error } = await supabase.from("mww_applications").delete().eq("id", id);

    if (error) return { error: error.message };
    revalidatePath("/admin");
    revalidatePath("/voting");
    return { error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "delete_failed";
    return { error: msg };
  }
}

export async function getApplicant(
  id: string
): Promise<{ data: ApplicantRow | null; error: string | null }> {
  try {
    await ensureAdmin();
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("mww_applications")
      .select("id,name_th,name_en,photo_full_url,vote_count,address_province,status,user_id,created_at,updated_at")
      .eq("id", id)
      .single();

    if (error || !data) return { data: null, error: error?.message ?? "not_found" };
    return { data: data as ApplicantRow, error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "get_failed";
    return { data: null, error: msg };
  }
}
