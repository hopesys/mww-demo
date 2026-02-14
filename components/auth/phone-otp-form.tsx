"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PhoneOtpFormProps {
  onSubmit: () => void;
}

export function PhoneOtpForm({ onSubmit }: PhoneOtpFormProps): React.ReactElement {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  function handleSendOtp(): void {
    if (phone.length >= 10) {
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

      {!otpSent ? (
        <Button
          onClick={handleSendOtp}
          disabled={phone.length < 10}
          className="w-full bg-primary font-bold text-white"
        >
          Send OTP
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone-otp">Enter 6-digit OTP</Label>
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
