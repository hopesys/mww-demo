import { Leaf } from "lucide-react";

export default function MarketingLoading(): React.ReactElement {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Leaf className="h-12 w-12 animate-pulse text-primary" />
      <p className="text-sm font-medium text-muted-foreground">Loading...</p>
    </div>
  );
}
