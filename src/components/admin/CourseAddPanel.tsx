import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  onCancel: () => void;
}

const CourseAddPanel = ({ onCancel }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yeni Kurs Ekle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground">
          Bu sürümde kurs listesi kategorilerden oluşur. Yeni kurs ekleme, kategoriler üzerinden yapılmaktadır.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>Vazgeç</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseAddPanel;
