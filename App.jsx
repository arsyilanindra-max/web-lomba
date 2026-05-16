import Navbar from '@/components/Navbar';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'; // ✅ add Outlet
import { ErrorBoundary } from '@/components/ErrorBoundary';
import PageNotFound from './src/lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Splash from '@/pages/Splash';
import Dashboard from '@/pages/Dashboard';
import Education from '@/pages/Education';
import WhatsAppDirectory from '@/pages/WhatsAppDirectory';
import Quiz from '@/pages/Quiz';
import Hotline from '@/pages/Hotline';
import Counseling from '@/pages/Counseling';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Splash />} />

      <Route element={
        <>
          <Navbar />
          <div className="pt-20">
            <Outlet />
          </div>
        </>
      }>
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/education"  element={<Education />} />
        <Route path="/whatsapp"   element={<WhatsAppDirectory />} />
        <Route path="/quiz"       element={<Quiz />} />
        <Route path="/hotline"    element={<Hotline />} />
        <Route path="/counseling" element={<Counseling />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}; 

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;