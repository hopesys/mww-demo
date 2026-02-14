"use client";

import { ArrowLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { VisionEssayData } from "@/lib/schemas/application";

interface StepVisionEssayProps {
  data: VisionEssayData;
  onChange: (data: Record<string, unknown>) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Record<string, string>;
}

export function StepVisionEssay({
  data,
  onChange,
  onNext,
  onBack,
  errors,
}: StepVisionEssayProps): React.ReactElement {
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    onChange({ [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-accent/10 text-accent uppercase">
            Step 3
          </Badge>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Your Vision
          </span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Vision & Essay
        </h2>
        <p className="text-base text-primary/70 md:text-lg">
          Share your vision for promoting wellness on the global stage.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-primary/5 p-6">
        <h3 className="mb-2 text-lg font-bold text-primary">Essay Prompt</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          &ldquo;How would you use the Miss Wellness World platform to promote
          holistic wellness in your community and beyond? Describe your vision,
          the initiatives you would champion, and how you would inspire others
          to embrace a balanced lifestyle of beauty, happiness, and
          wellness.&rdquo;
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="essay">
          Your Essay <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="essay"
          name="essay"
          value={data.essay}
          onChange={handleChange}
          placeholder="Write your essay here..."
          rows={12}
          className="resize-y"
        />
        <div className="flex justify-between">
          {errors.essay && (
            <p className="text-sm text-destructive">{errors.essay}</p>
          )}
          <p className="ml-auto text-xs text-muted-foreground">
            {data.essay.length} / 5000 characters
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
        <Button variant="ghost" onClick={onBack} className="w-full gap-2 md:w-auto">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="w-full gap-2 bg-primary font-bold text-white shadow-lg hover:bg-primary/90 md:w-auto"
        >
          Next Step: Review & Submit
        </Button>
      </div>
    </div>
  );
}
