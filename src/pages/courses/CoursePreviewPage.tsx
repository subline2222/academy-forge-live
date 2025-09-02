import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Users, Star, Play, Award, BookOpen, CheckCircle, Lock, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CoursePreview = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor'>('overview');

  // Mock course data - Bu gerçek uygulamada API'den gelecek
  const course = {
    id: parseInt(courseId || '1'),
    title: "Dijital Pazarlama Temelleri",
    instructor: "Ahmet Yılmaz",
    instructorBio: "10+ yıl dijital pazarlama deneyimi olan uzman eğitmen",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    duration: "4 hafta",
    students: 450,
    rating: 4.9,
    reviewCount: 150,
    price: 1990,
    originalPrice: 2990,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop",
    lessons: 24,
    certificate: true,
    bestseller: true,
    level: "Başlangıç",
    language: "Türkçe",
    description: "Dijital pazarlama dünyasına adım atmak isteyenler için kapsamlı bir başlangıç kursu. Bu kurs ile modern pazarlama stratejilerini öğrenecek, Google Ads ve sosyal medya reklamcılığında temel bilgiler edineceksiniz.",
    learningOutcomes: [
      "Dijital pazarlama temel kavramlarını öğreneceksiniz",
      "Google Ads kampanyaları kurabileceksiniz", 
      "Sosyal medya pazarlama stratejileri geliştirebileceksiniz",
      "Web analytics araçlarını kullanabileceksiniz",
      "ROI hesaplamaları yapabileceksiniz"
    ],
    curriculum: [
      {
        title: "Dijital Pazarlamaya Giriş",
        lessons: ["Dijital pazarlama nedir?", "Geleneksel vs dijital pazarlama", "Pazarlama kanalları"],
        duration: "45 dk",
        preview: true
      },
      {
        title: "Google Ads Temelleri",
        lessons: ["Google Ads hesabı açma", "Anahtar kelime araştırması", "İlk kampanya kurulumu"],
        duration: "60 dk",
        preview: false
      },
      {
        title: "Sosyal Medya Pazarlama",
        lessons: ["Facebook reklamları", "Instagram pazarlama", "LinkedIn B2B pazarlama"],
        duration: "55 dk",
        preview: false
      },
      {
        title: "Analytics ve Ölçümleme",
        lessons: ["Google Analytics kurulumu", "Conversion tracking", "ROI hesaplamaları"],
        duration: "50 dk",
        preview: false
      }
    ]
  };

  useEffect(() => {
    document.title = `${course.title} - Önizleme | Akademi Danışmanlık`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", `${course.title} kursunu önizleyin. ${course.instructor} eğitmenliğinde ${course.duration} süren kapsamlı eğitim.`);
    }
  }, [course.title, course.instructor, course.duration]);

  const handlePurchase = () => {
    navigate(`/satin-al/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <link rel="canonical" href={`${location.origin}/kurs/onizleme/${courseId}`} />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link to="/kategoriler" className="text-muted-foreground hover:text-primary transition-colors">
            Kategoriler
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/kategori/dijital-pazarlama" className="text-muted-foreground hover:text-primary transition-colors">
            Dijital Pazarlama
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">Kurs Önizleme</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <Card className="overflow-hidden">
              <div className="relative h-64 bg-gradient-to-r from-primary to-primary/80">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/50">
                    <Play className="h-6 w-6 mr-2" />
                    Tanıtım Videosunu İzle
                  </Button>
                </div>
                {course.bestseller && (
                  <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">
                    Bestseller
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <p className="text-muted-foreground text-lg mb-6">{course.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-current text-yellow-500" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-muted-foreground">({course.reviewCount} değerlendirme)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>{course.students} öğrenci</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>

                {/* Tabs */}
                <div className="border-b border-border mb-6">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`py-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === 'overview'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Genel Bakış
                    </button>
                    <button
                      onClick={() => setActiveTab('curriculum')}
                      className={`py-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === 'curriculum'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Müfredat
                    </button>
                    <button
                      onClick={() => setActiveTab('instructor')}
                      className={`py-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === 'instructor'
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Eğitmen
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Bu kursta neler öğreneceksiniz?</h3>
                      <ul className="space-y-3">
                        {course.learningOutcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Kurs İçeriği</h3>
                    {course.curriculum.map((section, index) => (
                      <Card key={index} className="border">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{section.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{section.duration}</span>
                              {section.preview && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Ücretsiz Önizleme
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="flex items-center gap-3 text-sm">
                                {section.preview ? (
                                  <Play className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Lock className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className={section.preview ? "" : "text-muted-foreground"}>
                                  {lesson}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Eğitmeniniz</h3>
                    <div className="flex items-start gap-4">
                      <img 
                        src={course.instructorImage} 
                        alt={course.instructor}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-lg font-semibold">{course.instructor}</h4>
                        <p className="text-muted-foreground">{course.instructorBio}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-foreground">
                      {course.price} TL
                    </span>
                    <span className="text-xl text-muted-foreground line-through">
                      {course.originalPrice} TL
                    </span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">
                    %{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)} indirim
                  </p>
                </div>

                <Button onClick={handlePurchase} className="w-full mb-4" size="lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Şimdi Satın Al
                </Button>

                <Separator className="my-4" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Ders Sayısı</span>
                    <span className="font-medium">{course.lessons} ders</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Süre</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Seviye</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Dil</span>
                    <span className="font-medium">{course.language}</span>
                  </div>
                  {course.certificate && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Sertifika</span>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">Evet</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bu kurs şunları içerir:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Kapsamlı ders materyalleri</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Topluluk erişimi</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Tamamlama sertifikası</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Yaşam boyu erişim</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link to="/kategoriler">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kategorilere Dön
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoursePreview;