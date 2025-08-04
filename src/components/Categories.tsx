import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Code, 
  Heart, 
  Scale, 
  Building, 
  Shield, 
  Users, 
  Brain,
  Target,
  TrendingUp,
  Megaphone,
  Stethoscope,
  Lightbulb,
  Globe,
  Languages,
  ChevronRight
} from "lucide-react";

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  // Dynamic categories data
  const categories = [
    {
      id: 1,
      name: "İşletme Danışmanlığı",
      icon: Briefcase,
      count: 103,
      description: "Stratejik planlama, organizasyon geliştirme ve iş süreçleri optimizasyonu",
      color: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Teknoloji & Dijital",
      icon: Code,
      count: 87,
      description: "Yazılım geliştirme, dijital dönüşüm ve teknoloji stratejileri",
      color: "bg-purple-500",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Sağlık & Yaşam",
      icon: Heart,
      count: 65,
      description: "Sağlık yönetimi, yaşam koçluğu ve wellness programları",
      color: "bg-red-500",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Hukuk & Mevzuat",
      icon: Scale,
      count: 42,
      description: "Hukuki danışmanlık, mevzuat uyumu ve risk yönetimi",
      color: "bg-amber-600",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      name: "Finans & Muhasebe",
      icon: Building,
      count: 78,
      description: "Mali müşavirlik, finansal planlama ve muhasebe danışmanlığı",
      color: "bg-green-600",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      name: "Güvenlik & Risk",
      icon: Shield,
      count: 34,
      description: "Siber güvenlik, risk analizi ve güvenlik danışmanlığı",
      color: "bg-slate-600",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop"
    },
    {
      id: 7,
      name: "İnsan Kaynakları",
      icon: Users,
      count: 92,
      description: "HR stratejileri, yetenek yönetimi ve organizasyon geliştirme",
      color: "bg-cyan-500",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=200&fit=crop"
    },
    {
      id: 8,
      name: "Kişisel Gelişim",
      icon: Brain,
      count: 156,
      description: "Yaşam koçluğu, kişisel gelişim ve motivasyon programları",
      color: "bg-pink-500",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
    },
    {
      id: 9,
      name: "Proje Yönetimi",
      icon: Target,
      count: 67,
      description: "Agile metodolojiler, proje planlama ve süreç yönetimi",
      color: "bg-indigo-500",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop"
    },
    {
      id: 10,
      name: "Pazarlama & Satış",
      icon: TrendingUp,
      count: 73,
      description: "Dijital pazarlama, satış stratejileri ve marka yönetimi",
      color: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop"
    },
    {
      id: 11,
      name: "İletişim & Medya",
      icon: Megaphone,
      count: 45,
      description: "Kurumsal iletişim, medya yönetimi ve halkla ilişkiler",
      color: "bg-teal-500",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop"
    },
    {
      id: 12,
      name: "Sağlık Yönetimi",
      icon: Stethoscope,
      count: 38,
      description: "Sağlık kurumları yönetimi ve sağlık hizmetleri planlaması",
      color: "bg-emerald-500",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop"
    },
    {
      id: 13,
      name: "İnovasyon & AR-GE",
      icon: Lightbulb,
      count: 29,
      description: "İnovasyon yönetimi, AR-GE süreçleri ve teknoloji transferi",
      color: "bg-yellow-500",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=200&fit=crop"
    },
    {
      id: 14,
      name: "Uluslararası İş",
      icon: Globe,
      count: 52,
      description: "Uluslararası ticaret, ihracat danışmanlığı ve global stratejiler",
      color: "bg-blue-600",
      image: "https://images.unsplash.com/photo-1569025690938-a00729c9e0ea?w=300&h=200&fit=crop"
    },
    {
      id: 15,
      name: "Dil & İletişim",
      icon: Languages,
      count: 61,
      description: "Dil eğitimleri, çeviri hizmetleri ve kültürlerarası iletişim",
      color: "bg-violet-500",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop"
    }
  ];

  return (
    <section id="kategoriler" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Danışmanlık Kategorileri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Geniş hizmet yelpazemizde size uygun danışmanlık alanını keşfedin
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              className="group cursor-pointer border-0 overflow-hidden bg-gradient-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Icon */}
                <div className={`absolute top-3 left-3 w-10 h-10 ${category.color} rounded-lg flex items-center justify-center shadow-lg`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>

                {/* Count Badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-foreground font-semibold">
                    {category.count} Hizmet
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {category.name}
                  </h3>
                  <ChevronRight 
                    className={`w-4 h-4 text-muted-foreground transition-all duration-300 ${
                      hoveredCategory === category.id ? 'translate-x-1 text-primary' : ''
                    }`} 
                  />
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {category.description}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 ${category.color.replace('bg-', 'bg-')}`}
                    style={{ width: hoveredCategory === category.id ? '100%' : '60%' }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Popülerlik</span>
                  <span className="font-medium">
                    {hoveredCategory === category.id ? 'Yüksek' : 'Orta'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-hero rounded-2xl p-8 text-primary-foreground">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">
                Hangi kategori size uygun?
              </h3>
              <p className="text-primary-foreground/90 mb-4">
                Uzman danışmanlarımızla ücretsiz görüşme ayarlayın ve size en uygun programı keşfedin
              </p>
            </div>
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105">
              Ücretsiz Danışmanlık Al
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;