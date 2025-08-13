import { useMemo, useState } from "react";
import { categories, type Category } from "@/data/categories";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface Props {
  selectedSlug?: string;
  onSelect: (slug: string) => void;
  onAddCourse: () => void;
}

const AdminCourseSidebar = ({ selectedSlug, onSelect, onAddCourse }: Props) => {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return categories.filter((c: Category) => c.name.toLowerCase().includes(s)).slice(0, 150);
  }, [q]);

  const btnCls = (active: boolean) =>
    active ? "bg-muted text-primary font-medium" : "hover:bg-muted/50";

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Kurslar</SidebarGroupLabel>
          <SidebarInput
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Kurs veya kategori ara..."
            aria-label="Kurs ara"
          />
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filtered.map((c) => (
                <SidebarMenuItem key={c.slug}>
                  <SidebarMenuButton asChild className={btnCls(selectedSlug === c.slug)}>
                    <button onClick={() => onSelect(c.slug)} aria-label={`Kurs seç: ${c.name}`} className="w-full text-left">
                      <div className="text-sm">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.slug}</div>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button size="sm" variant="secondary" className="w-full" onClick={onAddCourse}>
          Yeni Kurs Ekle
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminCourseSidebar;
