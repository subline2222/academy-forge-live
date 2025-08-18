import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategoryBySlug, type Category } from "@/data/categories";
import { getCourseContentForSlug, saveCustomContent, deleteCustomContent, type CourseContent } from "@/data/learning";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, BookOpen, Clock, Users, Star, Edit3, Trash2, Plus, FileText, Award, PlayCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CategoryEducation = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [category, setCategory] = useState<Category | undefined>();
  const [content, setContent] = useState<CourseContent | undefined>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!slug) return;
    
    const cat = getCategoryBySlug(slug);
    if (!cat) return;
    
    setCategory(cat);
    const { content: courseContent } = getCourseContentForSlug(slug);
    setContent(courseContent);

    // SEO
    document.title = `${cat.name} Eğitimi | Akademi Danışmanlık`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", `${cat.name} alanında profesyonel eğitim. ${cat.level} seviye, ${cat.duration} süre. Uzman eğitmenlerle pratik odaklı öğrenme.`);
    }
  }, [slug]);

  const handleSave = useCallback(() => {
    if (!slug || !content) return;
    saveCustomContent(slug, content);
    toast({
      title: "Başarılı",
      description: "Eğitim içeriği güncellendi.",
    });
    setIsEditing(false);
  }, [slug, content, toast]);

  const handleDelete = useCallback(() => {
    if (!slug) return;
    deleteCustomContent(slug);
    toast({
      title: "Başarılı", 
      description: "Özel içerik silindi. Varsayılan içerik gösterilecek.",
    });
    // Reload default content
    const { content: defaultContent } = getCourseContentForSlug(slug);
    setContent(defaultContent);
  }, [slug, toast]);

  if (!category || !content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Eğitim içeriği yükleniyor...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <link rel="canonical" href={`${location.origin}/kategoriler/${slug}/egitim`} />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link to="/kategoriler" className="text-muted-foreground hover:text-primary transition-colors">
            Kategoriler
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link to={`/kategori/${slug}`} className="text-muted-foreground hover:text-primary transition-colors">
            {category.name}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">Eğitim</span>
        </nav>

        {/* Header Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-primary/20 shadow-lg bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">{category.name} Eğitimi</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {category.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {category.count} katılımcı
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        {category.rating}
                      </div>
                    </div>
                  </div>
                  <Badge variant={category.level === "Başlangıç" ? "secondary" : category.level === "Orta" ? "default" : "destructive"}>
                    {category.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Button asChild>
                    <Link to={`/kurs/${slug}`}>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Kursa Başla
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    {isEditing ? 'Düzenlemeyi Bitir' : 'İçeriği Düzenle'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Eğitim İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Modül Sayısı</span>
                  <Badge variant="secondary">{content.modules.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Ders Sayısı</span>
                  <Badge variant="secondary">
                    {content.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sınav Soruları</span>
                  <Badge variant="secondary">{content.quiz.length}</Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  {isEditing && (
                    <>
                      <Button onClick={handleSave} className="w-full" size="sm">
                        Değişiklikleri Kaydet
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-full" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Özel İçeriği Sil
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bu işlem özel içeriği silecek ve varsayılan içeriğe dönecektir. Bu işlem geri alınamaz.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>İptal</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Sil</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Content Modules */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Eğitim Modülleri
          </h2>
          
          {content.modules.map((module, index) => (
            <Card key={module.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">Modül {index + 1}</Badge>
                  {isEditing ? (
                    <input
                      className="flex-1 bg-transparent border-none text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                      value={module.title}
                      onChange={(e) => {
                        if (!content) return;
                        const newContent = { ...content };
                        newContent.modules[index] = { ...newContent.modules[index], title: e.target.value };
                        setContent(newContent);
                      }}
                    />
                  ) : (
                    <span>{module.title}</span>
                  )}
                </CardTitle>
                {module.intro && (
                  <p className="text-muted-foreground">
                    {isEditing ? (
                      <textarea
                        className="w-full bg-transparent border border-input rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        value={module.intro}
                        onChange={(e) => {
                          if (!content) return;
                          const newContent = { ...content };
                          newContent.modules[index] = { ...newContent.modules[index], intro: e.target.value };
                          setContent(newContent);
                        }}
                        rows={2}
                      />
                    ) : (
                      module.intro
                    )}
                  </p>
                )}
              </CardHeader>
              <CardContent className="p-6">
                {module.richContent && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Detaylı İçerik</h4>
                    {isEditing ? (
                      <textarea
                        className="w-full bg-background border border-input rounded px-3 py-2 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        value={module.richContent}
                        onChange={(e) => {
                          if (!content) return;
                          const newContent = { ...content };
                          newContent.modules[index] = { ...newContent.modules[index], richContent: e.target.value };
                          setContent(newContent);
                        }}
                        rows={6}
                        placeholder="Markdown formatında zengin içerik..."
                      />
                    ) : (
                      <div className="bg-muted/30 rounded p-4 text-sm whitespace-pre-wrap">
                        {module.richContent}
                      </div>
                    )}
                  </div>
                )}
                
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Dersler ({module.lessons.length})
                  </h4>
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex-1">
                        <h5 className="font-medium">
                          {isEditing ? (
                            <input
                              className="bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 w-full"
                              value={lesson.title}
                              onChange={(e) => {
                                if (!content) return;
                                const newContent = { ...content };
                                newContent.modules[index].lessons[lessonIndex] = { 
                                  ...newContent.modules[index].lessons[lessonIndex], 
                                  title: e.target.value 
                                };
                                setContent(newContent);
                              }}
                            />
                          ) : (
                            lesson.title
                          )}
                        </h5>
                        <p className="text-sm text-muted-foreground">
                          {isEditing ? (
                            <input
                              className="bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 w-full"
                              value={lesson.summary}
                              onChange={(e) => {
                                if (!content) return;
                                const newContent = { ...content };
                                newContent.modules[index].lessons[lessonIndex] = { 
                                  ...newContent.modules[index].lessons[lessonIndex], 
                                  summary: e.target.value 
                                };
                                setContent(newContent);
                              }}
                              placeholder="Ders özeti..."
                            />
                          ) : (
                            lesson.summary
                          )}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={lesson.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <FileText className="h-4 w-4 mr-2" />
                          PDF
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quiz Section */}
        {content.quiz.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Mini Sınav ({content.quiz.length} Soru)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.quiz.map((question, index) => (
                <div key={question.id} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">
                    {isEditing ? (
                      <input
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                        value={question.question}
                        onChange={(e) => {
                          if (!content) return;
                          const newContent = { ...content };
                          newContent.quiz[index] = { ...newContent.quiz[index], question: e.target.value };
                          setContent(newContent);
                        }}
                      />
                    ) : (
                      `${index + 1}. ${question.question}`
                    )}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {question.choices.map((choice, choiceIndex) => (
                      <div key={choiceIndex} className="flex items-center gap-2">
                        <Badge variant={choiceIndex === question.answerIndex ? "default" : "outline"} className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                          {String.fromCharCode(65 + choiceIndex)}
                        </Badge>
                        {isEditing ? (
                          <input
                            className="flex-1 bg-transparent border border-input rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                            value={choice}
                            onChange={(e) => {
                              if (!content) return;
                              const newContent = { ...content };
                              const newChoices = [...newContent.quiz[index].choices];
                              newChoices[choiceIndex] = e.target.value;
                              newContent.quiz[index] = { ...newContent.quiz[index], choices: newChoices };
                              setContent(newContent);
                            }}
                          />
                        ) : (
                          <span className="flex-1">{choice}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link to={`/kategori/${slug}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kategori Sayfasına Dön
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryEducation;