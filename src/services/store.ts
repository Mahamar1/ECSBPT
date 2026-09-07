import { 
  Property, BTPProject, Realization, Publication, 
  Client, Inquiry, Service, DocumentItem, MessageItem, CompanySettings, UserProfile 
} from '../types';

// ==========================================
// INITIAL DEMO SEED DATA (DAKAR & SÉNÉGAL)
// ==========================================

export const INITIAL_SETTINGS: CompanySettings = {
  company_name: "ECS BTP",
  logo: "/logo.png",
  tagline: "Construire aujourd'hui, investir pour demain.",
  phone: "+221 77 605 86 86 / +221 77 620 95 95 / +221 78 275 94 90",
  whatsapp: "+221 77 605 86 86",
  email: "contact@ecs-btp.sn",
  address: "Hann Maristes 2, Villa N°220, Dakar, Sénégal",
  website: "https://ecs-btp.sn",
  facebook: "https://facebook.com/ecsbtp",
  instagram: "https://instagram.com/ecsbtp",
  linkedin: "https://linkedin.com/company/ecsbtp",
  youtube: "https://youtube.com/c/ecsbtp",
  description: "ECS BTP est une entreprise référence au Sénégal spécialisée dans les grands travaux de construction BTP, la promotion immobilière haut de gamme et la vente/location de biens d'exception à Dakar et ses environs.",
  hours: "Lun - Ven: 08h00 - 18h30 | Sam: 09h00 - 13h00",
  gps: "14.7297, -17.4338"
};


