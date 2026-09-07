import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { Publication, PublicationCategory } from '../../types';
import { Search, Calendar, User, ArrowRight, BookOpen, Share2 } from 'lucide-react';

interface PublicationsPageProps {
  onNavigate: (path: string) => void;
}

export const PublicationsPage: React.FC<PublicationsPageProps> = ({ onNavigate }) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');

  useEffect(() => {
    const load = () => {
      setPublications(store.getPublications().filter(p => (p.status === 'Publié' || !p.status || (p as any).published === true) && p.status !== 'Brouillon'));
    };
    load();
    return store.subscribe(load);
  }, []);

  const categories = ['Toutes', 'Actualités', 'Immobilier', 'BTP', 'Construction', 'Architecture', 'Réalisations', 'Conseils', 'Promotion immobilière'];

  const filtered = publications.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Toutes' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800">
        <span className="text-purple-400 text-xs font-bold uppercase tracking-widest bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/20">
          Blog & CMS Officiel
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
          Publications, Actualités & Conseils Immobiliers
        </h1>
        <p className="text-slate-300 text-sm mt-2 max-w-2xl">
          Retrouvez nos analyses d'experts, guides d'achat à Dakar et suivis d'actualité du secteur BTP au Sénégal.
        </p>

        {/* Filter Bar */}
        <div className="mt-8 bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input 
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="flex overflow-x-auto gap-2 pb-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
                    selectedCategory === cat ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((pub) => (
          <div 
            key={pub.id}
            onClick={() => onNavigate(`/publications/${pub.slug}`)}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={pub.cover_image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"} 
                  alt={pub.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {pub.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 text-[11px] text-slate-400 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{new Date(pub.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition line-clamp-2">
                  {pub.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                  {pub.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <span className="text-xs font-bold text-purple-600 group-hover:underline flex items-center">
                <span>Lire l'article complet</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export const PublicationDetailPage: React.FC<{ slug: string; onNavigate: (path: string) => void }> = ({ slug, onNavigate }) => {
  const [pub, setPub] = useState<Publication | undefined>(undefined);

  useEffect(() => {
    const load = () => setPub(store.getPublicationBySlug(slug));
    load();
    return store.subscribe(load);
  }, [slug]);

  if (!pub) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800">Article non trouvé</h2>
        <button onClick={() => onNavigate('/publications')} className="mt-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs">
          Retour au blog
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 space-y-8 animate-fade-in">
      <button 
        onClick={() => onNavigate('/publications')} 
        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl"
      >
        ← Retour aux publications
      </button>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="bg-purple-100 text-purple-800 font-bold text-xs px-3 py-1 rounded-full uppercase">
            {pub.category}
          </span>
          <span className="text-xs text-slate-500">
            Publié le {new Date(pub.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          {pub.title}
        </h1>

        <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium pt-1 border-t border-slate-200">
          <User className="w-4 h-4 text-purple-600" />
          <span>Par {pub.author}</span>
        </div>
      </div>

      {/* Cover */}
      <div className="h-[400px] rounded-3xl overflow-hidden shadow-lg bg-slate-950">
        <img 
          src={pub.cover_image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"} 
          alt={pub.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Rich Preview */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-slate-800 text-sm leading-relaxed space-y-4">
        <div 
          className="prose max-w-none space-y-4 text-slate-700"
          dangerouslySetInnerHTML={{ __html: pub.content }}
        />
      </div>

    </div>
  );
};
