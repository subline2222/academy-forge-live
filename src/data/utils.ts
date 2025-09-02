import { Category } from './types';

const toSlug = (str: string) => {
  const map: Record<string, string> = {
    ç: "c",
    Ç: "c",
    ğ: "g",
    Ğ: "g",
    ı: "i",
    I: "i",
    İ: "i",
    ö: "o",
    Ö: "o",
    ş: "s",
    Ş: "s",
    ü: "u",
    Ü: "u",
  };
  return str
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
};

const keywordsFor = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("pazarlama") || n.includes("satış")) return "marketing,branding,office";
  if (n.includes("yapay zeka") || n.includes("veri") || n.includes("analiz")) return "artificial-intelligence,data,technology";
  if (n.includes("siber") || n.includes("güvenlik")) return "cybersecurity,technology";
  if (n.includes("bulut")) return "cloud,datacenter,technology";
  if (n.includes("mobil")) return "mobile,app,developer";
  if (n.includes("liderlik") || n.includes("iletişim") || n.includes("zaman")) return "leadership,people,team";
  if (n.includes("finans") || n.includes("yatırım") || n.includes("bütçe")) return "finance,stock,office";
  if (n.includes("tasarım")) return "design,ui,creative";
  if (n.includes("eğitim")) return "education,learning,classroom";
  if (n.includes("hukuk") || n.includes("mevzuat")) return "law,legal,books";
  if (n.includes("beslenme") || n.includes("fitness") || n.includes("yaşam")) return "health,fitness,lifestyle";
  return "education,business,people";
};

export const makeCategory = (name: string, idx: number): Category => {
  const slug = toSlug(name);
  const h = hash(slug + idx);
  const levels: Category["level"][] = ["Başlangıç", "Orta", "İleri"];
  const level = levels[h % 3];
  const count = 18 + (h % 60); // 18 - 77
  const weeks = 3 + (h % 10); // 3 - 12
  const rating = +(4.3 + ((h % 70) / 100)).toFixed(1); // 4.3 - 5.0
  const popular = h % 4 === 0;
  const image = `https://source.unsplash.com/seed/${slug}/800x500?${keywordsFor(name)}`;
  return { id: idx + 1, name, slug, count, level, duration: `${weeks} hafta`, rating, popular, image };
};