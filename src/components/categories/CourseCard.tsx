import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Play, Award, Eye, ShoppingCart } from "lucide-react";

interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  originalPrice: number;
  image: string;
  lessons: number;
  certificate: boolean;
  bestseller: boolean;
}

interface CourseCardProps {
  course: Course;
  index: number;
  onPreview: (courseId: number) => void;
  onPurchase: (courseId: number) => void;
}

export const CourseCard = ({ course, index, onPreview, onPurchase }: CourseCardProps) => {
  return (
    <Card 
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
            onClick={() => onPreview(course.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Önizle
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onPurchase(course.id)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Satın Al
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};