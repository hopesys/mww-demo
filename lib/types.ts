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

export interface Pillar {
  icon: string;
  title: string;
  description: string;
}
