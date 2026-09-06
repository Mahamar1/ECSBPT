import React from 'react';
import { 
  Building2, Hammer, FileText, Mail, Eye, TrendingUp, Users, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid 
} from 'recharts';
import { store } from '../../services/store';

interface DashboardOverviewProps {
  onSelectTab: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onSelectTab }) => {
  const properties = store.getProperties();
  const projects = store.getProjects();
  const publications = store.getPublications();
  const inquiries = store.getInquiries();

  const totalProperties = properties.length;
  const availableProperties = properties.filter(p => p.status === 'Disponible').length;
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'En cours').length;
  const totalPublications = publications.length;
  const pendingInquiries = inquiries.filter(i => i.status === 'Nouveau').length;

  // Chart seed data
  const visitData = [
    { name: 'Lun', visites: 240, vuesBiens: 180, demandes: 12 },
    { name: 'Mar', visites: 320, vuesBiens: 250, demandes: 19 },
    { name: 'Mer', visites: 450, vuesBiens: 310, demandes: 28 },
    { name: 'Jeu', visites: 380, vuesBiens: 290, demandes: 22 },
    { name: 'Ven', visites: 520, vuesBiens: 410, demandes: 35 },
    { name: 'Sam', visites: 610, vuesBiens: 480, demandes: 42 },
    { name: 'Dim', visites: 490, vuesBiens: 390, demandes: 30 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-amber-500/10 text-amber-400 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20">
            Panneau de Contrôle Entreprise
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            Tableau de Bord - Sama BTP Immo
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Gérez vos biens, vos chantiers BTP et vos publications en temps réel.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onSelectTab('property-new')}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition"
          >
            + Nouveau Bien
          </button>
          <button 
            onClick={() => onSelectTab('publication-new')}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition"
          >
            + Publier Article
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Biens Card */}
        <div 
          onClick={() => onSelectTab('properties')}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-amber-400 transition cursor-pointer group"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Biens Immobiliers</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 font-mono">{totalProperties}</span>
            <span className="text-xs text-emerald-600 font-semibold">({availableProperties} disponibles)</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Appartements, villas & terrains à Dakar</p>
        </div>

        {/* Projets BTP Card */}
        <div 
          onClick={() => onSelectTab('projects')}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-brand-500 transition cursor-pointer group"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Projets BTP</span>
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition">
              <Hammer className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 font-mono">{totalProjects}</span>
            <span className="text-xs text-brand-600 font-semibold">({activeProjects} en cours)</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Chantiers R+5, R+11 & aménagements</p>
        </div>

        {/* Articles Card */}
        <div 
          onClick={() => onSelectTab('publications')}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-purple-500 transition cursor-pointer group"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Articles & CMS</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 font-mono">{totalPublications}</span>
            <span className="text-xs text-purple-600 font-semibold">publiés</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Conseils & actualités sur le site</p>
        </div>

        {/* Demandes Card */}
        <div 
          onClick={() => onSelectTab('inquiries')}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-500 transition cursor-pointer group"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Demandes & Visits</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 font-mono">{inquiries.length}</span>
            {pendingInquiries > 0 && (
              <span className="text-xs bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-extrabold">
                {pendingInquiries} nouvelle(s)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-2">Formulaires & demandes WhatsApp</p>
        </div>

      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Visites du Site & Vues des Biens</h3>
              <p className="text-xs text-slate-500">Statistiques de fréquentation des 7 derniers jours</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              +24% cette semaine
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitData}>
                <defs>
                  <linearGradient id="colorVisites" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0c8ce9" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0c8ce9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVues" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="visites" stroke="#0c8ce9" fillOpacity={1} fill="url(#colorVisites)" name="Visiteurs uniques" />
                <Area type="monotone" dataKey="vuesBiens" stroke="#f59e0b" fillOpacity={1} fill="url(#colorVues)" name="Vues fiches biens" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inbox Quick Overview */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Dernières Demandes</h3>
            <button onClick={() => onSelectTab('inquiries')} className="text-xs text-amber-600 font-bold hover:underline">
              Tout voir →
            </button>
          </div>

          <div className="space-y-3">
            {inquiries.slice(0, 4).map((inq) => (
              <div key={inq.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-slate-900">{inq.client_name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    inq.status === 'Nouveau' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {inq.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-1">{inq.message}</p>
                <div className="text-[10px] text-slate-400 font-mono">{inq.phone}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
