"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export interface EmailOtpFormProps {
  onSendOtp: (email: string) => Promise<{ error?: string }>;
  onVerifyOtp: (email: string, otp: string) => Promise<{ error?: string }>;
}

export function EmailOtpForm({ onSendOtp, onVerifyOtp }: EmailOtpFormProps): React.ReactElement {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSendOtp(): Promise<void> {
    if (!email.includes("@")) return;
    setError(null);
    setLoading(true);
    const result = await onSendOtp(email);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setOtpSent(true);
  }

  async function handleVerify(): Promise<void> {
    if (otp.length !== 6) return;
    setError(null);
    setLoading(true);
    const result = await onVerifyOtp(email, otp);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    // Parent handles redirect after success
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email-login">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email-login"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="pl-10"
          />
        </div>
      </div>

      {error ? (
        <p className="text-center text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {!otpSent ? (
        <Button
          onClick={handleSendOtp}
          disabled={!email.includes("@") || loading}
          className="w-full bg-primary font-bold text-white"
        >
          {loading ? "Sending…" : "Send OTP"}
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-otp">
              กรอกรหัส 6 หลักที่ส่งไปยัง {email || "[อีเมล]"}
            </Label>
            <Input
              id="email-otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              className="text-center text-2xl tracking-[0.5em]"
              maxLength={6}
            />
          </div>
          <Button
            onClick={handleVerify}
            disabled={otp.length !== 6 || loading}
            className="w-full bg-primary font-bold text-white"
          >
            {loading ? "Verifying…" : "Verify & Sign In"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Didn&apos;t receive code?{" "}
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="font-medium text-primary underline"
            >
              Resend
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
