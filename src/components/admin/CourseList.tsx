import { useMemo, useState } from "react";
import { categories, type Category } from "@/data/categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  selectedSlug?: string;
  onSelect: (slug: string) => void;
  onAddCourse: () => void;
}

const CourseList = ({ selectedSlug, onSelect, onAddCourse }: Props) => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return categories.filter((c: Category) => c.name.toLowerCase().includes(s)).slice(0, 100);
  }, [q]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Kurslar</CardTitle>
          <Button size="sm" onClick={onAddCourse}>Yeni Kurs</Button>
        </div>
      </CardHeader>
      <CardContent>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Kurs veya kategori ara..."
          className="w-full rounded-md border bg-background px-3 py-2 mb-3"
          aria-label="Kurs ara"
        />
        <div className="max-h-[560px] overflow-auto space-y-1">
          {filtered.map((c) => (
            <button
              key={c.slug}
              className={`w-full text-left px-3 py-2 rounded-md ${selectedSlug===c.slug?"bg-primary/10 text-primary":"hover:bg-muted"}`}
              onClick={() => onSelect(c.slug)}
              aria-label={`Kurs seç: ${c.name}`}
            >
              <div className="text-sm font-medium">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.slug}</div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseList;
