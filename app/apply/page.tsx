"use client";

import { useState, useCallback } from "react";
import { ApplySidebar } from "@/components/application/apply-sidebar";
import { MobileProgressHeader } from "@/components/application/mobile-progress-header";
import { StepPersonalProfile } from "@/components/application/step-personal-profile";
import { StepWellnessJourney } from "@/components/application/step-wellness-journey";
import { StepVisionEssay } from "@/components/application/step-vision-essay";
import { StepReviewSubmit } from "@/components/application/step-review-submit";
import { useApplicationForm } from "@/lib/hooks/use-application-form";
import {
  personalProfileSchema,
  wellnessJourneySchema,
  visionEssaySchema,
} from "@/lib/schemas/application";
import type { StepIndex } from "@/lib/schemas/application";

export default function ApplyPage(): React.ReactElement {
  const { state, setStep, updateData, markCompleted, saveDraft, progress } =
    useApplicationForm();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const validateAndNext = useCallback(
    (currentStep: StepIndex): void => {
      setErrors({});
      let result;
      switch (currentStep) {
        case 0:
          result = personalProfileSchema.safeParse(state.data.personalProfile);
          break;
        case 1:
          result = wellnessJourneySchema.safeParse(state.data.wellnessJourney);
          break;
        case 2:
          result = visionEssaySchema.safeParse(state.data.visionEssay);
          break;
        default:
          return;
      }

      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const field = issue.path[0];
          if (typeof field === "string") {
            fieldErrors[field] = issue.message;
          }
        }
        setErrors(fieldErrors);
        return;
      }

      markCompleted(currentStep);
      saveDraft();
      setStep((currentStep + 1) as StepIndex);
    },
    [state.data, markCompleted, saveDraft, setStep]
  );

  const goBack = useCallback((): void => {
    if (state.currentStep > 0) {
      setErrors({});
      setStep((state.currentStep - 1) as StepIndex);
    }
  }, [state.currentStep, setStep]);

  const handleSubmit = useCallback((): void => {
    markCompleted(3);
    setSubmitted(true);
    try {
      localStorage.removeItem("mww-application-draft");
    } catch {
      // Ignore
    }
  }, [markCompleted]);

  return (
    <>
      <ApplySidebar
        currentStep={state.currentStep}
        completedSteps={state.completedSteps}
        progress={progress}
        onStepClick={setStep}
        onSaveDraft={saveDraft}
      />

      <main className="flex flex-1 flex-col overflow-y-auto bg-background">
        <MobileProgressHeader
          currentStep={state.currentStep}
          progress={progress}
        />
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
          {state.currentStep === 0 && (
            <StepPersonalProfile
              data={state.data.personalProfile}
              onChange={(d) => updateData("personalProfile", d)}
              onNext={() => validateAndNext(0)}
              errors={errors}
            />
          )}
          {state.currentStep === 1 && (
            <StepWellnessJourney
              data={state.data.wellnessJourney}
              onChange={(d) => updateData("wellnessJourney", d)}
              onNext={() => validateAndNext(1)}
              onBack={goBack}
              errors={errors}
            />
          )}
          {state.currentStep === 2 && (
            <StepVisionEssay
              data={state.data.visionEssay}
              onChange={(d) => updateData("visionEssay", d)}
              onNext={() => validateAndNext(2)}
              onBack={goBack}
              errors={errors}
            />
          )}
          {state.currentStep === 3 && (
            <StepReviewSubmit
              data={state.data}
              onBack={goBack}
              onSubmit={handleSubmit}
              agreeTerms={agreeTerms}
              agreePrivacy={agreePrivacy}
              onToggleTerms={() => setAgreeTerms((v) => !v)}
              onTogglePrivacy={() => setAgreePrivacy((v) => !v)}
              submitted={submitted}
            />
          )}
        </div>
      </main>
    </>
  );
}
