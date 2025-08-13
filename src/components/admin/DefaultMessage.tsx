import { Card, CardContent } from "@/components/ui/card";

const DefaultMessage = () => (
  <Card>
    <CardContent className="text-center py-16">
      <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-muted" aria-hidden />
      <h3 className="text-xl font-medium mb-2">Kurs Seçin veya Yeni Kurs Ekleyin</h3>
      <p className="text-muted-foreground">
        Sol taraftaki listeden bir kurs seçerek düzenleme yapabilir ya da yeni kurs ekleyebilirsiniz.
      </p>
    </CardContent>
  </Card>
);

export default DefaultMessage;
