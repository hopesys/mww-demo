"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EmailOtpFormProps {
  onSubmit: () => void;
}

export function EmailOtpForm({ onSubmit }: EmailOtpFormProps): React.ReactElement {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  function handleSendOtp(): void {
    if (email.includes("@")) {
      setOtpSent(true);
    }
  }

  function handleVerify(): void {
    if (otp.length === 6) {
      onSubmit();
    }
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

      {!otpSent ? (
        <Button
          onClick={handleSendOtp}
          disabled={!email.includes("@")}
          className="w-full bg-primary font-bold text-white"
        >
          Send OTP
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-otp">Enter 6-digit OTP</Label>
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
            disabled={otp.length !== 6}
            className="w-full bg-primary font-bold text-white"
          >
            Verify & Sign In
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
