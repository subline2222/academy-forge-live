import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Save, X } from "lucide-react";
import { categories } from "@/data/categories";
import { saveCustomContent, type CourseContent, type Module, type QuizQuestion } from "@/data/learning";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onCancel: () => void;
  onSuccess: (slug: string) => void;
}

interface NewCourseForm {
  categorySlug: string;
  name: string;
  description: string;
  level: string;
  duration: string;
}

const CourseAddPanel = ({ onCancel, onSuccess }: Props) => {
  const { toast } = useToast();
  const [form, setForm] = useState<NewCourseForm>({
    categorySlug: "",
    name: "",
    description: "",
    level: "Başlangıç",
    duration: "4 hafta"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categorySlug || !form.name.trim()) {
      toast({
        title: "Hata",
        description: "Kategori ve kurs adı zorunludur.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Create basic course content structure
      const newContent: CourseContent = {
        modules: [
          {
            id: "1",
            title: "Giriş Modülü",
            intro: "Bu modülde temel konulara giriş yapacağız.",
            richContent: `# ${form.name} - Giriş\n\n${form.description}\n\nBu kurs ${form.level} seviyesinde olup ${form.duration} sürmektedir.`,
            lessons: [
              {
                id: "1-1",
                title: "Temel Kavramlar",
                summary: "Kursun temel kavramlarını öğrenin",
                pdfUrl: "/docs/placeholder.pdf"
              }
            ]
          }
        ],
        quiz: [
          {
            id: "1",
            question: "Bu kurs hangi seviyededir?",
            choices: ["Başlangıç", "Orta", "İleri", "Uzman"],
            answerIndex: form.level === "Başlangıç" ? 0 : form.level === "Orta" ? 1 : form.level === "İleri" ? 2 : 3
          }
        ]
      };

      // Save the new course content
      saveCustomContent(form.categorySlug, newContent);
      
      toast({
        title: "Başarılı",
        description: "Yeni kurs başarıyla oluşturuldu.",
      });

      onSuccess(form.categorySlug);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Kurs oluşturulurken bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [form, toast, onSuccess]);

  const selectedCategory = categories.find(c => c.slug === form.categorySlug);

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-primary" />
            Yeni Kurs Oluştur
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori *</Label>
                <Select value={form.categorySlug} onValueChange={(value) => setForm(prev => ({ ...prev, categorySlug: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(0, 50).map(cat => (
                      <SelectItem key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCategory && (
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{selectedCategory.level}</Badge>
                    <Badge variant="outline">{selectedCategory.duration}</Badge>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Kurs Adı *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Örn: React ile Modern Web Geliştirme"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Seviye</Label>
                <Select value={form.level} onValueChange={(value) => setForm(prev => ({ ...prev, level: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Başlangıç">Başlangıç</SelectItem>
                    <SelectItem value="Orta">Orta</SelectItem>
                    <SelectItem value="İleri">İleri</SelectItem>
                    <SelectItem value="Uzman">Uzman</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Süre</Label>
                <Select value={form.duration} onValueChange={(value) => setForm(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2 hafta">2 hafta</SelectItem>
                    <SelectItem value="4 hafta">4 hafta</SelectItem>
                    <SelectItem value="6 hafta">6 hafta</SelectItem>
                    <SelectItem value="8 hafta">8 hafta</SelectItem>
                    <SelectItem value="12 hafta">12 hafta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Kurs hakkında kısa bir açıklama yazın..."
                className="min-h-24"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>Oluşturuluyor...</>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Kurs Oluştur
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Vazgeç
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseAddPanel;
