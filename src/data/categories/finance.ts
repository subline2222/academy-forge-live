import { Category } from '../types';
import { makeCategory } from '../utils';

const financeNames = [
  "Yatırım Analizi",
  "Mali Müşavirlik", 
  "Kurumsal Finans",
  "Risk Yönetimi",
  "Bütçe Planlama",
  "Fintech"
];

export const financeCategories: Category[] = financeNames.map((name, idx) => 
  makeCategory(name, idx + 400)
);