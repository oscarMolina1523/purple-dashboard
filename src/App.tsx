
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import KanbanPage from "./pages/KanbanPage";
import TeamPage from "./pages/TeamPage";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/SettingsPage";
import ProjectPage from "./pages/ProjectPage";
import Dashboard from "./pages/Dashboard";

import MainLayout from "./components/Layout/MainLayout";

// Crear la instancia de QueryClient fuera del componente
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            } />
            <Route path="/kanban" element={
              <MainLayout>
                <KanbanPage />
              </MainLayout>
            } />
            <Route path="/team" element={
              <MainLayout>
                <TeamPage />
              </MainLayout>
            } />
            <Route path="/calendar" element={
              <MainLayout>
                <CalendarPage />
              </MainLayout>
            } />
            <Route path="/settings" element={
              <MainLayout>
                <SettingsPage />
              </MainLayout>
            } />
            <Route path="/project/:projectId" element={
              <MainLayout>
                <ProjectPage />
              </MainLayout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
