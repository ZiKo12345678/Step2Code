import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Roadmaps from "./pages/Roadmaps";
import RoadmapView from "./pages/RoadmapView";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import TaskPage from "./pages/TaskPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route
              path="/roadmap/:id"
              element={
                <ProtectedRoute>
                  <RoadmapView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task/:id"
              element={
                <ProtectedRoute>
                  <TaskPage />
                </ProtectedRoute>
              }
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
