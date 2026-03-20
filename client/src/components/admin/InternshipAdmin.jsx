import { useEffect, useState } from 'react'
import { api } from '../../utils/api'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

export default function InternshipAdmin() {
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title: '',
    company: '',
    duration: '',
    grade: '',
    description: '',
    order: 0,
  })

  useEffect(() => {
    loadInternships()
  }, [])

  async function loadInternships() {
    try {
      const res = await api.get('/api/internship')
      const data = await res.json()
      setInternships(data)
    } catch (e) {
      console.error('Failed to load internships', e)
    } finally {
      setLoading(false)
    }
  }

  function openModal(internship = null) {
    if (internship) {
      setEditing(internship)
      setForm({
        title: internship.title,
        company: internship.company,
        duration: internship.duration,
        grade: internship.grade || '',
        description: internship.description || '',
        order: internship.order || 0,
      })
    } else {
      setEditing(null)
      setForm({ title: '', company: '', duration: '', grade: '', description: '', order: 0 })
    }
    setModalOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let res;
      if (editing) {
        res = await api.putAdmin(`/api/internship/${editing._id}`, form)
      } else {
        res = await api.postAdmin('/api/internship', form)
      }
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to save internship')
      }
      setModalOpen(false)
      loadInternships()
    } catch (e) {
      console.error('Save error:', e)
      alert(e.message || 'Failed to save internship')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this internship?')) return
    try {
      const res = await api.deleteAdmin(`/api/internship/${id}`)
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to delete internship')
      }
      loadInternships()
    } catch (e) {
      console.error('Delete error:', e)
      alert(e.message || 'Failed to delete internship')
    }
  }

  if (loading) return <p className="text-white/60">Loading...</p>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Internship</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium"
        >
          <FiPlus size={18} />
          Add Internship
        </button>
      </div>

      <div className="grid gap-4">
        {internships.map(i => (
          <div key={i._id} className="p-4 rounded-lg bg-base-800/50 border border-base-700">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-white">{i.title}</h3>
                <p className="text-accent-400 text-sm">{i.company}</p>
                <p className="text-white/60 text-sm mt-1">{i.duration}</p>
                {i.grade && (
                  <span className="inline-block mt-2 px-2 py-1 rounded text-xs bg-green-600/20 text-green-400">
                    Grade: {i.grade}
                  </span>
                )}
                {i.description && (
                  <p className="text-white/60 text-sm mt-2">{i.description}</p>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => openModal(i)}
                  className="p-2 rounded-lg bg-base-700 hover:bg-base-600 text-white/80 hover:text-white"
                >
                  <FiEdit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(i._id)}
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
          <div className="w-full max-w-md p-6 rounded-lg bg-base-800 border border-base-700 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{editing ? 'Edit Internship' : 'Add Internship'}</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-white/60 hover:text-white">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">Title/Role</label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  placeholder="Software Developer Intern"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Company</label>
                <input
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Duration</label>
                <input
                  value={form.duration}
                  onChange={e => setForm({ ...form, duration: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  placeholder="June 2023 - August 2023"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Grade/Performance (optional)</label>
                <input
                  value={form.grade}
                  onChange={e => setForm({ ...form, grade: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  placeholder="A+ or Excellent"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Description (optional)</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  rows={3}
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
