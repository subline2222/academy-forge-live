import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, Users, Clock, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";
const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Tümü");
  const [visibleCount, setVisibleCount] = useState(24);

  // Kategoriler artık dinamik veri kaynağından geliyor (src/data/categories)

  const filters = ["Tümü", "Başlangıç", "Orta", "İleri", "Popüler"];

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "Tümü" || 
                         (selectedFilter === "Popüler" && category.popular) ||
                         category.level === selectedFilter;
    return matchesSearch && matchesFilter;
  });
  const visibleCategories = filteredCategories.slice(0, visibleCount);
  useEffect(() => {
    document.title = "Kategoriler – Akademi Danışmanlık";
    setVisibleCount(24);
  }, [selectedFilter, searchTerm]);

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
              {categories.length}+ farklı alanda uzman eğitmenlerimizle kariyerinizi geliştirin
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
          {visibleCategories.map((category, index) => (
            <Card 
              key={category.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-card animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative h-32 overflow-hidden rounded-t-lg">
                  <img
                    src={(category as any).image}
                    alt={`${category.name} kategorisi görseli`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
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

          {visibleCount < filteredCategories.length && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((c) => Math.min(c + 24, filteredCategories.length))}
              >
                Daha Fazla Kategori Yükle
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};

export default Categories;