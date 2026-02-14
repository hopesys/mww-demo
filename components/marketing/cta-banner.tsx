import Link from "next/link";
import { Button } from "@/components/ui/button";

const CTA_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD4bIK2MeSWizrg5-TbeA6DuVWDsaaWzd7CL5gx4svKK-rJleJGFEuuMBthVtbqP75_HtfiT2-TkFI_RmOXvFfZnJRY2NpfbVnRCWvCVSO22jvVnJe-Psh9Pt9QfdrT3qv9sEQllnNvbvD33DVR61K0e2BX6VaKiA3t6_e_--cFK-dIJWyuCkfWaq2JSsRftrXmUxxltCK18Y3I5eZ47TgefCj-qilXB2a6xBwa-rmrPeMvUS_OVAHPwVC2rd_4dAlneq2ohB93MXI";

export function CtaBanner(): React.ReactElement {
  return (
    <section className="bg-secondary px-4 py-16">
      <div className="mx-auto flex max-w-[960px] flex-col overflow-hidden rounded-2xl bg-card shadow-xl md:flex-row">
        <div
          className="h-64 bg-cover bg-center md:h-auto md:w-1/2"
          style={{ backgroundImage: `url("${CTA_IMAGE_URL}")` }}
          role="img"
          aria-label="Close up of a golden crown on a silk pillow"
        />
        <div className="flex flex-col items-start justify-center p-10 md:w-1/2">
          <h2 className="mb-4 text-3xl font-bold text-primary">
            Ready to Inspire?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join the movement. Become the next face of holistic wellness and
            represent your country on the global stage.
          </p>
          <Button
            asChild
            className="w-full bg-primary font-bold text-white hover:bg-[#08422e] md:w-auto"
          >
            <Link href="/apply">Start Application</Link>
          </Button>
          <p className="mt-4 text-xs text-muted-foreground/60">
            Applications close August 31st, 2026
          </p>
        </div>
      </div>
    </section>
  );
}
