import { Category } from '../types';
import { makeCategory } from '../utils';

const personalNames = [
  "Liderlik",
  "İletişim Becerileri",
  "Zaman Yönetimi",
  "Sunum Teknikleri",
  "Müzakere Becerileri"
];

export const personalCategories: Category[] = personalNames.map((name, idx) => 
  makeCategory(name, idx + 300)
);