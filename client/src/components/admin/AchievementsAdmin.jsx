import { useEffect, useState } from 'react'
import { api } from '../../utils/api'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiExternalLink } from 'react-icons/fi'

export default function AchievementsAdmin() {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    icon: '',
    order: 0,
    links: [{ label: '', url: '' }],
  })

  useEffect(() => {
    loadAchievements()
  }, [])

  async function loadAchievements() {
    try {
      const res = await api.get('/api/achievements')
      const data = await res.json()
      setAchievements(data)
    } catch (e) {
      console.error('Failed to load achievements', e)
    } finally {
      setLoading(false)
    }
  }

  function openModal(achievement = null) {
    if (achievement) {
      setEditing(achievement)
      setForm({
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon || '',
        order: achievement.order || 0,
        links: achievement.links?.length ? achievement.links : [{ label: '', url: '' }],
      })
    } else {
      setEditing(null)
      setForm({
        title: '',
        description: '',
        icon: '',
        order: 0,
        links: [{ label: '', url: '' }],
      })
    }
    setModalOpen(true)
  }

  function addLink() {
    setForm({ ...form, links: [...form.links, { label: '', url: '' }] })
  }

  function removeLink(index) {
    setForm({ ...form, links: form.links.filter((_, i) => i !== index) })
  }

  function updateLink(index, field, value) {
    const newLinks = form.links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    )
    setForm({ ...form, links: newLinks })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const body = {
      ...form,
      links: form.links.filter(l => l.label && l.url),
    }
    try {
      let res;
      if (editing) {
        res = await api.putAdmin(`/api/achievements/${editing._id}`, body)
      } else {
        res = await api.postAdmin('/api/achievements', body)
      }
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to save achievement')
      }
      setModalOpen(false)
      loadAchievements()
    } catch (e) {
      console.error('Save error:', e)
      alert(e.message || 'Failed to save achievement')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this achievement?')) return
    try {
      const res = await api.deleteAdmin(`/api/achievements/${id}`)
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to delete achievement')
      }
      loadAchievements()
    } catch (e) {
      console.error('Delete error:', e)
      alert(e.message || 'Failed to delete achievement')
    }
  }

  if (loading) return <p className="text-white/60">Loading...</p>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Achievements</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium"
        >
          <FiPlus size={18} />
          Add Achievement
        </button>
      </div>

      <div className="grid gap-4">
        {achievements.map(a => (
          <div key={a._id} className="p-4 rounded-lg bg-base-800/50 border border-base-700">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent-600/20 flex items-center justify-center text-2xl">
                  {a.icon || '🏆'}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{a.title}</h3>
                  <p className="text-white/60 text-sm mt-1">{a.description}</p>
                  {a.links?.length > 0 && (
                    <div className="flex gap-3 mt-2 flex-wrap">
                      {a.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-accent-400 hover:text-accent-300"
                        >
                          {link.label}
                          <FiExternalLink size={12} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => openModal(a)}
                  className="p-2 rounded-lg bg-base-700 hover:bg-base-600 text-white/80 hover:text-white"
                >
                  <FiEdit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(a._id)}
                  className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-lg p-6 rounded-lg bg-base-800 border border-base-700 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{editing ? 'Edit Achievement' : 'Add Achievement'}</h3>
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
                <label className="block text-sm text-white/80 mb-1">Icon (emoji)</label>
                <input
                  value={form.icon}
                  onChange={e => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  placeholder="🏆"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                  className="w-24 px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-2">Links</label>
                {form.links.map((link, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      placeholder="Label"
                      value={link.label}
                      onChange={e => updateLink(i, 'label', e.target.value)}
                      className="flex-1 px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                    />
                    <input
                      placeholder="URL"
                      value={link.url}
                      onChange={e => updateLink(i, 'url', e.target.value)}
                      className="flex-[2] px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeLink(i)}
                      className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLink}
                  className="text-sm text-accent-400 hover:text-accent-300"
                >
                  + Add Link
                </button>
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
