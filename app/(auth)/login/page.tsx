"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Leaf } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { PhoneOtpForm } from "@/components/auth/phone-otp-form";
import { EmailOtpForm } from "@/components/auth/email-otp-form";
import { createClient } from "@/lib/supabase/client";

type AuthMethod = "select" | "phone" | "email";

export default function LoginPage(): React.ReactElement {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/apply";
  const [method, setMethod] = useState<AuthMethod>("select");
  const [isLoading, setIsLoading] = useState(false);

  const safeRedirect = redirectTo.startsWith("/") ? redirectTo : "/apply";

  const handleGoogleSignIn = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeRedirect)}`
              : undefined,
        },
      });
      if (error) {
        console.error("Google sign in error:", error.message);
        setIsLoading(false);
        return;
      }
      // Redirect is handled by Supabase; if no redirect (e.g. popup), stay and show loading
    } catch (e) {
      console.error("Google sign in error:", e);
    }
    setIsLoading(false);
  }, [safeRedirect]);

  const handlePhoneSendOtp = useCallback(async (phone: string): Promise<{ error?: string }> => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) return { error: error.message };
      return {};
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to send OTP";
      return { error: message };
    }
  }, []);

  const handlePhoneVerifyOtp = useCallback(
    async (phone: string, token: string): Promise<{ error?: string }> => {
      try {
        const supabase = createClient();
        const { error } = await supabase.auth.verifyOtp({ phone, token, type: "sms" });
        if (error) return { error: error.message };
        window.location.href = safeRedirect;
        return {};
      } catch (e) {
        const message = e instanceof Error ? e.message : "Verification failed";
        return { error: message };
      }
    },
    [safeRedirect]
  );

  const handleEmailSendOtp = useCallback(async (email: string): Promise<{ error?: string }> => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });
      if (error) return { error: error.message };
      return {};
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to send OTP";
      return { error: message };
    }
  }, []);

  const handleEmailVerifyOtp = useCallback(
    async (email: string, token: string): Promise<{ error?: string }> => {
      try {
        const supabase = createClient();
        const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
        if (error) return { error: error.message };
        window.location.href = safeRedirect;
        return {};
      } catch (e) {
        const message = e instanceof Error ? e.message : "Verification failed";
        return { error: message };
      }
    },
    [safeRedirect]
  );

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
            ลงทะเบียนหรือล็อกอินเพื่อสมัคร Miss Wellness World
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
            Continue with Phone
          </button>
          <button
            type="button"
            onClick={() => setMethod("email")}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Continue with Email
          </button>
        </div>
      )}

      {method === "phone" && (
        <div className="space-y-4">
          <PhoneOtpForm
            onSendOtp={handlePhoneSendOtp}
            onVerifyOtp={handlePhoneVerifyOtp}
          />
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
          <EmailOtpForm
            onSendOtp={handleEmailSendOtp}
            onVerifyOtp={handleEmailVerifyOtp}
          />
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
