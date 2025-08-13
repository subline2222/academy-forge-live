import { categories, type Category, getCategoryBySlug } from "@/data/categories";
import { lsGet, lsSet } from "@/lib/localStore";

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  pdfUrl: string;
};

export type Module = {
  id: string;
  title: string;
  intro?: string; // Ara Yazı
  richContent?: string; // Zengin İçerik (Markdown/plain)
  lessons: Lesson[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
};

export type CourseContent = {
  modules: Module[];
  quiz: QuizQuestion[];
};

export type Enrollment = {
  slug: string;
  progress?: { moduleIndex: number; lessonIndex: number };
  quizScore?: number;
  startedAt: number;
};

export type EnrollmentMap = Record<string, Enrollment>;

const CUSTOM_CONTENT_KEY = "customCourseContent";
const ENROLLMENTS_KEY = "enrollments";

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
};

const seeded = (seed: number) => {
  let x = seed % 2147483647;
  if (x <= 0) x += 2147483646;
  return () => (x = (x * 16807) % 2147483647) / 2147483647;
};

export const getCustomContent = (slug: string): CourseContent | undefined => {
  const map = lsGet<Record<string, CourseContent>>(CUSTOM_CONTENT_KEY, {});
  return map[slug];
};

export const saveCustomContent = (slug: string, content: CourseContent) => {
  const map = lsGet<Record<string, CourseContent>>(CUSTOM_CONTENT_KEY, {});
  map[slug] = content;
  lsSet(CUSTOM_CONTENT_KEY, map);
};

export const deleteCustomContent = (slug: string) => {
  const map = lsGet<Record<string, CourseContent>>(CUSTOM_CONTENT_KEY, {});
  if (map[slug]) {
    delete map[slug];
    lsSet(CUSTOM_CONTENT_KEY, map);
  }
};

export const getEnrollments = (): EnrollmentMap => lsGet<EnrollmentMap>(ENROLLMENTS_KEY, {});
export const saveEnrollments = (m: EnrollmentMap) => lsSet(ENROLLMENTS_KEY, m);

export const enrollInCourse = (slug: string) => {
  const m = getEnrollments();
  if (!m[slug]) m[slug] = { slug, startedAt: Date.now() };
  saveEnrollments(m);
};

export const updateProgress = (slug: string, moduleIndex: number, lessonIndex: number) => {
  const m = getEnrollments();
  if (!m[slug]) m[slug] = { slug, startedAt: Date.now() };
  m[slug].progress = { moduleIndex, lessonIndex };
  saveEnrollments(m);
};

export const saveQuizScore = (slug: string, score: number) => {
  const m = getEnrollments();
  if (!m[slug]) m[slug] = { slug, startedAt: Date.now() };
  m[slug].quizScore = score;
  saveEnrollments(m);
};

export const generateContent = (category: Category): CourseContent => {
  const seed = hash(category.slug);
  const rnd = seeded(seed);
  const modulesCount = 3 + Math.floor(rnd() * 3); // 3-5
  const modules: Module[] = [];
  for (let i = 0; i < modulesCount; i++) {
    const lessonsCount = 3 + Math.floor(rnd() * 3); // 3-5
    const lessons: Lesson[] = [];
    for (let j = 0; j < lessonsCount; j++) {
      const id = `${i + 1}-${j + 1}`;
      lessons.push({
        id,
        title: `${category.name} - Bölüm ${i + 1}.${j + 1}`,
        summary: `${category.name} eğitiminin ${i + 1}. modül, ${j + 1}. dersinde temel kavramlar ve pratik örnekler yer alır. Bu içerik metinsel doküman formatındadır.`,
        pdfUrl: "/docs/placeholder.pdf",
      });
    }
    modules.push({ id: `${i + 1}`, title: `Modül ${i + 1}: ${category.name}`, intro: "", richContent: "", lessons });
  }

  const quiz: QuizQuestion[] = Array.from({ length: 5 }).map((_, k) => {
    const idx = k + 1;
    const correct = Math.floor(rnd() * 4);
    return {
      id: `${idx}`,
      question: `${category.name} konusunda ${idx}. kontrol sorusu nedir?`,
      choices: [
        "Tanım ve temel kavramlar",
        "Uygulama alanları",
        "Ölçüm ve değerlendirme",
        "Stratejik yaklaşım",
      ],
      answerIndex: correct,
    };
  });

  return { modules, quiz };
};

export const getCourseContentForSlug = (slug: string): { category?: Category; content: CourseContent } => {
  const cat = getCategoryBySlug(slug);
  const custom = getCustomContent(slug);
  const content = custom ?? (cat ? generateContent(cat) : { modules: [], quiz: [] });
  return { category: cat, content };
};
