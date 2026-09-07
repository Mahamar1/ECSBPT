import React, { useState, useEffect, useRef } from 'react';
import { store } from '../../services/store';
import { Property, PropertyType, TransactionType, PropertyStatus, PropertyImage } from '../../types';
import { 
  Plus, Search, Edit2, Trash2, Eye, EyeOff, Check, X, 
  Upload, Image as ImageIcon, Star, MapPin, Building2, Sparkles
} from 'lucide-react';

interface PropertyManagerProps {
  onSelectTab: (tab: string) => void;
  openNewModal?: boolean;
}

export const PropertyManager: React.FC<PropertyManagerProps> = ({ onSelectTab, openNewModal }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');
  const [editingProp, setEditingProp] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const load = () => {
      setProperties(store.getProperties());
    };
    load();
    if (openNewModal) {
      setEditingProp(null);
      setIsModalOpen(true);
    }
    return store.subscribe(load);
  }, [openNewModal]);

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce bien immobilier ?")) {
      store.deleteProperty(id);
    }
  };

  const handleTogglePublish = (prop: Property) => {
    store.saveProperty({ ...prop, published: !prop.published });
  };

  const filtered = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Tous' || p.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Gestion des Biens Immobiliers</h2>
          <p className="text-xs text-slate-500">Ajoutez, modifiez ou publiez vos offres immobilières sur le site public.</p>
        </div>
        <button
          onClick={() => {
            setEditingProp(null);
            setIsModalOpen(true);
          }}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Ajouter un bien</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input 
            type="text"
            placeholder="Filtrer par titre, référence, quartier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
          >
            {['Tous', 'Appartement', 'Villa', 'Maison', 'Terrain', 'Immeuble', 'Bureau', 'Magasin', 'Local commercial', 'Studio', 'Entrepôt'].map(t => (
              <option key={t} value={t}>Type : {t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="p-3.5">Image & Ref</th>
                <th className="p-3.5">Titre du Bien</th>
                <th className="p-3.5">Type & Offre</th>
                <th className="p-3.5">Localisation</th>
                <th className="p-3.5">Prix</th>
                <th className="p-3.5">Statut</th>
                <th className="p-3.5">Publication</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={prop.images[0]?.image_url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80"} 
                        alt="" 
                        className="w-12 h-10 object-cover rounded-lg border border-slate-200"
                      />
                      <span className="font-mono text-slate-600 font-bold text-[11px]">{prop.reference}</span>
                    </div>
                  </td>

                  <td className="p-3 font-bold text-slate-900 max-w-xs truncate">
                    {prop.title}
                  </td>

                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-semibold text-[11px] mr-1">
                      {prop.type}
                    </span>
                    <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-semibold text-[11px]">
                      {prop.transaction_type}
                    </span>
                  </td>

                  <td className="p-3 text-slate-600">
                    {prop.neighborhood}, {prop.city}
                  </td>

                  <td className="p-3 font-mono font-bold text-amber-600">
                    {prop.price.toLocaleString('fr-FR')} {prop.currency}
                  </td>

                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      prop.status === 'Disponible' ? 'bg-emerald-100 text-emerald-800' :
                      prop.status === 'Réservé' ? 'bg-sky-100 text-sky-800' :
                      prop.status === 'Vendu' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {prop.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => handleTogglePublish(prop)}
                      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition ${
                        prop.published ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {prop.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{prop.published ? 'Publié' : 'Brouillon'}</span>
                    </button>
                  </td>

                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingProp(prop);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-slate-600 hover:text-amber-600 bg-slate-100 hover:bg-amber-50 rounded-lg transition"
                      title="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prop.id)}
                      className="p-1.5 text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 rounded-lg transition"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {isModalOpen && (
        <PropertyFormModal 
          property={editingProp} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

// MODAL FORM COMPONENT
export const PropertyFormModal: React.FC<{ property: Property | null; onClose: () => void }> = ({ property, onClose }) => {
  const [title, setTitle] = useState(property?.title || '');
  const [reference, setReference] = useState(property?.reference || `ECS-${Math.floor(100 + Math.random() * 900)}`);

  const [type, setType] = useState<PropertyType>(property?.type || 'Appartement');
  const [transactionType, setTransactionType] = useState<TransactionType>(property?.transaction_type || 'Vente');
  const [price, setPrice] = useState<number>(property?.price || 50000000);
  const [currency, setCurrency] = useState(property?.currency || 'FCFA');
  const [location, setLocation] = useState(property?.location || 'Almadies');
  const [neighborhood, setNeighborhood] = useState(property?.neighborhood || 'Almadies');
  const [city, setCity] = useState(property?.city || 'Dakar');
  const [surface, setSurface] = useState<number>(property?.surface || 150);
  const [bedrooms, setBedrooms] = useState<number>(property?.bedrooms || 3);
  const [bathrooms, setBathrooms] = useState<number>(property?.bathrooms || 3);
  const [floors, setFloors] = useState<number>(property?.floors || 1);
  const [description, setDescription] = useState(property?.description || '');
  const [status, setStatus] = useState<PropertyStatus>(property?.status || 'Disponible');
  const [published, setPublished] = useState(property?.published ?? true);
  const [featured, setFeatured] = useState(property?.featured ?? false);

  // Photos state
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imagesList, setImagesList] = useState<PropertyImage[]>(property?.images || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availableAmenities = [
    'Piscine commune', 'Piscine privative', 'Titre Foncier', 'Vue sur Mer', 
    'Ascenseur', 'Groupe électrogène', 'Gardiennage 24/7', 'Garage', 'Jardin', 
    'Climatisation', 'Cuisine équipée', 'Réseau Fibre Wifi'
  ];
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(property?.amenities || ['Titre Foncier', 'Gardiennage 24/7']);
  const [customAmenityInput, setCustomAmenityInput] = useState('');

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  const handleAddCustomAmenity = () => {
    const trimmed = customAmenityInput.trim();
    if (!trimmed) return;
    if (!selectedAmenities.includes(trimmed)) {
      setSelectedAmenities(prev => [...prev, trimmed]);
    }
    setCustomAmenityInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = event.target?.result as string;
        if (resultUrl) {
          setImagesList(prev => [
            ...prev,
            {
              id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              property_id: property?.id || '',
              image_url: resultUrl,
              is_cover: prev.length === 0,
              display_order: prev.length + 1
            }
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleAddPhoto = () => {
    const url = imageUrlInput.trim();
    if (!url) {
      // If URL input is empty, trigger file picker!
      fileInputRef.current?.click();
      return;
    }
    const newImg: PropertyImage = {
      id: `img-${Date.now()}`,
      property_id: property?.id || '',
      image_url: url,
      is_cover: imagesList.length === 0,
      display_order: imagesList.length + 1
    };
    setImagesList(prev => [...prev, newImg]);
    setImageUrlInput('');
  };

  const handleAddPresetPhoto = (presetUrl: string) => {
    setImagesList(prev => [
      ...prev,
      {
        id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        property_id: property?.id || '',
        image_url: presetUrl,
        is_cover: prev.length === 0,
        display_order: prev.length + 1
      }
    ]);
  };

  const handleRemovePhoto = (id: string) => {
    setImagesList(imagesList.filter(img => img.id !== id));
  };

  const handleSetCoverPhoto = (id: string) => {
    setImagesList(imagesList.map(img => ({ ...img, is_cover: img.id === id })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !description) return;

    store.saveProperty({
      id: property?.id,
      title,
      reference,
      type,
      transaction_type: transactionType,
      price: Number(price),
      currency,
      location,
      neighborhood,
      city,
      surface: Number(surface),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      floors: Number(floors),
      description,
      amenities: selectedAmenities,
      status,
      published,
      featured,
      images: imagesList.length > 0 ? imagesList : [{
        id: `img-${Date.now()}`,
        property_id: property?.id || '',
        image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        is_cover: true,
        display_order: 1
      }]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-fade-in text-slate-900">
        
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-amber-500" />
            <span>{property ? 'Modifier le Bien' : 'Nouveau Bien Immobilier'}</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1">Titre du bien *</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Appartement F4 Vue Mer aux Almadies"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Référence *</label>
              <input 
                type="text" 
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Type de Bien *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PropertyType)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              >
                {['Appartement', 'Villa', 'Maison', 'Terrain', 'Immeuble', 'Bureau', 'Magasin', 'Local commercial', 'Studio', 'Entrepôt'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Type d'offre *</label>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value as TransactionType)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="Vente">Vente</option>
                <option value="Location">Location</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Prix *</label>
              <input 
                type="number" 
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Devise</label>
              <input 
                type="text" 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Quartier *</label>
              <input 
                type="text" 
                required
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="Ex: Almadies, Mermoz"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Secteur / Zone</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Zone Ambassades"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Ville</label>
              <input 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Surface (m²)</label>
              <input 
                type="number" 
                value={surface}
                onChange={(e) => setSurface(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Chambres</label>
              <input 
                type="number" 
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Salles de bain</label>
              <input 
                type="number" 
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Niveau / Étage</label>
              <input 
                type="number" 
                value={floors}
                onChange={(e) => setFloors(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold mb-1">Description détaillée *</label>
            <textarea 
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Amenities checklist */}
          <div className="border border-slate-200 p-4 rounded-2xl bg-slate-50 space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                Équipements & Options ({selectedAmenities.length} sélectionné(s))
              </label>
              <button
                type="button"
                onClick={() => setSelectedAmenities(availableAmenities)}
                className="text-[11px] text-amber-600 font-bold hover:underline"
              >
                Tout sélectionner
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {availableAmenities.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs text-left font-medium transition cursor-pointer select-none ${
                      isSelected 
                        ? 'bg-amber-500/10 border-amber-500 text-slate-950 font-bold shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate pr-1">{amenity}</span>
                    <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 transition ${
                      isSelected ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Amenities Input */}
            <div className="flex space-x-2 pt-2 border-t border-slate-200/60">
              <input
                type="text"
                placeholder="Ajouter un équipement personnalisé (ex: Domotique, Balcon, Penthouses)..."
                value={customAmenityInput}
                onChange={(e) => setCustomAmenityInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomAmenity(); } }}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={handleAddCustomAmenity}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition"
              >
                + Ajouter
              </button>
            </div>

            {/* Render custom amenities pills if any exist outside standard list */}
            {selectedAmenities.filter(a => !availableAmenities.includes(a)).length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block w-full">Équipements personnalisés :</span>
                {selectedAmenities.filter(a => !availableAmenities.includes(a)).map((customA) => (
                  <span 
                    key={customA} 
                    className="inline-flex items-center space-x-1 bg-amber-500/20 text-amber-900 border border-amber-500/30 text-[11px] font-bold px-2.5 py-1 rounded-lg"
                  >
                    <span>{customA}</span>
                    <button 
                      type="button" 
                      onClick={() => toggleAmenity(customA)}
                      className="text-amber-800 hover:text-red-600 ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* MULTI PHOTO UPLOAD MANAGER SECTION */}
          <div className="border border-slate-200 p-4 sm:p-5 rounded-2xl bg-slate-50 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-amber-500" />
                  <span>Gestion de la Galerie Photos (Upload & CDN)</span>
                </label>
                <p className="text-[11px] text-slate-500">Téléversez vos photos directement depuis votre appareil (PC / Mobile) ou entrez une URL.</p>
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

              {/* Prominent Direct Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center justify-center space-x-2 shrink-0"
              >
                <Upload className="w-4 h-4" />
                <span>📁 Téléverser une Photo (PC / Mobile)</span>
              </button>
            </div>

            {/* URL Input Bar */}
            <div className="flex space-x-2">
              <input 
                type="url"
                placeholder="Ou collez l'URL d'une image (ex: https://images.unsplash.com/...)"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>+ Ajouter Photo</span>
              </button>
            </div>

            {/* Presets HD photo picker */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Photos HD Démo rapides :</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  { label: '+ Villa Luxe', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80' },
                  { label: '+ Salon & Séjour F4', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
                  { label: '+ Immeuble R+5', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80' },
                  { label: '+ Cuisine Moderne', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80' }
                ].map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddPresetPhoto(p.url)}
                    className="bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-slate-700 hover:text-slate-900 text-[11px] font-medium px-2.5 py-1 rounded-lg transition shadow-sm"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Photos Preview grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {imagesList.map((img) => (
                <div key={img.id} className="relative rounded-xl overflow-hidden border border-slate-200 bg-white group h-28">
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                  
                  {img.is_cover && (
                    <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded shadow">
                      COUVERTURE
                    </span>
                  )}

                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center space-x-2">
                    {!img.is_cover && (
                      <button 
                        type="button"
                        onClick={() => handleSetCoverPhoto(img.id)}
                        className="bg-amber-500 text-slate-950 font-bold text-[10px] p-1.5 rounded"
                        title="Définir comme image principale"
                      >
                        <Star className="w-3.5 h-3.5" />
                      </button>
                    )}
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
          </div>

          {/* Status & Publication Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs border-t border-slate-100">
            <div>
              <label className="block font-semibold mb-1">Statut du Bien</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="Disponible">Disponible</option>
                <option value="Réservé">Réservé</option>
                <option value="Vendu">Vendu</option>
                <option value="Loué">Loué</option>
                <option value="Brouillon">Brouillon</option>
                <option value="Archivé">Archivé</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 pt-5">
              <input 
                type="checkbox"
                id="pubCheck"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="rounded text-amber-500"
              />
              <label htmlFor="pubCheck" className="font-bold text-slate-900 cursor-pointer">
                Publier sur le site public
              </label>
            </div>

            <div className="flex items-center space-x-2 pt-5">
              <input 
                type="checkbox"
                id="featCheck"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded text-amber-500"
              />
              <label htmlFor="featCheck" className="font-bold text-amber-600 cursor-pointer">
                Mettre en avant (Coup de cœur)
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs shadow-md"
            >
              Enregistrer le bien
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
