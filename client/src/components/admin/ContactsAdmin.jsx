import { useEffect, useState } from 'react'
import { api } from '../../utils/api'
import { FiTrash2, FiMail, FiUser, FiClock, FiCheck, FiX } from 'react-icons/fi'

export default function ContactsAdmin() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMessages()
  }, [])

  async function loadMessages() {
    try {
      const res = await api.getAdmin('/api/admin/contacts')
      const data = await res.json()
      setMessages(data)
    } catch (e) {
      console.error('Failed to load messages', e)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this message?')) return
    try {
      const res = await api.deleteAdmin(`/api/admin/contacts/${id}`)
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to delete message')
      }
      loadMessages()
    } catch (e) {
      console.error('Delete error:', e)
      alert(e.message || 'Failed to delete message')
    }
  }

  async function markAsRead(id) {
    try {
      const res = await api.putAdmin(`/api/admin/contacts/${id}/read`, {})
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to mark as read')
      }
      loadMessages()
    } catch (e) {
      console.error('Update error:', e)
      alert(e.message || 'Failed to mark as read')
    }
  }

  if (loading) return <p className="text-white/60">Loading...</p>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <span className="text-white/60 text-sm">{messages.filter(m => !m.read).length} unread</span>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 && (
          <p className="text-white/40 text-center py-8">No messages yet</p>
        )}
        {messages.map(m => (
          <div
            key={m._id}
            className={`p-4 rounded-lg border ${
              m.read ? 'bg-base-800/30 border-base-700' : 'bg-base-800/70 border-accent-500/30'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center gap-1 text-white/80">
                    <FiUser size={14} />
                    {m.name}
                  </span>
                  <span className="flex items-center gap-1 text-accent-400 text-sm">
                    <FiMail size={14} />
                    {m.email}
                  </span>
                  <span className="flex items-center gap-1 text-white/40 text-sm">
                    <FiClock size={14} />
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                  {!m.read && (
                    <span className="px-2 py-0.5 rounded text-xs bg-accent-600 text-white">New</span>
                  )}
                </div>
                <h3 className="font-semibold text-white">{m.subject}</h3>
                <p className="text-white/60 mt-2 whitespace-pre-wrap">{m.message}</p>
              </div>
              <div className="flex gap-2 ml-4">
                {!m.read && (
                  <button
                    onClick={() => markAsRead(m._id)}
                    className="p-2 rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-400 hover:text-green-300"
                    title="Mark as read"
                  >
                    <FiCheck size={16} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(m._id)}
                  className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300"
                  title="Delete"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
