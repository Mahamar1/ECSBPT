import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { BTPProject } from '../../types';
import { Building2, Calendar, MapPin, Hammer, ArrowRight, Search, CheckCircle2 } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<BTPProject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');

  useEffect(() => {
    const load = () => {
      setProjects(store.getProjects().filter(p => p.published));
    };
    load();
    return store.subscribe(load);
  }, []);

  const typesList = ['Tous', 'Villa', 'Immeuble', 'R+1', 'R+2', 'R+5', 'R+10', 'R+11', 'Résidence', 'Bureau', 'Commerce', 'Lotissement', 'Rénovation'];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Tous' || p.project_type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800">
        <span className="text-brand-400 text-xs font-bold uppercase tracking-widest bg-brand-400/10 px-3 py-1 rounded-full border border-brand-400/20">
          Chantiers & Génie Civil
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
          Nos Projets BTP en Construction
        </h1>
        <p className="text-slate-300 text-sm mt-2 max-w-2xl">
          Supervision et avancée technique des chantiers de construction d'immeubles R+5, R+11, résidences et bâtiments industriels au Sénégal.
        </p>

        {/* Filter Bar */}
        <div className="mt-8 bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input 
              type="text"
              placeholder="Rechercher par nom, client, ville..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-400"
            />
          </div>

          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-400"
            >
              {typesList.map(t => (
                <option key={t} value={t}>Type de construction: {t}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProjects.map((proj) => (
          <div 
            key={proj.id}
            onClick={() => onNavigate(`/projets/${proj.slug}`)}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={proj.images[0]?.image_url || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80"} 
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {proj.project_type}
                </div>
                <div className="absolute top-3 right-3 bg-slate-950/80 text-amber-400 text-xs font-mono font-semibold px-2.5 py-1 rounded-lg">
                  {proj.status}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-xs text-slate-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-brand-600" />
                  <span>{proj.location}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition line-clamp-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  {proj.description}
                </p>

                {/* Progress */}
                <div className="mt-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Progression globale</span>
                    <span className="text-brand-600 font-mono">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-brand-500 to-amber-500 h-2 rounded-full" 
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-100 pt-3">
                <span>Client : <strong className="text-slate-800">{proj.client}</strong></span>
                <span className="font-semibold text-brand-600 group-hover:underline">Consulter →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
