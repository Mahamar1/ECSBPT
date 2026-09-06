import React, { useState, useEffect } from 'react';
import { Building2, ShieldCheck, Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  onFinish?: () => void;
  minimumTimeMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish, minimumTimeMs = 1800 }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [statusText, setStatusText] = useState("Chargement des modules BTP & Immobilier...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15) + 10;
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 40) {
      setStatusText("Chargement des modules BTP & Immobilier...");
    } else if (progress < 75) {
      setStatusText("Connexion sécurisée Supabase...");
    } else {
      setStatusText("Bienvenue sur ECS BTP Sénégal");
    }

    if (progress === 100) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 500);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center p-4 transition-opacity duration-500 selection:bg-amber-500 selection:text-slate-950 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Decorative Ambient Light */}
      <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-brand-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-sm w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl text-center space-y-6 animate-fade-in">
        
        {/* Animated Logo Container */}
        <div className="relative inline-block mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur-md opacity-40 animate-pulse"></div>
          <div className="relative bg-white p-3.5 rounded-2xl shadow-xl border border-white/20 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="ECS BTP Logo" 
              className="h-16 w-auto object-contain transform hover:scale-105 transition-transform" 
            />
          </div>
        </div>

        {/* Brand Name & Subtitle */}
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
            ECS <span className="text-amber-400">BTP</span>
          </h1>
          <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-widest">
            Construction • Génie Civil • Immobilier
          </p>
        </div>

        {/* Progress Bar & Status */}
        <div className="space-y-3 pt-2">
          {/* Progress Line Container */}
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800 relative">
            <div 
              className="bg-gradient-to-r from-brand-500 via-amber-500 to-amber-400 h-full rounded-full transition-all duration-300 shadow-sm shadow-amber-500/50"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 px-1">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />
              {statusText}
            </span>
            <span className="text-amber-400">{progress}%</span>
          </div>
        </div>

        {/* Footer Badge */}
        <div className="pt-2 border-t border-slate-800/80">
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            Sénégal • Dakar
          </span>
        </div>

      </div>
    </div>
  );
};
