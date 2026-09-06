import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { CompanySettings } from '../../types';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle, Clock } from 'lucide-react';
import { sanitizeInput } from '../../utils/security';

export const ContactPage: React.FC = () => {
  const [settings, setSettings] = useState<CompanySettings>(store.getSettings());
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setSettings(store.getSettings());
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    const cleanName = sanitizeInput(name);
    const cleanPhone = sanitizeInput(phone);
    const cleanEmail = sanitizeInput(email);
    const cleanSubject = sanitizeInput(subject);
    const cleanMessage = sanitizeInput(message);

    store.addInquiry({
      client_name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      message: cleanSubject ? `[${cleanSubject}] ${cleanMessage}` : cleanMessage,
      inquiry_type: 'Page Contact'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 4000);
  };

  const formatWhatsAppUrl = () => {
    const cleanNum = settings.whatsapp.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent("Bonjour, je vous contacte depuis la page contact de votre site web.")}`;
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full">
          Nous Contacter
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-3">
          Échangez avec l'Équipe ECS BTP
        </h1>

        <p className="text-slate-300 text-sm mt-2 max-w-2xl">
          Visite de bien, devis de construction BTP, opportunités d'investissement à Dakar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Info Box */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Nos Coordonnées
          </h2>

          <div className="space-y-4 text-sm">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 text-xs uppercase">Siège social</strong>
                <span className="text-slate-600">{settings.address}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 text-xs uppercase">Téléphone</strong>
                <a href={`tel:${settings.phone}`} className="text-slate-700 font-mono font-bold hover:text-amber-600">
                  {settings.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 text-xs uppercase">WhatsApp Direct</strong>
                <a href={formatWhatsAppUrl()} target="_blank" rel="noreferrer" className="text-emerald-600 font-mono font-bold hover:underline">
                  {settings.whatsapp}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 text-xs uppercase">Adresse Email</strong>
                <a href={`mailto:${settings.email}`} className="text-slate-700 font-bold hover:text-brand-600">
                  {settings.email}
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 text-xs uppercase">Horaires d'ouverture</strong>
                <span className="text-slate-600 text-xs">{settings.hours}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <a
              href={formatWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 text-xs transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuter instantanément sur WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Form Box */}
        <div className="lg:col-span-7 bg-slate-900 text-white border border-slate-800 rounded-3xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-4">Formulaire de Contact</h2>

          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-8 rounded-2xl text-center space-y-2">
              <CheckCircle className="w-12 h-12 mx-auto text-emerald-400" />
              <p className="font-bold text-lg">Message transmis à l'équipe !</p>
              <p className="text-xs text-slate-300">Nous vous recontacterons très rapidement.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nom complet *</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Ibrahima Diagne"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Téléphone *</label>
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+221 77 000 00 00"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Adresse Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@domaine.sn"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Sujet de votre demande</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Achat villa Mermoz ou Devis construction"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message *</label>
                <textarea 
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Expliquez-nous votre projet..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 text-xs"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer le message</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
