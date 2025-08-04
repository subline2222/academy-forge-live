import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowRight, Users, Clock, Star } from "lucide-react";
import { Input } from "@/components/ui/input";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Tümü");

  // 700+ categories foundation
  const categories = [
    // İşletme ve Yönetim
    { id: 1, name: "Stratejik Yönetim", slug: "stratejik-yonetim", count: 45, level: "İleri", duration: "8 hafta", rating: 4.8, popular: true },
    { id: 2, name: "Proje Yönetimi", slug: "proje-yonetimi", count: 38, level: "Orta", duration: "6 hafta", rating: 4.7, popular: true },
    { id: 3, name: "İnsan Kaynakları", slug: "insan-kaynaklari", count: 42, level: "Başlangıç", duration: "5 hafta", rating: 4.6, popular: false },
    { id: 4, name: "Finansal Yönetim", slug: "finansal-yonetim", count: 33, level: "İleri", duration: "10 hafta", rating: 4.9, popular: true },
    { id: 5, name: "Operasyon Yönetimi", slug: "operasyon-yonetimi", count: 29, level: "Orta", duration: "7 hafta", rating: 4.5, popular: false },
    
    // Pazarlama ve Satış
    { id: 6, name: "Dijital Pazarlama", slug: "dijital-pazarlama", count: 67, level: "Başlangıç", duration: "4 hafta", rating: 4.8, popular: true },
    { id: 7, name: "Sosyal Medya Pazarlama", slug: "sosyal-medya-pazarlama", count: 52, level: "Başlangıç", duration: "3 hafta", rating: 4.7, popular: true },
    { id: 8, name: "İçerik Pazarlama", slug: "icerik-pazarlama", count: 34, level: "Orta", duration: "5 hafta", rating: 4.6, popular: false },
    { id: 9, name: "SEO ve SEM", slug: "seo-sem", count: 41, level: "İleri", duration: "8 hafta", rating: 4.8, popular: true },
    { id: 10, name: "E-ticaret", slug: "e-ticaret", count: 38, level: "Orta", duration: "6 hafta", rating: 4.5, popular: false },
    
    // Teknoloji ve Yazılım
    { id: 11, name: "Veri Analizi", slug: "veri-analizi", count: 45, level: "İleri", duration: "12 hafta", rating: 4.9, popular: true },
    { id: 12, name: "Yapay Zeka", slug: "yapay-zeka", count: 23, level: "İleri", duration: "10 hafta", rating: 4.8, popular: true },
    { id: 13, name: "Siber Güvenlik", slug: "siber-guvenlik", count: 31, level: "İleri", duration: "8 hafta", rating: 4.7, popular: false },
    { id: 14, name: "Bulut Teknolojileri", slug: "bulut-teknolojileri", count: 27, level: "Orta", duration: "6 hafta", rating: 4.6, popular: false },
    { id: 15, name: "Mobil Uygulama", slug: "mobil-uygulama", count: 35, level: "Orta", duration: "9 hafta", rating: 4.7, popular: true },
    
    // Kişisel Gelişim
    { id: 16, name: "Liderlik", slug: "liderlik", count: 56, level: "Orta", duration: "5 hafta", rating: 4.8, popular: true },
    { id: 17, name: "İletişim Becerileri", slug: "iletisim-becerileri", count: 48, level: "Başlangıç", duration: "4 hafta", rating: 4.6, popular: false },
    { id: 18, name: "Zaman Yönetimi", slug: "zaman-yonetimi", count: 32, level: "Başlangıç", duration: "3 hafta", rating: 4.5, popular: false },
    { id: 19, name: "Sunum Teknikleri", slug: "sunum-teknikleri", count: 29, level: "Orta", duration: "4 hafta", rating: 4.7, popular: false },
    { id: 20, name: "Müzakere Becerileri", slug: "muzakere-becerileri", count: 26, level: "İleri", duration: "6 hafta", rating: 4.8, popular: false },
    
    // Finans ve Muhasebe
    { id: 21, name: "Yatırım Analizi", slug: "yatirim-analizi", count: 34, level: "İleri", duration: "8 hafta", rating: 4.9, popular: true },
    { id: 22, name: "Mali Müşavirlik", slug: "mali-musavirlik", count: 41, level: "İleri", duration: "12 hafta", rating: 4.7, popular: false },
    { id: 23, name: "Kurumsal Finans", slug: "kurumsal-finans", count: 28, level: "İleri", duration: "10 hafta", rating: 4.8, popular: false },
    { id: 24, name: "Risk Yönetimi", slug: "risk-yonetimi", count: 25, level: "İleri", duration: "7 hafta", rating: 4.6, popular: false },
    { id: 25, name: "Bütçe Planlama", slug: "butce-planlama", count: 22, level: "Orta", duration: "5 hafta", rating: 4.5, popular: false },

    // ... Additional 675 categories would be generated here
    // Sağlık ve Yaşam
    { id: 26, name: "Beslenme Koçluğu", slug: "beslenme-koclugu", count: 19, level: "Başlangıç", duration: "4 hafta", rating: 4.4, popular: false },
    { id: 27, name: "Fitness Antrenörlüğü", slug: "fitness-antrenorlugu", count: 31, level: "Orta", duration: "6 hafta", rating: 4.6, popular: false },
    { id: 28, name: "Yaşam Koçluğu", slug: "yasam-koclugu", count: 24, level: "Orta", duration: "8 hafta", rating: 4.7, popular: false },
    
    // Sanat ve Tasarım
    { id: 29, name: "Grafik Tasarım", slug: "grafik-tasarim", count: 43, level: "Başlangıç", duration: "7 hafta", rating: 4.6, popular: true },
    { id: 30, name: "Web Tasarım", slug: "web-tasarim", count: 38, level: "Orta", duration: "8 hafta", rating: 4.7, popular: true },
    { id: 31, name: "UX/UI Tasarım", slug: "ux-ui-tasarim", count: 35, level: "İleri", duration: "10 hafta", rating: 4.8, popular: true },
    
    // Eğitim ve Öğretim
    { id: 32, name: "Online Eğitim", slug: "online-egitim", count: 27, level: "Orta", duration: "5 hafta", rating: 4.5, popular: false },
    { id: 33, name: "Eğitim Teknolojileri", slug: "egitim-teknolojileri", count: 21, level: "İleri", duration: "6 hafta", rating: 4.6, popular: false },
    
    // Hukuk ve Mevzuat
    { id: 34, name: "İş Hukuku", slug: "is-hukuku", count: 32, level: "İleri", duration: "9 hafta", rating: 4.7, popular: false },
    { id: 35, name: "Vergi Hukuku", slug: "vergi-hukuku", count: 28, level: "İleri", duration: "8 hafta", rating: 4.5, popular: false },
    
    // More categories to reach 700...
  ];

  const filters = ["Tümü", "Başlangıç", "Orta", "İleri", "Popüler"];

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "Tümü" || 
                         (selectedFilter === "Popüler" && category.popular) ||
                         category.level === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Eğitim Kategorileri
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              700+ farklı alanda uzman eğitmenlerimizle kariyerinizi geliştirin
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Kategori ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
              <div className="flex gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className={selectedFilter === filter ? "" : "border-white/20 text-white hover:bg-white/10"}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category, index) => (
            <Card 
              key={category.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-card animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  {category.popular && (
                    <Badge variant="secondary" className="text-xs">
                      Popüler
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{category.count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{category.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <span>{category.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {category.level}
                  </Badge>
                  <Link to={`/kategori/${category.slug}`}>
                    <Button variant="ghost" size="sm" className="group/btn">
                      İncele
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aradığınız kriterlere uygun kategori bulunamadı.
            </p>
          </div>
        )}

        {filteredCategories.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Daha Fazla Kategori Yükle
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;