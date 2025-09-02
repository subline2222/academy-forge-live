import { Category } from '../types';
import { makeCategory } from '../utils';

const designNames = [
  "Grafik Tasarım",
  "Web Tasarım",
  "UX/UI Tasarım"
];

export const designCategories: Category[] = designNames.map((name, idx) => 
  makeCategory(name, idx + 600)
);