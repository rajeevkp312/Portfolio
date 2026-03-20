import { useEffect, useState } from 'react'
import { api } from '../../utils/api'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

export default function SkillsAdmin() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    name: '',
    level: 80,
    category: '',
    icon: '',
  })

  useEffect(() => {
    loadSkills()
  }, [])

  async function loadSkills() {
    try {
      const res = await api.get('/api/skills')
      const data = await res.json()
      setSkills(data)
    } catch (e) {
      console.error('Failed to load skills', e)
    } finally {
      setLoading(false)
    }
  }

  function openModal(skill = null) {
    if (skill) {
      setEditing(skill)
      setForm({
        name: skill.name,
        level: skill.level,
        category: skill.category || '',
        icon: skill.icon || '',
      })
    } else {
      setEditing(null)
      setForm({ name: '', level: 80, category: '', icon: '' })
    }
    setModalOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let res;
      if (editing) {
        res = await api.putAdmin(`/api/skills/${editing._id}`, form)
      } else {
        res = await api.postAdmin('/api/skills', form)
      }
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to save skill')
      }
      setModalOpen(false)
      loadSkills()
    } catch (e) {
      console.error('Save error:', e)
      alert(e.message || 'Failed to save skill')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this skill?')) return
    try {
      const res = await api.deleteAdmin(`/api/skills/${id}`)
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to delete skill')
      }
      loadSkills()
    } catch (e) {
      console.error('Delete error:', e)
      alert(e.message || 'Failed to delete skill')
    }
  }

  if (loading) return <p className="text-white/60">Loading...</p>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Skills</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium"
        >
          <FiPlus size={18} />
          Add Skill
        </button>
      </div>

      <div className="grid gap-3">
        {skills.map(s => (
          <div key={s._id} className="p-4 rounded-lg bg-base-800/50 border border-base-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-base-700 flex items-center justify-center text-2xl">
                {s.icon || '🛠️'}
              </div>
              <div>
                <h3 className="font-semibold text-white">{s.name}</h3>
                <p className="text-white/60 text-sm">{s.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-24 h-2 rounded-full bg-base-700 overflow-hidden">
                    <div
                      className="h-full bg-accent-500 rounded-full"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/60">{s.level}%</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openModal(s)}
                className="p-2 rounded-lg bg-base-700 hover:bg-base-600 text-white/80 hover:text-white"
              >
                <FiEdit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(s._id)}
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
          <div className="w-full max-w-md p-6 rounded-lg bg-base-800 border border-base-700 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{editing ? 'Edit Skill' : 'Add Skill'}</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-white/60 hover:text-white">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">Skill Name</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Category</label>
                <input
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  placeholder="Frontend, Backend, Database..."
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Proficiency Level: {form.level}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={form.level}
                  onChange={e => setForm({ ...form, level: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Icon (emoji or text)</label>
                <input
                  value={form.icon}
                  onChange={e => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  placeholder="⚛️ or React"
                />
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
