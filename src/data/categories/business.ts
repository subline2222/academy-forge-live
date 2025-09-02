import { Category } from '../types';
import { makeCategory } from '../utils';

const businessNames = [
  "Stratejik Yönetim",
  "Proje Yönetimi", 
  "İnsan Kaynakları",
  "Finansal Yönetim",
  "Operasyon Yönetimi",
  "Ürün Yönetimi",
  "CRM Yönetimi",
  "Kurumsal İletişim",
  "Kalite Yönetimi",
  "Lojistik ve Tedarik",
  "Dijital Dönüşüm",
  "Sürdürülebilirlik",
  "İnovasyon Yönetimi",
  "Performans Yönetimi",
  "Müşteri Deneyimi",
  "Ekip Yönetimi",
  "Kurumsal Strateji"
];

export const businessCategories: Category[] = businessNames.map((name, idx) => 
  makeCategory(name, idx)
);