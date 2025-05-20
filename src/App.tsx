import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/layout/Layout';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AttendancePage from './pages/modules/AttendancePage';
import { useAuth } from './contexts/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode,
  requiredRole?: string
}) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  
  return <>{children}</>;
};

// Role-based Routes
const RoleRoutes = () => {
  const { user } = useAuth();
  const role = user?.role || '';

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={
          role === 'admin' ? <AdminDashboard /> :
          role === 'teacher' ? <TeacherDashboard /> :
          <StudentDashboard />
        } />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/schedule" element={<div>Schedule Module</div>} />
        <Route path="/result" element={<div>Results Module</div>} />
        <Route path="/fees" element={<div>Fees Module</div>} />
        <Route path="/course" element={<div>Course Module</div>} />
        <Route path="/hallticket" element={<div>Hall Ticket Module</div>} />
        <Route path="/notices" element={<div>Notices Module</div>} />
        <Route path="/settings" element={<div>Settings Module</div>} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/:role" element={<LoginPage />} />
          <Route path="/:role/*" element={<RoleRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;