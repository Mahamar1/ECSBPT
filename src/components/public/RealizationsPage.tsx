import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { Realization } from '../../types';
import { Award, MapPin, Calendar, ArrowRight } from 'lucide-react';

interface RealizationsPageProps {
  onNavigate: (path: string) => void;
}

export const RealizationsPage: React.FC<RealizationsPageProps> = ({ onNavigate }) => {
  const [realizations, setRealizations] = useState<Realization[]>([]);

  useEffect(() => {
    const load = () => {
      setRealizations(store.getRealizations().filter(r => r.published));
    };
    load();
    return store.subscribe(load);
  }, []);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800">
        <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
          Références & Ouvrages Livrés
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
          Nos Réalisations Livrées avec Succès
        </h1>
        <p className="text-slate-300 text-sm mt-2 max-w-2xl">
          Découvrez notre galerie de bâtiments résidentiels, sièges d'entreprises et projets d'infrastructures accomplis au Sénégal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {realizations.map((real) => (
          <div 
            key={real.id}
            onClick={() => onNavigate(`/realisations/${real.slug}`)}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={real.images[0]?.image_url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"} 
                  alt={real.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900 text-amber-400 text-xs font-mono font-bold px-3 py-1 rounded-md">
                  Année {real.year}
                </div>
              </div>

              <div className="p-6 space-y-2">
                <span className="text-xs text-brand-600 font-bold uppercase tracking-wider">
                  {real.realization_type}
                </span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition">
                  {real.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {real.description}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 border-t border-slate-100 pt-3">
                <span className="flex items-center text-slate-500">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  {real.location}
                </span>
                <span className="text-amber-600 group-hover:translate-x-1 transition flex items-center">
                  <span>Voir l'ouvrage</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export const RealizationDetailPage: React.FC<{ slug: string; onNavigate: (path: string) => void }> = ({ slug, onNavigate }) => {
  const [realization, setRealization] = useState<Realization | undefined>(undefined);

  useEffect(() => {
    setRealization(store.getRealizationBySlug(slug));
  }, [slug]);

  if (!realization) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold">Réalisation non trouvée</h2>
        <button onClick={() => onNavigate('/realisations')} className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs">
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 space-y-8 animate-fade-in">
      <button 
        onClick={() => onNavigate('/realisations')} 
        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl"
      >
        ← Retour aux réalisations
      </button>

      <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-2">
        <span className="bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1 rounded-full uppercase">
          {realization.realization_type} • {realization.year}
        </span>
        <h1 className="text-3xl font-black">{realization.title}</h1>
        <p className="text-slate-400 text-sm flex items-center">
          <MapPin className="w-4 h-4 text-amber-400 mr-1" />
          {realization.location}
        </p>
      </div>

      <div className="h-[400px] rounded-3xl overflow-hidden shadow-lg bg-slate-950">
        <img 
          src={realization.images[0]?.image_url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"} 
          alt={realization.title} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-lg text-slate-900">Description et Détails Techniques</h3>
        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
          {realization.description}
        </p>

        {realization.technical_specs && (
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-amber-600 uppercase">Fiche Technique</span>
            <p className="text-xs text-slate-800">{realization.technical_specs}</p>
          </div>
        )}
      </div>
    </div>
  );
};
