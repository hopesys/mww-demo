"use client";

import type { StepIndex } from "@/lib/schemas/application";

interface MobileProgressHeaderProps {
  currentStep: StepIndex;
  progress: number;
}

export function MobileProgressHeader({
  currentStep,
  progress,
}: MobileProgressHeaderProps): React.ReactElement {
  const TOTAL_STEPS = 4;

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card p-4 lg:hidden">
      <span className="font-bold text-primary">
        Step {currentStep + 1} of {TOTAL_STEPS}
      </span>
      <div className="h-2 w-24 overflow-hidden rounded-full bg-accent/20">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
