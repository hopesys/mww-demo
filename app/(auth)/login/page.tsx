"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { PhoneOtpForm } from "@/components/auth/phone-otp-form";
import { EmailOtpForm } from "@/components/auth/email-otp-form";

type AuthMethod = "select" | "phone" | "email";

export default function LoginPage(): React.ReactElement {
  const [method, setMethod] = useState<AuthMethod>("select");
  const [isLoading, setIsLoading] = useState(false);

  function handleGoogleSignIn(): void {
    setIsLoading(true);
    // Stub: would redirect to Google OAuth
    setTimeout(() => setIsLoading(false), 1500);
  }

  function handleOtpSubmit(): void {
    // Stub: would verify OTP and sign in
    setMethod("select");
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-card p-8 shadow-2xl">
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">
            Miss Wellness World
          </span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage your application
          </p>
        </div>
      </div>

      {method === "select" && (
        <div className="space-y-4">
          <GoogleSignInButton
            onClick={handleGoogleSignIn}
            isLoading={isLoading}
          />

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <button
            type="button"
            onClick={() => setMethod("phone")}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Sign in with Phone OTP
          </button>
          <button
            type="button"
            onClick={() => setMethod("email")}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Sign in with Email OTP
          </button>
        </div>
      )}

      {method === "phone" && (
        <div className="space-y-4">
          <PhoneOtpForm onSubmit={handleOtpSubmit} />
          <button
            type="button"
            onClick={() => setMethod("select")}
            className="w-full text-center text-sm text-muted-foreground hover:text-primary"
          >
            Back to sign in options
          </button>
        </div>
      )}

      {method === "email" && (
        <div className="space-y-4">
          <EmailOtpForm onSubmit={handleOtpSubmit} />
          <button
            type="button"
            onClick={() => setMethod("select")}
            className="w-full text-center text-sm text-muted-foreground hover:text-primary"
          >
            Back to sign in options
          </button>
        </div>
      )}

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/apply" className="font-medium text-primary underline">
          Apply Now
        </Link>
      </p>
    </div>
  );
}
