import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Star, Users, Award } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import heroAcademy from "@/assets/hero-academy.jpg";

const Hero = () => {
  const heroImages = [
    { src: hero1, alt: "Profesyonel İş Danışmanlığı" },
    { src: hero2, alt: "Strateji Geliştirme Seminerleri" },
    { src: hero3, alt: "Dijital Pazarlama Eğitimleri" },
    { src: heroAcademy, alt: "Akademi Danışmanlık" }
  ];

  const stats = [
    { icon: Users, label: "Mutlu Müşteri", value: "1000+" },
    { icon: Award, label: "Başarılı Proje", value: "500+" },
    { icon: Star, label: "Uzman Danışman", value: "50+" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <Carousel 
          className="w-full h-full"
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-secondary/20 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute bottom-32 left-10 w-16 h-16 bg-accent/30 rounded-full animate-float delay-1000 hidden lg:block"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-light/20 border border-primary-light/30 rounded-full px-4 py-2 mb-6 animate-slide-up">
              <Star className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-primary-foreground">
                Türkiye'nin Önde Gelen Akademi Danışmanlığı
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-up delay-200">
              Kariyerinizi{" "}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Şekillendirin
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-primary-foreground/90 mb-8 max-w-2xl animate-slide-up delay-300">
              Uzman danışmanlarımızla eğitim hedeflerinizi belirleyin, kariyer planınızı oluşturun 
              ve başarıya giden yolda güvenle ilerleyin.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up delay-500">
              <Button variant="gradient" size="xl" className="group">
                Ücretsiz Danışmanlık Alın
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Eğitim Programlarını İncele
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="text-center animate-scale-in"
                  style={{ animationDelay: `${600 + index * 200}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-3">
                    <stat.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="lg:justify-self-end">
            <div className="grid gap-6 max-w-md mx-auto lg:mx-0">
              {/* Feature Card 1 */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 animate-slide-up delay-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-foreground mb-1">
                      Sertifikalı Eğitimler
                    </h3>
                    <p className="text-sm text-primary-foreground/80">
                      Uluslararası geçerliliğe sahip sertifikalar
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 animate-slide-up delay-900">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-foreground mb-1">
                      Uzman Kadro
                    </h3>
                    <p className="text-sm text-primary-foreground/80">
                      Alanında uzman danışmanlar eşliğinde
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 animate-slide-up delay-1100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-foreground mb-1">
                      Kişisel Rehberlik
                    </h3>
                    <p className="text-sm text-primary-foreground/80">
                      Size özel kariyer planlaması hizmeti
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;