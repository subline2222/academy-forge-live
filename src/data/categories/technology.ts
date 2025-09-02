import { Category } from '../types';
import { makeCategory } from '../utils';

const technologyNames = [
  "Veri Analizi",
  "Yapay Zeka", 
  "Siber Güvenlik",
  "Bulut Teknolojileri",
  "Mobil Uygulama",
  "Veri Bilimi",
  "Makine Öğrenimi",
  "Agile ve Scrum",
  "Test Otomasyonu",
  "DevOps Temelleri",
  "Veri Görselleştirme"
];

export const technologyCategories: Category[] = technologyNames.map((name, idx) => 
  makeCategory(name, idx + 200)
);