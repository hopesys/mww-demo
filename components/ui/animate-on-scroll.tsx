"use client";

import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in-up" | "fade-in-left";
  delay?: "200" | "400" | "600";
}

export function AnimateOnScroll({
  children,
  className,
  animation = "fade-in-up",
  delay,
}: AnimateOnScrollProps): React.ReactElement {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0",
        isInView && `animate-${animation}`,
        isInView && delay && `animation-delay-${delay}`,
        className
      )}
    >
      {children}
    </div>
  );
}
