import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { store } from './store';
import { Property, BTPProject, Realization, Publication, Client, Inquiry, CompanySettings } from '../types';

export async function fetchFromSupabase(): Promise<{ success: boolean; message: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, message: 'Supabase non configuré' };
  }

  const supabase = getSupabaseClient();

  try {
    // 1. Fetch Properties
    const { data: propertiesData, error: propErr } = await supabase.from('properties').select('*');
    if (!propErr && propertiesData && propertiesData.length > 0) {
      const { data: imagesData } = await supabase.from('property_images').select('*');
      const properties: Property[] = propertiesData.map(p => ({
        ...p,
        images: imagesData ? imagesData.filter(img => img.property_id === p.id) : []
      }));
      localStorage.setItem('sbi_properties', JSON.stringify(properties));
    }

    // 2. Fetch Publications
    const { data: pubsData, error: pubErr } = await supabase.from('publications').select('*');
    if (!pubErr && pubsData && pubsData.length > 0) {
      localStorage.setItem('sbi_publications', JSON.stringify(pubsData));
    }

    // 3. Fetch Projects
    const { data: projData, error: projErr } = await supabase.from('projects').select('*');
    if (!projErr && projData && projData.length > 0) {
      localStorage.setItem('sbi_projects', JSON.stringify(projData));
    }

    // 4. Fetch Realizations
    const { data: realData, error: realErr } = await supabase.from('realizations').select('*');
    if (!realErr && realData && realData.length > 0) {
      localStorage.setItem('sbi_realizations', JSON.stringify(realData));
    }

    // 5. Fetch Settings
    const { data: settingsData, error: setErr } = await supabase.from('settings').select('*').single();
    if (!setErr && settingsData) {
      localStorage.setItem('sbi_settings', JSON.stringify(settingsData));
    }

    return { success: true, message: 'Données récupérées avec succès depuis Supabase !' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Erreur lors de la récupération Supabase' };
  }
}

export async function syncLocalStoreToSupabase(): Promise<{ success: boolean; syncedCount: number; errors: string[] }> {
  if (!isSupabaseConfigured()) {
    return { success: false, syncedCount: 0, errors: ['Supabase non configuré'] };
  }

  const supabase = getSupabaseClient();
  let syncedCount = 0;
  const errors: string[] = [];

  try {
    // 1. Sync Properties
    const properties = store.getProperties();
    for (const prop of properties) {
      const { error } = await supabase.from('properties').upsert({
        id: prop.id,
        title: prop.title,
        slug: prop.slug,
        reference: prop.reference,
        type: prop.type,
        transaction_type: prop.transaction_type,
        price: prop.price,
        currency: prop.currency,
        location: prop.location,
        neighborhood: prop.neighborhood,
        city: prop.city,
        surface: prop.surface,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        floors: prop.floors,
        description: prop.description,
        amenities: prop.amenities,
        status: prop.status,
        published: prop.published,
        featured: prop.featured,
        agent_contact: prop.agent_contact,
        created_at: prop.created_at
      }, { onConflict: 'id' });

      if (error) {
        errors.push(`Propriété (${prop.reference}): ${error.message}`);
      } else {
        syncedCount++;
        if (prop.images && prop.images.length > 0) {
          for (const img of prop.images) {
            await supabase.from('property_images').upsert({
              id: img.id,
              property_id: prop.id,
              image_url: img.image_url,
              is_cover: img.is_cover,
              display_order: img.display_order
            }, { onConflict: 'id' });
          }
        }
      }
    }

    // 2. Sync Publications
    const publications = store.getPublications();
    for (const pub of publications) {
      const { error } = await supabase.from('publications').upsert({
        id: pub.id,
        title: pub.title,
        slug: pub.slug,
        content: pub.content,
        excerpt: pub.excerpt,
        category: pub.category,
        cover_image: pub.cover_image,
        status: pub.status,
        published_at: pub.published_at,
        author: pub.author,
        seo_title: pub.seo_title,
        seo_description: pub.seo_description,
        created_at: pub.created_at
      }, { onConflict: 'id' });

      if (error) {
        errors.push(`Publication (${pub.title}): ${error.message}`);
      } else {
        syncedCount++;
      }
    }

    // 3. Sync BTP Projects
    const projects = store.getProjects();
    for (const proj of projects) {
      const { error } = await supabase.from('projects').upsert({
        id: proj.id,
        title: proj.title,
        slug: proj.slug,
        location: proj.location,
        project_type: proj.project_type,
        client: proj.client,
        floors: proj.floors,
        surface: proj.surface,
        budget: proj.budget,
        start_date: proj.start_date,
        end_date: proj.end_date,
        progress: proj.progress,
        status: proj.status,
        description: proj.description,
        published: proj.published,
        created_at: proj.created_at
      }, { onConflict: 'id' });

      if (error) {
        errors.push(`Projet (${proj.title}): ${error.message}`);
      } else {
        syncedCount++;
      }
    }

    // 4. Sync Settings
    const settings = store.getSettings();
    const { error: setErr } = await supabase.from('settings').upsert({
      id: 'company-settings-main',
      company_name: settings.company_name,
      logo: settings.logo,
      tagline: settings.tagline,
      phone: settings.phone,
      whatsapp: settings.whatsapp,
      email: settings.email,
      address: settings.address,
      website: settings.website,
      facebook: settings.facebook,
      instagram: settings.instagram,
      linkedin: settings.linkedin,
      youtube: settings.youtube,
      description: settings.description
    }, { onConflict: 'id' });

    if (!setErr) syncedCount++;

    return {
      success: errors.length === 0,
      syncedCount,
      errors
    };
  } catch (err: any) {
    return {
      success: false,
      syncedCount,
      errors: [err.message || 'Erreur inconnue de synchronisation']
    };
  }
}
