import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { Publication, PublicationCategory, PublicationStatus } from '../../types';
import { 
  Plus, Search, Edit2, Trash2, Eye, EyeOff, FileText, X, Bold, Italic, List, Heading, Quote, Link
} from 'lucide-react';

export const PublicationManager: React.FC<{ onSelectTab: (tab: string) => void; openNewModal?: boolean }> = ({ onSelectTab, openNewModal }) => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const load = () => setPublications(store.getPublications());
    load();
    if (openNewModal) {
      setEditingPub(null);
      setIsModalOpen(true);
    }
    return store.subscribe(load);
  }, [openNewModal]);

  const handleDelete = (id: string) => {
    if (window.confirm("Supprimer cette publication ?")) {
      store.deletePublication(id);
    }
  };

  const filtered = publications.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">CMS & Gestion du Blog</h2>
          <p className="text-xs text-slate-500">Créez et publiez vos articles, conseils immobiliers et actualités BTP.</p>
        </div>
        <button
          onClick={() => { setEditingPub(null); setIsModalOpen(true); }}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nouvelle Publication</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="p-3.5">Image & Titre</th>
                <th className="p-3.5">Catégorie</th>
                <th className="p-3.5">Auteur</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Statut</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((pub) => (
                <tr key={pub.id} className="hover:bg-slate-50 transition">
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <img src={pub.cover_image} alt="" className="w-12 h-10 object-cover rounded-lg" />
                      <div>
                        <div className="font-bold text-slate-900 max-w-md truncate">{pub.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">/{pub.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {pub.category}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-slate-700">{pub.author}</td>
                  <td className="p-3 text-slate-500">{new Date(pub.published_at).toLocaleDateString('fr-FR')}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      pub.status === 'Publié' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {pub.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => { setEditingPub(pub); setIsModalOpen(true); }} className="p-1.5 bg-slate-100 rounded-lg text-slate-600 hover:text-purple-600">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(pub.id)} className="p-1.5 bg-slate-100 rounded-lg text-slate-600 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ArticleEditorModal publication={editingPub} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

// ARTICLE EDITOR MODAL (CMS CONTENT EDITOR WITH TOOLBAR & PREVIEW)
export const ArticleEditorModal: React.FC<{ publication: Publication | null; onClose: () => void }> = ({ publication, onClose }) => {
  const [title, setTitle] = useState(publication?.title || '');
  const [category, setCategory] = useState<PublicationCategory>(publication?.category || 'Actualités');
  const [excerpt, setExcerpt] = useState(publication?.excerpt || '');
  const [content, setContent] = useState(publication?.content || '');
  const [coverImage, setCoverImage] = useState(publication?.cover_image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80');
  const [author, setAuthor] = useState(publication?.author || 'Équipe ECS BTP');

  const [status, setStatus] = useState<PublicationStatus>(publication?.status || 'Publié');
  const [seoTitle, setSeoTitle] = useState(publication?.seo_title || '');
  const [seoDescription, setSeoDescription] = useState(publication?.seo_description || '');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'seo'>('editor');

  const categories: PublicationCategory[] = [
    'Actualités', 'Immobilier', 'BTP', 'Construction', 
    'Architecture', 'Réalisations', 'Conseils', 'Promotion immobilière'
  ];

  const handleFormat = (tag: string) => {
    if (tag === 'h2') setContent(prev => prev + '\n<h2>Titre de section</h2>\n');
    else if (tag === 'h3') setContent(prev => prev + '\n<h3>Sous-titre</h3>\n');
    else if (tag === 'b') setContent(prev => prev + ' <strong>texte en gras</strong> ');
    else if (tag === 'i') setContent(prev => prev + ' <em>texte en italique</em> ');
    else if (tag === 'quote') setContent(prev => prev + '\n<blockquote>"Citation ou point clé de l\'article..."</blockquote>\n');
    else if (tag === 'ul') setContent(prev => prev + '\n<ul>\n  <li>Élément 1</li>\n  <li>Élément 2</li>\n</ul>\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    store.savePublication({
      id: publication?.id,
      title,
      category,
      excerpt,
      content,
      cover_image: coverImage,
      author,
      status,
      seo_title: seoTitle || title,
      seo_description: seoDescription || excerpt
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl text-slate-900">
        
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-bold flex items-center space-x-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <span>{publication ? 'Éditer la publication CMS' : 'Nouvelle Publication CMS'}</span>
          </h3>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>

        {/* Tab switch */}
        <div className="flex space-x-2 border-b border-slate-100 pb-2 text-xs">
          <button 
            type="button" 
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 rounded-xl font-bold transition ${activeTab === 'editor' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Éditeur de Contenu
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-xl font-bold transition ${activeTab === 'preview' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Aperçu Rendu
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-2 rounded-xl font-bold transition ${activeTab === 'seo' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            Référencement SEO & Meta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {activeTab === 'editor' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold mb-1">Titre de la publication *</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-xl font-bold text-sm" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Catégorie *</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value as PublicationCategory)} className="w-full bg-slate-50 border p-2.5 rounded-xl font-semibold">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Extrait / Résumé d'accroche *</label>
                <textarea rows={2} required value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-xl" />
              </div>

              {/* Editor Formatting Toolbar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block font-semibold">Corps de l'article (HTML / Texte enrichi) *</label>
                  <div className="flex space-x-1">
                    <button type="button" onClick={() => handleFormat('h2')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-bold">H2</button>
                    <button type="button" onClick={() => handleFormat('h3')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-bold">H3</button>
                    <button type="button" onClick={() => handleFormat('b')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-bold">Gras</button>
                    <button type="button" onClick={() => handleFormat('i')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-bold">Italique</button>
                    <button type="button" onClick={() => handleFormat('quote')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-bold">Citation</button>
                    <button type="button" onClick={() => handleFormat('ul')} className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded font-bold">Liste</button>
                  </div>
                </div>
                <textarea 
                  rows={8} 
                  required 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  className="w-full bg-slate-50 border p-3 rounded-xl font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1">URL Photo de couverture</label>
                  <input type="url" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Nom de l'Auteur</label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Statut de publication</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as PublicationStatus)} className="w-full bg-slate-50 border p-2 rounded-xl">
                    <option value="Publié">Publié</option>
                    <option value="Brouillon">Brouillon</option>
                    <option value="Programmé">Programmé</option>
                    <option value="Archivé">Archivé</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === 'preview' && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded-full">{category}</span>
              <h1 className="text-2xl font-bold">{title || 'Titre de l\'article'}</h1>
              <div className="prose max-w-none space-y-2" dangerouslySetInnerHTML={{ __html: content || '<p>Aucun contenu rédigé pour le moment.</p>' }} />
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">SEO Title (Meta Title)</label>
                <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder={title} className="w-full bg-slate-50 border p-2 rounded-xl" />
              </div>
              <div>
                <label className="block font-semibold mb-1">SEO Description (Meta Description)</label>
                <textarea rows={3} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder={excerpt} className="w-full bg-slate-50 border p-2 rounded-xl" />
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end space-x-2 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 rounded-xl">Annuler</button>
            <button type="submit" className="px-6 py-2 bg-purple-600 text-white font-bold rounded-xl">Enregistrer Article</button>
          </div>
        </form>

      </div>
    </div>
  );
};
