import type { Contestant } from "@/lib/types";
import type { VotingContestantRow } from "@/lib/types";

const PLACEHOLDER_IMAGE =
  "https://ui-avatars.com/api/?name=Contestant&background=0a5239&color=fff&size=400&font-size=0.35";

/**
 * Map DB row + index to Contestant (code = MWWT01..MWWT30 by display order).
 */
export function mapRowToContestant(row: VotingContestantRow, index: number): Contestant {
  const code = `MWWT${String(index + 1).padStart(2, "0")}`;
  return {
    id: row.id,
    code,
    name: row.name_th ?? "Contestant",
    province: row.address_province ?? "",
    imageUrl: row.photo_full_url ?? PLACEHOLDER_IMAGE,
    votes: Number(row.vote_count) ?? 0,
  };
}
