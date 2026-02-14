import { User } from "lucide-react";
import type { TeamMember } from "@/lib/types";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps): React.ReactElement {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <User className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
      <p className="mb-1 font-thai text-sm text-muted-foreground">
        {member.nameTh}
      </p>
      <p className="mb-3 text-sm font-semibold text-accent">{member.title}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {member.bio}
      </p>
    </div>
  );
}
