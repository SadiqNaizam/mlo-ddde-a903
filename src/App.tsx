import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Dashboard from "./pages/Dashboard";
import Loginpage from "./pages/Loginpage";
import Portfoliopage from "./pages/Portfoliopage";
import Settingspage from "./pages/Settingspage";
import Stockdetailpage from "./pages/Stockdetailpage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Dashboard />} />
          <Route path="/loginpage" element={<Loginpage />} />
          <Route path="/portfoliopage" element={<Portfoliopage />} />
          <Route path="/settingspage" element={<Settingspage />} />
          <Route path="/stockdetailpage" element={<Stockdetailpage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
