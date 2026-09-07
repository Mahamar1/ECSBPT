import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { Realization } from '../../types';
import { Plus, Trash2, Edit2, Award, X } from 'lucide-react';

export const RealizationManager: React.FC = () => {
  const [realizations, setRealizations] = useState<Realization[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReal, setEditingReal] = useState<Realization | null>(null);

  useEffect(() => {
    const load = () => setRealizations(store.getRealizations());
    load();
    return store.subscribe(load);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Supprimer cette réalisation ?")) {
      store.deleteRealization(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Gestion des Réalisations BTP</h2>
          <p className="text-xs text-slate-500">Mettez en avant vos ouvrages livrés avec succès.</p>
        </div>
        <button
          onClick={() => { setEditingReal(null); setIsModalOpen(true); }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nouvelle Réalisation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {realizations.map((real) => (
          <div key={real.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex space-x-4 items-center justify-between">
            <div className="flex space-x-3 items-center">
              <img src={real.images[0]?.image_url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80"} alt="" className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase">{real.realization_type} • {real.year}</span>
                <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{real.title}</h3>
                <p className="text-xs text-slate-500">{real.location}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => { setEditingReal(real); setIsModalOpen(true); }} className="p-1.5 bg-slate-100 rounded-lg text-slate-600 hover:text-amber-600">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(real.id)} className="p-1.5 bg-slate-100 rounded-lg text-slate-600 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <RealizationFormModal realization={editingReal} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export const RealizationFormModal: React.FC<{ realization: Realization | null; onClose: () => void }> = ({ realization, onClose }) => {
  const [title, setTitle] = useState(realization?.title || '');
  const [type, setType] = useState(realization?.realization_type || 'Bâtiment Administratif');
  const [location, setLocation] = useState(realization?.location || 'Dakar');
  const [year, setYear] = useState<number>(realization?.year || 2025);
  const [description, setDescription] = useState(realization?.description || '');
  const [specs, setSpecs] = useState(realization?.technical_specs || '');
  const [imageUrl, setImageUrl] = useState(realization?.images[0]?.image_url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    store.saveRealization({
      id: realization?.id,
      title,
      realization_type: type,
      location,
      year: Number(year),
      description,
      technical_specs: specs,
      published: true,
      images: [{ id: `rimg-${Date.now()}`, realization_id: realization?.id || '', image_url: imageUrl, display_order: 1 }]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto min-h-screen">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6 space-y-4 shadow-2xl text-slate-900 mx-auto my-auto">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-bold text-base sm:text-lg">{realization ? 'Modifier Réalisation' : 'Nouvelle Réalisation BTP'}</h3>
          <button onClick={onClose} className="text-slate-400 p-1">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold mb-1">Titre de la réalisation *</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1">Type d'ouvrage</label>
              <input type="text" value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Localisation</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Année</label>
              <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full bg-slate-50 border p-2.5 rounded-xl" />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Description *</label>
            <textarea rows={3} required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Spécifications techniques</label>
            <input type="text" value={specs} onChange={(e) => setSpecs(e.target.value)} placeholder="Ex: Surface 5000m², sous-sol 2 niveaux..." className="w-full bg-slate-50 border p-2 rounded-xl" />
          </div>

          <div>
            <label className="block font-semibold mb-1">URL Photo</label>
            <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 rounded-xl">Annuler</button>
            <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl">Enregistrer Réalisation</button>
          </div>
        </form>
      </div>
    </div>
  );
};
