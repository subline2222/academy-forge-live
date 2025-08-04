import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Eye, ShoppingCart, Star } from "lucide-react";

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("Tümü");

  // Dynamic data - simulating backend data
  const categories = [
    "Tümü", "İşletme Danışmanlığı", "Eğitim Planlaması", "Kariyer Koçluğu", 
    "Kişisel Gelişim", "Dijital Pazarlama", "Proje Yönetimi"
  ];

  const services = [
    {
      id: 1,
      category: "İşletme Danışmanlığı",
      title: "Stratejik İşletme Danışmanlığı",
      subtitle: "Profesyonel İş Dünyası için",
      description: "İşletmenizin stratejik hedeflerini belirlemek ve sürdürülebilir büyüme sağlamak için uzman danışmanlık hizmeti.",
      originalPrice: 5000,
      currentPrice: 2990,
      badge: "Popüler",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      category: "Eğitim Planlaması",
      title: "Kişisel Eğitim Roadmap'i",
      subtitle: "Bireysel Kariyer Gelişimi",
      description: "Size özel hazırlanan eğitim yol haritası ile hedeflerinize ulaşın. 1:1 mentörlük dahil.",
      originalPrice: 3000,
      currentPrice: 1990,
      badge: "Yeni",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      category: "Kariyer Koçluğu",
      title: "Executive Kariyer Koçluğu",
      subtitle: "Üst Düzey Yöneticiler için",
      description: "C-level pozisyonlar için özel geliştirilmiş kariyer koçluğu programı. Leadership ve stratejik düşünce geliştirme.",
      originalPrice: 8000,
      currentPrice: 4990,
      badge: "Premium",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      category: "Kişisel Gelişim",
      title: "Kişisel Marka Oluşturma",
      subtitle: "Dijital Çağda Kişisel Branding",
      description: "Profesyonel hayatınızda fark yaratacak güçlü kişisel marka stratejinizi geliştirin.",
      originalPrice: 2500,
      currentPrice: 1590,
      badge: "İndirim",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      category: "Dijital Pazarlama",
      title: "Digital Marketing Uzmanlığı",
      subtitle: "Sosyal Medya ve Online Pazarlama",
      description: "Modern pazarlama stratejileri, sosyal medya yönetimi ve online marka geliştirme teknikleri.",
      originalPrice: 4000,
      currentPrice: 2190,
      badge: "Bestseller",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      category: "Proje Yönetimi",
      title: "Agile Proje Yönetimi",
      subtitle: "Modern Proje Yönetim Teknikleri",
      description: "Scrum, Kanban ve modern proje yönetimi metodolojileri ile projelerinizi başarıyla yönetin.",
      originalPrice: 3500,
      currentPrice: 1890,
      badge: "Sertifikalı",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    }
  ];

  const filteredServices = activeCategory === "Tümü" 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Popüler": return "default";
      case "Yeni": return "secondary";
      case "Premium": return "destructive";
      case "İndirim": return "outline";
      default: return "default";
    }
  };

  return (
    <section id="egitimler" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Danışmanlık Hizmetlerimiz
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Uzman kadromuzla size özel geliştirilmiş profesyonel danışmanlık hizmetleri
          </p>
          
          {/* Discount Banner */}
          <div className="inline-flex items-center gap-3 bg-gradient-secondary rounded-full px-6 py-3 mb-8">
            <Star className="w-5 h-5 text-secondary-foreground" />
            <span className="font-semibold text-secondary-foreground">
              Kısa Süreliğine %50 İndirim - Hemen Başvur!
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredServices.map((service, index) => (
            <Card 
              key={service.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-card animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant={getBadgeVariant(service.badge)} className="font-semibold">
                      {service.badge}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-primary font-semibold mb-2">
                    {service.subtitle}
                  </p>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-foreground">
                    {service.currentPrice} TL
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {service.originalPrice} TL
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    İncele
                  </Button>
                  <Button variant="default" size="sm" className="flex-1">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Başvur
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground">
            Tüm Hizmetleri Görüntüle ({services.length} Hizmet)
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;