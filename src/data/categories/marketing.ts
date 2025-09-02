import { Category } from '../types';
import { makeCategory } from '../utils';

const marketingNames = [
  "Dijital Pazarlama",
  "Sosyal Medya Pazarlama",
  "İçerik Pazarlama",
  "SEO ve SEM",
  "E-ticaret",
  "Satış Teknikleri",
  "Marka Yönetimi"
];

export const marketingCategories: Category[] = marketingNames.map((name, idx) => 
  makeCategory(name, idx + 100)
);