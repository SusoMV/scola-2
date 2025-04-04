
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';
import CompleteProfilePage from '@/pages/CompleteProfilePage';
import AuthRoute from '@/components/auth/AuthRoute';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PlaceholderPage from '@/pages/PlaceholderPage';
import SubstitutionsPage from '@/pages/SubstitutionsPage';
import AgendaPage from '@/pages/AgendaPage';
import SpacesPage from '@/pages/SpacesPage';
import FacultyPage from '@/pages/FacultyPage';
import MessagesPage from '@/pages/MessagesPage';

import { Toaster } from '@/components/ui/toaster';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
          <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />
          <Route path="/forgot-password" element={<AuthRoute><ForgotPasswordPage /></AuthRoute>} />
          <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfilePage /></ProtectedRoute>} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/substitutions" element={<ProtectedRoute><SubstitutionsPage /></ProtectedRoute>} />
          <Route path="/agenda" element={<ProtectedRoute><AgendaPage /></ProtectedRoute>} />
          <Route path="/spaces" element={<ProtectedRoute><SpacesPage /></ProtectedRoute>} />
          <Route path="/faculty" element={<ProtectedRoute><FacultyPage /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
          
          {/* Placeholder routes */}
          <Route path="/profile" element={<ProtectedRoute><PlaceholderPage title="Perfil" /></ProtectedRoute>} />
          <Route path="/school-info" element={<ProtectedRoute><PlaceholderPage title="Datos do centro" /></ProtectedRoute>} />
          <Route path="/schedules" element={<ProtectedRoute><PlaceholderPage title="Horarios" /></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute><PlaceholderPage title="Documentos" /></ProtectedRoute>} />
          
          {/* Fallback routes */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
