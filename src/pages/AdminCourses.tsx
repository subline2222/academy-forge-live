import { useCallback, useEffect, useMemo, useState } from "react";
import { categories, type Category } from "@/data/categories";
import { getCourseContentForSlug, saveCustomContent, deleteCustomContent, type CourseContent } from "@/data/learning";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CourseList from "@/components/admin/CourseList";
import CourseEditPanel from "@/components/admin/CourseEditPanel";
import CourseAddPanel from "@/components/admin/CourseAddPanel";
import DefaultMessage from "@/components/admin/DefaultMessage";

const AdminCourses = () => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [content, setContent] = useState<CourseContent | undefined>(undefined);

  useEffect(() => {
    document.title = "Kurs Yönetimi | Admin | Akademi Danışmanlık";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Admin: Kurs içerikleri, ders PDF'leri ve mini sınavları yönetin.");
  }, []);

  const selectedCategory: Category | undefined = useMemo(() => {
    return categories.find(c => c.slug === selectedSlug);
  }, [selectedSlug]);

  const handleSelectCourse = useCallback((slug: string) => {
    const { content } = getCourseContentForSlug(slug);
    setSelectedSlug(slug);
    setContent(JSON.parse(JSON.stringify(content)) as CourseContent);
    setShowAddPanel(false);
  }, []);

  const handleAddCourse = useCallback(() => {
    setSelectedSlug(null);
    setContent(undefined);
    setShowAddPanel(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!selectedSlug || !content) return;
    saveCustomContent(selectedSlug, content);
    alert("Kaydedildi");
  }, [selectedSlug, content]);

  const handleDelete = useCallback(() => {
    if (!selectedSlug) return;
    deleteCustomContent(selectedSlug);
    alert("Özel içerik silindi");
  }, [selectedSlug]);

  const renderRightPanel = () => {
    if (selectedSlug && content && selectedCategory) {
      return (
        <CourseEditPanel
          slug={selectedSlug}
          category={selectedCategory}
          content={content}
          onChange={setContent}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      );
    }

    if (showAddPanel) {
      return <CourseAddPanel onCancel={() => setShowAddPanel(false)} />;
    }

    return <DefaultMessage />;
  };

  return (
    <main className="container mx-auto px-4 py-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Kurs Yönetimi</h1>
        <p className="text-muted-foreground">Kurs içeriklerini (modül, ders, PDF) ve mini sınavları yönetin.</p>
        <link rel="canonical" href={location.origin + "/admin/egitim"} />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1">
          <CourseList
            selectedSlug={selectedSlug ?? undefined}
            onSelect={handleSelectCourse}
            onAddCourse={handleAddCourse}
          />
        </aside>

        <section className="lg:col-span-2 min-h-[480px]">
          {renderRightPanel()}
        </section>
      </div>
    </main>
  );
};

export default AdminCourses;
