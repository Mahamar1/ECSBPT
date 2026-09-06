import React, { useState } from 'react';
import { Image as ImageIcon, Search, Copy, Check, Upload, Trash2 } from 'lucide-react';
import { store } from '../../services/store';

export const MediaLibrary: React.FC = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Collect all media from properties, projects, publications
  const properties = store.getProperties();
  const projects = store.getProjects();
  const publications = store.getPublications();

  const allMedias: { id: string; url: string; title: string; category: string }[] = [];

  properties.forEach(p => {
    p.images.forEach(img => {
      allMedias.push({ id: img.id, url: img.image_url, title: p.title, category: 'Biens Immobiliers' });
    });
  });

  projects.forEach(p => {
    p.images.forEach(img => {
      allMedias.push({ id: img.id, url: img.image_url, title: p.title, category: 'Projets BTP' });
    });
  });

  publications.forEach(p => {
    if (p.cover_image) {
      allMedias.push({ id: p.id, url: p.cover_image, title: p.title, category: 'Publications CMS' });
    }
  });

  const filtered = allMedias.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2500);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Médiathèque (Supabase Storage)</h2>
          <p className="text-xs text-slate-500">Parcourez tous les médias, images et assets enregistrés sur le serveur.</p>
        </div>
        <div className="w-64 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input 
            type="text"
            placeholder="Rechercher média..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm group relative">
            <img src={item.url} alt="" className="w-full h-32 object-cover" />
            <div className="p-2 text-[10px]">
              <span className="font-bold text-slate-700 block truncate">{item.title}</span>
              <span className="text-amber-600 font-semibold">{item.category}</span>
            </div>

            <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center p-2 text-center">
              <button 
                onClick={() => handleCopy(item.url)}
                className="bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 shadow"
              >
                {copiedUrl === item.url ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl === item.url ? 'Copié !' : 'Copier URL'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
