import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VotingBuyPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">เติมเครดิตโหวต</h1>
      <p className="mt-4 text-muted-foreground">
        การชำระเงินผ่าน Omise (QR / บัตร) อยู่ใน Phase 2. ติดต่อทีมงานเพื่อทดสอบการโหวตหรือเติมเครดิตทดสอบ
      </p>
      <div className="mt-8">
        <Link href="/voting">
          <Button variant="outline">กลับหน้าโหวต</Button>
        </Link>
      </div>
    </div>
  );
}
