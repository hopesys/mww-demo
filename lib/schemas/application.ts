import { z } from "zod/v4";

export const personalProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
});

export const wellnessJourneySchema = z.object({
  wellnessPhilosophy: z
    .string()
    .min(50, "Please write at least 50 characters")
    .max(2000),
  fitnessRoutine: z.string().min(20, "Please describe your fitness routine").max(1000),
  dietaryApproach: z.string().min(20, "Please describe your dietary approach").max(1000),
});

export const visionEssaySchema = z.object({
  essay: z
    .string()
    .min(200, "Essay must be at least 200 characters")
    .max(5000, "Essay must not exceed 5000 characters"),
});

export const reviewSubmitSchema = z.object({
  agreeTerms: z.literal(true, "You must agree to the terms"),
  agreePrivacy: z.literal(true, "You must accept the privacy policy"),
});

export type PersonalProfileData = z.infer<typeof personalProfileSchema>;
export type WellnessJourneyData = z.infer<typeof wellnessJourneySchema>;
export type VisionEssayData = z.infer<typeof visionEssaySchema>;
export type ReviewSubmitData = z.infer<typeof reviewSubmitSchema>;

export interface ApplicationFormData {
  personalProfile: PersonalProfileData;
  wellnessJourney: WellnessJourneyData;
  visionEssay: VisionEssayData;
  reviewSubmit: ReviewSubmitData;
}

export const STEP_LABELS = [
  "Personal Profile",
  "Wellness Journey",
  "Vision & Essay",
  "Review & Submit",
] as const;

export type StepIndex = 0 | 1 | 2 | 3;
