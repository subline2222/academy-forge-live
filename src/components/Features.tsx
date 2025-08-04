import { Monitor, Award, Globe } from "lucide-react";
import iconOnline from "@/assets/icon-online.jpg";
import iconCertification from "@/assets/icon-certification.jpg";
import iconConsulting from "@/assets/icon-consulting.jpg";

const Features = () => {
  const features = [
    {
      icon: iconOnline,
      iconComponent: Monitor,
      title: "Uzaktan Online Eğitim",
      subtitle: "ile Türkiye'nin Heryerinden Katıl",
      description: "Modern teknoloji ile donatılmış online eğitim platformumuzda, uzman eğitmenlerden canlı dersler alın ve etkileşimli öğrenme deneyimi yaşayın."
    },
    {
      icon: iconCertification,
      iconComponent: Award,
      title: "Üniversite Onaylı",
      subtitle: "ve Geçerli Sertifikalar",
      description: "Eğitimlerimizi başarıyla tamamladığınızda, üniversite ve e-Devlet onaylı, kariyer gelişiminizde fark yaratacak sertifikalar kazanın."
    },
    {
      icon: iconConsulting,
      iconComponent: Globe,
      title: "Uluslararası Akrediteli",
      subtitle: "ve Danışmanlık Hizmeti",
      description: "Uluslararası standartlarda akrediteli programlarımız ve uzman danışmanlarımızla global çapta geçerli eğitimler alın."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Neden Akademi Danışmanlık?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Eğitim ve kariyer hedeflerinizi gerçekleştirmek için ihtiyacınız olan tüm imkanları sunuyoruz
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group text-center animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Icon Container */}
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Icon */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                  <feature.iconComponent className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-primary font-semibold mb-3">
                    {feature.subtitle}
                  </p>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Action Link */}
                <div className="pt-4">
                  <button className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Detaylı Bilgi
                    <span className="w-1 h-1 bg-primary rounded-full group-hover:w-2 transition-all"></span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-card rounded-2xl p-6 shadow-lg">
            <div className="text-left">
              <h3 className="font-semibold text-foreground mb-1">
                Hangi eğitimin size uygun olduğunu merak ediyor musunuz?
              </h3>
              <p className="text-sm text-muted-foreground">
                Uzman danışmanlarımızla ücretsiz görüşme ayarlayın
              </p>
            </div>
            <button className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:shadow-glow transition-all duration-300 hover:scale-105 whitespace-nowrap">
              Hemen Başla
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;