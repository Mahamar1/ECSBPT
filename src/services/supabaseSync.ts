import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { store } from './store';

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
      }
    }

    // 2. Sync BTP Projects
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

    // 3. Sync CRM Clients
    const clients = store.getClients();
    for (const cli of clients) {
      const { error } = await supabase.from('crm_clients').upsert({
        id: cli.id,
        first_name: cli.first_name,
        last_name: cli.last_name,
        phone: cli.phone,
        email: cli.email,
        address: cli.address,
        client_type: cli.client_type,
        notes: cli.notes,
        created_at: cli.created_at
      }, { onConflict: 'id' });

      if (error) {
        errors.push(`Client (${cli.first_name} ${cli.last_name}): ${error.message}`);
      } else {
        syncedCount++;
      }
    }

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
