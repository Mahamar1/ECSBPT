import React, { useState, useEffect } from 'react';
import { 
  Building2, Phone, MessageSquare, Menu, X, 
  ChevronRight, Shield, Home, Briefcase, Award, FileText, Wrench, Mail, UserCheck
} from 'lucide-react';
import { store } from '../../services/store';
import { CompanySettings } from '../../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [settings, setSettings] = useState<CompanySettings>(store.getSettings());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setSettings(store.getSettings());
    });
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Immobilier', path: '/biens' },
    { name: 'Projets BTP', path: '/projets' },
    { name: 'Réalisations', path: '/realisations' },
    { name: 'Publications', path: '/publications' },
    { name: 'Services', path: '/services' },
    { name: 'À propos', path: '/a-propos' },
    { name: 'Contact', path: '/contact' },
  ];

  const formatWhatsAppUrl = () => {
    const cleanNum = settings.whatsapp.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent("Bonjour, je souhaite contacter Sama BTP Immo.")}`;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg py-3 border-b border-slate-800' : 'bg-slate-900 py-4'
    }`}>
      {/* Top Bar */}
      <div className="hidden lg:block border-b border-slate-800/60 pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs text-slate-300">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-amber-400 font-medium">
              <Building2 className="w-3.5 h-3.5" />
              <span>{settings.company_name} - Construction & Immobilier à Dakar</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-400">
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              <span>{settings.phone}</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-400">
              <Mail className="w-3.5 h-3.5 text-brand-400" />
              <span>{settings.email}</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('/admin')} 
              className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded transition text-xs border border-slate-700"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Espace Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('/')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1">
              SAMA <span className="text-amber-400">BTP</span> IMMO
            </span>
            <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Sénégal • Dakar
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'text-amber-400 bg-slate-800/80 font-semibold border-b-2 border-amber-400' 
                    : 'text-slate-200 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* WhatsApp Direct Action & Admin CTA */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href={formatWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-900/30 transition transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button 
            onClick={() => onNavigate('/admin')}
            className="text-xs bg-slate-800 text-amber-400 px-2.5 py-1.5 rounded-lg border border-slate-700 font-medium"
          >
            Admin
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-300 hover:text-white p-2 rounded-lg bg-slate-800 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                onNavigate(link.path);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex justify-between items-center ${
                currentPath === link.path ? 'bg-amber-500/10 text-amber-400 font-bold' : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col space-y-2">
            <a
              href={formatWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center items-center space-x-2 bg-emerald-600 text-white font-medium py-2.5 rounded-xl text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contacter sur WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
