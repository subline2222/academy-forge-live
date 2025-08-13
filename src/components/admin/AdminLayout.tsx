import { ReactNode } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

interface AdminLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
}

const AdminLayout = ({ title, description, actions, sidebar, children }: AdminLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        {sidebar}
        <SidebarInset>
          <header className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container flex items-center justify-between h-14">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-1" />
                <div>
                  <h1 className="text-lg font-semibold leading-none tracking-tight">{title}</h1>
                  {description && (
                    <p className="text-sm text-muted-foreground mt-1">{description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">{actions}</div>
            </div>
          </header>
          <div className="container py-6">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
