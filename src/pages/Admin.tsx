import { useEffect, useMemo, useState } from "react";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourseContentForSlug, saveCustomContent, deleteCustomContent, type CourseContent, type Module, type Lesson, type QuizQuestion } from "@/data/learning";

const Admin = () => {
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<CourseContent | undefined>(undefined);

  useEffect(() => {
    document.title = "Admin Paneli | Akademi Danışmanlık";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Admin Paneli: Kurs içerikleri ve sınav sorularını yönetin.");
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return categories.filter(c => c.name.toLowerCase().includes(q)).slice(0, 50);
  }, [query]);

  const loadCourse = (slug: string) => {
    const { content } = getCourseContentForSlug(slug);
    setSelectedSlug(slug);
    setContent(JSON.parse(JSON.stringify(content)) as CourseContent);
  };

  const addModule = () => {
    setContent(prev => {
      const c = prev ?? { modules: [], quiz: [] };
      const m: Module = { id: `${c.modules.length + 1}`, title: `Yeni Modül ${c.modules.length + 1}`, lessons: [] };
      return { ...c, modules: [...c.modules, m] };
    });
  };

  const addLesson = (mi: number) => {
    setContent(prev => {
      if (!prev) return prev;
      const c = { ...prev };
      const mod = c.modules[mi];
      const l: Lesson = { id: `${mi + 1}-${mod.lessons.length + 1}`, title: `Yeni Ders ${mod.lessons.length + 1}`, summary: "", pdfUrl: "/docs/placeholder.pdf" };
      mod.lessons = [...mod.lessons, l];
      c.modules = [...c.modules.slice(0, mi), mod, ...c.modules.slice(mi + 1)];
      return c;
    });
  };

  const addQuestion = () => {
    setContent(prev => {
      const c = prev ?? { modules: [], quiz: [] };
      const q: QuizQuestion = { id: `${c.quiz.length + 1}`, question: "Yeni soru", choices: ["A", "B", "C", "D"], answerIndex: 0 };
      return { ...c, quiz: [...c.quiz, q] };
    });
  };

  const save = () => {
    if (!selectedSlug || !content) return;
    saveCustomContent(selectedSlug, content);
    alert("Kaydedildi");
  };

  const remove = () => {
    if (!selectedSlug) return;
    deleteCustomContent(selectedSlug);
    alert("Silindi");
  };

  return (
    <main className="container mx-auto px-4 py-10 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Admin Paneli</h1>
        <p className="text-muted-foreground">Kurs içerikleri (modül, ders, PDF) ve sınav sorularını yönetin.</p>
        <link rel="canonical" href={location.origin + "/admin"} />
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Kategori Seç</CardTitle>
              <CardDescription>700+ kategoriden arayın</CardDescription>
            </CardHeader>
            <CardContent>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Kategori ara..."
                className="w-full rounded-md border bg-background px-3 py-2 mb-3"
              />
              <div className="max-h-96 overflow-auto space-y-1">
                {filtered.map((c) => (
                  <button
                    key={c.slug}
                    className={`w-full text-left px-3 py-2 rounded-md ${selectedSlug===c.slug?"bg-primary/10 text-primary":"hover:bg-muted"}`}
                    onClick={() => loadCourse(c.slug)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        <section className="lg:col-span-2 space-y-6">
          {!selectedSlug && (
            <Card><CardContent>Sol taraftan bir kategori seçin.</CardContent></Card>
          )}

          {selectedSlug && content && (
            <>
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
                        onChange={(e) => setContent(prev => {
                          if (!prev) return prev;
                          const c = { ...prev };
                          c.modules[mi] = { ...c.modules[mi], title: e.target.value };
                          return c;
                        })}
                      />
                      <div className="space-y-2">
                        {m.lessons.map((l, li) => (
                          <div key={l.id} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <input
                              className="rounded-md border bg-background px-3 py-2"
                              value={l.title}
                              onChange={(e) => setContent(prev => {
                                if (!prev) return prev;
                                const c = { ...prev };
                                const mod = c.modules[mi];
                                mod.lessons[li] = { ...mod.lessons[li], title: e.target.value };
                                c.modules[mi] = mod;
                                return c;
                              })}
                            />
                            <input
                              className="rounded-md border bg-background px-3 py-2"
                              placeholder="Özet"
                              value={l.summary}
                              onChange={(e) => setContent(prev => {
                                if (!prev) return prev;
                                const c = { ...prev };
                                const mod = c.modules[mi];
                                mod.lessons[li] = { ...mod.lessons[li], summary: e.target.value };
                                c.modules[mi] = mod;
                                return c;
                              })}
                            />
                            <input
                              className="rounded-md border bg-background px-3 py-2"
                              placeholder="PDF URL"
                              value={l.pdfUrl}
                              onChange={(e) => setContent(prev => {
                                if (!prev) return prev;
                                const c = { ...prev };
                                const mod = c.modules[mi];
                                mod.lessons[li] = { ...mod.lessons[li], pdfUrl: e.target.value };
                                c.modules[mi] = mod;
                                return c;
                              })}
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
                        onChange={(e) => setContent(prev => {
                          if (!prev) return prev;
                          const c = { ...prev };
                          c.quiz[qi] = { ...c.quiz[qi], question: e.target.value };
                          return c;
                        })}
                      />
                      <div className="grid md:grid-cols-2 gap-2">
                        {q.choices.map((ch, ci) => (
                          <input
                            key={ci}
                            className="rounded-md border bg-background px-3 py-2"
                            value={ch}
                            onChange={(e) => setContent(prev => {
                              if (!prev) return prev;
                              const c = { ...prev };
                              const qq = c.quiz[qi];
                              const choices = [...qq.choices];
                              choices[ci] = e.target.value;
                              c.quiz[qi] = { ...qq, choices };
                              return c;
                            })}
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
                          onChange={(e) => setContent(prev => {
                            if (!prev) return prev;
                            const c = { ...prev };
                            c.quiz[qi] = { ...c.quiz[qi], answerIndex: Number(e.target.value) };
                            return c;
                          })}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button onClick={save}>Kaydet</Button>
                <Button variant="destructive" onClick={remove}>Özel İçeriği Sil</Button>
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
};

export default Admin;
