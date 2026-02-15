import Link from "next/link";
import { listApplicants } from "./actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ApplicantStatusSelect } from "./applicant-status-select";

export default async function AdminPage(): Promise<React.ReactElement> {
  const { data: applicants, error } = await listApplicants();

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        {error}
      </div>
    );
  }

  const list = applicants ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">จัดการผู้สมัคร</h1>
        <Button asChild>
          <Link href="/admin/applicants/new">+ เพิ่มผู้สมัคร</Link>
        </Button>
      </div>

      {list.length === 0 ? (
        <p className="text-muted-foreground">ยังไม่มีผู้สมัคร</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="p-3 font-medium">ชื่อ (ไทย)</th>
                <th className="p-3 font-medium">ชื่อ (EN)</th>
                <th className="p-3 font-medium">จังหวัด</th>
                <th className="p-3 font-medium">สถานะ</th>
                <th className="p-3 font-medium">โหวต</th>
                <th className="p-3 font-medium text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => (
                <tr key={a.id} className="border-b last:border-0">
                  <td className="p-3">{a.name_th ?? "—"}</td>
                  <td className="p-3">{a.name_en ?? "—"}</td>
                  <td className="p-3">{a.address_province ?? "—"}</td>
                  <td className="p-3">
                    <ApplicantStatusSelect applicantId={a.id} currentStatus={a.status} />
                  </td>
                  <td className="p-3">{a.vote_count}</td>
                  <td className="p-3 text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/applicants/${a.id}`}>แก้ไข</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
