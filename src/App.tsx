import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Categories from "./pages/categories/CategoriesPage";
import CategoryDetail from "./pages/categories/CategoryDetailPage";
import Seminars from "./pages/Seminars";
import NotFound from "./pages/NotFound";
import Panel from "./pages/Panel";
import Course from "./pages/courses/CoursePage";
import Admin from "./pages/admin/AdminPage";
import AdminCourses from "./pages/admin/AdminCoursesPage";
import CategoryEducation from "./pages/categories/CategoryEducationPage";
import CoursePreview from "./pages/courses/CoursePreviewPage";
import CoursePurchase from "./pages/courses/CoursePurchasePage";
 
const queryClient = new QueryClient();
 
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kategoriler" element={<Categories />} />
          <Route path="/kategori/:slug" element={<CategoryDetail />} />
          <Route path="/seminerler" element={<Seminars />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/kurs/:slug" element={<Course />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/egitim" element={<AdminCourses />} />
          <Route path="/kategoriler/:slug/egitim" element={<CategoryEducation />} />
          <Route path="/kurs/onizleme/:courseId" element={<CoursePreview />} />
          <Route path="/satin-al/:courseId" element={<CoursePurchase />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
 
export default App;
