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

const makeCategory = (name: string, idx: number): Category => {
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

const baseNames: string[] = [
  // İşletme ve Yönetim
  "Stratejik Yönetim",
  "Proje Yönetimi",
  "İnsan Kaynakları",
  "Finansal Yönetim",
  "Operasyon Yönetimi",
  // Pazarlama ve Satış
  "Dijital Pazarlama",
  "Sosyal Medya Pazarlama",
  "İçerik Pazarlama",
  "SEO ve SEM",
  "E-ticaret",
  // Teknoloji ve Yazılım
  "Veri Analizi",
  "Yapay Zeka",
  "Siber Güvenlik",
  "Bulut Teknolojileri",
  "Mobil Uygulama",
  // Kişisel Gelişim
  "Liderlik",
  "İletişim Becerileri",
  "Zaman Yönetimi",
  "Sunum Teknikleri",
  "Müzakere Becerileri",
  // Finans ve Muhasebe
  "Yatırım Analizi",
  "Mali Müşavirlik",
  "Kurumsal Finans",
  "Risk Yönetimi",
  "Bütçe Planlama",
  // Sağlık ve Yaşam
  "Beslenme Koçluğu",
  "Fitness Antrenörlüğü",
  "Yaşam Koçluğu",
  // Sanat ve Tasarım
  "Grafik Tasarım",
  "Web Tasarım",
  "UX/UI Tasarım",
  // Eğitim ve Öğretim
  "Online Eğitim",
  "Eğitim Teknolojileri",
  // Hukuk ve Mevzuat
  "İş Hukuku",
  "Vergi Hukuku",
  // Ekstra popüler alanlar
  "Veri Bilimi",
  "Makine Öğrenimi",
  "Ürün Yönetimi",
  "CRM Yönetimi",
  "Satış Teknikleri",
  "Marka Yönetimi",
  "Kurumsal İletişim",
  "Kalite Yönetimi",
  "Lojistik ve Tedarik",
  "Dijital Dönüşüm",
  "Sürdürülebilirlik",
  "İnovasyon Yönetimi",
  "Performans Yönetimi",
  "Müşteri Deneyimi",
  "Ekip Yönetimi",
  "Agile ve Scrum",
  "Test Otomasyonu",
  "DevOps Temelleri",
  "Veri Görselleştirme",
  "Fintech",
  "Sosyal Sorumluluk",
  "Kurumsal Strateji",
];

const buildCategories = (target = 700): Category[] => {
  const list: Category[] = [];
  baseNames.forEach((n, i) => list.push(makeCategory(n, i)));
  let i = list.length;
  while (list.length < target) {
    const base = baseNames[i % baseNames.length];
    const name = `${base} Program ${Math.floor(i / baseNames.length) + 1}`;
    list.push(makeCategory(name, i));
    i++;
  }
  // ensure unique slugs
  const slugCount: Record<string, number> = {};
  return list.map((c) => {
    const count = (slugCount[c.slug] = (slugCount[c.slug] ?? 0) + 1);
    const slug = count > 1 ? `${c.slug}-${count}` : c.slug;
    return { ...c, slug };
  });
};

export const categories: Category[] = buildCategories(700);

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
