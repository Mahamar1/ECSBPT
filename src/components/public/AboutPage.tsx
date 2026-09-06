import React from 'react';
import { Building2, ShieldCheck, Award, Users, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 text-center max-w-4xl mx-auto space-y-4">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full">
          À Propos de l'Entreprise
        </span>
        <h1 className="text-3xl sm:text-5xl font-black">
          Sama BTP Immo
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Leader engagé dans la modernisation du paysage urbain dakarois et du Sénégal à travers des ouvrages de construction durables et des développements immobiliers certifiés.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Rigueur & Titres Sécurisés</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Chaque bien commercialisé et chaque parcelle construite fait l'objet d'un audit juridique rigoureux sous Titre Foncier non grevé.
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Excellence Technique BTP</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nos ingénieurs appliquent les normes de structure les plus exigeantes (fondations profondes, parasismique, isolation thermo-acoustique).
          </p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Accompagnement Sur-Mesure</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            De la VEFA à la gestion locative pour investisseurs locaux et diaspora sénégalaise résidant à l'étranger.
          </p>
        </div>
      </div>
    </div>
  );
};
