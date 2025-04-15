
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AuthRoute from "@/components/auth/AuthRoute";

import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import DashboardPage from "./pages/DashboardPage";
import SubstitutionsPage from "./pages/SubstitutionsPage";
import AgendaPage from "./pages/AgendaPage";
import SpacesPage from "./pages/SpacesPage";
import TutoringPage from "./pages/TutoringPage";
import FacultyPage from "./pages/FacultyPage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import DocumentsPage from "./pages/DocumentsPage";
import SchoolDocumentsPage from "./pages/SchoolDocumentsPage";
import SchedulesPage from "./pages/SchedulesPage";
import SchoolInfoPage from "./pages/SchoolInfoPage";
import AiDevelopmentPage from "./pages/AiDevelopmentPage";
import DocumentsDevelopmentPage from "./pages/DocumentsDevelopmentPage";
import ClassroomPlanningPage from "./pages/ClassroomPlanningPage";
import MeetingMinutesPage from "./pages/MeetingMinutesPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import TeacherAssignmentPage from "./pages/TeacherAssignmentPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            } />
            <Route path="/register" element={
              <AuthRoute>
                <RegisterPage />
              </AuthRoute>
            } />
            <Route path="/forgot-password" element={
              <AuthRoute>
                <ForgotPasswordPage />
              </AuthRoute>
            } />
            <Route path="/complete-profile" element={
              <ProtectedRoute>
                <CompleteProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/substitutions" element={
              <ProtectedRoute>
                <SubstitutionsPage />
              </ProtectedRoute>
            } />
            <Route path="/agenda" element={
              <ProtectedRoute>
                <AgendaPage />
              </ProtectedRoute>
            } />
            <Route path="/spaces" element={
              <ProtectedRoute>
                <SpacesPage />
              </ProtectedRoute>
            } />
            <Route path="/tutoring" element={
              <ProtectedRoute>
                <TutoringPage />
              </ProtectedRoute>
            } />
            <Route path="/faculty" element={
              <ProtectedRoute>
                <FacultyPage />
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/documents" element={
              <ProtectedRoute>
                <DocumentsPage />
              </ProtectedRoute>
            } />
            <Route path="/school-documents" element={
              <ProtectedRoute>
                <SchoolDocumentsPage />
              </ProtectedRoute>
            } />
            <Route path="/schedules" element={
              <ProtectedRoute>
                <SchedulesPage />
              </ProtectedRoute>
            } />
            <Route path="/school-info" element={
              <ProtectedRoute>
                <SchoolInfoPage />
              </ProtectedRoute>
            } />
            <Route path="/ai-in-development" element={
              <ProtectedRoute>
                <AiDevelopmentPage />
              </ProtectedRoute>
            } />
            <Route path="/documents-in-development" element={
              <ProtectedRoute>
                <DocumentsDevelopmentPage />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <PlaceholderPage title="Notificacións" />
              </ProtectedRoute>
            } />
            <Route path="/classroom-planning" element={
              <ProtectedRoute>
                <ClassroomPlanningPage />
              </ProtectedRoute>
            } />
            <Route path="/meeting-minutes" element={
              <ProtectedRoute>
                <MeetingMinutesPage />
              </ProtectedRoute>
            } />
            <Route path="/teacher-assignment" element={
              <ProtectedRoute>
                <TeacherAssignmentPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
