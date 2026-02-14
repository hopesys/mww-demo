"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTop(): React.ReactElement | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const SCROLL_THRESHOLD = 400;

    function handleScroll(): void {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!visible) return null;

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="fixed right-6 bottom-6 z-50 h-12 w-12 rounded-full bg-primary shadow-lg transition-all hover:bg-primary/90 hover:-translate-y-1"
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
