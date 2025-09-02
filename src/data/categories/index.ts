import { businessCategories } from './business';
import { marketingCategories } from './marketing';
import { technologyCategories } from './technology';
import { personalCategories } from './personal';
import { financeCategories } from './finance';
import { healthCategories } from './health';
import { designCategories } from './design';
import { educationCategories } from './education';
import { legalCategories } from './legal';
import { Category } from '../types';

export const categories: Category[] = [
  ...businessCategories,
  ...marketingCategories,
  ...technologyCategories,
  ...personalCategories,
  ...financeCategories,
  ...healthCategories,
  ...designCategories,
  ...educationCategories,
  ...legalCategories
];

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

// Export category groups for organized display
export const categoryGroups = {
  business: businessCategories,
  marketing: marketingCategories,
  technology: technologyCategories,
  personal: personalCategories,
  finance: financeCategories,
  health: healthCategories,
  design: designCategories,
  education: educationCategories,
  legal: legalCategories
};