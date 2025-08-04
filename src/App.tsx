import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Menu } from "lucide-react";
import Index from "./pages/Index";
import TemplatePage from "./pages/TemplatePage";
import RoomPage from "./pages/RoomPage";
import Templates from "./pages/Templates";
import About from "./pages/About";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              {/* Global header with trigger */}
              <header className="h-12 flex items-center border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
                <SidebarTrigger className="mr-2">
                  <Menu className="w-4 h-4" />
                </SidebarTrigger>
                <span className="text-sm text-muted-foreground">Kardiverse D6 Room Integration</span>
              </header>
              
              {/* Main content with background */}
              <main 
                className="flex-1 relative"
                style={{
                  backgroundImage: `url('/lovable-uploads/aa48caa8-1efa-4e22-9c53-8dae5b2aaab3.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/70 to-background/60" />
                <div className="relative z-10">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/template/:templateId" element={<TemplatePage />} />
                    <Route path="/template/:templateId/room/:roomType" element={<RoomPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
