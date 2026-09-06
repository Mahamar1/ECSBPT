import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { CompanySettings } from '../../types';
import { 
  Settings, Save, CheckCircle, Phone, MessageSquare, Mail, MapPin, Globe,
  Database, RefreshCw, AlertTriangle, Key, Link as LinkIcon, CheckCircle2
} from 'lucide-react';
import { 
  getSupabaseCredentials, 
  updateSupabaseCredentials, 
  testSupabaseConnection, 
  isSupabaseConfigured 
} from '../../lib/supabase';
import { getSecurityAuditStatus } from '../../utils/security';

export const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<CompanySettings>(store.getSettings());
  const [saved, setSaved] = useState(false);

  // Supabase Connection State
  const initialCreds = getSupabaseCredentials();
  const [supabaseUrl, setSupabaseUrl] = useState(initialCreds.url);
  const [supabaseKey, setSupabaseKey] = useState(initialCreds.key);
  const [testingSupabase, setTestingSupabase] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    return store.subscribe(() => setSettings(store.getSettings()));
  }, []);

  const handleChange = (field: keyof CompanySettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleTestSupabase = async () => {
    setTestingSupabase(true);
    setSupabaseStatus(null);
    updateSupabaseCredentials(supabaseUrl, supabaseKey);
    const result = await testSupabaseConnection();
    setSupabaseStatus(result);
    setTestingSupabase(false);
  };

  const handleSaveSupabase = (e: React.FormEvent) => {
    e.preventDefault();
    updateSupabaseCredentials(supabaseUrl, supabaseKey);
    handleTestSupabase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Paramètres & Base de Données</h2>
          <p className="text-xs text-slate-500">Gérez les coordonnées de l'entreprise et la connexion Supabase pour ECS BTP.</p>
        </div>
        {saved && (
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            Paramètres enregistrés !
          </span>
        )}
      </div>

      {/* SECTION SUPABASE BACKEND CONNECTIVITY */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 rounded-2xl border border-slate-700 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                Connexion Supabase Database
                {isSupabaseConfigured() ? (
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Configuré
                  </span>
                ) : (
                  <span className="bg-amber-500/20 text-amber-400 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border border-amber-500/30">
                    Mode Local / Démo
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-400">Connectez vos projets BTP & Immobilier à Supabase pour la synchronisation cloud temps réel.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveSupabase} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-slate-300 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-slate-400" /> URL Supabase (VITE_SUPABASE_URL)
              </label>
              <input 
                type="text" 
                placeholder="https://your-project.supabase.co" 
                value={supabaseUrl} 
                onChange={(e) => setSupabaseUrl(e.target.value)} 
                className="w-full bg-slate-950/80 border border-slate-700 p-2.5 rounded-xl font-mono text-xs text-emerald-300 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-slate-400" /> Clé ANON (VITE_SUPABASE_ANON_KEY)
              </label>
              <input 
                type="password" 
                placeholder="eyJhbGciOiJIUzI1Ni..." 
                value={supabaseKey} 
                onChange={(e) => setSupabaseKey(e.target.value)} 
                className="w-full bg-slate-950/80 border border-slate-700 p-2.5 rounded-xl font-mono text-xs text-emerald-300 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-2">
              <button 
                type="button"
                onClick={handleTestSupabase}
                disabled={testingSupabase}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition flex items-center space-x-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testingSupabase ? 'animate-spin' : ''}`} />
                <span>{testingSupabase ? 'Vérification...' : 'Tester Supabase'}</span>
              </button>

              <button 
                type="button"
                onClick={async () => {
                  setTestingSupabase(true);
                  const res = await (await import('../../services/supabaseSync')).syncLocalStoreToSupabase();
                  setSupabaseStatus({
                    success: res.success,
                    message: res.success ? `${res.syncedCount} éléments synchronisés vers Supabase !` : `Erreur: ${res.errors.join(', ')}`
                  });
                  setTestingSupabase(false);
                }}
                disabled={testingSupabase || !isSupabaseConfigured()}
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-2 disabled:opacity-40"
              >
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>Synchroniser Données</span>
              </button>
            </div>

            {supabaseStatus && (
              <div className={`px-3 py-2 rounded-xl text-xs flex items-center space-x-2 font-medium ${
                supabaseStatus.success ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-red-950/80 text-red-300 border border-red-800'
              }`}>
                {supabaseStatus.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />}
                <span>{supabaseStatus.message}</span>
              </div>
            )}
          </div>

        </form>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs">
        
        {/* Identité */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 border-b pb-2">Identité & Branding</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Nom de l'entreprise *</label>
              <input type="text" required value={settings.company_name} onChange={(e) => handleChange('company_name', e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-xl font-bold" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Slogan / Accroche *</label>
              <input type="text" required value={settings.tagline} onChange={(e) => handleChange('tagline', e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-xl" />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Présentation générale de l'entreprise</label>
            <textarea rows={3} value={settings.description} onChange={(e) => handleChange('description', e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-xl" />
          </div>
        </div>

        {/* Coordonnées */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 border-b pb-2">Coordonnées de Contact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Téléphone Principal *</label>
              <input type="text" required value={settings.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl font-mono font-bold" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Numéro WhatsApp *</label>
              <input type="text" required value={settings.whatsapp} onChange={(e) => handleChange('whatsapp', e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl font-mono font-bold text-emerald-600" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Adresse Email *</label>
              <input type="email" required value={settings.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl font-bold" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Adresse Physique du Siège</label>
              <input type="text" value={settings.address} onChange={(e) => handleChange('address', e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Horaires d'ouverture</label>
              <input type="text" value={settings.hours} onChange={(e) => handleChange('hours', e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 border-b pb-2">Réseaux Sociaux</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-semibold mb-1">Facebook</label>
              <input type="url" value={settings.facebook} onChange={(e) => handleChange('facebook', e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Instagram</label>
              <input type="url" value={settings.instagram} onChange={(e) => handleChange('instagram', e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">LinkedIn</label>
              <input type="url" value={settings.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">YouTube</label>
              <input type="url" value={settings.youtube} onChange={(e) => handleChange('youtube', e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
            </div>
          </div>
        </div>

        {/* SECTION SÉCURITÉ ET PROTECTION ANTI-PIRATAGE */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">Centre de Sécurité & Audit Anti-Piratage</h3>
                <p className="text-[11px] text-slate-400">Protections actives contre le piratage, l'injection XSS et l'usurpation.</p>
              </div>
            </div>
            <span className="bg-emerald-500 text-slate-950 text-[10px] font-mono font-extrabold px-3 py-1 rounded-full uppercase">
              Sécurité 100% Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {getSecurityAuditStatus().map((sec, idx) => (
              <div key={idx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300 font-medium">{sec.name}</span>
                <span className="bg-emerald-950 text-emerald-400 font-bold font-mono text-[10px] px-2 py-0.5 rounded border border-emerald-800">
                  {sec.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg transition flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Enregistrer les paramètres</span>
          </button>
        </div>

      </form>
    </div>
  );
};
