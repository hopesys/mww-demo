"use client";

import { ArrowLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { WellnessJourneyData } from "@/lib/schemas/application";

interface StepWellnessJourneyProps {
  data: WellnessJourneyData;
  onChange: (data: Record<string, unknown>) => void;
  onNext: () => void;
  onBack: () => void;
  errors: Record<string, string>;
}

export function StepWellnessJourney({
  data,
  onChange,
  onNext,
  onBack,
  errors,
}: StepWellnessJourneyProps): React.ReactElement {
  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    onChange({ [e.target.name]: e.target.value });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-accent/10 text-accent uppercase">
            Step 2
          </Badge>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Wellness Background
          </span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Wellness Journey
        </h2>
        <p className="text-base text-primary/70 md:text-lg">
          Tell us about your approach to wellness and healthy living.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="wellnessPhilosophy">
            Wellness Philosophy <span className="text-destructive">*</span>
          </Label>
          <p className="text-sm text-muted-foreground">
            Describe your personal wellness philosophy and what wellness means to you.
          </p>
          <Textarea
            id="wellnessPhilosophy"
            name="wellnessPhilosophy"
            value={data.wellnessPhilosophy}
            onChange={handleChange}
            placeholder="Share your wellness philosophy..."
            rows={5}
          />
          <div className="flex justify-between">
            {errors.wellnessPhilosophy && (
              <p className="text-sm text-destructive">{errors.wellnessPhilosophy}</p>
            )}
            <p className="ml-auto text-xs text-muted-foreground">
              {data.wellnessPhilosophy.length} / 2000
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fitnessRoutine">
            Fitness Routine <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="fitnessRoutine"
            name="fitnessRoutine"
            value={data.fitnessRoutine}
            onChange={handleChange}
            placeholder="Describe your fitness routine and activities..."
            rows={4}
          />
          <div className="flex justify-between">
            {errors.fitnessRoutine && (
              <p className="text-sm text-destructive">{errors.fitnessRoutine}</p>
            )}
            <p className="ml-auto text-xs text-muted-foreground">
              {data.fitnessRoutine.length} / 1000
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dietaryApproach">
            Dietary Approach <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="dietaryApproach"
            name="dietaryApproach"
            value={data.dietaryApproach}
            onChange={handleChange}
            placeholder="Describe your approach to nutrition and diet..."
            rows={4}
          />
          <div className="flex justify-between">
            {errors.dietaryApproach && (
              <p className="text-sm text-destructive">{errors.dietaryApproach}</p>
            )}
            <p className="ml-auto text-xs text-muted-foreground">
              {data.dietaryApproach.length} / 1000
            </p>
          </div>
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
          Next Step: Vision & Essay
        </Button>
      </div>
    </div>
  );
}
