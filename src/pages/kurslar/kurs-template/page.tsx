import { useEffect } from "react";

export default function CourseTemplatePage() {
  useEffect(() => {
    document.title = "Kurs Şablonu – Akademi Danışmanlık";
  }, []);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Kurs Şablonu</h1>
      <p className="text-muted-foreground mb-8">Yeni kurs sayfaları için başlangıç şablonu.</p>

      <section className="prose max-w-none dark:prose-invert">
        <h2>Başlık</h2>
        <p>Kursun kısa ve net bir açıklaması. Eğitmen, süre, seviye, kazanımlar.</p>
        <h3>Öne Çıkanlar</h3>
        <ul>
          <li>Video ders sayısı</li>
          <li>Sertifika bilgisi</li>
          <li>İçerik modülleri</li>
          <li>Örnek proje/ödevler</li>
        </ul>
        <h3>Çağrı Alanı</h3>
        <p>Satın al veya önizleme aksiyonları için butonlar.</p>
      </section>
    </main>
  );
}