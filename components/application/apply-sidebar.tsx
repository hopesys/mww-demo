"use client";

import { User, Leaf, Lightbulb, CheckCircle, Save, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { STEP_LABELS, type StepIndex } from "@/lib/schemas/application";

const stepIcons = [User, Leaf, Lightbulb, CheckCircle];

interface ApplySidebarProps {
  currentStep: StepIndex;
  completedSteps: boolean[];
  progress: number;
  onStepClick: (step: StepIndex) => void;
  onSaveDraft: () => void;
}

export function ApplySidebar({
  currentStep,
  completedSteps,
  progress,
  onStepClick,
  onSaveDraft,
}: ApplySidebarProps): React.ReactElement {
  return (
    <aside className="sticky top-0 z-10 flex h-auto w-full flex-col border-r border-border bg-card lg:h-screen lg:w-80">
      <div className="flex h-full flex-col justify-between p-6">
        <div className="flex flex-col gap-6">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shadow-md">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold leading-tight text-primary">
                Miss Wellness 2026
              </h1>
              <p className="text-xs font-medium text-muted-foreground">
                Application Portal
              </p>
            </div>
          </div>

          {/* Progress Stepper */}
          <nav className="mt-4 flex flex-col gap-2">
            {STEP_LABELS.map((label, index) => {
              const Icon = stepIcons[index];
              const isActive = currentStep === index;
              const isCompleted = completedSteps[index];

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => onStepClick(index as StepIndex)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border-l-4 px-3 py-3 transition-all text-left",
                    isActive
                      ? "border-primary bg-primary/10"
                      : "border-transparent hover:bg-secondary",
                    isCompleted && !isActive && "text-primary"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isActive
                        ? "text-primary"
                        : isCompleted
                          ? "text-primary"
                          : "text-muted-foreground"
                    )}
                  />
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-sm font-bold",
                        isActive ? "text-primary" : isCompleted ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {label}
                    </span>
                    {isActive && (
                      <span className="text-xs text-primary/70">
                        In Progress
                      </span>
                    )}
                    {isCompleted && !isActive && (
                      <span className="text-xs text-primary/70">Completed</span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col gap-4 lg:mt-0">
          <div className="flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/5 p-3">
            <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-accent">
                Completion Status
              </span>
              <span className="text-xs text-accent">
                Your application is {progress}% complete.
              </span>
              <div className="mt-2 h-1.5 w-full rounded-full bg-accent/20">
                <div
                  className="h-1.5 rounded-full bg-accent transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={onSaveDraft}
            className="w-full gap-2 border-primary text-primary hover:bg-primary/5"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
        </div>
      </div>
    </aside>
  );
}
