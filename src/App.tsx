import React, { useState, useEffect } from 'react';
import { Navbar } from './components/public/Navbar';
import { Footer } from './components/public/Footer';
import { HomePage } from './components/public/HomePage';
import { PropertiesPage } from './components/public/PropertiesPage';
import { PropertyDetailPage } from './components/public/PropertyDetailPage';
import { ProjectsPage } from './components/public/ProjectsPage';
import { ProjectDetailPage } from './components/public/ProjectDetailPage';
import { RealizationsPage, RealizationDetailPage } from './components/public/RealizationsPage';
import { PublicationsPage, PublicationDetailPage } from './components/public/PublicationsPage';
import { ServicesPage } from './components/public/ServicesPage';
import { AboutPage } from './components/public/AboutPage';
import { ContactPage } from './components/public/ContactPage';
import { AdminAuth } from './components/admin/AdminAuth';
import { AdminLayout } from './components/admin/AdminLayout';
import { LoadingScreen } from './components/common/LoadingScreen';
import { UserRole } from './types';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Admin Session State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sbi_admin_auth') === 'true';
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    return (localStorage.getItem('sbi_admin_role') as UserRole) || 'SUPER_ADMIN';
  });
  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('sbi_admin_email') || 'admin@ecs-btp.sn';

  });

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLoginSuccess = (email: string, role: UserRole) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserRole(role);
    localStorage.setItem('sbi_admin_auth', 'true');
    localStorage.setItem('sbi_admin_email', email);
    localStorage.setItem('sbi_admin_role', role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sbi_admin_auth');
    localStorage.removeItem('sbi_admin_email');
    localStorage.removeItem('sbi_admin_role');
    handleNavigate('/');
  };

  // Route matching logic
  const renderContent = () => {
    if (currentPath.startsWith('/admin') || currentPath.startsWith('/@dmin-ecsbtp') || currentPath.startsWith('/admin-ecsbtp')) {
      if (!isAuthenticated) {
        return <AdminAuth onLoginSuccess={handleLoginSuccess} onNavigatePublic={handleNavigate} />;
      }
      return (
        <AdminLayout 
          userRole={userRole}
          userEmail={userEmail}
          onLogout={handleLogout}
          onNavigatePublic={handleNavigate}
        />
      );
    }

    if (currentPath === '/') return <HomePage onNavigate={handleNavigate} />;
    if (currentPath === '/a-propos') return <AboutPage onNavigate={handleNavigate} />;
    if (currentPath === '/services') return <ServicesPage onNavigate={handleNavigate} />;
    if (currentPath === '/contact') return <ContactPage />;
    
    if (currentPath === '/biens') return <PropertiesPage onNavigate={handleNavigate} />;
    if (currentPath.startsWith('/biens/')) {
      const slug = currentPath.replace('/biens/', '');
      return <PropertyDetailPage slug={slug} onNavigate={handleNavigate} />;
    }

    if (currentPath === '/projets') return <ProjectsPage onNavigate={handleNavigate} />;
    if (currentPath.startsWith('/projets/')) {
      const slug = currentPath.replace('/projets/', '');
      return <ProjectDetailPage slug={slug} onNavigate={handleNavigate} />;
    }

    if (currentPath === '/realisations') return <RealizationsPage onNavigate={handleNavigate} />;
    if (currentPath.startsWith('/realisations/')) {
      const slug = currentPath.replace('/realisations/', '');
      return <RealizationDetailPage slug={slug} onNavigate={handleNavigate} />;
    }

    if (currentPath === '/publications') return <PublicationsPage onNavigate={handleNavigate} />;
    if (currentPath.startsWith('/publications/')) {
      const slug = currentPath.replace('/publications/', '');
      return <PublicationDetailPage slug={slug} onNavigate={handleNavigate} />;
    }

    return <HomePage onNavigate={handleNavigate} />;
  };

  const isAdminRoute = currentPath.startsWith('/admin') || currentPath.startsWith('/@dmin-ecsbtp') || currentPath.startsWith('/admin-ecsbtp');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

      {!isAdminRoute && <Navbar currentPath={currentPath} onNavigate={handleNavigate} />}
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {!isAdminRoute && <Footer onNavigate={handleNavigate} />}
    </div>
  );

}

export default App;
