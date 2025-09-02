export type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
  level: "Başlangıç" | "Orta" | "İleri";
  duration: string; // e.g. "6 hafta"
  rating: number; // 4.3 - 5.0
  popular: boolean;
  image: string;
};