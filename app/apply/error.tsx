"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ApplyError({
  reset,
}: ErrorPageProps): React.ReactElement {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive" />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Application Error</h2>
          <p className="text-muted-foreground">
            Something went wrong with your application. Your draft has been
            saved.
          </p>
        </div>
        <Button onClick={reset} className="bg-primary font-bold text-white">
          Try Again
        </Button>
      </div>
    </div>
  );
}
