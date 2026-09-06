import React from 'react';
import { X, CheckCircle, ArrowRight, Phone, MessageSquare, ShieldCheck, Building2, Hammer, Shield, Key, Home, Wrench } from 'lucide-react';

export interface ServiceDetail {
  title: string;
  desc: string;
  fullDesc: string;
  icon: any;
  image: string;
  advantages: string[];
  features: string[];
}

export const SERVICE_DETAILS_MAP: Record<string, ServiceDetail> = {
  "Construction": {
    title: "Construction & Gros Œuvre BTP",
    desc: "Grands travaux de structures et bâtiments résidentiels & commerciaux.",
    fullDesc: "ECS BTP prend en charge la totalité des travaux de construction et gros œuvre : fondations profondes, ossatures en béton armé, élévation des murs et structures complexes. Nous appliquons les normes internationales Eurocodes et garantissons une exécution rigoureuse supervisée par des ingénieurs certifiés au Sénégal.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
    advantages: [
      "Garantie décennale & contrôle qualité rigoureux",
      "Équipe d'ingénieurs et techniciens certifiés",
      "Matériaux aux normes internationales (NF / Eurocodes)",
      "Respect strict des délais et budgets convenus"
    ],
    features: [
      "Fondations profondes et pieux",
      "Structures en béton armé & poteaux-poutres",
      "Maçonnerie lourde & voiles en béton",
      "Superstructure & charpentes"
    ]
  },
  "BTP & Génie Civil": {
    title: "BTP & Travaux de Génie Civil",
    desc: "Assainissement, terrassement, VRD et ouvrages d'art à Dakar.",
    fullDesc: "Nos équipes d'ingénierie travaux exécutent vos projets d'aménagement urbain, de VRD (Voiries et Réseaux Divers), de terrassement de grande masse, d'assainissement d'eau pluviale et usée, ainsi que la réalisation d'ouvrages d'art complexes à Dakar et dans toutes les régions du Sénégal.",
    icon: Hammer,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    advantages: [
      "Parc d'engins modernes et performants (Pelles, Buldozers, Goudronneuses)",
      "Études de sol géotechniques poussées",
      "Maîtrise des réseaux d'assainissement et canalisations",
      "Conformité avec les normes environnementales"
    ],
    features: [
      "Terrassement de grande masse & nivellement",
      "Voiries et Réseaux Divers (VRD)",
      "Assainissement pluvial & réseaux d'eau",
      "Ouvrages d'art & ponts/dalles"
    ]
  },
  "Promotion immobilière": {
    title: "Promotion Immobilière Haut Standing",
    desc: "Développement de résidences neuves de haut standing sous Titre Foncier.",
    fullDesc: "En tant que promoteur immobilier référence, ECS BTP conçoit et réalise des programmes immobiliers neufs d'exception (immeubles R+5 à R+11, résidences fermées, villas contemporaines). Tous nos programmes sont développés exclusivement sur des terrains bénéficiant d'un Titre Foncier direct et inattaquable.",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    advantages: [
      "Titres Fonciers individuels certifiés",
      "Architecture contemporaine & finitions de luxe",
      "Vente en VEFA avec garanties financières",
      "Emplacements stratégiques (Almadies, Mermoz, Fann, Ngor)"
    ],
    features: [
      "Résidences sécurisées avec gardiennage 24/7",
      "Piscines, salles de sport & espaces verts",
      "Ascenseurs et groupes électrogènes de secours",
      "Parkings sous-sol réservés"
    ]
  },
  "Vente immobilière": {
    title: "Vente & Commercialisation Immobilière",
    desc: "Commercialisation d'appartements, villas, terrains et immeubles.",
    fullDesc: "Notre pôle transaction immobilière vous accompagne dans l'achat et la vente de biens immobiliers de standing à Dakar. Nous sélectionnons pour nos acquéreurs des opportunités certifiées (Appartements F3/F4/F5, Villas de luxe, Immeubles de rapport, Terrains avec Titre Foncier).",
    icon: Key,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    advantages: [
      "Portefeuille de biens vérifiés juridiquement",
      "Accompagnement notarié complet de A à Z",
      "Conseil financier & optimisation de l'investissement",
      "Transparence et négociation au prix juste"
    ],
    features: [
      "Vente d'appartements de haut standing",
      "Villas R+1 / R+2 avec piscine",
      "Terrains viabilisés sous Titre Foncier",
      "Locaux commerciaux & immeubles"
    ]
  },
  "Location & Gestion": {
    title: "Location & Gestion Locative Clé en Main",
    desc: "Gestion locative clé en main et sélection des candidats locataires.",
    fullDesc: "Maximisez les revenus de vos biens immobiliers en toute sérénité. ECS BTP gère l'intégralité de vos biens locatifs : sélection rigoureuse des locataires, rédaction des baux, quittancement, recouvrement des loyers, maintenance technique et suivi des réparations.",
    icon: Home,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    advantages: [
      "Sélection des candidats sur dossier solvable",
      "Reversement régulier des loyers chaque mois",
      "Gestion des réparations & entretien technique",
      "Assurance loyers impayés & suivi juridique"
    ],
    features: [
      "Recherche & vérification des locataires",
      "Rédaction de baux conforme à la législation",
      "États des lieux d'entrée et de sortie",
      "Suivi technique des équipements"
    ]
  },
  "Rénovation Lourde": {
    title: "Rénovation Lourde & Réhabilitation",
    desc: "Réhabilitation complète, réaménagement intérieur & façades.",
    fullDesc: "Transformez vos bâtiments et appartements existants. ECS BTP réalise la réhabilitation lourde et le réaménagement complet de vos espaces : reprise sous-œuvre, ravalement de façade thermo-acoustique, rénovation électrique et plomberie, aménagement d'intérieurs de standing.",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    advantages: [
      "Reprise de structures & renforcement béton",
      "Modernisation esthétique et fonctionnelle",
      "Optimisation énergétique des bâtiments",
      "Devis détaillé et planning strict"
    ],
    features: [
      "Ravalement de façade & étanchéité",
      "Plomberie, électricité & climatisation",
      "Revêtements sols, murs & carrelage",
      "Aménagement sur mesure"
    ]
  },
  "Gestion immobilière": {
    title: "Syndic de Copropriété & Gestion d'Actifs",
    desc: "Syndic de copropriété et valorisation du patrimoine immobilier.",
    fullDesc: "Conservez la valeur et la sécurité de vos immeubles et copropriétés. Nous assurons la gestion administrative, financière et technique des parties communes (ascenseurs, groupes électrogènes, gardiennage, entretien piscine, étanchéité et sécurité incendie).",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    advantages: [
      "Transparence comptable & rapports trimestriels",
      "Maintenance préventive des équipements clés",
      "Préservation du standing et de la valeur des biens",
      "Service d'astreinte technique 7j/7"
    ],
    features: [
      "Gestion des charges de copropriété",
      "Entretien des ascenseurs & groupes électrogènes",
      "Sécurité, gardiennage & vidéosurveillance",
      "Assemblée générale des copropriétaires"
    ]
  }
};

