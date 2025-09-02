import { Category } from '../types';
import { makeCategory } from '../utils';

const educationNames = [
  "Online Eğitim",
  "Eğitim Teknolojileri"
];

export const educationCategories: Category[] = educationNames.map((name, idx) => 
  makeCategory(name, idx + 700)
);