"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export interface PhoneOtpFormProps {
  onSendOtp: (phone: string) => Promise<{ error?: string }>;
  onVerifyOtp: (phone: string, otp: string) => Promise<{ error?: string }>;
}

export function PhoneOtpForm({ onSendOtp, onVerifyOtp }: PhoneOtpFormProps): React.ReactElement {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSendOtp(): Promise<void> {
    const normalized = phone.replace(/\D/g, "");
    if (normalized.length < 10) return;
    setError(null);
    setLoading(true);
    const result = await onSendOtp(phone.startsWith("+") ? phone : `+66${normalized}`);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setOtpSent(true);
  }

  async function handleVerify(): Promise<void> {
    if (otp.length !== 6) return;
    const normalizedPhone = phone.replace(/\D/g, "");
    const fullPhone = phone.startsWith("+") ? phone : `+66${normalizedPhone}`;
    setError(null);
    setLoading(true);
    const result = await onVerifyOtp(fullPhone, otp);
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
        <Label htmlFor="phone-login">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="phone-login"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+66 (0) 000-0000"
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
          disabled={phone.replace(/\D/g, "").length < 10 || loading}
          className="w-full bg-primary font-bold text-white"
        >
          {loading ? "Sending…" : "Send OTP"}
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone-otp">
              กรอกรหัส 6 หลักที่ส่งไปยัง {phone || "[เบอร์โทร]"}
            </Label>
            <Input
              id="phone-otp"
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
