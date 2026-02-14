"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { mainNavItems } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

export function Header(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary">
            Miss Wellness World
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button asChild className="bg-accent font-bold text-white hover:bg-yellow-600">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-primary">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div className="flex flex-col gap-6 pt-8">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-lg font-semibold transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-primary"
                      : "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-4 bg-accent font-bold text-white hover:bg-yellow-600"
              >
                <Link href="/apply" onClick={() => setOpen(false)}>
                  Apply Now
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
