import { useCallback } from "react";
import { type CourseContent, type Module, type Lesson, type QuizQuestion } from "@/data/learning";
import { type Category } from "@/data/categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Save, Trash2, Plus, BookOpen, HelpCircle, FileText, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  slug: string;
  category: Category;
  content: CourseContent;
  onChange: (c: CourseContent) => void;
  onSave: () => void;
  onDelete: () => void;
}

const CourseEditPanel = ({ slug, category, content, onChange, onSave, onDelete }: Props) => {
  const { toast } = useToast();
  
  const handleSave = useCallback(() => {
    onSave();
    toast({
      title: "Başarılı",
      description: "Kurs içeriği başarıyla kaydedildi.",
    });
  }, [onSave, toast]);

  const handleDelete = useCallback(() => {
    onDelete();
    toast({
      title: "Başarılı", 
      description: "Özel içerik silindi, varsayılan içerik gösterilecek.",
    });
  }, [onDelete, toast]);
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
    <div className="space-y-8">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
          <CardTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="h-5 w-5 text-primary" />
            Temel Bilgiler
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Kurs Adı</label>
              <div className="p-3 bg-muted/30 rounded-md border">
                <div className="font-medium">{category.name}</div>
                <div className="text-sm text-muted-foreground">Kategori tabanlı kurs</div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Slug</label>
              <div className="p-3 bg-muted/30 rounded-md border font-mono text-sm">
                {slug}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">İstatistikler</label>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {content.modules.length} Modül
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {content.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)} Ders
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <HelpCircle className="h-3 w-3" />
                  {content.quiz.length} Soru
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-accent/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-5 w-5 text-accent" />
              Modüller ({content.modules.length})
            </CardTitle>
            <Button size="sm" onClick={addModule} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Modül Ekle
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {content.modules.map((m, mi) => (
            <Card key={m.id} className="border-l-4 border-l-primary/50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">Modül {mi + 1}</Badge>
                  <input
                    className="flex-1 text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                    value={m.title}
                    onChange={(e) => {
                      const c = { ...content };
                      c.modules[mi] = { ...c.modules[mi], title: e.target.value };
                      onChange(c);
                    }}
                    placeholder="Modül başlığı..."
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Ara Yazı</label>
                    <Textarea
                      value={m.intro ?? ""}
                      onChange={(e) => {
                        const c = { ...content };
                        c.modules[mi] = { ...c.modules[mi], intro: e.target.value };
                        onChange(c);
                      }}
                      placeholder="Modül için kısa ara yazı yazın..."
                      className="min-h-20 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Zengin İçerik (Markdown)</label>
                    <Textarea
                      value={m.richContent ?? ""}
                      onChange={(e) => {
                        const c = { ...content };
                        c.modules[mi] = { ...c.modules[mi], richContent: e.target.value };
                        onChange(c);
                      }}
                      placeholder="Markdown formatında detaylı içerik yazın..."
                      className="min-h-32 font-mono text-sm resize-none"
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Dersler ({m.lessons.length})
                    </h4>
                    <Button variant="outline" size="sm" onClick={() => addLesson(mi)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Ders Ekle
                    </Button>
                  </div>
                  
                  {m.lessons.map((l, li) => (
                    <div key={l.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-muted/20 rounded-lg">
                      <input
                        className="rounded-md border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        value={l.title}
                        onChange={(e) => {
                          const c = { ...content };
                          const mod = c.modules[mi];
                          mod.lessons[li] = { ...mod.lessons[li], title: e.target.value };
                          c.modules[mi] = mod;
                          onChange(c);
                        }}
                        placeholder="Ders başlığı"
                      />
                      <input
                        className="rounded-md border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ders özeti"
                        value={l.summary}
                        onChange={(e) => {
                          const c = { ...content };
                          const mod = c.modules[mi];
                          mod.lessons[li] = { ...mod.lessons[li], summary: e.target.value };
                          c.modules[mi] = mod;
                          onChange(c);
                        }}
                      />
                      <input
                        className="rounded-md border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="PDF URL"
                        value={l.pdfUrl}
                        onChange={(e) => {
                          const c = { ...content };
                          const mod = c.modules[mi];
                          mod.lessons[li] = { ...mod.lessons[li], pdfUrl: e.target.value };
                          c.modules[mi] = mod;
                          onChange(c);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="border-orange-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <HelpCircle className="h-5 w-5 text-orange-600" />
              Mini Sınav ({content.quiz.length} Soru)
            </CardTitle>
            <Button size="sm" onClick={addQuestion} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Soru Ekle
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {content.quiz.map((q, qi) => (
            <Card key={q.id} className="border-l-4 border-l-orange-300">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-1">S{qi + 1}</Badge>
                  <input
                    className="flex-1 text-base font-medium bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-orange-400 rounded px-2 py-1"
                    value={q.question}
                    onChange={(e) => {
                      const c = { ...content };
                      c.quiz[qi] = { ...c.quiz[qi], question: e.target.value };
                      onChange(c);
                    }}
                    placeholder="Soru metni yazın..."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-2 ml-8">
                  {q.choices.map((ch, ci) => (
                    <div key={ci} className="flex items-center gap-2">
                      <Badge variant={ci === q.answerIndex ? "default" : "outline"} className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                        {String.fromCharCode(65 + ci)}
                      </Badge>
                      <input
                        className="flex-1 rounded-md border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        value={ch}
                        onChange={(e) => {
                          const c = { ...content };
                          const qq = c.quiz[qi];
                          const choices = [...qq.choices];
                          choices[ci] = e.target.value;
                          c.quiz[qi] = { ...qq, choices };
                          onChange(c);
                        }}
                        placeholder={`Seçenek ${String.fromCharCode(65 + ci)}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 ml-8">
                  <label className="text-sm font-medium">Doğru Cevap:</label>
                  <select
                    className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={q.answerIndex}
                    onChange={(e) => {
                      const c = { ...content };
                      c.quiz[qi] = { ...c.quiz[qi], answerIndex: Number(e.target.value) };
                      onChange(c);
                    }}
                  >
                    {q.choices.map((_, idx) => (
                      <option key={idx} value={idx}>{String.fromCharCode(65 + idx)}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="border-green-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex gap-4 justify-end">
            <Button onClick={handleSave} size="lg" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Değişiklikleri Kaydet
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="lg" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Özel İçeriği Sil
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bu işlem bu kurs için özel olarak oluşturduğunuz tüm içeriği (modüller, dersler, sorular) silecek ve varsayılan içeriğe dönecektir. Bu işlem geri alınamaz.
                  </AlertDialogDescription>    
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>İptal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Sil
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseEditPanel;
