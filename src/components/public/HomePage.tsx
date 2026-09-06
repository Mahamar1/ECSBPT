import React, { useState, useEffect } from 'react';
import { Hero } from './Hero';
import { ServiceDetailModal } from './ServiceDetailModal';
import { store } from '../../services/store';
import { Property, BTPProject, Realization, Publication, CompanySettings } from '../../types';
import { 
  Building2, Home, Hammer, Key, Wrench, Shield, ArrowRight, 
  MapPin, Bed, Bath, Maximize, Calendar, Phone, Mail, MessageSquare, Send, CheckCircle
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [projects, setProjects] = useState<BTPProject[]>([]);
  const [realizations, setRealizations] = useState<Realization[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [settings, setSettings] = useState<CompanySettings>(store.getSettings());

  // Service Detail Modal state
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    const loadData = () => {
      setProperties(store.getProperties().filter(p => p.published).slice(0, 3));
      setProjects(store.getProjects().filter(p => p.published).slice(0, 3));
      setRealizations(store.getRealizations().filter(r => r.published).slice(0, 3));
      setPublications(store.getPublications().filter(p => p.status === 'Publié').slice(0, 3));
      setSettings(store.getSettings());
    };
    loadData();
    return store.subscribe(loadData);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactMessage) return;
    store.addInquiry({
      client_name: contactName,
      phone: contactPhone,
      email: contactEmail,
      message: contactMessage,
      inquiry_type: 'Contact Site Web'
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactMessage('');
    }, 4000);
  };

  const activities = [
    { title: "Construction", desc: "Grands travaux de structures et bâtiments résidentiels & commerciaux.", icon: Building2 },
    { title: "BTP & Génie Civil", desc: "Assainissement, terrassement, VRD et ouvrages d'art à Dakar.", icon: Hammer },
    { title: "Promotion immobilière", desc: "Développement de résidences neuves de haut standing sous Titre Foncier.", icon: Shield },
    { title: "Vente immobilière", desc: "Commercialisation d'appartements, villas, terrains et immeubles.", icon: Key },
    { title: "Location & Gestion", desc: "Gestion locative clé en main et sélection des candidats locataires.", icon: Home },
    { title: "Rénovation Lourde", desc: "Réhabilitation complète, réaménagement intérieur & façades.", icon: Wrench },
    { title: "Gestion immobilière", desc: "Syndic de copropriété et valorisation du patrimoine immobilier.", icon: Shield }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <Hero onNavigate={onNavigate} />

      {/* 2. NOS ACTIVITÉS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">
            Expertise & Savoir-faire
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Nos Activités & Domaines d'Intervention
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Une prise en charge intégrale de vos projets de construction et investissements immobiliers au Sénégal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((act, idx) => {
            const IconComp = act.icon;
            return (
              <div 
                key={idx}
                onClick={() => setSelectedServiceTitle(act.title)}
                className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-amber-400 cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {act.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {act.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-extrabold text-brand-600 group-hover:text-amber-600">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Detail Service */}
        <ServiceDetailModal 
          serviceTitle={selectedServiceTitle}
          onClose={() => setSelectedServiceTitle(null)}
          onNavigate={onNavigate}
        />
      </section>


      {/* 3. NOS BIENS IMMOBILIERS */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">
                Portefeuille Immobilier
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                Derniers Biens Immobiliers Publiés
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Découvrez nos appartements, villas et terrains disponibles à Dakar.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/biens')}
              className="mt-4 md:mt-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition"
            >
              <span>Voir tous nos biens</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <div 
                key={prop.id}
                onClick={() => onNavigate(`/biens/${prop.slug}`)}
                className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-amber-400/50 transition cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={prop.images[0]?.image_url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"} 
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/90 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {prop.transaction_type}
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-900/90 text-white text-xs font-mono font-semibold px-2.5 py-1 rounded-lg">
                      {prop.reference}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-xs text-amber-400 font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      <span>{prop.neighborhood}, {prop.city}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition line-clamp-1">
                      {prop.title}
                    </h3>

                    <p className="text-xl font-extrabold text-amber-400 font-mono mt-2">
                      {prop.price.toLocaleString('fr-FR')} {prop.currency}
                    </p>

                    <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-slate-800/80 text-xs text-slate-300">
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
                  <span className="w-full block text-center bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold py-2 rounded-lg text-xs transition border border-slate-800">
                    Découvrir l'annonce
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NOS PROJETS BTP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-brand-600 font-bold text-xs uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
              Ingénierie & Chantier
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Projets BTP en Cours de Construction
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Suivi de l'avancement technique de nos grands chantiers résidentiels et tertiaires.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/projets')}
            className="mt-4 md:mt-0 bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition"
          >
            <span>Voir tous les projets</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div 
              key={proj.id}
              onClick={() => onNavigate(`/projets/${proj.slug}`)}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={proj.images[0]?.image_url || "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80"} 
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {proj.project_type}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {proj.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-700">Progression du chantier</span>
                      <span className="text-brand-600 font-mono">{proj.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-brand-500 to-amber-500 h-2.5 rounded-full" 
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-100 pt-3">
                  <span>Client : <strong className="text-slate-700">{proj.client}</strong></span>
                  <span className="font-semibold text-brand-600">Détails →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. NOS RÉALISATIONS */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              Portfolio & Références
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Nos Réalisations d'Exception
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Aperçu des ouvrages majeurs conçus, construits et livrés avec succès.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {realizations.map((real) => (
              <div 
                key={real.id}
                onClick={() => onNavigate(`/realisations/${real.slug}`)}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group grid grid-cols-1 sm:grid-cols-12"
              >
                <div className="sm:col-span-5 relative h-48 sm:h-auto overflow-hidden">
                  <img 
                    src={real.images[0]?.image_url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"} 
                    alt={real.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-amber-400 text-xs font-mono font-bold px-2.5 py-1 rounded-md">
                    {real.year}
                  </div>
                </div>

                <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-brand-600 font-bold uppercase tracking-wider">
                      {real.realization_type}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-amber-600 transition">
                      {real.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                      {real.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-semibold text-slate-700">
                    <span className="flex items-center text-slate-500">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {real.location}
                    </span>
                    <span className="text-amber-600">Voir la fiche →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DERNIÈRES PUBLICATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-purple-600 font-bold text-xs uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
              Actualités & Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Dernières Publications du Blog
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Conseils immobiliers, actualités BTP et guides pour investir à Dakar.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/publications')}
            className="mt-4 md:mt-0 bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition"
          >
            <span>Voir toutes les publications</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publications.map((pub) => (
            <div 
              key={pub.id}
              onClick={() => onNavigate(`/publications/${pub.slug}`)}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
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
                  <span className="text-[11px] text-slate-400 font-medium">
                    {new Date(pub.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-purple-600 transition line-clamp-2">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {pub.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <span className="text-xs font-bold text-purple-600 group-hover:underline">
                  Lire la suite →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SECTION CONTACT & LOCALISATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="bg-amber-500/10 text-amber-400 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20">
                Prendre Contact
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Un Projet BTP ou Immobilier à Dakar ?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Nos équipes d'ingénieurs et nos conseillers immobiliers sont à votre entière disposition pour étudier votre projet et vous proposer les meilleures opportunités.
              </p>

              <div className="space-y-4 text-sm pt-2">
                <div className="flex items-center space-x-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400">Téléphone Direct</span>
                    <a href={`tel:${settings.phone}`} className="font-mono font-bold text-white hover:text-amber-400">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
                  <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400">WhatsApp Officiel</span>
                    <a 
                      href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="font-mono font-bold text-emerald-400 hover:underline"
                    >
                      {settings.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
                  <Mail className="w-5 h-5 text-brand-400 shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400">Adresse Email</span>
                    <a href={`mailto:${settings.email}`} className="font-bold text-white hover:text-brand-400">
                      {settings.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-inner">
              <h3 className="text-xl font-bold text-white mb-4">
                Envoyer un message à l'entreprise
              </h3>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-6 rounded-xl text-center space-y-2 animate-fade-in">
                  <CheckCircle className="w-12 h-12 mx-auto text-emerald-400" />
                  <p className="font-bold text-lg">Message envoyé avec succès !</p>
                  <p className="text-xs text-slate-300">
                    Merci. Notre équipe traitera votre demande dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Nom complet *</label>
                      <input 
                        type="text" 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ex: Babacar Ndiaye"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Téléphone *</label>
                      <input 
                        type="tel" 
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+221 77 000 00 00"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Adresse Email</label>
                    <input 
                      type="email" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="nom@exemple.sn"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Votre Message *</label>
                    <textarea 
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Décrivez votre besoin (achat de bien, devis construction BTP, visite...)..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Envoyer ma demande</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
