import { 
  Phone, 
  Mail, 
  MapPin, 
  GraduationCap,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const quickLinks = [
    { name: "Ana Sayfa", href: "#" },
    { name: "Hakkımızda", href: "#hakkimizda" },
    { name: "Hizmetlerimiz", href: "#hizmetler" },
    { name: "İletişim", href: "#iletisim" },
  ];

  const services = [
    { name: "İşletme Danışmanlığı", href: "#" },
    { name: "Kariyer Koçluğu", href: "#" },
    { name: "Eğitim Planlaması", href: "#" },
    { name: "Kişisel Gelişim", href: "#" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-light/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-3">
                Güncel kalın, fırsatları kaçırmayın!
              </h3>
              <p className="text-primary-foreground/80">
                Eğitim ve kariyer fırsatları, uzman içerikleri ve özel indirimlerden haberdar olun.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="E-posta adresiniz..."
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Button variant="secondary" size="lg" className="whitespace-nowrap">
                Abone Ol
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Akademi Danışmanlık</h2>
                <p className="text-sm text-primary-foreground/80">Eğitim & Kariyer Rehberliği</p>
              </div>
            </div>
            
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Profesyonel gelişiminiz için ihtiyacınız olan tüm eğitim ve danışmanlık hizmetlerini sunuyoruz. 
              Uzman kadromuzla yanınızdayız.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="text-sm">+90 (212) 555-0123</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="text-sm">info@akademidanismanlik.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-0.5" />
                <span className="text-sm">
                  Maslak Mahallesi, Büyükdere Cad.<br />
                  No:123 Şişli/İstanbul
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Hızlı Erişim</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Hizmetlerimiz</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href}
                    className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Certifications */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Bizi Takip Edin</h3>
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:text-secondary-foreground" />
                </a>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-medium mb-4">Sertifikalarımız</h4>
              <div className="space-y-2 text-sm text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>ISO 9001:2015 Kalite Yönetimi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Uluslararası Akreditasyon</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>e-Devlet Entegrasyonu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-light/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-primary-foreground/80">
              © 2024 Akademi Danışmanlık. Tüm hakları saklıdır.
            </div>
            <div className="flex gap-6 text-sm text-primary-foreground/80">
              <a href="#" className="hover:text-secondary transition-colors">
                Gizlilik Politikası
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                Kullanım Şartları
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                Çerez Politikası
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;