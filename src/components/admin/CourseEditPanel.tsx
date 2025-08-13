import { useCallback } from "react";
import { type CourseContent, type Module, type Lesson, type QuizQuestion } from "@/data/learning";
import { type Category } from "@/data/categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  slug: string;
  category: Category;
  content: CourseContent;
  onChange: (c: CourseContent) => void;
  onSave: () => void;
  onDelete: () => void;
}

const CourseEditPanel = ({ slug, category, content, onChange, onSave, onDelete }: Props) => {
  const addModule = useCallback(() => {
    const c = content ?? { modules: [], quiz: [] };
    const m: Module = { id: `${c.modules.length + 1}`, title: `Yeni Modül ${c.modules.length + 1}`, lessons: [] };
    onChange({ ...c, modules: [...c.modules, m] });
  }, [content, onChange]);

  const addLesson = useCallback((mi: number) => {
    const c = { ...content };
    const mod = c.modules[mi];
    const l: Lesson = { id: `${mi + 1}-${mod.lessons.length + 1}`, title: `Yeni Ders ${mod.lessons.length + 1}`, summary: "", pdfUrl: "/docs/placeholder.pdf" };
    mod.lessons = [...mod.lessons, l];
    c.modules = [...c.modules.slice(0, mi), mod, ...c.modules.slice(mi + 1)];
    onChange(c);
  }, [content, onChange]);

  const addQuestion = useCallback(() => {
    const c = content ?? { modules: [], quiz: [] };
    const q: QuizQuestion = { id: `${c.quiz.length + 1}`, question: "Yeni soru", choices: ["A", "B", "C", "D"], answerIndex: 0 };
    onChange({ ...c, quiz: [...c.quiz, q] });
  }, [content, onChange]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Temel Bilgiler</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm text-muted-foreground">Kurs Adı</label>
            <input className="w-full rounded-md border bg-background px-3 py-2" value={category.name} readOnly aria-label="Kurs adı" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Slug</label>
            <input className="w-full rounded-md border bg-background px-3 py-2" value={slug} readOnly aria-label="Slug" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modüller</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button size="sm" onClick={addModule}>Modül Ekle</Button>
          {content.modules.map((m, mi) => (
            <div key={m.id} className="border rounded-md p-3">
              <input
                className="w-full mb-2 rounded-md border bg-background px-3 py-2"
                value={m.title}
                onChange={(e) => {
                  const c = { ...content };
                  c.modules[mi] = { ...c.modules[mi], title: e.target.value };
                  onChange(c);
                }}
              />
              <div className="space-y-2">
                {m.lessons.map((l, li) => (
                  <div key={l.id} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                      className="rounded-md border bg-background px-3 py-2"
                      value={l.title}
                      onChange={(e) => {
                        const c = { ...content };
                        const mod = c.modules[mi];
                        mod.lessons[li] = { ...mod.lessons[li], title: e.target.value };
                        c.modules[mi] = mod;
                        onChange(c);
                      }}
                      aria-label="Ders başlığı"
                    />
                    <input
                      className="rounded-md border bg-background px-3 py-2"
                      placeholder="Özet"
                      value={l.summary}
                      onChange={(e) => {
                        const c = { ...content };
                        const mod = c.modules[mi];
                        mod.lessons[li] = { ...mod.lessons[li], summary: e.target.value };
                        c.modules[mi] = mod;
                        onChange(c);
                      }}
                      aria-label="Ders özeti"
                    />
                    <input
                      className="rounded-md border bg-background px-3 py-2"
                      placeholder="PDF URL"
                      value={l.pdfUrl}
                      onChange={(e) => {
                        const c = { ...content };
                        const mod = c.modules[mi];
                        mod.lessons[li] = { ...mod.lessons[li], pdfUrl: e.target.value };
                        c.modules[mi] = mod;
                        onChange(c);
                      }}
                      aria-label="PDF bağlantısı"
                    />
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addLesson(mi)}>Ders Ekle</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mini Sınav</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button size="sm" onClick={addQuestion}>Soru Ekle</Button>
          {content.quiz.map((q, qi) => (
            <div key={q.id} className="border rounded-md p-3 space-y-2">
              <input
                className="w-full rounded-md border bg-background px-3 py-2"
                value={q.question}
                onChange={(e) => {
                  const c = { ...content };
                  c.quiz[qi] = { ...c.quiz[qi], question: e.target.value };
                  onChange(c);
                }}
                aria-label="Soru metni"
              />
              <div className="grid md:grid-cols-2 gap-2">
                {q.choices.map((ch, ci) => (
                  <input
                    key={ci}
                    className="rounded-md border bg-background px-3 py-2"
                    value={ch}
                    onChange={(e) => {
                      const c = { ...content };
                      const qq = c.quiz[qi];
                      const choices = [...qq.choices];
                      choices[ci] = e.target.value;
                      c.quiz[qi] = { ...qq, choices };
                      onChange(c);
                    }}
                    aria-label={`Seçenek ${ci+1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm">Doğru Cevap İndeksi (0-3):</label>
                <input
                  type="number"
                  min={0}
                  max={3}
                  className="w-20 rounded-md border bg-background px-3 py-2"
                  value={q.answerIndex}
                  onChange={(e) => {
                    const c = { ...content };
                    c.quiz[qi] = { ...c.quiz[qi], answerIndex: Number(e.target.value) };
                    onChange(c);
                  }}
                  aria-label="Doğru cevap indeksi"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={onSave}>Kaydet</Button>
        <Button variant="destructive" onClick={onDelete}>Özel İçeriği Sil</Button>
      </div>
    </div>
  );
};

export default CourseEditPanel;
