import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { Property, PropertyType, TransactionType } from '../../types';
import { Search, MapPin, Bed, Bath, Maximize, Filter, X, Building2 } from 'lucide-react';

interface PropertiesPageProps {
  onNavigate: (path: string) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({ onNavigate }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Tous');
  const [selectedTransaction, setSelectedTransaction] = useState<string>('Tous');
  const [selectedCity, setSelectedCity] = useState<string>('Tous');
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    const load = () => {
      setProperties(store.getProperties().filter(p => (p.published !== false && p.status !== 'Brouillon' && p.status !== 'Archivé')));
    };
    load();
    return store.subscribe(load);
  }, []);

  const typesList = ['Tous', 'Appartement', 'Villa', 'Maison', 'Terrain', 'Immeuble', 'Bureau', 'Magasin', 'Local commercial', 'Studio', 'Entrepôt'];
  const transactionsList = ['Tous', 'Vente', 'Location'];

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Tous' || p.type === selectedType;
    const matchesTransaction = selectedTransaction === 'Tous' || p.transaction_type === selectedTransaction;
    const matchesPrice = maxPrice === 0 || p.price <= maxPrice;
    return matchesSearch && matchesType && matchesTransaction && matchesPrice;
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Immobilier au Sénégal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
          Nos Biens Immobiliers à Vendre & à Louer
        </h1>
        <p className="text-slate-300 text-sm mt-2 max-w-2xl">
          Trouvez l'appartement, la villa ou le terrain idéal à Dakar (Almadies, Mermoz, Fann, Plateau, Rufisque...).
        </p>

        {/* Filter Form Bar */}
        <div className="mt-8 bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input 
                type="text"
                placeholder="Rechercher quartier, ref, titre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Property Type Dropdown */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {typesList.map(t => (
                  <option key={t} value={t}>Type: {t}</option>
                ))}
              </select>
            </div>

            {/* Offer Type */}
            <div>
              <select
                value={selectedTransaction}
                onChange={(e) => setSelectedTransaction(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {transactionsList.map(t => (
                  <option key={t} value={t}>Offre: {t}</option>
                ))}
              </select>
            </div>

            {/* Reset Filter Button */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('Tous');
                setSelectedTransaction('Tous');
                setMaxPrice(0);
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold py-2.5 px-4 rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition"
            >
              <X className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>

          </div>
        </div>

      </div>

      {/* Grid Results */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-bold text-slate-700">
            {filteredProperties.length} bien(s) correspondant à votre recherche
          </p>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-3">
            <Building2 className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-lg font-bold text-slate-800">Aucun bien immobilier trouvé</p>
            <p className="text-xs">Essayez d'élargir vos critères de recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <div 
                key={prop.id}
                onClick={() => onNavigate(`/biens/${prop.slug}`)}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={prop.images.find(img => img.is_cover)?.image_url || prop.images[0]?.image_url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"} 
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {prop.transaction_type}
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-900/90 text-white text-xs font-mono font-semibold px-2.5 py-1 rounded-lg">
                      {prop.reference}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-xs text-brand-600 font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      <span>{prop.neighborhood}, {prop.city}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition line-clamp-1">
                      {prop.title}
                    </h3>

                    <p className="text-xl font-extrabold text-amber-600 font-mono mt-2">
                      {prop.price.toLocaleString('fr-FR')} {prop.currency}
                    </p>

                    <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Maximize className="w-3.5 h-3.5 text-slate-400" />
                        <span>{prop.surface} m²</span>
                      </div>
                      {prop.bedrooms > 0 && (
                        <div className="flex items-center space-x-1">
                          <Bed className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prop.bedrooms} Ch.</span>
                        </div>
                      )}
                      {prop.bathrooms > 0 && (
                        <div className="flex items-center space-x-1">
                          <Bath className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prop.bathrooms} SdB</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <span className="w-full block text-center bg-slate-900 group-hover:bg-amber-500 text-white group-hover:text-slate-950 font-bold py-2.5 rounded-xl text-xs transition">
                    Voir la fiche détaillée
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
