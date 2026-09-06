import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { BTPProject, CompanySettings } from '../../types';
import { 
  ArrowLeft, MapPin, Calendar, Building2, User, 
  Maximize, DollarSign, Hammer, MessageSquare, Phone, CheckCircle2 
} from 'lucide-react';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug, onNavigate }) => {
  const [project, setProject] = useState<BTPProject | undefined>(undefined);
  const [settings, setSettings] = useState<CompanySettings>(store.getSettings());
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  useEffect(() => {
    setProject(store.getProjectBySlug(slug));
    setSettings(store.getSettings());
  }, [slug]);

  if (!project) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Projet non trouvé</h2>
        <button onClick={() => onNavigate('/projets')} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs">
          Retour aux projets
        </button>
      </div>
    );
  }

  const formatWhatsAppUrl = () => {
    const cleanNum = settings.whatsapp.replace(/[^0-9]/g, '');
    const msg = `Bonjour, je souhaite me renseigner sur le projet BTP : ${project.title}`;
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      <button 
        onClick={() => onNavigate('/projets')} 
        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour aux projets BTP</span>
      </button>

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
            {project.project_type}
          </span>
          <span className="bg-amber-500/20 text-amber-400 font-mono text-xs px-3 py-1 rounded-full border border-amber-500/30">
            Statut : {project.status}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black">{project.title}</h1>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
          <span className="flex items-center">
            <MapPin className="w-4 h-4 text-amber-400 mr-1" />
            {project.location}
          </span>
          <span className="flex items-center">
            <User className="w-4 h-4 text-brand-400 mr-1" />
            Maitre d'ouvrage : {project.client}
          </span>
          <span className="flex items-center">
            <Calendar className="w-4 h-4 text-emerald-400 mr-1" />
            Planning : {project.start_date} → {project.end_date}
          </span>
        </div>
      </div>

      {/* Gallery */}
      <div className="space-y-3">
        <div className="h-[420px] rounded-3xl overflow-hidden shadow-lg bg-slate-950">
          <img 
            src={project.images[selectedImgIdx]?.image_url || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80"} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 space-y-6">
          
          {/* Progress Bar Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-800">État d'avancement du chantier</span>
              <span className="text-brand-600 text-lg font-mono">{project.progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-brand-500 to-amber-500 h-3 rounded-full" 
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Présentation Technique & Descriptif
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Technical Specs */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">
              Spécifications du Projet
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Nombre d'étages</span>
                <span className="font-bold text-slate-900">{project.floors} niveau(x)</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Surface bâtie</span>
                <span className="font-bold text-slate-900">{project.surface} m²</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Budget global</span>
                <span className="font-bold text-amber-600 font-mono">{project.budget ? `${project.budget.toLocaleString('fr-FR')} FCFA` : 'N/A'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Statut BTP</span>
                <span className="font-bold text-emerald-600">{project.status}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Demande de Renseignements BTP
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Vous représentez un maître d'ouvrage ou souhaitez des précisions sur cette réalisation ?
            </p>

            <a
              href={formatWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 text-xs transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contacter le chef de projet</span>
            </a>

            <button
              onClick={() => onNavigate('/contact')}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 text-xs transition"
            >
              <Phone className="w-4 h-4" />
              <span>Demander un devis BTP</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
