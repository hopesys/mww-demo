export interface NavItem {
  label: string;
  href: string;
}

export interface Titleholder {
  name: string;
  title: string;
  year: number;
  location: string;
  imageUrl: string;
  imageAlt: string;
}

export interface TeamMember {
  name: string;
  nameTh: string;
  title: string;
  bio: string;
  imageUrl?: string;
}

export interface Contestant {
  id: string;
  code: string;
  name: string;
  province: string;
  imageUrl: string;
  votes: number;
}

/** Row from mww_applications for voting (id, name_th, photo, vote_count, province) */
export interface VotingContestantRow {
  id: string;
  name_th: string | null;
  photo_full_url: string | null;
  vote_count: number;
  address_province: string | null;
}

export interface Pillar {
  icon: string;
  title: string;
  description: string;
}
