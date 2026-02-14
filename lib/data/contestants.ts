import type { Contestant } from "@/lib/types";

const provinces = [
  "Bangkok", "Chiang Mai", "Phuket", "Khon Kaen", "Nakhon Ratchasima",
  "Udon Thani", "Chonburi", "Surat Thani", "Hat Yai", "Rayong",
  "Ubon Ratchathani", "Nonthaburi", "Pathum Thani", "Samut Prakan", "Lampang",
  "Nakhon Si Thammarat", "Chiang Rai", "Nakhon Pathom", "Songkhla", "Phitsanulok",
  "Ayutthaya", "Saraburi", "Kanchanaburi", "Ratchaburi", "Trang",
  "Sukhothai", "Prachuap Khiri Khan", "Nong Khai", "Yasothon", "Roi Et",
];

const names = [
  "Natcha", "Ploy", "Fern", "Pim", "Kwan", "Mint", "Bam", "Gift", "Noon", "Ice",
  "Bow", "May", "Joy", "Cream", "Film", "Punch", "Mild", "Peach", "Namwan", "Tangmo",
  "Fah", "Por", "Opal", "Pang", "Nune", "Bell", "Pan", "Orn", "Nan", "Pat",
];

export const contestants: Contestant[] = Array.from({ length: 30 }, (_, i) => ({
  id: `mwwt-${String(i + 1).padStart(2, "0")}`,
  code: `MWWT${String(i + 1).padStart(2, "0")}`,
  name: `${names[i]} ${provinces[i].slice(0, 1)}.`,
  province: provinces[i],
  imageUrl: `https://ui-avatars.com/api/?name=${names[i]}&background=0a5239&color=fff&size=400&font-size=0.35`,
  votes: Math.floor(Math.random() * 500) + 50,
}));
