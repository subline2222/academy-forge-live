import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/categories";
import {
  enrollInCourse,
  getCourseContentForSlug,
  saveQuizScore,
  updateProgress,
  type CourseContent,
} from "@/data/learning";

const Course = () => {
  const navigate = useNavigate();
  const { slug = "" } = useParams();
  const { category, content } = getCourseContentForSlug(slug);

  const [moduleIndex, setModuleIndex] = useState(0);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!category) return;
    document.title = `${category.name} Eğitim İçeriği | Akademi Danışmanlık`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", `${category.name} eğitim içeriği, ders dokümanları ve mini sınav.`);
    enrollInCourse(slug);
  }, [category, slug]);

  useEffect(() => {
    updateProgress(slug, moduleIndex, lessonIndex);
  }, [slug, moduleIndex, lessonIndex]);

  const currentLesson = content.modules[moduleIndex]?.lessons[lessonIndex];

  const handleNext = () => {
    const m = content.modules[moduleIndex];
    if (!m) return;
    if (lessonIndex + 1 < m.lessons.length) {
      setLessonIndex(lessonIndex + 1);
    } else if (moduleIndex + 1 < content.modules.length) {
      setModuleIndex(moduleIndex + 1);
      setLessonIndex(0);
    }
  };

  const startQuiz = () => {
    setAnswers(Array(content.quiz.length).fill(-1));
    setScore(undefined);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitQuiz = () => {
    const s = content.quiz.reduce((acc, q, i) => (answers[i] === q.answerIndex ? acc + 1 : acc), 0);
    setScore(s);
    saveQuizScore(slug, s);
  };

  if (!category) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p>Kategori bulunamadı.</p>
        <Button variant="outline" onClick={() => navigate("/panel")}>Eğitim Merkezi</Button>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-muted-foreground">{category.level} • {category.duration} • {category.count} içerik</p>
        <link rel="canonical" href={location.origin + `/kurs/${slug}`} />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-2">
          {content.modules.map((m, mi) => (
            <Card key={m.id} className="overflow-hidden">
              <CardHeader className="py-3">
                <CardTitle className="text-base">{m.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {m.lessons.map((l, li) => (
                  <button
                    key={l.id}
                    onClick={() => { setModuleIndex(mi); setLessonIndex(li); }}
                    className={`w-full text-left px-3 py-2 rounded-md transition ${mi===moduleIndex&&li===lessonIndex?"bg-primary/10 text-primary":"hover:bg-muted"}`}
                  >
                    {l.title}
                  </button>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* Quiz entry */}
          {content.quiz.length > 0 && (
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-base">Mini Sınav</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={startQuiz} size="sm">Sınavı Başlat</Button>
              </CardContent>
            </Card>
          )}
        </aside>

        {/* Main content */}
        <section className="lg:col-span-3">
          {/* Lesson view */}
          {currentLesson && score === undefined && answers.length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{currentLesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{currentLesson.summary}</p>
                <a href={currentLesson.pdfUrl} target="_blank" rel="noopener" className="story-link inline-block">PDF'yi indir</a>
                <div className="mt-6 flex gap-3">
                  <Button onClick={handleNext}>Sonraki Ders</Button>
                  <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Başa Dön</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quiz view */}
          {answers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Mini Sınav</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {content.quiz.map((q, qi) => (
                    <li key={q.id}>
                      <p className="font-medium mb-2">{qi + 1}. {q.question}</p>
                      <div className="grid gap-2">
                        {q.choices.map((c, ci) => (
                          <label key={ci} className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer ${answers[qi]===ci?"border-primary":"hover:bg-muted"}`}>
                            <input
                              type="radio"
                              name={`q-${qi}`}
                              checked={answers[qi] === ci}
                              onChange={() => setAnswers(a => { const copy = [...a]; copy[qi] = ci; return copy; })}
                            />
                            <span>{c}</span>
                          </label>
                        ))}
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 flex gap-3">
                  <Button onClick={submitQuiz}>Sınavı Bitir</Button>
                  <Button variant="outline" onClick={() => setAnswers([])}>Derse Dön</Button>
                </div>

                {score !== undefined && (
                  <p className="mt-4 font-semibold">Skor: {score} / {content.quiz.length}</p>
                )}
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </main>
  );
};

export default Course;
