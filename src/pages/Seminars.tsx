import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Users, Search, Filter, Star } from "lucide-react";

const Seminars = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Tümü");

  const filters = ["Tümü", "Bu Hafta", "Gelecek Hafta", "Bu Ay", "Online", "Yüz Yüze"];

  const seminars = [
    {
      id: 1,
      title: "Dijital Dönüşüm Stratejileri",
      date: "15 Ocak 2024",
      time: "14:00 - 17:00",
      location: "Online",
      type: "Online",
      instructor: "Dr. Mehmet Yılmaz",
      participants: 150,
      maxParticipants: 200,
      price: 299,
      originalPrice: 499,
      category: "Teknoloji",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Girişimcilik ve İnovasyon",
      date: "18 Ocak 2024",
      time: "10:00 - 16:00",
      location: "İstanbul - Levent",
      type: "Yüz Yüze",
      instructor: "Ayşe Demir",
      participants: 45,
      maxParticipants: 50,
      price: 599,
      originalPrice: 899,
      category: "Girişimcilik",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Liderlik ve Takım Yönetimi",
      date: "22 Ocak 2024",
      time: "13:00 - 18:00",
      location: "Ankara - Çankaya",
      type: "Yüz Yüze",
      instructor: "Emre Öztürk",
      participants: 32,
      maxParticipants: 40,
      price: 399,
      originalPrice: 599,
      category: "Liderlik",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",
      featured: true
    },
    {
      id: 4,
      title: "Finansal Okuryazarlık",
      date: "25 Ocak 2024",
      time: "09:00 - 12:00",
      location: "Online",
      type: "Online",
      instructor: "Prof. Dr. Zeynep Kaya",
      participants: 89,
      maxParticipants: 100,
      price: 199,
      originalPrice: 299,
      category: "Finans",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "Sosyal Medya Pazarlama",
      date: "28 Ocak 2024",
      time: "14:00 - 17:00",
      location: "İzmir - Alsancak",
      type: "Yüz Yüze",
      instructor: "Burak Çelik",
      participants: 28,
      maxParticipants: 35,
      price: 349,
      originalPrice: 499,
      category: "Pazarlama",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      featured: false
    },
    {
      id: 6,
      title: "Veri Analizi ve Görselleştirme",
      date: "30 Ocak 2024",
      time: "10:00 - 17:00",
      location: "Online",
      type: "Online",
      instructor: "Dr. Fatma Arslan",
      participants: 67,
      maxParticipants: 80,
      price: 449,
      originalPrice: 699,
      category: "Teknoloji",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      featured: true
    }
  ];

  const filteredSeminars = seminars.filter(seminar => {
    const matchesSearch = seminar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seminar.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "Tümü" || 
                         (selectedFilter === "Online" && seminar.type === "Online") ||
                         (selectedFilter === "Yüz Yüze" && seminar.type === "Yüz Yüze") ||
                         (selectedFilter === "Bu Hafta") || // Would implement date logic
                         (selectedFilter === "Gelecek Hafta") ||
                         (selectedFilter === "Bu Ay");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Seminerler ve Etkinlikler
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Uzman eğitmenlerimizle canlı seminerlere katılın, kariyerinizi bir üst seviyeye taşıyın
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Seminer ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
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

      {/* Seminars Grid */}
      <div className="container mx-auto px-4 py-16">
        {/* Featured Seminars */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Öne Çıkan Seminerler</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {seminars.filter(s => s.featured).map((seminar, index) => (
              <Card 
                key={`featured-${seminar.id}`}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-card animate-scale-in relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="destructive" className="font-semibold">
                    Öne Çıkan
                  </Badge>
                </div>
                
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={seminar.image} 
                      alt={seminar.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">
                    {seminar.category}
                  </Badge>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {seminar.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    Eğitmen: {seminar.instructor}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{seminar.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{seminar.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{seminar.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{seminar.participants}/{seminar.maxParticipants} Katılımcı</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span className="font-semibold">{seminar.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-foreground">
                      {seminar.price} TL
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {seminar.originalPrice} TL
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button variant="default" size="sm" className="w-full">
                    Hemen Kayıt Ol
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* All Seminars */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Tüm Seminerler ({filteredSeminars.length})
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeminars.map((seminar, index) => (
            <Card 
              key={seminar.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-card animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={seminar.image} 
                    alt={seminar.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant={seminar.type === "Online" ? "secondary" : "default"} className="font-semibold">
                      {seminar.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <Badge variant="outline" className="mb-3">
                  {seminar.category}
                </Badge>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {seminar.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  Eğitmen: {seminar.instructor}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{seminar.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{seminar.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{seminar.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{seminar.participants}/{seminar.maxParticipants} Katılımcı</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <span className="font-semibold">{seminar.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-foreground">
                    {seminar.price} TL
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {seminar.originalPrice} TL
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1">
                    Detaylar
                  </Button>
                  <Button variant="default" size="sm" className="flex-1">
                    Kayıt Ol
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredSeminars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aradığınız kriterlere uygun seminer bulunamadı.
            </p>
          </div>
        )}

        {filteredSeminars.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Daha Fazla Seminer Yükle
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seminars;