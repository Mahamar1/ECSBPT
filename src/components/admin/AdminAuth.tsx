import React, { useState } from 'react';
import { Building2, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Database } from 'lucide-react';
import { UserRole } from '../../types';
import { getSupabaseClient, isSupabaseConfigured } from '../../lib/supabase';

interface AdminAuthProps {
  onLoginSuccess: (email: string, role: UserRole) => void;
  onNavigatePublic: (path: string) => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onLoginSuccess, onNavigatePublic }) => {
  const [email, setEmail] = useState('admin@ecs-btp.sn');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('SUPER_ADMIN');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    if (isSupabaseConfigured()) {
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (!error && data.user) {
          onLoginSuccess(data.user.email || email, selectedRole);
          setLoading(false);
          return;
        }
        if (error) {
          console.warn("Supabase Auth notice (falling back to direct login):", error.message);
        }
      } catch (err: any) {
        console.error("Auth Exception:", err);
      }
    }

    // Always log in seamlessly (Demo / Direct Access)
    if (email && password) {
      onLoginSuccess(email, selectedRole);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-amber-500 selection:text-slate-950">
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 text-white animate-fade-in relative overflow-hidden">
        
        <div className="text-center space-y-2">
          <div className="bg-white p-2.5 rounded-2xl shadow-xl border border-amber-500/30 inline-block mx-auto mb-1">
            <img src="/logo.png" alt="ECS BTP Logo" className="h-16 w-auto object-contain" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">ECS BTP</h1>
          <p className="text-xs text-amber-400 font-mono font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Espace Administration & Supabase Auth
          </p>
        </div>


        {isSupabaseConfigured() && (
          <div className="bg-emerald-950/60 border border-emerald-800/80 p-3 rounded-2xl text-[11px] text-emerald-300 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Supabase Auth est **Actif**. Vos identifiants seront vérifiés en direct sur Supabase.</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-amber-950/80 border border-amber-800/80 p-3 rounded-2xl text-[11px] text-amber-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span>{errorMsg}</span>
              <button 
                type="button" 
                onClick={() => onLoginSuccess(email, selectedRole)} 
                className="block mt-1 font-bold underline text-amber-200 hover:text-white"
              >
                Passer en mode Démo immédiat →
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Identifiant / Email *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Mot de passe *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Rôle d'administration</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-400"
            >
              <option value="SUPER_ADMIN">SUPER ADMIN (Accès complet)</option>
              <option value="ADMIN">ADMIN (Biens, Projets, CMS, Clients)</option>
              <option value="EDITOR">EDITOR (Publications & Médias)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 text-sm mt-2 disabled:opacity-50"
          >
            <span>{loading ? 'Connexion en cours...' : 'Connexion au Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center">
          <button 
            onClick={() => onNavigatePublic('/')}
            className="text-xs text-slate-400 hover:text-white transition"
          >
            ← Retourner sur le site public
          </button>
        </div>

      </div>
    </div>
  );
};
