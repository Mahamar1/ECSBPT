import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { Inquiry, InquiryStatus } from '../../types';
import { Mail, Phone, MessageSquare, Calendar, CheckCircle2, Trash2 } from 'lucide-react';

export const InquiryInbox: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const load = () => setInquiries(store.getInquiries());
    load();
    return store.subscribe(load);
  }, []);

  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    store.updateInquiryStatus(id, newStatus);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Supprimer cette demande ?")) {
      store.deleteInquiry(id);
    }
  };

  const formatWhatsAppUrl = (phone: string, text: string) => {
    const clean = phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Boîte de Réception - Messages & Visites</h2>
          <p className="text-xs text-slate-500">Demandes de visite immobilière et contacts reçus sur le site.</p>
        </div>
        <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-3 py-1 rounded-full">
          {inquiries.filter(i => i.status === 'Nouveau').length} Non Traitée(s)
        </span>
      </div>

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div key={inq.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-3 gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm text-slate-900">{inq.client_name}</span>
                  <span className="text-xs text-slate-500">• {inq.inquiry_type}</span>
                </div>
                {inq.property_title && (
                  <p className="text-xs text-amber-600 font-semibold mt-0.5">
                    Bien visé : {inq.property_title} ({inq.property_ref})
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <span className="text-slate-400 font-mono">
                  {new Date(inq.created_at).toLocaleDateString('fr-FR')} {new Date(inq.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <select 
                  value={inq.status}
                  onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    inq.status === 'Nouveau' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                    inq.status === 'En attente' ? 'bg-sky-100 text-sky-900 border-sky-300' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  }`}
                >
                  <option value="Nouveau">Nouveau</option>
                  <option value="En attente">En attente</option>
                  <option value="Traité">Traité</option>
                </select>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              "{inq.message}"
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
              <div className="flex space-x-4">
                <span className="font-mono text-slate-700 font-bold">Tel: {inq.phone}</span>
                {inq.email && <span className="text-slate-500">Email: {inq.email}</span>}
                {inq.preferred_date && <span className="text-amber-600 font-semibold">Date souhaitée: {inq.preferred_date}</span>}
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={`tel:${inq.phone}`}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Appeler</span>
                </a>

                <a
                  href={formatWhatsAppUrl(inq.phone, `Bonjour ${inq.client_name}, je réponds à votre demande concernant Sama BTP Immo.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => handleDelete(inq.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
