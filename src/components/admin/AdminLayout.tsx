import React, { useState } from 'react';
import { Menu, LogOut, ExternalLink } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { DashboardOverview } from './DashboardOverview';
import { PropertyManager } from './PropertyManager';
import { ProjectManager } from './ProjectManager';
import { RealizationManager } from './RealizationManager';
import { PublicationManager } from './PublicationManager';
import { ClientManager } from './ClientManager';
import { InquiryInbox } from './InquiryInbox';
import { MediaLibrary } from './MediaLibrary';
import { DocumentManager } from './DocumentManager';
import { SettingsManager } from './SettingsManager';
import { store } from '../../services/store';
import { UserRole } from '../../types';

interface AdminLayoutProps {
  userRole: UserRole;
  userEmail: string;
  onLogout: () => void;
  onNavigatePublic: (path: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  userRole,
  userEmail,
  onLogout,
  onNavigatePublic
}) => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const inquiries = store.getInquiries();
  const unreadInquiries = inquiries.filter(i => i.status === 'Nouveau').length;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Mobile Top Header Bar */}
      <header className="md:hidden bg-slate-900 text-white p-3.5 sticky top-0 z-30 border-b border-slate-800 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-amber-400 border border-slate-700 transition"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="bg-white p-1 rounded-lg">
              <img src="/logo.png" alt="ECS BTP Logo" className="h-6 w-auto object-contain" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">
              ECS BTP Admin
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="bg-amber-500 text-slate-950 text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full uppercase">
            {userRole}
          </span>
          <button
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-red-400 transition"
            title="Déconnexion"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onNavigatePublic={onNavigatePublic}
        userRole={userRole}
        onLogout={onLogout}
        unreadInquiriesCount={unreadInquiries}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-60px)] md:max-h-screen w-full min-w-0 max-w-full">
        
        {/* Desktop Header Bar */}
        <div className="hidden md:flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Espace Entreprise Privé</span>
            <h2 className="text-xl font-black text-slate-900 capitalize">
              {currentTab.replace('-', ' ')}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-600 font-medium">
              Connecté : <strong className="text-slate-900">{userEmail}</strong>
            </span>
            <span className="bg-amber-500 text-slate-950 text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-full uppercase">
              {userRole}
            </span>
          </div>
        </div>

        {/* Tab Content Router */}
        {currentTab === 'dashboard' && <DashboardOverview onSelectTab={(t) => setCurrentTab(t)} />}
        {currentTab === 'properties' && <PropertyManager onSelectTab={(t) => setCurrentTab(t)} />}
        {currentTab === 'property-new' && <PropertyManager onSelectTab={(t) => setCurrentTab(t)} openNewModal={true} />}
        {currentTab === 'projects' && <ProjectManager onSelectTab={(t) => setCurrentTab(t)} />}
        {currentTab === 'project-new' && <ProjectManager onSelectTab={(t) => setCurrentTab(t)} openNewModal={true} />}
        {currentTab === 'realizations' && <RealizationManager />}
        {currentTab === 'publications' && <PublicationManager onSelectTab={(t) => setCurrentTab(t)} />}
        {currentTab === 'publication-new' && <PublicationManager onSelectTab={(t) => setCurrentTab(t)} openNewModal={true} />}
        {currentTab === 'clients' && <ClientManager />}
        {currentTab === 'inquiries' && <InquiryInbox />}
        {currentTab === 'medias' && <MediaLibrary />}
        {currentTab === 'documents' && <DocumentManager />}
        {currentTab === 'statistics' && <DashboardOverview onSelectTab={(t) => setCurrentTab(t)} />}
        {currentTab === 'settings' && <SettingsManager />}

      </main>

    </div>
  );
};
