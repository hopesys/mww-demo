import { Leaf } from "lucide-react";

export default function ApplyLoading(): React.ReactElement {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Leaf className="h-12 w-12 animate-pulse text-primary" />
        <p className="text-sm font-medium text-muted-foreground">
          Loading application...
        </p>
      </div>
    </div>
  );
}
