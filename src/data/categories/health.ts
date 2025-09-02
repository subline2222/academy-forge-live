import { Category } from '../types';
import { makeCategory } from '../utils';

const healthNames = [
  "Beslenme Koçluğu",
  "Fitness Antrenörlüğü", 
  "Yaşam Koçluğu"
];

export const healthCategories: Category[] = healthNames.map((name, idx) => 
  makeCategory(name, idx + 500)
);