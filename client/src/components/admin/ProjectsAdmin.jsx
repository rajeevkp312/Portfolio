import { useEffect, useState } from 'react'
import { api } from '../../utils/api'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    tags: '',
    githubUrl: '',
    liveUrl: '',
    image: '',
    featured: false,
    order: 0,
  })

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    try {
      const res = await api.get('/api/projects')
      const data = await res.json()
      setProjects(data)
    } catch (e) {
      console.error('Failed to load projects', e)
    } finally {
      setLoading(false)
    }
  }

  function openModal(project = null) {
    if (project) {
      setEditing(project)
      setForm({
      title: project.title,
      description: project.description,
      tags: project.tags?.join(', ') || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      image: project.image || '',
      featured: project.featured || false,
      order: project.order || 0,
      problem: project.problem || '',
      features: project.features?.join('\n') || '',
      architecture: project.architecture?.join('\n') || '',
      deploymentFrontend: project.deployment?.frontend || '',
      deploymentBackend: project.deployment?.backend || '',
    })
  } else {
    setEditing(null)
    setForm({
      title: '',
      description: '',
      tags: '',
      githubUrl: '',
      liveUrl: '',
      image: '',
      featured: false,
      order: 0,
      problem: '',
      features: '',
      architecture: '',
      deploymentFrontend: '',
      deploymentBackend: '',
    })
  }
    setModalOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const body = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
      architecture: form.architecture.split('\n').map(a => a.trim()).filter(Boolean),
      deployment: {
        frontend: form.deploymentFrontend,
        backend: form.deploymentBackend,
      }
    }

    try {
      let res;
      if (editing) {
        res = await api.putAdmin(`/api/projects/${editing._id}`, body)
      } else {
        res = await api.postAdmin('/api/projects', body)
      }
      
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to save project')
      }
      
      setModalOpen(false)
      loadProjects()
    } catch (e) {
      console.error('Save error:', e)
      alert(e.message || 'Failed to save project')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project?')) return
    try {
      const res = await api.deleteAdmin(`/api/projects/${id}`)
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to delete project')
      }
      loadProjects()
    } catch (e) {
      console.error('Delete error:', e)
      alert(e.message || 'Failed to delete project')
    }
  }

  if (loading) return <p className="text-white/60">Loading...</p>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium"
        >
          <FiPlus size={18} />
          Add Project
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map(p => (
          <div key={p._id} className="p-4 rounded-lg bg-base-800/50 border border-base-700 flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-white">{p.title}</h3>
              <p className="text-white/60 text-sm mt-1 line-clamp-2">{p.description}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {p.tags?.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-xs bg-base-700 text-white/80">{tag}</span>
                ))}
                {p.featured && <span className="px-2 py-0.5 rounded text-xs bg-accent-600 text-white">Featured</span>}
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => openModal(p)}
                className="p-2 rounded-lg bg-base-700 hover:bg-base-600 text-white/80 hover:text-white"
              >
                <FiEdit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-lg p-6 rounded-lg bg-base-800 border border-base-700 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{editing ? 'Edit Project' : 'Add Project'}</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-white/60 hover:text-white">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">Title</label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Tags (comma separated)</label>
                <input
                  value={form.tags}
                  onChange={e => setForm({ ...form, tags: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Problem Statement</label>
                <textarea
                  value={form.problem}
                  onChange={e => setForm({ ...form, problem: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Key Features (One per line)</label>
                <textarea
                  value={form.features}
                  onChange={e => setForm({ ...form, features: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Architecture Highlights (One per line)</label>
                <textarea
                  value={form.architecture}
                  onChange={e => setForm({ ...form, architecture: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/80 mb-1">GitHub URL</label>
                  <input
                    value={form.githubUrl}
                    onChange={e => setForm({ ...form, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-1">Live URL</label>
                  <input
                    value={form.liveUrl}
                    onChange={e => setForm({ ...form, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/80 mb-1">Frontend Deploy (e.g. Vercel)</label>
                  <input
                    value={form.deploymentFrontend}
                    onChange={e => setForm({ ...form, deploymentFrontend: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-1">Backend Deploy (e.g. Render)</label>
                  <input
                    value={form.deploymentBackend}
                    onChange={e => setForm({ ...form, deploymentBackend: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Image URL</label>
                <input
                  value={form.image}
                  onChange={e => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={e => setForm({ ...form, featured: e.target.checked })}
                    className="rounded bg-base-700 border-base-600"
                  />
                  <span className="text-sm text-white/80">Featured</span>
                </label>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-white/80">Order:</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className="w-20 px-2 py-1 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2 rounded-lg bg-base-700 hover:bg-base-600 text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white font-medium"
                >
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
