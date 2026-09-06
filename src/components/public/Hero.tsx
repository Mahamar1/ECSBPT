import React from 'react';
import { Building2, ArrowRight, Home, ShieldCheck, CheckCircle2, Search, MapPin, Key } from 'lucide-react';

interface HeroProps {
  onNavigate: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-[90vh] bg-slate-950 flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background Image Overlay with Gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/services/construction.jpg" 
          alt="BTP Construction Senegal" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-400 text-xs font-semibold tracking-wide uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Entreprise Générale de BTP & Promotion Immobilière</span>
            </div>

            {/* Main Headline as requested in prompt */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
              Construire aujourd'hui, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-brand-400">
                investir pour demain.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              ECS BTP est votre partenaire de confiance à Dakar et au Sénégal. De la conception architecturale aux grands travaux de construction BTP, en passant par la vente et la location de biens d'exception sous Titre Foncier.
            </p>


            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('/realisations')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/25 flex items-center space-x-2 transition transform hover:-translate-y-0.5"
              >
                <Building2 className="w-5 h-5" />
                <span>Voir nos réalisations</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onNavigate('/biens')}
                className="bg-slate-800/90 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 flex items-center space-x-2 transition"
              >
                <Home className="w-5 h-5 text-amber-400" />
                <span>Voir nos biens</span>
              </button>
            </div>

            {/* Key Assurance Bullet points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-300 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Titres Fonciers Vérifiés</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garantie Décennale BTP</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gestion Locative Clé en Main</span>
              </div>
            </div>

          </div>

          {/* Right Column: Search Card / High Quality Image Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-xl relative">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                Projet Phare 2026
              </div>

              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden group">
                  <img 
                    src="/services/promotion.jpg" 
                    alt="Appartement Almadies" 
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-white">
                    Almadies • Dakar
                  </div>
                </div>


                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-white font-bold text-lg">
                      Appartement F4 Standing Vue Mer
                    </h3>
                    <span className="text-amber-400 font-extrabold text-sm font-mono">
                      185 000 000 FCFA
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs line-clamp-2">
                    Résidence d'exception aux Almadies. 210 m², 3 suites, piscine commune et sécurité 24/7.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    onClick={() => onNavigate('/biens/appartement-f4-standing-vue-mer-almadies')}
                    className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-2.5 rounded-lg text-xs transition text-center"
                  >
                    Consulter la fiche
                  </button>
                  <button 
                    onClick={() => onNavigate('/contact')}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 rounded-lg text-xs transition border border-slate-700 text-center"
                  >
                    Demander une visite
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">24+</p>
            <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Biens Immobilisés</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-brand-400 font-mono">12</p>
            <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Grands Projets BTP</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">48+</p>
            <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Réalisations Livrées</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">100%</p>
            <p className="text-xs text-slate-400 mt-1 uppercase font-semibold">Titres Fonciers Vérifiés</p>
          </div>
        </div>

      </div>
    </section>
  );
};
