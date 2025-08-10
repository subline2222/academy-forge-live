import { useEffect, useMemo, useState } from "react";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { enrollInCourse, getEnrollments, type EnrollmentMap } from "@/data/learning";

const PAGE_SIZE = 24;

const Panel = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const enrollments = getEnrollments();

  useEffect(() => {
    document.title = "Eğitim Merkezi | Akademi Danışmanlık";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Eğitim Merkezi: Katalogdan kurs seçin, başlayın ve ilerlemenizi takip edin.");
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return categories.filter(c => c.name.toLowerCase().includes(q));
  }, [query]);

  const handleEnroll = (slug: string) => {
    enrollInCourse(slug);
    navigate(`/kurs/${slug}`);
  };

  const myCourses = useMemo(() => Object.keys(enrollments), [enrollments]);

  return (
    <main className="container mx-auto px-4 py-10 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Eğitim Merkezi</h1>
        <p className="text-muted-foreground">Katalogdan kurs seçin, kaydolun ve ilerleyin.</p>
        <link rel="canonical" href={location.origin + "/panel"} />
      </header>

      <Tabs defaultValue="katalog">
        <TabsList>
          <TabsTrigger value="katalog">Katalog</TabsTrigger>
          <TabsTrigger value="egitimlerim">Eğitimlerim</TabsTrigger>
        </TabsList>

        <TabsContent value="katalog" className="mt-6">
          <div className="flex items-center gap-3 mb-6">
            <input
              className="w-full md:w-1/2 rounded-md border bg-background px-3 py-2"
              placeholder="Kategori ara..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Kategori ara"
            />
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.slice(0, visible).map((c) => (
              <Card key={c.id} className="hover-scale">
                <CardHeader>
                  <CardTitle className="text-lg">{c.name}</CardTitle>
                  <CardDescription>
                    {c.level} • {c.duration} • {c.count} içerik
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={c.image}
                    alt={`${c.name} eğitim kategorisi görseli`}
                    loading="lazy"
                    className="w-full h-36 object-cover rounded-md mb-4"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Puan: {c.rating}</span>
                    <Button size="sm" onClick={() => handleEnroll(c.slug)}>Kursa Başla</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {visible < filtered.length && (
            <div className="flex justify-center mt-6">
              <Button variant="outline" onClick={() => setVisible(v => v + PAGE_SIZE)}>Daha Fazla Yükle</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="egitimlerim" className="mt-6">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {myCourses.length === 0 && (
              <p className="text-muted-foreground">Henüz bir eğitime kayıt olmadınız.</p>
            )}
            {myCourses.map((slug) => {
              const c = categories.find(x => x.slug === slug)!;
              const prog = (enrollments as EnrollmentMap)[slug]?.progress;
              return (
                <Card key={slug} className="hover-scale">
                  <CardHeader>
                    <CardTitle className="text-lg">{c?.name ?? slug}</CardTitle>
                    <CardDescription>
                      {prog ? `Modül ${prog.moduleIndex + 1}, Ders ${prog.lessonIndex + 1}` : "Başlamadı"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img src={c.image} alt={`${c.name} eğitim görseli`} className="w-full h-36 object-cover rounded-md mb-4" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Seviye: {c.level}</span>
                      <Button size="sm" onClick={() => navigate(`/kurs/${slug}`)}>Devam Et</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Panel;
