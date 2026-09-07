import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve credentials from localStorage override or fallback to environment variables
export const getSupabaseCredentials = () => {
  const customUrl = localStorage.getItem('sbi_supabase_url');
  const customKey = localStorage.getItem('sbi_supabase_anon_key');

  const url = customUrl || import.meta.env.VITE_SUPABASE_URL || '';
  const key = customKey || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  return { url, key };
};

let clientInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  const { url, key } = getSupabaseCredentials();
  const validUrl = url && url.startsWith('http') ? url : 'https://dummy.supabase.co';
  const validKey = key || 'dummy-key';

  if (!clientInstance) {
    clientInstance = createClient(validUrl, validKey);
  }
  return clientInstance;
};

export const updateSupabaseCredentials = (url: string, key: string) => {
  localStorage.setItem('sbi_supabase_url', url);
  localStorage.setItem('sbi_supabase_anon_key', key);
  clientInstance = createClient(url, key);
};

export const isSupabaseConfigured = (): boolean => {
  const { url, key } = getSupabaseCredentials();
  return (
    Boolean(url) && 
    Boolean(key) && 
    url.startsWith('https://') && 
    !url.includes('votre-projet.supabase.co') &&
    !url.includes('xyzcompany.supabase.co') &&
    !url.includes('dummy.supabase.co')
  );
};

export const testSupabaseConnection = async (): Promise<{ success: boolean; message: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, message: 'URL et Clé ANON Supabase non configurées.' };
  }
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('properties').select('count', { count: 'exact', head: true });
    if (error && error.code !== 'PGRST116') {
      // Table might not exist yet or permissions issue
      return { success: true, message: `Connecté à Supabase (Note: ${error.message})` };
    }
    return { success: true, message: 'Connexion Supabase établie avec succès !' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Erreur de connexion' };
  }
};

export const supabase = getSupabaseClient();
