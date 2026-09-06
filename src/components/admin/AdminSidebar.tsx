import React from 'react';
import { 
  Home, Building2, Hammer, FileText, Users, Mail, 
  Image, FileUp, BarChart2, Settings, Shield, LogOut, ExternalLink, PlusCircle, Award
} from 'lucide-react';
import { UserRole } from '../../types';

interface AdminSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onNavigatePublic: (path: string) => void;
  userRole: UserRole;
  onLogout: () => void;
  unreadInquiriesCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  onNavigatePublic,
  userRole,
  onLogout,
  unreadInquiriesCount
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    
    // SECTION IMMOBILIER
    { id: 'properties', label: 'Biens immobiliers', icon: Building2 },
    { id: 'property-new', label: '+ Ajouter un bien', icon: PlusCircle, isSub: true },

    // SECTION BTP
    { id: 'projects', label: 'Projets BTP', icon: Hammer },
    { id: 'project-new', label: '+ Ajouter un projet', icon: PlusCircle, isSub: true },
    { id: 'realizations', label: 'Réalisations BTP', icon: Award },

    // SECTION PUBLICATIONS / CMS
    { id: 'publications', label: 'Publications CMS', icon: FileText },
    { id: 'publication-new', label: '+ Nouvelle publication', icon: PlusCircle, isSub: true },

    // CLIENTS & MESSAGES
    { id: 'clients', label: 'Clients & Prospects', icon: Users },
    { id: 'inquiries', label: 'Demandes & Messages', icon: Mail, badge: unreadInquiriesCount },

    // MEDIA & DOCS
    { id: 'medias', label: 'Médiathèque', icon: Image },
    { id: 'documents', label: 'Documents', icon: FileUp },

    // STATS & SETTINGS
    { id: 'statistics', label: 'Statistiques & Vues', icon: BarChart2 },
    { id: 'settings', label: 'Paramètres Entreprise', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      
      {/* Top Header */}
      <div>
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
            <div className="bg-white p-1 rounded-xl shadow-md flex items-center justify-center">
              <img src="/logo.png" alt="ECS BTP Logo" className="h-8 w-auto object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-white text-sm tracking-tight block">
                ECS BTP Admin
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-semibold uppercase">
                {userRole}
              </span>
            </div>
          </div>

        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
          {menuItems.map((item) => {
            const IconComp = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  item.isSub ? 'pl-8 text-slate-400 hover:text-white' : ''
                } ${
                  isActive 
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          onClick={() => onNavigatePublic('/')}
          className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 rounded-xl border border-slate-700 transition"
        >
          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          <span>Voir le site public</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 bg-slate-950 hover:bg-red-950/40 text-slate-400 hover:text-red-400 text-xs font-semibold py-2 rounded-xl transition border border-slate-800"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Déconnexion</span>
        </button>
      </div>

    </aside>
  );
};
