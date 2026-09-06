import React, { useState, useEffect } from 'react';
import { 
  Building2, Phone, Mail, MapPin, MessageSquare, 
  Facebook, Instagram, Linkedin, Youtube, ArrowUpRight, ShieldCheck 
} from 'lucide-react';
import { store } from '../../services/store';
import { CompanySettings } from '../../types';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [settings, setSettings] = useState<CompanySettings>(store.getSettings());

  useEffect(() => {
    return store.subscribe(() => {
      setSettings(store.getSettings());
    });
  }, []);

  const formatWhatsAppUrl = () => {
    const cleanNum = settings.whatsapp.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent("Bonjour ECS BTP, je souhaiterais obtenir des informations.")}`;

  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('/')}>
              <div className="bg-white p-1.5 rounded-xl shadow-md flex items-center justify-center">
                <img src="/logo.png" alt="ECS BTP Logo" className="h-10 w-auto object-contain" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                ECS <span className="text-amber-400">BTP</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              {settings.description}
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/50 transition">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/50 transition">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/50 transition">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.youtube && (
                <a href={settings.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400/50 transition">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Rapide */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2.5">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-amber-400 transition flex items-center space-x-1">
                  <span>Accueil</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/biens')} className="hover:text-amber-400 transition flex items-center space-x-1">
                  <span>Biens Immobiliers à Dakar</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/projets')} className="hover:text-amber-400 transition flex items-center space-x-1">
                  <span>Projets BTP & Construction</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/realisations')} className="hover:text-amber-400 transition flex items-center space-x-1">
                  <span>Nos Réalisations</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/publications')} className="hover:text-amber-400 transition flex items-center space-x-1">
                  <span>Blog & Publications</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-amber-400 transition flex items-center space-x-1">
                  <span>Nos Services BTP</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/a-propos')} className="hover:text-amber-400 transition flex items-center space-x-1">
                  <span>À Propos de l'Entreprise</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Nos Services */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2.5">
              Activités & Métiers
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Construction & Gros Œuvre BTP</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Promotion Immobilière Dakar</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Vente d'Appartements & Villas</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Location & Gestion Locative</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Rénovation Lourde & Architecture</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Génie Civil & VRD</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts & Siège */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2.5">
              Contact & Siège
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white transition font-mono">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition">
                  {settings.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={formatWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2.5 px-4 rounded-lg transition shadow-md shadow-emerald-950/40"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discussion WhatsApp Directe</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>© {new Date().getFullYear()} {settings.company_name}. Tous droits réservés. Propriété exclusive.</span>
          </div>
        </div>


      </div>
    </footer>
  );
};
