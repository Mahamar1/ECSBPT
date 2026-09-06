export type PropertyType = 
  | 'Appartement'
  | 'Villa'
  | 'Maison'
  | 'Terrain'
  | 'Immeuble'
  | 'Bureau'
  | 'Magasin'
  | 'Local commercial'
  | 'Studio'
  | 'Entrepôt';

export type TransactionType = 'Vente' | 'Location';

export type PropertyStatus = 'Brouillon' | 'Disponible' | 'Réservé' | 'Vendu' | 'Loué' | 'Archivé';

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  is_cover: boolean;
  display_order: number;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  reference: string;
  type: PropertyType;
  transaction_type: TransactionType;
  price: number;
  currency: string;
  location: string;
  neighborhood: string;
  city: string;
  surface: number;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  description: string;
  amenities: string[];
  status: PropertyStatus;
  published: boolean;
  featured: boolean;
  agent_contact?: string;
  images: PropertyImage[];
  created_at: string;
  updated_at?: string;
}

export type ProjectType = 
  | 'Villa'
  | 'Immeuble'
  | 'R+1'
  | 'R+2'
  | 'R+5'
  | 'R+10'
  | 'R+11'
  | 'Résidence'
  | 'Bureau'
  | 'Commerce'
  | 'Lotissement'
  | 'Rénovation';

export type ProjectStatus = 'À venir' | 'En préparation' | 'En cours' | 'Terminé' | 'Suspendu';

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  display_order: number;
}

export interface BTPProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  project_type: ProjectType;
  client: string;
  floors: number;
  surface: number;
  budget: number;
  start_date: string;
  end_date: string;
  progress: number; // 0 - 100
  status: ProjectStatus;
  published: boolean;
  images: ProjectImage[];
  created_at: string;
}

export interface RealizationImage {
  id: string;
  realization_id: string;
  image_url: string;
  display_order: number;
}

export interface Realization {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  realization_type: string;
  year: number;
  technical_specs?: string;
  published: boolean;
  images: RealizationImage[];
  created_at: string;
}

export type PublicationCategory = 
  | 'Actualités'
  | 'Immobilier'
  | 'BTP'
  | 'Construction'
  | 'Architecture'
  | 'Réalisations'
  | 'Conseils'
  | 'Promotion immobilière';

export type PublicationStatus = 'Brouillon' | 'Publié' | 'Programmé' | 'Archivé';

export interface Publication {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: PublicationCategory;
  cover_image: string;
  gallery?: string[];
  video?: string;
  status: PublicationStatus;
  published_at: string;
  scheduled_at?: string;
  author: string;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
}

export type ClientType = 'Acheteur' | 'Locataire' | 'Propriétaire' | 'Investisseur' | 'Client BTP';

export interface Client {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  client_type: ClientType;
  notes: string;
  created_at: string;
}

export type InquiryStatus = 'Nouveau' | 'En attente' | 'Traité';

export interface Inquiry {
  id: string;
  property_id?: string;
  property_title?: string;
  property_ref?: string;
  client_name: string;
  phone: string;
  email: string;
  message: string;
  preferred_date?: string;
  inquiry_type: string;
  status: InquiryStatus;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  advantages: string[];
  published: boolean;
}

export interface DocumentItem {
  id: string;
  name: string;
  file_url: string;
  category: string;
  created_at: string;
}

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  status: InquiryStatus;
  created_at: string;
}

export interface CompanySettings {
  company_name: string;
  logo: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  website: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  description: string;
  hours: string;
  gps: string;
}

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  phone: string;
  avatar?: string;
}
