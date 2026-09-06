import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { Property, CompanySettings } from '../../types';
import { 
  MapPin, Phone, MessageSquare, Calendar, Share2, CheckCircle2, 
  Bed, Bath, Maximize, Building, ShieldCheck, ArrowLeft, Send, CheckCircle, Eye
} from 'lucide-react';

interface PropertyDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ slug, onNavigate }) => {
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [settings, setSettings] = useState<CompanySettings>(store.getSettings());
  const [selectedImgIndex, setSelectedImgIndex] = useState<number>(0);
  const [visitModalOpen, setVisitModalOpen] = useState(false);

  // Visit Form state
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [visitorMsg, setVisitorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const prop = store.getPropertyBySlug(slug);
    setProperty(prop);
    setSettings(store.getSettings());
  }, [slug]);

  if (!property) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Bien immobilier non trouvé</h2>
        <p className="text-slate-500 text-sm">Le bien immobilier recherché n'existe plus ou a été dépublié.</p>
        <button 
          onClick={() => onNavigate('/biens')} 
          className="bg-slate-900 text-white font-semibold px-4 py-2 rounded-xl text-xs"
        >
          Retour aux biens immobiliers
        </button>
      </div>
    );
  }

  // Pre-filled WhatsApp message as explicitly requested in Section 18:
  // "Bonjour, je suis intéressé par le bien [NOM DU BIEN], référence [REFERENCE]."
  const generateWhatsAppUrl = () => {
    const cleanPhone = settings.whatsapp.replace(/[^0-9]/g, '');
    const messageText = `Bonjour, je suis intéressé par le bien ${property.title}, référence ${property.reference}.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;
  };

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visitorPhone) return;

    store.addInquiry({
      property_id: property.id,
      property_title: property.title,
      property_ref: property.reference,
      client_name: visitorName,
      phone: visitorPhone,
      email: visitorEmail,
      preferred_date: preferredDate,
      message: visitorMsg || `Demande de visite pour la référence ${property.reference}`,
      inquiry_type: 'Demande de visite'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setVisitModalOpen(false);
      setVisitorName('');
      setVisitorPhone('');
      setVisitorEmail('');
      setPreferredDate('');
      setVisitorMsg('');
    }, 3000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const currentImage = property.images[selectedImgIndex]?.image_url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      
      {/* Back button */}
      <button 
        onClick={() => onNavigate('/biens')} 
        className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour au catalogue des biens</span>
      </button>

      {/* Main Header Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              {property.transaction_type}
            </span>
            <span className="bg-slate-800 text-slate-300 font-mono text-xs px-3 py-1 rounded-full border border-slate-700">
              Réf: {property.reference}
            </span>
            <span className="bg-slate-800 text-amber-400 text-xs px-3 py-1 rounded-full border border-slate-700">
              {property.type}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {property.title}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm flex items-center mt-1">
            <MapPin className="w-4 h-4 text-amber-400 mr-1" />
            {property.neighborhood}, {property.location} - {property.city}, Sénégal
          </p>
        </div>

        <div className="text-left md:text-right">
          <span className="text-xs text-slate-400 block uppercase font-semibold">Prix proposé</span>
          <span className="text-3xl font-black text-amber-400 font-mono">
            {property.price.toLocaleString('fr-FR')} {property.currency}
          </span>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="space-y-4">
        <div className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-xl bg-slate-950 border border-slate-200">
          <img 
            src={currentImage} 
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700">
            Image {selectedImgIndex + 1} sur {property.images.length || 1}
          </div>
        </div>

        {/* Thumbnails list */}
        {property.images.length > 1 && (
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setSelectedImgIndex(idx)}
                className={`relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                  selectedImgIndex === idx ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.image_url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Specs, Description, Amenities */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Key Specs Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">
              Caractéristiques Principales
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Surface totale</span>
                <span className="text-sm font-bold text-slate-900 flex items-center">
                  <Maximize className="w-4 h-4 text-amber-500 mr-1.5" />
                  {property.surface} m²
                </span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Chambres</span>
                <span className="text-sm font-bold text-slate-900 flex items-center">
                  <Bed className="w-4 h-4 text-amber-500 mr-1.5" />
                  {property.bedrooms} chambre(s)
                </span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Salles de bain</span>
                <span className="text-sm font-bold text-slate-900 flex items-center">
                  <Bath className="w-4 h-4 text-amber-500 mr-1.5" />
                  {property.bathrooms} salle(s)
                </span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">Étage / Niveaux</span>
                <span className="text-sm font-bold text-slate-900 flex items-center">
                  <Building className="w-4 h-4 text-amber-500 mr-1.5" />
                  Niveau {property.floors}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Description du Bien
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities & Equipments */}
          {property.amenities.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Équipements & Prestations
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-slate-50 px-3 py-2 rounded-xl text-xs text-slate-700 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Location Map Simulation */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Localisation du Bien
            </h3>
            <div className="bg-slate-900 rounded-xl h-48 flex items-center justify-center text-white relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80" 
                alt="Carte Dakar" 
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute bg-slate-950/90 p-4 rounded-xl text-center border border-slate-700">
                <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-1 animate-bounce" />
                <p className="font-bold text-sm text-white">{property.neighborhood}, {property.location}</p>
                <p className="text-xs text-slate-300">Dakar • Sénégal</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Agent Actions Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5 sticky top-28">
            
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                ECS
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">ECS BTP</h4>
                <p className="text-xs text-slate-400">Agence & Promotion Dakar</p>
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 pt-1">
              
              {/* APPELER */}
              <a
                href={`tel:${settings.phone}`}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl border border-slate-700 flex items-center justify-center space-x-2 text-xs transition"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Appeler ({settings.phone})</span>
              </a>

              {/* WHATSAPP (WITH SPECIFIED PREFILLED MESSAGE) */}
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 text-xs transition shadow-lg shadow-emerald-950/40"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>

              {/* DEMANDER UNE VISITE */}
              <button
                onClick={() => setVisitModalOpen(true)}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 text-xs transition shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Demander une visite</span>
              </button>

              {/* PARTAGER */}
              <button
                onClick={handleShare}
                className="w-full bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold py-2.5 px-4 rounded-xl border border-slate-800 flex items-center justify-center space-x-2 text-xs transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Lien copié !' : 'Partager ce bien'}</span>
              </button>

            </div>

            <div className="text-[11px] text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="flex items-center text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                Titre Foncier Certifié
              </span>
              <p>Toutes nos transactions sont visées par notaire agréé à Dakar.</p>
            </div>

          </div>
        </div>

      </div>

      {/* DEMANDER UNE VISITE MODAL */}
      {visitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-lg w-full p-6 space-y-4 animate-fade-in shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>Demande de Visite</span>
              </h3>
              <button onClick={() => setVisitModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Vous demandez une visite pour le bien : <strong className="text-amber-400">{property.title}</strong> ({property.reference}).
            </p>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-6 rounded-xl text-center space-y-2">
                <CheckCircle className="w-10 h-10 mx-auto text-emerald-400" />
                <p className="font-bold">Demande enregistrée avec succès !</p>
                <p className="text-xs text-slate-300">Un conseiller vous rappellera rapidement.</p>
              </div>
            ) : (
              <form onSubmit={handleVisitSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Votre Nom & Prénom *</label>
                  <input 
                    type="text" 
                    required
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Ex: Cheikh Ndoye"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Téléphone WhatsApp *</label>
                    <input 
                      type="tel" 
                      required
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      placeholder="+221 77 000 00 00"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Date souhaitée</label>
                    <input 
                      type="date" 
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message ou Précisions</label>
                  <textarea 
                    rows={3}
                    value={visitorMsg}
                    onChange={(e) => setVisitorMsg(e.target.value)}
                    placeholder="Précisez votre disponibilité..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition"
                >
                  Confirmer la demande de visite
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
