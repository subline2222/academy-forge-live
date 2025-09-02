import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CreditCard, Shield, Clock, Users, Star, Award, Check, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const CoursePurchase = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    agreeTerms: false,
    agreeMarketing: false
  });

  // Mock course data - Bu gerçek uygulamada API'den gelecek
  const course = {
    id: parseInt(courseId || '1'),
    title: "Dijital Pazarlama Temelleri",
    instructor: "Ahmet Yılmaz",
    duration: "4 hafta",
    students: 450,
    rating: 4.9,
    reviewCount: 150,
    price: 1990,
    originalPrice: 2990,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop",
    lessons: 24,
    certificate: true,
    bestseller: true,
    level: "Başlangıç",
    features: [
      "24 Video Ders",
      "Yaşam Boyu Erişim", 
      "Mobil ve Web Erişim",
      "Sertifika",
      "Topluluk Erişimi",
      "30 Gün Para İade Garantisi"
    ]
  };

  useEffect(() => {
    document.title = `${course.title} - Satın Al | Akademi Danışmanlık`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", `${course.title} kursunu satın alın. Güvenli ödeme ile hemen başlayın.`);
    }
  }, [course.title]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleCheckboxChange = (field: string) => (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handlePurchase = async () => {
    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm zorunlu alanları doldurun.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Kullanım Şartları",
        description: "Kullanım şartlarını kabul etmelisiniz.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Bu noktada Stripe entegrasyonu yapılacak
      // Şimdilik mock işlem
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Ödeme Başarılı!",
        description: "Kursa erişiminiz aktifleştirildi.",
      });
      
      // Kursa yönlendir
      navigate(`/kurs/${courseId}`);
    } catch (error) {
      toast({
        title: "Ödeme Hatası",
        description: "Ödeme işlemi sırasında bir hata oluştu.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const discountPercentage = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <link rel="canonical" href={`${location.origin}/satin-al/${courseId}`} />
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
          <Link to={`/kurs/onizleme/${courseId}`} className="text-muted-foreground hover:text-primary transition-colors">
            Kurs Önizleme
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">Satın Al</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Ödeme Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ad *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange('firstName')}
                      placeholder="Adınız"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Soyad *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange('lastName')}
                      placeholder="Soyadınız"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-posta *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="ornek@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    placeholder="+90 (555) 000 00 00"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={handleCheckboxChange('agreeTerms')}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Kullanım şartlarını kabul ediyorum *
                      </label>
                      <p className="text-xs text-muted-foreground">
                        <Link to="/kullanim-sartlari" className="underline hover:text-primary">
                          Kullanım şartlarını
                        </Link> okudum ve kabul ediyorum.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="marketing"
                      checked={formData.agreeMarketing}
                      onCheckedChange={handleCheckboxChange('agreeMarketing')}
                    />
                    <label
                      htmlFor="marketing"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Pazarlama e-postalarını almak istiyorum
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">Güvenli Ödeme</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        Ödeme bilgileriniz SSL ile şifrelenir ve güvenli olarak işlenir.
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handlePurchase} 
                  disabled={isProcessing}
                  className="w-full" 
                  size="lg"
                >
                  {isProcessing ? (
                    <>İşleniyor...</>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Ödemeyi Tamamla - {course.price} TL
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{course.instructor}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({course.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Kurs Fiyatı</span>
                    <span className="line-through text-muted-foreground">{course.originalPrice} TL</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>İndirim ({discountPercentage}%)</span>
                    <span>-{course.originalPrice - course.price} TL</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Toplam</span>
                    <span>{course.price} TL</span>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300 text-sm">
                    <Info className="h-4 w-4" />
                    <span>30 gün para iade garantisi</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bu kursta neler var?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Öğrenci Sayısı</span>
                  <span className="font-medium">{course.students}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ders Sayısı</span>
                  <span className="font-medium">{course.lessons}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Seviye</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Süre</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link to={`/kurs/onizleme/${courseId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Önizlemeye Dön
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoursePurchase;