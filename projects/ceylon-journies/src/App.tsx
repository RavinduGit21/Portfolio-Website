import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlanYourTrip from "./pages/PlanYourTrip";
import Ella from "./pages/destinations/Ella";
import GalleFort from "./pages/destinations/GalleFort";
import MirissaBeach from "./pages/destinations/MirissaBeach";
import KandyTemple from "./pages/destinations/KandyTemple";
import YalaNationalPark from "./pages/destinations/YalaNationalPark";
import NuwaraEliya from "./pages/destinations/NuwaraEliya";
import Chatbot from "@/components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/plan" element={<PlanYourTrip />} />
            <Route path="/destinations/ella" element={<Ella />} />
            <Route path="/destinations/galle-fort" element={<GalleFort />} />
            <Route path="/destinations/mirissa-beach" element={<MirissaBeach />} />
            <Route path="/destinations/kandy-temple" element={<KandyTemple />} />
            <Route path="/destinations/yala-national-park" element={<YalaNationalPark />} />
            <Route path="/destinations/nuwara-eliya" element={<NuwaraEliya />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
