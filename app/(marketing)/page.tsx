import { HeroSection } from "@/components/marketing/hero-section";
import { PhilosophySection } from "@/components/marketing/philosophy-section";
import { PastWinnersSection } from "@/components/marketing/past-winners-section";
import { CtaBanner } from "@/components/marketing/cta-banner";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}): Promise<React.ReactElement> {
  const params = await searchParams;
  const showAdminRequired = params.error === "admin_required";

  return (
    <>
      {showAdminRequired && (
        <div className="bg-muted border-b px-4 py-3 text-center text-sm">
          <p className="font-medium text-foreground">คุณไม่มีสิทธิ์เข้าหน้า Admin</p>
          <p className="mt-1 text-muted-foreground">
            ถ้าคุณเป็น Admin ให้ออกจากระบบแล้วล็อกอินใหม่ด้วย{" "}
            <strong>admin@example.com</strong> / <strong>P@ssw0rd</strong>
            {" "}หรือรัน{" "}
            <code className="rounded bg-muted-foreground/10 px-1 py-0.5 text-xs">bun run create-admin</code>
            {" "}เพื่อสร้าง/อัปเดตบัญชี Admin
          </p>
          <a
            href="/login?redirect=/admin"
            className="mt-2 inline-block rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            ไปหน้า Login
          </a>
        </div>
      )}
      <HeroSection />
      <PhilosophySection />
      <PastWinnersSection />
      <CtaBanner />
    </>
  );
}
