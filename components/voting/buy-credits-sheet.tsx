"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface CreditPackage {
  id: string;
  credits: number;
  priceBaht: number;
  label?: string;
}

const DEFAULT_PACKAGES: CreditPackage[] = [
  { id: "p10", credits: 10, priceBaht: 99, label: "ยอดนิยม" },
  { id: "p50", credits: 50, priceBaht: 449 },
  { id: "p100", credits: 100, priceBaht: 799, label: "คุ้มสุด" },
];

interface BuyCreditsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packages?: CreditPackage[];
}

export function BuyCreditsSheet({
  open,
  onOpenChange,
  packages = DEFAULT_PACKAGES,
}: BuyCreditsSheetProps): React.ReactElement {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>ซื้อเครดิตโหวต</SheetTitle>
          <SheetDescription>
            เลือกแพ็กเกจแล้วชำระเงินผ่าน Omise (QR / บัตร) หลังชำระสำเร็จเครดิตจะเข้าให้อัตโนมัติ
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <div>
                <p className="font-bold">
                  {pkg.credits} credits
                  {pkg.label ? (
                    <span className="ml-2 text-xs font-normal text-accent">{pkg.label}</span>
                  ) : null}
                </p>
                <p className="text-lg font-bold text-primary">{pkg.priceBaht} บาท</p>
              </div>
              <Button
                size="sm"
                className="bg-primary font-bold text-white"
                disabled
                title="Omise integration coming soon"
              >
                ซื้อ
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          การเติมเครดิตใช้ Omise (Phase 2). ติดต่อทีมงานหากต้องการทดสอบการโหวต
        </p>
        <div className="mt-4 flex justify-center">
          <Link href="/voting/buy">
            <Button variant="outline" size="sm">
              หน้าเติมเครดิต
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
