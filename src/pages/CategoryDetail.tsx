import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Users, Star, Play, Download, Award, Eye, ShoppingCart } from "lucide-react";
import { getCategoryBySlug } from "@/data/categories";
import { useToast } from "@/hooks/use-toast";
const CategoryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const baseCategory = getCategoryBySlug(slug ?? "");
  useEffect(() => {
    document.title = baseCategory
      ? `${baseCategory.name} – Akademi Danışmanlık`
      : "Kategori Bulunamadı – Akademi Danışmanlık";
  }, [baseCategory]);

  if (!baseCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 py-16">
          <Link to="/kategoriler">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kategorilere Dön
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-4">Kategori bulunamadı</h1>
          <p className="text-muted-foreground">Aradığınız kategori mevcut değil.</p>
        </div>
      </div>
    );
  }

  const category = {
    name: baseCategory.name,
    description: `${baseCategory.name} alanında eğitimler ve danışmanlık`,
    level: baseCategory.level,
    totalCourses: baseCategory.count,
    totalStudents: baseCategory.count * 20,
    rating: baseCategory.rating,
    image: baseCategory.image
  };
  const courses = [
    {
      id: 1,
      title: "Dijital Pazarlama Temelleri",
      instructor: "Ahmet Yılmaz",
      duration: "4 hafta",
      students: 450,
      rating: 4.9,
      price: 1990,
      originalPrice: 2990,
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop",
      lessons: 24,
      certificate: true,
      bestseller: true
    },
    {
      id: 2,
      title: "Google Ads Uzmanlığı",
      instructor: "Elif Demir",
      duration: "6 hafta",
      students: 320,
      rating: 4.8,
      price: 2490,
      originalPrice: 3490,
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=250&fit=crop",
      lessons: 36,
      certificate: true,
      bestseller: false
    },
    {
      id: 3,
      title: "Facebook ve Instagram Reklamcılığı",
      instructor: "Mehmet Öz",
      duration: "5 hafta",
      students: 280,
      rating: 4.7,
      price: 1790,
      originalPrice: 2490,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      lessons: 30,
      certificate: true,
      bestseller: false
    },
    {
      id: 4,
      title: "İçerik Pazarlama Stratejileri",
      instructor: "Ayşe Kaya",
      duration: "7 hafta",
      students: 200,
      rating: 4.6,
      price: 2190,
      originalPrice: 2990,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      lessons: 42,
      certificate: true,
      bestseller: false
    }
  ];

  const handlePreview = useCallback((courseId: number) => {
    navigate(`/kurs/onizleme/${courseId}`);
  }, [navigate]);

  const handlePurchase = useCallback((courseId: number) => {
    navigate(`/satin-al/${courseId}`);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <div className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-16">
          <Link to="/kategoriler">
            <Button variant="ghost" size="sm" className="mb-6 text-primary-foreground hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kategorilere Dön
            </Button>
          </Link>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {category.name}
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              {category.description}
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{category.totalStudents} Katılımcı</span>
              </div>
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                <span>{category.totalCourses} Eğitim</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current text-yellow-400" />
                <span>{category.rating} Puan</span>
              </div>
              <Badge variant="secondary">
                {category.level}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Eğitimler ({courses.length})
          </h2>
          <p className="text-muted-foreground">
            {category.name} kategorisindeki tüm eğitimler
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card 
              key={course.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-card animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {course.bestseller && (
                      <Badge variant="destructive" className="font-semibold">
                        Bestseller
                      </Badge>
                    )}
                    {course.certificate && (
                      <Badge variant="secondary" className="font-semibold">
                        <Award className="w-3 h-3 mr-1" />
                        Sertifikalı
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Eğitmen: {course.instructor}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    <span>{course.lessons} Ders</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-500" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-foreground">
                    {course.price} TL
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {course.originalPrice} TL
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <div className="flex gap-2 w-full">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handlePreview(course.id)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Önizle
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handlePurchase(course.id)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Satın Al
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Daha Fazla Eğitim Yükle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;