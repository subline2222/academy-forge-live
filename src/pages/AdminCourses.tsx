import { useCallback, useEffect, useMemo, useState } from "react";
import { categories, type Category } from "@/data/categories";
import { getCourseContentForSlug, saveCustomContent, deleteCustomContent, type CourseContent } from "@/data/learning";
import CourseEditPanel from "@/components/admin/CourseEditPanel";
import CourseAddPanel from "@/components/admin/CourseAddPanel";
import DefaultMessage from "@/components/admin/DefaultMessage";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminCourseSidebar from "@/components/admin/AdminCourseSidebar";

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
    <>
      <link rel="canonical" href={location.origin + "/admin/egitim"} />
      <AdminLayout
        title="Kurs Yönetimi"
        description="Kurs içeriklerini (modül, ders, PDF) ve mini sınavları yönetin."
        sidebar={
          <AdminCourseSidebar
            selectedSlug={selectedSlug ?? undefined}
            onSelect={handleSelectCourse}
            onAddCourse={handleAddCourse}
          />
        }
      >
        {renderRightPanel()}
      </AdminLayout>
    </>
  );
};

export default AdminCourses;
