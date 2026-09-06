import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { DocumentItem } from '../../types';
import { FileUp, Plus, Trash2, Download, ExternalLink } from 'lucide-react';

export const DocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [name, setName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [category, setCategory] = useState('Plaquette');

  useEffect(() => {
    const load = () => setDocuments(store.getDocuments());
    load();
    return store.subscribe(load);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !fileUrl) return;

    store.addDocument({
      name,
      file_url: fileUrl,
      category
    });

    setName('');
    setFileUrl('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Supprimer ce document ?")) {
      store.deleteDocument(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Gestion des Documents (PDF / Fichiers)</h2>
          <p className="text-xs text-slate-500">Plaquettes corporatives, plans architecturaux et catalogues.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-sm text-slate-900">Ajouter un Fichier Document</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block font-semibold mb-1">Nom du document *</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Catalogue_Programmes_2026.pdf" className="w-full bg-slate-50 border p-2 rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Catégorie</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">URL du fichier PDF *</label>
              <input type="url" required value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder="https://..." className="w-full bg-slate-50 border p-2 rounded-xl" />
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl">
              + Ajouter le document
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-900">Documents enregistrés</h3>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{doc.name}</span>
                  <span className="text-amber-600 font-semibold">{doc.category}</span>
                </div>
                <div className="flex space-x-2">
                  <a href={doc.file_url} target="_blank" rel="noreferrer" className="p-1.5 bg-slate-200 rounded-lg text-slate-700">
                    <Download className="w-4 h-4" />
                  </a>
                  <button onClick={() => handleDelete(doc.id)} className="p-1.5 bg-slate-200 rounded-lg text-slate-700 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
