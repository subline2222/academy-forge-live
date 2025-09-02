import { Category } from '../types';
import { makeCategory } from '../utils';

const legalNames = [
  "İş Hukuku",
  "Vergi Hukuku",
  "Sosyal Sorumluluk"
];

export const legalCategories: Category[] = legalNames.map((name, idx) => 
  makeCategory(name, idx + 800)
);