export const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "Appartement F4 Standing Vue Mer aux Almadies",
    slug: "appartement-f4-standing-vue-mer-almadies",
    reference: "SBI-ALM-001",
    type: "Appartement",
    transaction_type: "Vente",
    price: 185000000,
    currency: "FCFA",
    location: "Almadies",
    neighborhood: "Zone Ambassades",
    city: "Dakar",
    surface: 210,
    bedrooms: 3,
    bathrooms: 3,
    floors: 4,
    description: "Somptueux appartement F4 situé au 4ème étage d'une résidence sécurisée de très haut standing aux Almadies. Offrant une vue panoramique imprenable sur l'océan Atlantique, cet appartement comprend une suite parentale avec dressing et salle de bain jacuzzi, deux chambres secondaires avec salles d'eau privatives, un grand salon lumineux s'ouvrant sur une vaste terrasse, une cuisine équipée avec buanderie et une chambre de service.",
    amenities: ["Vue sur Mer", "Piscine commune", "Ascenseur", "Groupe électrogène", "Surveillance 24/7", "Parking sous-sol", "Climatisation centralisée", "Cuisine équipée"],
    status: "Disponible",
    published: true,
    featured: true,
    agent_contact: "+221 77 605 86 86",
    created_at: "2026-08-15T10:00:00Z",
    images: [
      { id: "img-1-1", property_id: "prop-1", image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", is_cover: true, display_order: 1 },
      { id: "img-1-2", property_id: "prop-1", image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", is_cover: false, display_order: 2 },
      { id: "img-1-3", property_id: "prop-1", image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80", is_cover: false, display_order: 3 }
    ]
  },
  {
    id: "prop-2",
    title: "Villa Moderne R+1 avec Piscine & Jardin à Mermoz",
    slug: "villa-moderne-r1-avec-piscine-jardin-mermoz",
    reference: "SBI-MER-002",
    type: "Villa",
    transaction_type: "Vente",
    price: 320000000,
    currency: "FCFA",
    location: "Mermoz Pyrotechnie",
    neighborhood: "Mermoz",
    city: "Dakar",
    surface: 450,
    bedrooms: 5,
    bathrooms: 5,
    floors: 2,
    description: "Splendide villa contemporaine R+1 construite sur un terrain de 450m² dans le quartier prisé de Mermoz. La villa offre des prestations d'exception : grand séjour traversant illuminé par de baies vitrées coulissantes donnant sur la piscine chauffée et le jardin paysager, 5 suites spacieuses avec salles de bains, garage fermé pour 3 véhicules et quartier pour le personnel.",
    amenities: ["Piscine privative", "Jardin paysager", "Garage 3 voitures", "Groupe électrogène 50 kVA", "Système d'alarme & Vidéosurveillance", "Réserve d'eau 2000L"],
    status: "Disponible",
    published: true,
    featured: true,
    agent_contact: "+221 77 605 86 86",
    created_at: "2026-08-20T14:30:00Z",
    images: [
      { id: "img-2-1", property_id: "prop-2", image_url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80", is_cover: true, display_order: 1 },
      { id: "img-2-2", property_id: "prop-2", image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", is_cover: false, display_order: 2 }
    ]
  },
  {
    id: "prop-3",
    title: "Appartement F3 Meublé à Louer à Fann Résidence",
    slug: "appartement-f3-meuble-a-louer-fann-residence",
    reference: "SBI-FAN-003",
    type: "Appartement",
    transaction_type: "Location",
    price: 1500000,
    currency: "FCFA/mois",
    location: "Fann Résidence",
    neighborhood: "Fann",
    city: "Dakar",
    surface: 140,
    bedrooms: 2,
    bathrooms: 2,
    floors: 2,
    description: "Superbe appartement F3 entièrement meublé et équipé avec goût à Fann Résidence. Idéal pour expatriés ou cadres d'entreprise. Comprend 2 chambres autonomes, salon élégant, cuisine américaine équipée, balcon avec aperçu mer et service de gardiennage.",
    amenities: ["Meublé", "Wifi Fibre", "Gardiennage 24h", "Machine à laver", "Smart TV", "Parking", "Climatisation"],
    status: "Disponible",
    published: true,
    featured: false,
    agent_contact: "+221 77 605 86 86",
    created_at: "2026-08-28T09:15:00Z",
    images: [
      { id: "img-3-1", property_id: "prop-3", image_url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", is_cover: true, display_order: 1 }
    ]
  },
  {
    id: "prop-4",
    title: "Terrain Viabilisé Titre Foncier de 500 m² à Rufisque / Lac Rose",
    slug: "terrain-viabilise-titre-foncier-500m2-rufisque",
    reference: "SBI-RUF-004",
    type: "Terrain",
    transaction_type: "Vente",
    price: 35000000,
    currency: "FCFA",
    location: "Rufisque",
    neighborhood: "Proche Lac Rose / Sangalkam",
    city: "Dakar",
    surface: 500,
    bedrooms: 0,
    bathrooms: 0,
    floors: 0,
    description: "Parcelle d'angle de 500 m² bénéficiant d'un Titre Foncier individuel net et clair de toute charge. Terrain plat, parfaitement viabilisé (eau, électricité Senelec, accès bitumé). Emplacement stratégique idéal pour construction de villa ou projet d'investissement.",
    amenities: ["Titre Foncier", "Viabilisé (Eau/Électricité)", "Accès goudronné", "Proximité autoroute à péage"],
    status: "Disponible",
    published: true,
    featured: false,
    agent_contact: "+221 77 605 86 86",
    created_at: "2026-09-01T11:00:00Z",
    images: [
      { id: "img-4-1", property_id: "prop-4", image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80", is_cover: true, display_order: 1 }
    ]
  },
  {
    id: "prop-5",
    title: "Immeuble R+5 Commercial & Résidentiel au Plateau Dakar",
    slug: "immeuble-r5-commercial-residentiel-plateau-dakar",
    reference: "SBI-PLA-005",
    type: "Immeuble",
    transaction_type: "Vente",
    price: 1200000000,
    currency: "FCFA",
    location: "Dakar Plateau",
    neighborhood: "Avenue Ponty",
    city: "Dakar",
    surface: 1200,
    bedrooms: 12,
    bathrooms: 14,
    floors: 6,
    description: "Opportunité exceptionnelle d'investissement immobilier au cœur du quartier des affaires de Dakar Plateau. Immeuble R+5 récent comprenant 2 locaux commerciaux au rez-de-chaussée et 10 appartements F3 et F4 aux étages supérieurs avec haut rendement locatif garanti.",
    amenities: ["Emplacement premium", "Rentabilité > 9%", "Ascenseur double", "Sous-sol 8 véhicules", "Transformateur dédié"],
    status: "Disponible",
    published: true,
    featured: true,
    agent_contact: "+221 77 605 86 86",
    created_at: "2026-09-02T16:20:00Z",
    images: [
      { id: "img-5-1", property_id: "prop-5", image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", is_cover: true, display_order: 1 }
    ]
  }
];

export const INITIAL_PROJECTS: BTPProject[] = [
  {
    id: "proj-1",
    title: "Construction Tour Résidentielle R+11 'ECS Horizon' - Almadies",
    slug: "tour-residentielle-r11-ecs-horizon-almadies",
    description: "Projet de construction d'une tour d'habitation de grand standing R+11 comprenant 22 appartements de luxe, un penthouse duplex avec piscine à débordement sur le toit, parking sous-sol sur 2 niveaux et espace bien-être.",
    location: "Almadies, Dakar",
    project_type: "R+11",
    client: "Groupe Immobilier Horizon West Africa",
    floors: 12,
    surface: 4800,
    budget: 3500000000,
    start_date: "2025-03-01",
    end_date: "2027-06-30",
    progress: 65,
    status: "En cours",
    published: true,
    created_at: "2025-03-01T08:00:00Z",
    images: [
      { id: "pimg-1-1", project_id: "proj-1", image_url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80", display_order: 1 },
      { id: "pimg-1-2", project_id: "proj-1", image_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80", display_order: 2 }
    ]
  },
  {
    id: "proj-2",
    title: "Construction Complexe Immobilier R+5 'Résidence Teranga' - Mermoz",
    slug: "complexe-immobilier-r5-residence-teranga-mermoz",
    description: "Travaux de fondations spéciales (pieux forés), gros œuvre et second œuvre pour un complexe résidentiel et commercial R+5 respectant les normes parasismiques et d'efficacité énergétique HQE.",
    location: "Mermoz, Dakar",
    project_type: "R+5",
    client: "SCI Teranga Invest",
    floors: 6,
    surface: 2400,
    budget: 1800000000,
    start_date: "2025-09-15",
    end_date: "2026-11-30",
    progress: 80,
    status: "En cours",
    published: true,
    created_at: "2025-09-15T09:00:00Z",
    images: [
      { id: "pimg-2-1", project_id: "proj-2", image_url: "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80", display_order: 1 }
    ]
  },
  {
    id: "proj-3",
    title: "Aménagement & Rénovation Siège Social Banque - Plateau",
    slug: "amenagement-renovation-siege-social-banque-plateau",
    description: "Rénovation lourde de structure, réaménagement d'espaces de bureaux et modernisation des façades vitrées bioclimatiques.",
    location: "Dakar Plateau",
    project_type: "Rénovation",
    client: "Institution Financière Régionale",
    floors: 8,
    surface: 3200,
    budget: 950000000,
    start_date: "2026-01-10",
    end_date: "2026-08-31",
    progress: 95,
    status: "Terminé",
    published: true,
    created_at: "2026-01-10T08:30:00Z",
    images: [
      { id: "pimg-3-1", project_id: "proj-3", image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80", display_order: 1 }
    ]
  }
];

export const INITIAL_REALIZATIONS: Realization[] = [
  {
    id: "real-1",
    title: "Construction de l'Immeuble R+10 Le Semaphore à Fann",
    slug: "construction-immeuble-r10-le-semaphore-fann",
    description: "Livraison clé en main d'un immeuble de bureaux de 10 étages avec certification environnementale et structure béton armé précontraint.",
    location: "Fann Corniche, Dakar",
    realization_type: "Bâtiment Administratif",
    year: 2025,
    technical_specs: "Surface bâtie : 5 200 m² | 2 Niveaux de Sous-sol | Façade mur-rideau aluminium haute isolation thermique",
    published: true,
    created_at: "2025-12-01T10:00:00Z",
    images: [
      { id: "rimg-1", realization_id: "real-1", image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", display_order: 1 }
    ]
  },
  {
    id: "real-2",
    title: "Ensemble de 6 Villas Contemporaines avec Piscines à Ngor",
    slug: "ensemble-6-villas-contemporaines-ngor",
    description: "Conception et réalisation d'un lotissement privé sécurisé de 6 villas de luxe bioclimatiques avec domotique et énergies renouvelables.",
    location: "Ngor Virage, Dakar",
    realization_type: "Promotion Immobilière Privée",
    year: 2024,
    technical_specs: "Panneaux solaires photovoltaïques 12kW par villa | Domotique Somfy | Isolation phonique thermo-acoustique",
    published: true,
    created_at: "2024-11-15T14:00:00Z",
    images: [
      { id: "rimg-2", realization_id: "real-2", image_url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80", display_order: 1 }
    ]
  }
];

export const INITIAL_PUBLICATIONS: Publication[] = [
  {
    id: "pub-1",
    title: "Pourquoi Investir dans l'Immobilier Neuf à Dakar en 2026 ?",
    slug: "pourquoi-investir-dans-limmobilier-neuf-a-dakar-en-2026",
    category: "Conseils",
    excerpt: "Découvrez les zones à forte plus-value à Dakar (Almadies, Ngor, Diamniadio) et les avantages fiscaux et locatifs de la promotion neuve au Sénégal.",
    content: `
      <h2>L'essor du marché immobilier sénégalais</h2>
      <p>Avec une croissance économique soutenue et des projets d'infrastructure majeurs comme le BRT et le TER, le secteur immobilier à Dakar connaît une dynamisme sans précédent. Investir dans du neuf présente aujourd'hui des garanties solides pour les investisseurs locaux et la diaspora.</p>
      
      <h3>1. Une demande locative en forte hausse</h3>
      <p>La capitale sénégalaise concentre plus de 80% des activités économiques du pays. La forte présence d'entreprises internationales, d'ONG et d'institutions régionales génère une demande continue pour des logements de standing meublés ou non meublés.</p>

      <h3>2. Des normes de construction BTP modernisées</h3>
      <p>Les programmes neufs réalisés par des professionnels certifiés comme <strong>ECS BTP</strong> respectent les normes eurocodes et parasismiques, offrant des garanties décennales et une isolation thermique essentielle sous le climat ouest-africain.</p>

      <blockquote>"Investir dans un bien immobilier sous Titre Foncier à Dakar reste la valeur refuge par excellence."</blockquote>

      <h3>3. Conseils pour sécuriser votre achat</h3>
      <ul>
        <li>Vérifiez la nature juridique du titre (Titre Foncier vs Bail).</li>
        <li>Exigez les plans architecturaux validés et la garantie d'achèvement.</li>
        <li>Faites appel à une entreprise BTP agréée avec un historique vérifiable.</li>
      </ul>
    `,
    cover_image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    status: "Publié",
    published_at: "2026-08-10T09:00:00Z",
    author: "Ing. Mouhamed Niang",
    seo_title: "Investissement Immobilier Dakar 2026 | Conseils & Rendement - ECS BTP",
    seo_description: "Guide complet sur l'achat et l'investissement immobilier neuf à Dakar, Almadies, Mermoz. Rendement locatif et garanties juridiques au Sénégal.",
    created_at: "2026-08-10T09:00:00Z"
  },
  {
    id: "pub-2",
    title: "Lancement du Chantier de la Tour 'ECS Horizon' aux Almadies",
    slug: "lancement-du-chantier-de-la-tour-ecs-horizon-aux-almadies",
    category: "Actualités",
    excerpt: "ECS BTP annonce le démarrage officiel des fondations profondes du projet emblématique R+11 en bordure de mer.",
    content: `
      <h2>Un nouveau repère architectural à Dakar</h2>
      <p>Le groupe ECS BTP a officiellement posé la première pierre de la résidence <strong>ECS Horizon</strong> aux Almadies. Ce projet d'envergure démontre notre savoir-faire en matière d'ingénierie lourde et de gros œuvre.</p>
      
      <p>Équipé de technologies d'efficacité énergétique et de systèmes domotiques avancés, cet immeuble de 12 niveaux proposera une expérience résidentielle inégalée à Dakar.</p>
    `,
    cover_image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
    status: "Publié",
    published_at: "2026-08-25T11:30:00Z",
    author: "Direction Communication",
    seo_title: "Chantier Tour ECS Horizon Almadies Dakar | ECS BTP",
    seo_description: "Démarrage des travaux du projet d'immeuble R+11 ECS Horizon aux Almadies Dakar.",
    created_at: "2026-08-25T11:30:00Z"
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: "cli-1",
    first_name: "Ousmane",
    last_name: "Diop",
    phone: "+221 77 633 44 55",
    email: "o.diop@email.sn",
    address: "Almadies, Dakar",
    client_type: "Acheteur",
    notes: "Recherche appartement F4 aux Almadies ou Fann. Budget : 180M FCFA.",
    created_at: "2026-08-18T10:00:00Z"
  },
  {
    id: "cli-2",
    first_name: "Aminata",
    last_name: "Sall",
    phone: "+221 78 122 99 00",
    email: "a.sall@gmail.com",
    address: "Sacré Cœur 3, Dakar",
    client_type: "Investisseur",
    notes: "Intéressée par achat en VEFA sur la tour ECS Horizon.",

    created_at: "2026-08-22T14:15:00Z"
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "inq-1",
    property_id: "prop-1",
    property_title: "Appartement F4 Standing Vue Mer aux Almadies",
    property_ref: "SBI-ALM-001",
    client_name: "Ousmane Diop",
    phone: "+221 77 633 44 55",
    email: "o.diop@email.sn",
    message: "Bonjour, je souhaite visiter cet appartement F4 aux Almadies vendredi après-midi vers 16h.",
    preferred_date: "2026-09-12",
    inquiry_type: "Demande de visite",
    status: "Nouveau",
    created_at: "2026-09-04T16:00:00Z"
  },
  {
    id: "inq-2",
    property_id: "prop-2",
    property_title: "Villa Moderne R+1 avec Piscine & Jardin à Mermoz",
    property_ref: "SBI-MER-002",
    client_name: "Fatou Sow",
    phone: "+221 70 888 11 22",
    email: "fsow@company.com",
    message: "Bonjour, la villa à Mermoz est-elle toujours disponible ? Est-ce négociable ?",
    preferred_date: "2026-09-10",
    inquiry_type: "Demande d'information",
    status: "En attente",
    created_at: "2026-09-03T11:20:00Z"
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: "serv-1",
    title: "Construction & Gros Œuvre",
    slug: "construction-gros-oeuvre",
    description: "Réalisation de fondations lourdes, dallages, structures béton armé, poteaux-poutres pour immeubles, villas et bâtiments industriels.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80",
    advantages: ["Bureau d'études intégré", "Respect strict des délais", "Garantie décennale"],
    published: true
  },
  {
    id: "serv-2",
    title: "Génie Civil & Infrastructures",
    slug: "genie-civil-infrastructures",
    description: "Travaux d'assainissement, voiries et réseaux divers (VRD), aménagement de zones résidentielles et lotissements.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    advantages: ["Engins de chantier modernes", "Normes internationales", "Équipe d'ingénieurs qualifiés"],
    published: true
  },
  {
    id: "serv-3",
    title: "Promotion Immobilière Haut de Gamme",
    slug: "promotion-immobiliere",
    description: "Développement de programmes immobiliers neufs, résidences d'appartements et complexes de villas à haute valeur ajoutée.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    advantages: ["Titres fonciers garantis", "Achèvement garanti (VEFA)", "Espaces communs d'exception"],
    published: true
  },
  {
    id: "serv-4",
    title: "Vente & Location Immobilière",
    slug: "vente-location-immobiliere",
    description: "Commercialisation et gestion locative personnalisée de vos biens immobiliers à Dakar et dans tout le Sénégal.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    advantages: ["Diffusion multi-canal", "Sélection rigoureuse des candidats", "Contrats rédigés par notaire"],
    published: true
  },
  {
    id: "serv-5",
    title: "Architecture & Rénovation",
    slug: "architecture-renovation",
    description: "Reconfiguration d'espaces interior & exterior design, rénovation énergétique et modernisation de bâtiments anciens.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    advantages: ["Modélisation 3D et visite virtuelle", "Matériaux premium", "Suivi quotidien du chantier"],
    published: true
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: "doc-1",
    name: "Plaquette_Corporative_ECS_BTP_2026.pdf",

    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    category: "Présentation",
    created_at: "2026-01-15T08:00:00Z"
  },
  {
    id: "doc-2",
    name: "Catalogue_Programmes_Neufs_Dakar.pdf",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    category: "Brochure Immobilier",
    created_at: "2026-03-20T10:30:00Z"
  }
];

// ==========================================
// STORE IMPLEMENTATION WITH LOCALSTORAGE PERSISTENCE
// ==========================================

class AppStore {
  private settings: CompanySettings;
  private properties: Property[];
  private projects: BTPProject[];
  private realizations: Realization[];
  private publications: Publication[];
  private clients: Client[];
  private inquiries: Inquiry[];
  private services: Service[];
  private documents: DocumentItem[];
  private listeners: Set<() => void> = new Set();
  private broadcastChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window ? new BroadcastChannel('sbi_store_channel') : null;

  constructor() {
    this.settings = INITIAL_SETTINGS;
    this.properties = INITIAL_PROPERTIES;
    this.projects = INITIAL_PROJECTS;
    this.realizations = INITIAL_REALIZATIONS;
    this.publications = INITIAL_PUBLICATIONS;
    this.clients = INITIAL_CLIENTS;
    this.inquiries = INITIAL_INQUIRIES;
    this.services = INITIAL_SERVICES;
    this.documents = INITIAL_DOCUMENTS;

    this.reloadFromStorage();

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key && e.key.startsWith('sbi_')) {
          this.reloadFromStorage();
          this.notify();
        }
      });

      if (this.broadcastChannel) {
        this.broadcastChannel.onmessage = () => {
          this.reloadFromStorage();
          this.notify();
        };
      }
    }
  }

  private reloadFromStorage() {
    this.settings = this.load('sbi_settings', INITIAL_SETTINGS);
    this.properties = this.load('sbi_properties', INITIAL_PROPERTIES);
    this.projects = this.load('sbi_projects', INITIAL_PROJECTS);
    this.realizations = this.load('sbi_realizations', INITIAL_REALIZATIONS);
    this.publications = this.load('sbi_publications', INITIAL_PUBLICATIONS);
    this.clients = this.load('sbi_clients', INITIAL_CLIENTS);
    this.inquiries = this.load('sbi_inquiries', INITIAL_INQUIRIES);
    this.services = this.load('sbi_services', INITIAL_SERVICES);
    this.documents = this.load('sbi_documents', INITIAL_DOCUMENTS);
  }

  private load<T>(key: string, fallback: T): T {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  }

  private save(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      this.broadcastChannel?.postMessage({ type: 'STORE_UPDATED', key, timestamp: Date.now() });
      this.notify();
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  // --- SETTINGS ---
  getSettings(): CompanySettings {
    return this.settings;
  }
  updateSettings(newSettings: Partial<CompanySettings>) {
    this.settings = { ...this.settings, ...newSettings };
    this.save('sbi_settings', this.settings);
  }

  // --- PROPERTIES ---
  getProperties(): Property[] {
    return this.properties;
  }
  getPropertyBySlug(slug: string): Property | undefined {
    return this.properties.find(p => p.slug === slug);
  }
  saveProperty(property: Partial<Property>): Property {
    if (property.id) {
      this.properties = this.properties.map(p => p.id === property.id ? { ...p, ...property, updated_at: new Date().toISOString() } as Property : p);
    } else {
      const newProp: Property = {
        id: `prop-${Date.now()}`,
        title: property.title || "Bien Immobilier",
        slug: property.slug || (property.title ? property.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `bien-${Date.now()}`),
        reference: property.reference || `SBI-${Math.floor(100 + Math.random() * 900)}`,
        type: property.type || 'Appartement',
        transaction_type: property.transaction_type || 'Vente',
        price: property.price || 0,
        currency: property.currency || 'FCFA',
        location: property.location || 'Dakar',
        neighborhood: property.neighborhood || 'Centre',
        city: property.city || 'Dakar',
        surface: property.surface || 0,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        floors: property.floors || 1,
        description: property.description || '',
        amenities: property.amenities || [],
        status: property.status || 'Disponible',
        published: property.published ?? true,
        featured: property.featured ?? false,
        agent_contact: property.agent_contact || this.settings.whatsapp,
        images: property.images || [],
        created_at: new Date().toISOString()
      };
      this.properties = [newProp, ...this.properties];
    }
    this.save('sbi_properties', this.properties);
    return this.properties.find(p => p.slug === property.slug || p.id === property.id)!;
  }
  deleteProperty(id: string) {
    this.properties = this.properties.filter(p => p.id !== id);
    this.save('sbi_properties', this.properties);
  }

  // --- PROJECTS ---
  getProjects(): BTPProject[] {
    return this.projects;
  }
  getProjectBySlug(slug: string): BTPProject | undefined {
    return this.projects.find(p => p.slug === slug);
  }
  saveProject(project: Partial<BTPProject>): BTPProject {
    if (project.id) {
      this.projects = this.projects.map(p => p.id === project.id ? { ...p, ...project } as BTPProject : p);
    } else {
      const newProject: BTPProject = {
        id: `proj-${Date.now()}`,
        title: project.title || "Projet BTP",
        slug: project.slug || (project.title ? project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `proj-${Date.now()}`),
        description: project.description || '',
        location: project.location || 'Dakar',
        project_type: project.project_type || 'Immeuble',
        client: project.client || 'Client Privé',
        floors: project.floors || 1,
        surface: project.surface || 0,
        budget: project.budget || 0,
        start_date: project.start_date || new Date().toISOString().split('T')[0],
        end_date: project.end_date || new Date().toISOString().split('T')[0],
        progress: project.progress || 0,
        status: project.status || 'En cours',
        published: project.published ?? true,
        images: project.images || [],
        created_at: new Date().toISOString()
      };
      this.projects = [newProject, ...this.projects];
    }
    this.save('sbi_projects', this.projects);
    return this.projects.find(p => p.id === project.id)!;
  }
  deleteProject(id: string) {
    this.projects = this.projects.filter(p => p.id !== id);
    this.save('sbi_projects', this.projects);
  }

  // --- REALIZATIONS ---
  getRealizations(): Realization[] {
    return this.realizations;
  }
  getRealizationBySlug(slug: string): Realization | undefined {
    return this.realizations.find(r => r.slug === slug);
  }
  saveRealization(realization: Partial<Realization>): Realization {
    if (realization.id) {
      this.realizations = this.realizations.map(r => r.id === realization.id ? { ...r, ...realization } as Realization : r);
    } else {
      const newRealization: Realization = {
        id: `real-${Date.now()}`,
        title: realization.title || "Réalisation",
        slug: realization.slug || (realization.title ? realization.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `real-${Date.now()}`),
        description: realization.description || '',
        location: realization.location || 'Dakar',
        realization_type: realization.realization_type || 'Construction',
        year: realization.year || new Date().getFullYear(),
        technical_specs: realization.technical_specs || '',
        published: realization.published ?? true,
        images: realization.images || [],
        created_at: new Date().toISOString()
      };
      this.realizations = [newRealization, ...this.realizations];
    }
    this.save('sbi_realizations', this.realizations);
    return this.realizations.find(r => r.id === realization.id)!;
  }
  deleteRealization(id: string) {
    this.realizations = this.realizations.filter(r => r.id !== id);
    this.save('sbi_realizations', this.realizations);
  }

  // --- PUBLICATIONS / BLOG ---
  getPublications(): Publication[] {
    return this.publications;
  }
  getPublicationBySlug(slug: string): Publication | undefined {
    return this.publications.find(p => p.slug === slug);
  }
  savePublication(pub: Partial<Publication>): Publication {
    if (pub.id) {
      this.publications = this.publications.map(p => p.id === pub.id ? { ...p, ...pub } as Publication : p);
    } else {
      const newPub: Publication = {
        id: `pub-${Date.now()}`,
        title: pub.title || "Nouvelle Publication",
        slug: pub.slug || (pub.title ? pub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `article-${Date.now()}`),
        category: pub.category || 'Actualités',
        excerpt: pub.excerpt || '',
        content: pub.content || '',
        cover_image: pub.cover_image || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
        status: pub.status || 'Publié',
        published_at: new Date().toISOString(),
        author: pub.author || 'Équipe ECS BTP',

        seo_title: pub.seo_title || pub.title,
        seo_description: pub.seo_description || pub.excerpt,
        created_at: new Date().toISOString()
      };
      this.publications = [newPub, ...this.publications];
    }
    this.save('sbi_publications', this.publications);
    return this.publications.find(p => p.id === pub.id)!;
  }
  deletePublication(id: string) {
    this.publications = this.publications.filter(p => p.id !== id);
    this.save('sbi_publications', this.publications);
  }

  // --- CLIENTS CRM ---
  getClients(): Client[] {
    return this.clients;
  }
  saveClient(client: Partial<Client>): Client {
    if (client.id) {
      this.clients = this.clients.map(c => c.id === client.id ? { ...c, ...client } as Client : c);
    } else {
      const newClient: Client = {
        id: `cli-${Date.now()}`,
        first_name: client.first_name || '',
        last_name: client.last_name || '',
        phone: client.phone || '',
        email: client.email || '',
        address: client.address || 'Dakar',
        client_type: client.client_type || 'Acheteur',
        notes: client.notes || '',
        created_at: new Date().toISOString()
      };
      this.clients = [newClient, ...this.clients];
    }
    this.save('sbi_clients', this.clients);
    return this.clients.find(c => c.id === client.id)!;
  }
  deleteClient(id: string) {
    this.clients = this.clients.filter(c => c.id !== id);
    this.save('sbi_clients', this.clients);
  }

  // --- INQUIRIES & MESSAGES ---
  getInquiries(): Inquiry[] {
    return this.inquiries;
  }
  addInquiry(inquiry: Omit<Inquiry, 'id' | 'status' | 'created_at'>) {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'Nouveau',
      created_at: new Date().toISOString()
    };
    this.inquiries = [newInquiry, ...this.inquiries];
    this.save('sbi_inquiries', this.inquiries);
  }
  updateInquiryStatus(id: string, status: Inquiry['status']) {
    this.inquiries = this.inquiries.map(i => i.id === id ? { ...i, status } : i);
    this.save('sbi_inquiries', this.inquiries);
  }
  deleteInquiry(id: string) {
    this.inquiries = this.inquiries.filter(i => i.id !== id);
    this.save('sbi_inquiries', this.inquiries);
  }

  // --- SERVICES ---
  getServices(): Service[] {
    return this.services;
  }

  // --- DOCUMENTS ---
  getDocuments(): DocumentItem[] {
    return this.documents;
  }
  addDocument(doc: Omit<DocumentItem, 'id' | 'created_at'>) {
    const newDoc: DocumentItem = {
      ...doc,
      id: `doc-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.documents = [newDoc, ...this.documents];
    this.save('sbi_documents', this.documents);
  }
  deleteDocument(id: string) {
    this.documents = this.documents.filter(d => d.id !== id);
    this.save('sbi_documents', this.documents);
  }
}

export const store = new AppStore();
