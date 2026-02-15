"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Leaf } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { PhoneOtpForm } from "@/components/auth/phone-otp-form";
import { EmailOtpForm } from "@/components/auth/email-otp-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

type AuthMethod = "select" | "phone" | "email" | "email_password";

function EmailPasswordForm({
  onSubmit,
  onBack,
  isLoading,
  setLoading,
}: {
  onSubmit: (email: string, password: string) => Promise<{ error?: string }>;
  onBack: () => void;
  isLoading: boolean;
  setLoading: (v: boolean) => void;
}): React.ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }
    setLoading(true);
    const result = await onSubmit(email.trim(), password);
    setLoading(false);
    if (result.error) setError(result.error);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="admin-email">Email</Label>
        <Input
          id="admin-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@mww.local"
          className="w-full"
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="admin-password">Password</Label>
        <Input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
          disabled={isLoading}
        />
      </div>
      {error && (
        <p className="text-center text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in…" : "Sign in"}
      </Button>
      <button
        type="button"
        onClick={onBack}
        className="w-full text-center text-sm text-muted-foreground hover:text-primary"
      >
        Back to sign in options
      </button>
    </form>
  );
}

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

  const handleEmailPasswordSignIn = useCallback(
    async (email: string, password: string): Promise<{ error?: string }> => {
      try {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        window.location.href = safeRedirect;
        return {};
      } catch (e) {
        const message = e instanceof Error ? e.message : "Sign in failed";
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
          <button
            type="button"
            onClick={() => setMethod("email_password")}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border text-sm text-muted-foreground transition-colors hover:bg-secondary"
          >
            Admin (email + password)
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

      {method === "email_password" && (
        <EmailPasswordForm
          onSubmit={handleEmailPasswordSignIn}
          onBack={() => setMethod("select")}
          isLoading={isLoading}
          setLoading={setIsLoading}
        />
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
