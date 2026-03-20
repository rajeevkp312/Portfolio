import { useEffect, useState } from 'react'
import { api } from '../../utils/api'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

export default function EducationAdmin() {
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    yearRange: '',
    institution: '',
    degree: '',
    order: 0,
  })

  useEffect(() => {
    loadEducation()
  }, [])

  async function loadEducation() {
    try {
      const res = await api.get('/api/education')
      const data = await res.json()
      setEducation(data)
    } catch (e) {
      console.error('Failed to load education', e)
    } finally {
      setLoading(false)
    }
  }

  function openModal(edu = null) {
    if (edu) {
      setEditing(edu)
      setForm({
        yearRange: edu.yearRange,
        institution: edu.institution,
        degree: edu.degree,
        order: edu.order || 0,
      })
    } else {
      setEditing(null)
      setForm({ yearRange: '', institution: '', degree: '', order: 0 })
    }
    setModalOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let res;
      if (editing) {
        res = await api.putAdmin(`/api/education/${editing._id}`, form)
      } else {
        res = await api.postAdmin('/api/education', form)
      }
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to save education')
      }
      setModalOpen(false)
      loadEducation()
    } catch (e) {
      console.error('Save error:', e)
      alert(e.message || 'Failed to save education')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this education entry?')) return
    try {
      const res = await api.deleteAdmin(`/api/education/${id}`)
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to delete education')
      }
      loadEducation()
    } catch (e) {
      console.error('Delete error:', e)
      alert(e.message || 'Failed to delete education')
    }
  }

  if (loading) return <p className="text-white/60">Loading...</p>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Education</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium"
        >
          <FiPlus size={18} />
          Add Education
        </button>
      </div>

      <div className="relative border-l-2 border-accent-500/30 ml-3 space-y-6">
        {education.map((edu, index) => (
          <div key={edu._id} className="relative pl-8">
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent-500" />
            <div className="p-4 rounded-lg bg-base-800/50 border border-base-700">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-accent-400 text-sm font-medium">{edu.yearRange}</span>
                  <h3 className="font-semibold text-white mt-1">{edu.institution}</h3>
                  <p className="text-white/60">{edu.degree}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => openModal(edu)}
                    className="p-2 rounded-lg bg-base-700 hover:bg-base-600 text-white/80 hover:text-white"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(edu._id)}
                    className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md p-6 rounded-lg bg-base-800 border border-base-700 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{editing ? 'Edit Education' : 'Add Education'}</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-white/60 hover:text-white">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">Year Range</label>
                <input
                  value={form.yearRange}
                  onChange={e => setForm({ ...form, yearRange: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  placeholder="2021 - 2025"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Institution</label>
                <input
                  value={form.institution}
                  onChange={e => setForm({ ...form, institution: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Degree/Course</label>
                <input
                  value={form.degree}
                  onChange={e => setForm({ ...form, degree: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
                  required
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
