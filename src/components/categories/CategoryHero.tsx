import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Play, Star } from "lucide-react";
import type { Category } from "@/data/types";

interface CategoryHeroProps {
  category: {
    name: string;
    description: string;
    level: Category["level"];
    totalCourses: number;
    totalStudents: number;
    rating: number;
    image: string;
  };
}

export const CategoryHero = ({ category }: CategoryHeroProps) => {
  return (
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
  );
};