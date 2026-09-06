import React, { useState } from 'react';
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
  const inquiries = store.getInquiries();
  const unreadInquiries = inquiries.filter(i => i.status === 'Nouveau').length;

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onNavigatePublic={onNavigatePublic}
        userRole={userRole}
        onLogout={onLogout}
        unreadInquiriesCount={unreadInquiries}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        
        {/* Top Header Bar */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">Espace Entreprise Privé</span>
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