interface ServiceDetailModalProps {
  serviceTitle: string | null;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ serviceTitle, onClose, onNavigate }) => {
  if (!serviceTitle) return null;

  const detail = SERVICE_DETAILS_MAP[serviceTitle] || {
    title: serviceTitle,
    desc: "Service professionnel proposé par ECS BTP.",
    fullDesc: "ECS BTP intervient pour tous vos travaux de construction, génie civil et promotion immobilière au Sénégal avec une exigence de qualité irréprochable.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
    advantages: [
      "Savoir-faire reconnu et ingénieurs qualifiés",
      "Garantie décennale et suivi de chantier",
      "Respect strict du budget et des délais"
    ],
    features: [
      "Études techniques approfondies",
      "Supervision quotidienne du chantier",
      "Comptes rendus et livraisons dans les temps"
    ]
  };

  const IconComponent = detail.icon;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 text-slate-900 relative my-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-md transition shadow-lg"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img 
            src={detail.image} 
            alt={detail.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6 sm:p-8">
            <div className="text-white space-y-2">
              <div className="inline-flex items-center space-x-2 bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                <IconComponent className="w-4 h-4" />
                <span>Domaine d'Expertise ECS BTP</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {detail.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base mb-2">Présentation de la prestation</h3>
            <p className="text-slate-600 leading-relaxed">
              {detail.fullDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            {/* Avantages */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-600">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                Garanties & Avantages ECS BTP
              </h4>
              <ul className="space-y-2">
                {detail.advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inclus dans ce service */}
            <div>
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-600">
                <Building2 className="w-4 h-4 text-amber-500" />
                Prestations & Interventions
              </h4>
              <ul className="space-y-2">
                {detail.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-slate-600 font-semibold text-xs">
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Assistance Directe : <strong className="text-slate-900">+221 33 869 10 10</strong></span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onNavigate('/contact');
                }}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl transition shadow-lg flex items-center justify-center space-x-2 text-xs"
              >
                <span>Demander un Devis Gratuit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
