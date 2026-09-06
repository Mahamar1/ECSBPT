import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { BTPProject, ProjectType, ProjectStatus } from '../../types';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, Hammer, X } from 'lucide-react';

export const ProjectManager: React.FC<{ onSelectTab: (tab: string) => void; openNewModal?: boolean }> = ({ onSelectTab, openNewModal }) => {
  const [projects, setProjects] = useState<BTPProject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProj, setEditingProj] = useState<BTPProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const load = () => {
      setProjects(store.getProjects());
    };
    load();
    if (openNewModal) {
      setEditingProj(null);
      setIsModalOpen(true);
    }
    return store.subscribe(load);
  }, [openNewModal]);

  const handleDelete = (id: string) => {
    if (window.confirm("Supprimer ce projet BTP ?")) {
      store.deleteProject(id);
    }
  };

  const handleTogglePublish = (p: BTPProject) => {
    store.saveProject({ ...p, published: !p.published });
  };

  const filtered = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Gestion des Projets BTP</h2>
          <p className="text-xs text-slate-500">Suivez les chantiers de construction, taux de progression et maîtres d'ouvrage.</p>
        </div>
        <button
          onClick={() => {
            setEditingProj(null);
            setIsModalOpen(true);
          }}
          className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nouveau Projet BTP</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="p-3.5">Projet & Type</th>
                <th className="p-3.5">Localisation</th>
                <th className="p-3.5">Maître d'ouvrage</th>
                <th className="p-3.5">Progression</th>
                <th className="p-3.5">Statut</th>
                <th className="p-3.5">Publication</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-50 transition">
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{proj.title}</div>
                    <span className="text-[10px] text-brand-600 font-bold uppercase">{proj.project_type}</span>
                  </td>
                  <td className="p-3 text-slate-600">{proj.location}</td>
                  <td className="p-3 font-semibold text-slate-800">{proj.client}</td>
                  <td className="p-3 w-40">
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-brand-600 h-2 rounded-full" style={{ width: `${proj.progress}%` }} />
                      </div>
                      <span className="font-mono font-bold text-[11px] text-slate-700">{proj.progress}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {proj.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleTogglePublish(proj)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition ${
                        proj.published ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {proj.published ? 'Publié' : 'Masqué'}
                    </button>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingProj(proj);
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-slate-600 hover:text-brand-600 bg-slate-100 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="p-1.5 text-slate-600 hover:text-red-600 bg-slate-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ProjectFormModal project={editingProj} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export const ProjectFormModal: React.FC<{ project: BTPProject | null; onClose: () => void }> = ({ project, onClose }) => {
  const [title, setTitle] = useState(project?.title || '');
  const [projectType, setProjectType] = useState<ProjectType>(project?.project_type || 'R+5');
  const [location, setLocation] = useState(project?.location || 'Dakar');
  const [client, setClient] = useState(project?.client || 'Client Privé');
  const [floors, setFloors] = useState<number>(project?.floors || 6);
  const [surface, setSurface] = useState<number>(project?.surface || 1800);
  const [budget, setBudget] = useState<number>(project?.budget || 1200000000);
  const [progress, setProgress] = useState<number>(project?.progress || 50);
  const [status, setStatus] = useState<ProjectStatus>(project?.status || 'En cours');
  const [description, setDescription] = useState(project?.description || '');
  const [coverUrl, setCoverUrl] = useState(project?.images[0]?.image_url || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    store.saveProject({
      id: project?.id,
      title,
      project_type: projectType,
      location,
      client,
      floors: Number(floors),
      surface: Number(surface),
      budget: Number(budget),
      progress: Number(progress),
      status,
      description,
      published: true,
      images: [{ id: `pimg-${Date.now()}`, project_id: project?.id || '', image_url: coverUrl, display_order: 1 }]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-slate-900">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-bold text-lg">{project ? 'Modifier le Projet BTP' : 'Nouveau Projet BTP'}</h3>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Nom du projet BTP *</label>
              <input 
                type="text" 
                required 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Type de construction *</label>
              <select 
                value={projectType} 
                onChange={(e) => setProjectType(e.target.value as ProjectType)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
              >
                {['Villa', 'Immeuble', 'R+1', 'R+2', 'R+5', 'R+10', 'R+11', 'Résidence', 'Bureau', 'Commerce', 'Lotissement', 'Rénovation'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Localisation</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Maître d'ouvrage / Client</label>
              <input type="text" value={client} onChange={(e) => setClient(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Statut du chantier</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <option value="À venir">À venir</option>
                <option value="En préparation">En préparation</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="Suspendu">Suspendu</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1">Surface (m²)</label>
              <input type="number" value={surface} onChange={(e) => setSurface(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Niveaux / Etages</label>
              <input type="number" value={floors} onChange={(e) => setFloors(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Budget (FCFA)</label>
              <input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-semibold mb-1">
              <span>Taux d'avancement des travaux :</span>
              <span className="font-mono text-brand-600 font-bold">{progress}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress} 
              onChange={(e) => setProgress(Number(e.target.value))} 
              className="w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description technique *</label>
            <textarea 
              rows={3} 
              required 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">URL Photo de couverture</label>
            <input type="url" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2" />
          </div>

          <div className="pt-3 flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 rounded-xl">Annuler</button>
            <button type="submit" className="px-5 py-2 bg-brand-600 text-white font-bold rounded-xl">Enregistrer Projet</button>
          </div>
        </form>
      </div>
    </div>
  );
};
