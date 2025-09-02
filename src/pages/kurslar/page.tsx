import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, Users, Clock, Star } from "lucide-react";
import { categories } from "@/data/categories";

export default function CoursesIndexPage() {
  const [q, setQ] = useState("");

  useEffect(() => {
    document.title = "Kurslar – Akademi Danışmanlık";
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return categories.slice(0, 24);
    return categories.filter((c) => c.name.toLowerCase().includes(term)).slice(0, 48);
  }, [q]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="container mx-auto px-4 pt-12 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Kurslar</h1>
        <p className="text-muted-foreground mb-6">Kategorilere göre eğitimleri keşfedin.</p>
        <div className="flex gap-3">
          <Input
            placeholder="Kategori ara..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="max-w-md"
          />
          <Link to="/kategoriler" className="ml-auto">
            <Button variant="outline" size="sm">
              Tüm Kategoriler
            </Button>
          </Link>
          <Link to="/kurslar/kurs-template">
            <Button size="sm">
              Kurs Şablonu <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((c) => (
            <Card key={c.slug} className="group overflow-hidden hover:shadow-lg transition-all">
              <CardHeader className="p-0">
                <img src={c.image} alt={`${c.name} kategorisi`} className="h-36 w-full object-cover" loading="lazy" />
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold leading-tight line-clamp-2">{c.name}</h3>
                  {c.popular && <Badge variant="secondary">Popüler</Badge>}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Users className="w-4 h-4" />{c.count * 20}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" />{c.duration}</span>
                  <span className="inline-flex items-center gap-1"><Star className="w-4 h-4 fill-current text-yellow-500" />{c.rating}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Badge variant="outline">{c.level}</Badge>
                  <Link to={`/kategoriler/${c.slug}/egitim`}>
                    <Button size="sm" variant="ghost" className="group-hover:translate-x-0.5 transition-transform">
                      İncele <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}