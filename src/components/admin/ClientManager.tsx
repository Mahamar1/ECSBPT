import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { Client, ClientType } from '../../types';
import { Plus, Trash2, Edit2, Users, Phone, Mail, MapPin } from 'lucide-react';

export const ClientManager: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    const load = () => setClients(store.getClients());
    load();
    return store.subscribe(load);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Supprimer ce client ?")) {
      store.deleteClient(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">CRM - Gestion des Clients & Prospects</h2>
          <p className="text-xs text-slate-500">Base de données acheteurs, locataires, propriétaires et investisseurs BTP.</p>
        </div>
        <button
          onClick={() => { setEditingClient(null); setIsModalOpen(true); }}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Ajouter Client</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
            <tr>
              <th className="p-3.5">Nom & Prénom</th>
              <th className="p-3.5">Téléphone</th>
              <th className="p-3.5">Email</th>
              <th className="p-3.5">Profil Client</th>
              <th className="p-3.5">Notes</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.map((cli) => (
              <tr key={cli.id} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-900">{cli.first_name} {cli.last_name}</td>
                <td className="p-3 font-mono text-slate-700">{cli.phone}</td>
                <td className="p-3 text-slate-600">{cli.email || '-'}</td>
                <td className="p-3">
                  <span className="bg-amber-100 text-amber-900 font-bold text-[10px] px-2 py-0.5 rounded-full">
                    {cli.client_type}
                  </span>
                </td>
                <td className="p-3 text-slate-500 max-w-xs truncate">{cli.notes || '-'}</td>
                <td className="p-3 text-right space-x-2">
                  <button onClick={() => { setEditingClient(cli); setIsModalOpen(true); }} className="p-1.5 bg-slate-100 rounded-lg">
                    <Edit2 className="w-4 h-4 text-slate-600" />
                  </button>
                  <button onClick={() => handleDelete(cli.id)} className="p-1.5 bg-slate-100 rounded-lg">
                    <Trash2 className="w-4 h-4 text-slate-600 hover:text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ClientFormModal client={editingClient} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export const ClientFormModal: React.FC<{ client: Client | null; onClose: () => void }> = ({ client, onClose }) => {
  const [firstName, setFirstName] = useState(client?.first_name || '');
  const [lastName, setLastName] = useState(client?.last_name || '');
  const [phone, setPhone] = useState(client?.phone || '');
  const [email, setEmail] = useState(client?.email || '');
  const [address, setAddress] = useState(client?.address || 'Dakar');
  const [clientType, setClientType] = useState<ClientType>(client?.client_type || 'Acheteur');
  const [notes, setNotes] = useState(client?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !phone) return;

    store.saveClient({
      id: client?.id,
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      address,
      client_type: clientType,
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-slate-900">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-bold text-base">{client ? 'Modifier Client' : 'Nouveau Client CRM'}</h3>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Prénom *</label>
              <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Nom *</label>
              <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Téléphone WhatsApp *</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Type de Client</label>
            <select value={clientType} onChange={(e) => setClientType(e.target.value as ClientType)} className="w-full bg-slate-50 border p-2 rounded-xl">
              <option value="Acheteur">Acheteur</option>
              <option value="Locataire">Locataire</option>
              <option value="Propriétaire">Propriétaire</option>
              <option value="Investisseur">Investisseur</option>
              <option value="Client BTP">Client BTP</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Notes & Recherches du client</label>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-slate-50 border p-2 rounded-xl" />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 rounded-xl">Annuler</button>
            <button type="submit" className="px-5 py-2 bg-slate-900 text-white font-bold rounded-xl">Enregistrer Client</button>
          </div>
        </form>
      </div>
    </div>
  );
};
