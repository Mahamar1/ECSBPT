import React, { useState, useEffect, useRef } from 'react';
import { store } from '../../services/store';
import { Realization, RealizationImage } from '../../types';
import { compressImage } from '../../utils/security';
import { Plus, Trash2, Edit2, Award, X, Upload, Image as ImageIcon, Star, Loader2 } from 'lucide-react';

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
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
              <img src={real.images[0]?.image_url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80"} alt="" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase">{real.realization_type} • {real.year}</span>
                <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{real.title}</h3>
                <p className="text-xs text-slate-500">{real.location}</p>
                <span className="text-[10px] text-slate-400 font-medium">📷 {real.images?.length || 1} photo(s)</span>
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
  
  const [imagesList, setImagesList] = useState<RealizationImage[]>(realization?.images || []);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const resultUrl = event.target?.result as string;
        if (resultUrl) {
          try {
            const compressed = await compressImage(resultUrl, 1200, 0.75);
            setImagesList(prev => [
              ...prev,
              {
                id: `rimg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                realization_id: realization?.id || '',
                image_url: compressed,
                display_order: prev.length + 1
              }
            ]);
          } catch {
            setImagesList(prev => [
              ...prev,
              {
                id: `rimg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                realization_id: realization?.id || '',
                image_url: resultUrl,
                display_order: prev.length + 1
              }
            ]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleAddPhoto = () => {
    const url = imageUrlInput.trim();
    if (!url) {
      fileInputRef.current?.click();
      return;
    }
    setImagesList(prev => [
      ...prev,
      {
        id: `rimg-${Date.now()}`,
        realization_id: realization?.id || '',
        image_url: url,
        display_order: prev.length + 1
      }
    ]);
    setImageUrlInput('');
  };

  const handleAddPresetPhoto = (presetUrl: string) => {
    setImagesList(prev => [
      ...prev,
      {
        id: `rimg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        realization_id: realization?.id || '',
        image_url: presetUrl,
        display_order: prev.length + 1
      }
    ]);
  };

  const handleRemovePhoto = (id: string) => {
    setImagesList(prev => prev.filter(img => img.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('⚠️ Veuillez saisir un titre pour la réalisation.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('⚠️ Veuillez saisir une description pour la réalisation.');
      return;
    }

    setIsSaving(true);
    try {
      store.saveRealization({
        id: realization?.id,
        title: title.trim(),
        realization_type: type,
        location: location.trim(),
        year: Number(year) || new Date().getFullYear(),
        description: description.trim(),
        technical_specs: specs.trim(),
        published: true,
        images: imagesList.length > 0 ? imagesList : [{
          id: `rimg-${Date.now()}`,
          realization_id: realization?.id || '',
          image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
          display_order: 1
        }]
      });

      onClose();
    } catch (err) {
      console.error("Erreur enregistrement réalisation:", err);
      setErrorMsg("Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto min-h-screen">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 space-y-4 shadow-2xl text-slate-900 mx-auto my-auto border border-slate-200">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-bold text-base sm:text-lg text-slate-900 flex items-center space-x-2">
            <Award className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{realization ? 'Modifier Réalisation BTP' : 'Nouvelle Réalisation BTP'}</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between">
            <span>{errorMsg}</span>
            <button type="button" onClick={() => setErrorMsg('')} className="text-red-500 hover:text-red-700">✕</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1">Titre de la réalisation *</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Tour Administrative R+12 Dakar" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs focus:outline-none focus:border-emerald-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold mb-1">Type d'ouvrage</label>
              <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Ex: Bâtiment Administratif" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Localisation</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ex: Dakar Plateau" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Année</label>
              <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs focus:outline-none focus:border-emerald-500 font-bold" />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Description *</label>
            <textarea rows={3} required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Présentez les travaux réalisés, délais et défis techniques..." className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs focus:outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Spécifications techniques</label>
            <input type="text" value={specs} onChange={(e) => setSpecs(e.target.value)} placeholder="Ex: Surface 5000m², sous-sol 2 niveaux, certification HQE" className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs focus:outline-none focus:border-emerald-500" />
          </div>

          {/* MULTI PHOTO UPLOAD MANAGER SECTION */}
          <div className="border border-slate-200 p-4 rounded-2xl bg-slate-50 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span>Gestion des Photos de la Réalisation</span>
                </label>
                <p className="text-[11px] text-slate-500">Téléversez vos photos directement depuis votre PC/Mobile ou collez une URL.</p>
              </div>

              {/* Hidden File Input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                multiple 
                className="hidden" 
              />

              {/* Direct Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center justify-center space-x-2 shrink-0"
              >
                <Upload className="w-4 h-4" />
                <span>📁 Téléverser Photo (PC / Phone)</span>
              </button>
            </div>

            {/* URL Input Bar */}
            <div className="flex space-x-2">
              <input 
                type="url"
                placeholder="Ou collez l'URL d'une image (ex: https://images.unsplash.com/...)"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>+ Ajouter</span>
              </button>
            </div>

            {/* Presets photo picker */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Exemples de Photos HD :</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { label: '+ Immeuble Siège', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80' },
                  { label: '+ Pont & Génie Civil', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80' },
                  { label: '+ Résidence Luxe', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80' },
                  { label: '+ Rénovation Lourde', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80' }
                ].map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddPresetPhoto(p.url)}
                    className="bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 text-slate-700 hover:text-slate-900 text-[11px] font-medium px-2.5 py-1 rounded-lg transition shadow-sm"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Photos Preview grid */}
            {imagesList.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {imagesList.map((img, idx) => (
                  <div key={img.id} className="relative rounded-xl overflow-hidden border border-slate-200 bg-white group h-24">
                    <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                    
                    {idx === 0 && (
                      <span className="absolute top-1 left-1 bg-emerald-600 text-white font-bold text-[9px] px-1.5 py-0.5 rounded shadow">
                        COUVERTURE
                      </span>
                    )}

                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center space-x-2">
                      <button 
                        type="button"
                        onClick={() => handleRemovePhoto(img.id)}
                        className="bg-red-600 text-white font-bold text-[10px] p-1.5 rounded"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 flex justify-end space-x-2 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs">
              Annuler
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow flex items-center space-x-2 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Enregistrement...</span>
                </>
              ) : (
                <span>Enregistrer Réalisation</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

