import { useEffect, useMemo, useState } from 'react'
import { api, API_BASE } from '../../utils/api'
import { FiUpload, FiTrash2, FiDownload, FiFile } from 'react-icons/fi'

export default function ResumeAdmin() {
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState(null)

  const downloadHref = useMemo(() => {
    if (!resume?.url) return ''
    if (resume.url.startsWith('http://') || resume.url.startsWith('https://')) return resume.url
    return `${API_BASE}${resume.url}`
  }, [resume])

  useEffect(() => {
    loadResume()
  }, [])

  async function loadResume() {
    try {
      const res = await api.get('/api/resume')
      if (res.ok) {
        const data = await res.json()
        setResume(data)
      }
    } catch (e) {
      console.error('Failed to load resume', e)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(e) {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('resume', file)

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
      const res = await fetch(`${baseUrl}/api/resume`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      if (res.ok) {
        const data = await res.json()
        setResume({ url: data.url })
        setFile(null)
        // Clear file input
        e.target.reset()
      } else {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Upload failed')
      }
    } catch (e) {
      console.error('Upload error:', e)
      alert(e.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Delete current resume?')) return
    try {
      const res = await api.deleteAdmin('/api/resume')
      if (res.ok) {
        setResume(null)
      } else {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to delete resume')
      }
    } catch (e) {
      console.error('Delete error:', e)
      alert(e.message || 'Failed to delete resume')
    }
  }

  if (loading) return <p className="text-white/60">Loading...</p>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Resume Management</h2>

      {resume ? (
        <div className="p-6 rounded-lg bg-base-800/50 border border-base-700">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-accent-600/20 flex items-center justify-center">
              <FiFile size={32} className="text-accent-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">Current Resume</h3>
              <p className="text-white/60 text-sm mt-1">Resume is live and available for download</p>
              <div className="flex gap-3 mt-3">
                <a
                  href={downloadHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium"
                >
                  <FiDownload size={16} />
                  Download
                </a>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 text-sm font-medium"
                >
                  <FiTrash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-lg bg-base-800/30 border border-base-700 border-dashed">
          <p className="text-white/60 text-center">No resume uploaded yet</p>
        </div>
      )}

      <div className="p-6 rounded-lg bg-base-800/50 border border-base-700">
        <h3 className="font-semibold text-white mb-4">Upload New Resume</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={e => setFile(e.target.files[0])}
              className="block w-full text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent-600 file:text-white file:font-medium hover:file:bg-accent-500"
            />
            <p className="text-white/40 text-xs mt-2">Accepted: PDF, DOC, DOCX</p>
          </div>
          {file && (
            <div className="flex items-center gap-2 text-sm text-white/80">
              <FiFile size={16} />
              {file.name}
            </div>
          )}
          <button
            type="submit"
            disabled={!file || uploading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 disabled:opacity-50 text-white font-medium"
          >
            <FiUpload size={16} />
            {uploading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </form>
      </div>
    </div>
  )
}
