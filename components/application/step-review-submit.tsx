"use client";

import { ArrowLeft, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ApplicationFormData } from "@/lib/schemas/application";

interface StepReviewSubmitProps {
  data: ApplicationFormData;
  onBack: () => void;
  onSubmit: () => void;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  onToggleTerms: () => void;
  onTogglePrivacy: () => void;
  submitted: boolean;
}

export function StepReviewSubmit({
  data,
  onBack,
  onSubmit,
  agreeTerms,
  agreePrivacy,
  onToggleTerms,
  onTogglePrivacy,
  submitted,
}: StepReviewSubmitProps): React.ReactElement {
  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-6 py-20 text-center">
        <CheckCircle className="h-20 w-20 text-primary" />
        <h2 className="text-3xl font-extrabold text-primary">
          Application Submitted!
        </h2>
        <p className="max-w-md text-muted-foreground">
          Thank you for applying to Miss Wellness World 2026. We will review
          your application and get back to you soon.
        </p>
      </div>
    );
  }

  const { personalProfile, wellnessJourney, visionEssay } = data;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-accent/10 text-accent uppercase">
            Step 4
          </Badge>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Final Review
          </span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Review & Submit
        </h2>
        <p className="text-base text-primary/70 md:text-lg">
          Review your application before submitting.
        </p>
      </div>

      {/* Personal Profile Summary */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold">Personal Profile</h3>
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <span className="text-muted-foreground">Name:</span>{" "}
            <span className="font-medium">
              {personalProfile.firstName} {personalProfile.lastName}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">DOB:</span>{" "}
            <span className="font-medium">{personalProfile.dateOfBirth}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Phone:</span>{" "}
            <span className="font-medium">{personalProfile.phone}</span>
          </div>
          {personalProfile.city && (
            <div>
              <span className="text-muted-foreground">Location:</span>{" "}
              <span className="font-medium">
                {personalProfile.city}, {personalProfile.state}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Wellness Journey Summary */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold">Wellness Journey</h3>
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium text-muted-foreground">
              Philosophy:
            </span>
            <p className="mt-1 line-clamp-3">
              {wellnessJourney.wellnessPhilosophy || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Essay Summary */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold">Vision & Essay</h3>
        <p className="line-clamp-4 text-sm">
          {visionEssay.essay || "Not provided"}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {visionEssay.essay.length} characters
        </p>
      </div>

      <Separator />

      {/* Agreement Checkboxes */}
      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={onToggleTerms}
            className="mt-1 h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-sm">
            I agree to the{" "}
            <span className="font-medium text-primary underline">
              Terms & Conditions
            </span>{" "}
            of Miss Wellness World 2026.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreePrivacy}
            onChange={onTogglePrivacy}
            className="mt-1 h-4 w-4 rounded border-border accent-primary"
          />
          <span className="text-sm">
            I accept the{" "}
            <span className="font-medium text-primary underline">
              Privacy Policy
            </span>{" "}
            and consent to data processing.
          </span>
        </label>
      </div>

      <div className="mt-4 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
        <Button variant="ghost" onClick={onBack} className="w-full gap-2 md:w-auto">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!agreeTerms || !agreePrivacy}
          className="w-full gap-2 bg-primary font-bold text-white shadow-lg hover:bg-primary/90 disabled:opacity-50 md:w-auto"
        >
          <Send className="h-4 w-4" />
          Submit Application
        </Button>
      </div>
    </div>
  );
}
