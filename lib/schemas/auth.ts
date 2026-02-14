import { z } from "zod/v4";

export const phoneSchema = z.object({
  phone: z.string().min(10, "Please enter a valid phone number").max(15),
});

export const emailSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits").regex(/^\d+$/, "OTP must be numeric"),
});

export type PhoneInput = z.infer<typeof phoneSchema>;
export type EmailInput = z.infer<typeof emailSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
