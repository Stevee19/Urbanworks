import { useState, useEffect, FormEvent } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import { projectsApi } from '../../lib/api';
import ImageUpload from '../../components/admin/ImageUpload';
import { Plus, Edit2, Trash2, Save, X, Star } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  location: string | null;
  description: string | null;
  image_url: string | null;
  is_featured: number;
  display_order: number;
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      if (editingProject.id) {
        await projectsApi.update(editingProject.id, editingProject);
      } else {
        await projectsApi.create(editingProject);
      }
      setShowForm(false);
      setEditingProject(null);
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    try {
      await projectsApi.delete(id);
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    await projectsApi.update(project.id, { is_featured: project.is_featured ? 0 : 1 });
    loadProjects();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader />
      <div className="p-8 text-xs">
        {/* Add Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => {
              setEditingProject({
                id: 0,
                title: '',
                category: '',
                location: null,
                description: null,
                image_url: null,
                is_featured: 0,
                display_order: projects.length,
              });
              setShowForm(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
          >
            <Plus size={18} />
            Add Project
          </button>
        </div>

        {/* Form Modal */}
        {showForm && editingProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto p-6 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primary">
                  {editingProject.id ? 'Edit Project' : 'New Project'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-gray hover:text-primary">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Title *</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Category *</label>
                    <input
                      type="text"
                      value={editingProject.category}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Location</label>
                    <input
                      type="text"
                      value={editingProject.location || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Description</label>
                  <textarea
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    rows={3}
                  />
                </div>

                <ImageUpload
                  value={editingProject.image_url || ''}
                  onChange={(url) => setEditingProject({ ...editingProject, image_url: url })}
                  label="Project Image"
                />

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingProject.is_featured}
                      onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked ? 1 : 0 })}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                    />
                    <span className="text-sm text-primary">Featured</span>
                  </label>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Order</label>
                    <input
                      type="number"
                      value={editingProject.display_order}
                      onChange={(e) => setEditingProject({ ...editingProject, display_order: parseInt(e.target.value) })}
                      className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover"
                  >
                    <Save size={18} />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-primary rounded-lg hover:bg-gray-200"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray uppercase">Image</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray uppercase">Title</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray uppercase">Category</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray uppercase">Location</th>
                <th className="text-center px-6 py-3 text-xs font-medium text-gray uppercase">Featured</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {project.image_url ? (
                      <img src={project.image_url} alt="" className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-300">-</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-primary">{project.title}</td>
                  <td className="px-6 py-4 text-sm text-gray">{project.category}</td>
                  <td className="px-6 py-4 text-sm text-gray">{project.location || '-'}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(project)}
                      className={`inline-flex ${project.is_featured ? 'text-accent' : 'text-gray-200'}`}
                    >
                      <Star size={18} fill={project.is_featured ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setShowForm(true);
                        }}
                        className="p-2 text-gray hover:text-accent"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-gray hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <div className="text-center py-12 text-gray">No projects yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
