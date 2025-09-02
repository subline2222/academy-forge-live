import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function CourseDetailByCategoryPage() {
  const { kategori, egitimAdi } = useParams();

  const title = useMemo(() => (egitimAdi ?? "").split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" "), [egitimAdi]);

  useEffect(() => {
    document.title = `${title || "Kurs"} – Akademi Danışmanlık`;
  }, [title]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/kurslar">Kurslar</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/kategoriler/${kategori}`}>{kategori}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground mb-6">Kategori: {kategori}</p>

            <div className="flex gap-3">
              <Link to="/kurslar/kurs-template">
                <Button>Bu kurs için şablonu kullan</Button>
              </Link>
              <Link to={`/kategoriler/${kategori}/egitim`}>
                <Button variant="outline">Kategori eğitimlerine dön</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}