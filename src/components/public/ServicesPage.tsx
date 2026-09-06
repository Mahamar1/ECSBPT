import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { Service } from '../../types';
import { Wrench, CheckCircle, Phone, ArrowRight, Building2 } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setServices(store.getServices());
  }, []);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Nos Solutions Métiers
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
          Services BTP, Construction & Immobilier
        </h1>
        <p className="text-slate-300 text-sm mt-2 max-w-2xl">
          Une gamme intégrée de prestations haut de gamme pour vous accompagner de la conception architecturale à la gestion de vos actifs.
        </p>
      </div>

      {/* Grid */}
      <div className="space-y-8">
        {services.map((serv, idx) => (
          <div 
            key={serv.id}
            className={`bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${
              idx % 2 === 1 ? 'bg-slate-50/60' : ''
            }`}
          >
            <div className={`md:col-span-5 relative h-64 rounded-2xl overflow-hidden shadow-md ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
              <img 
                src={serv.image || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80"} 
                alt={serv.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className={`md:col-span-7 space-y-4 ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Service N°0{idx + 1}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                {serv.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {serv.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {serv.advantages.map((adv, aIdx) => (
                  <div key={aIdx} className="flex items-center space-x-2 text-xs text-slate-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{adv}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition flex items-center space-x-2"
                >
                  <span>Demander une étude personnalisée</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
