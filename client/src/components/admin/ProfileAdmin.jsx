import { useEffect, useState } from 'react'
import { api } from '../../utils/api'
import { FiUpload, FiTrash2, FiImage, FiUser } from 'react-icons/fi'

export default function ProfileAdmin() {
  const [images, setImages] = useState({ hero: null, about: null })
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState({ hero: false, about: false })

  useEffect(() => {
    loadImages()
  }, [])

  async function loadImages() {
    try {
      const res = await api.get('/api/profile')
      if (res.ok) {
        const data = await res.json()
        setImages(data)
      }
    } catch (e) {
      console.error('Failed to load profile images', e)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(e, key) {
    const file = e.target.files[0]
    if (!file) return

    setUploading(prev => ({ ...prev, [key]: true }))
    const formData = new FormData()
    formData.append('image', file)

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
      const res = await fetch(`${baseUrl}/api/profile/${key}`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      if (res.ok) {
        const data = await res.json()
        setImages(prev => ({ ...prev, [key]: data.url }))
        e.target.value = '' // Reset input
      } else {
        alert('Upload failed')
      }
    } catch (e) {
      alert('Upload failed')
    } finally {
      setUploading(prev => ({ ...prev, [key]: false }))
    }
  }

  async function handleReset(key) {
    if (!confirm('Reset this image to default?')) return
    try {
      const res = await api.deleteAdmin(`/api/profile/${key}`)
      if (res.ok) {
        loadImages()
      }
    } catch (e) {
      alert('Failed to reset image')
    }
  }

  if (loading) return <p className="text-white/60">Loading...</p>

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Images</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hero Image */}
        <div className="p-6 rounded-lg bg-base-800/50 border border-base-700">
          <div className="flex items-center gap-3 mb-4">
            <FiUser className="text-accent-400" size={20} />
            <h3 className="font-semibold text-white">Hero Section Image</h3>
          </div>
          <div className="aspect-square w-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-base-700">
            <img src={images.hero} alt="Hero" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e, 'hero')}
              className="hidden"
              id="hero-upload"
            />
            <label
              htmlFor="hero-upload"
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium cursor-pointer ${uploading.hero ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <FiUpload size={16} />
              {uploading.hero ? 'Uploading...' : 'Change Hero Image'}
            </label>
            <button
              onClick={() => handleReset('hero')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm font-medium"
            >
              <FiTrash2 size={16} />
              Reset to Default
            </button>
          </div>
        </div>

        {/* About Image */}
        <div className="p-6 rounded-lg bg-base-800/50 border border-base-700">
          <div className="flex items-center gap-3 mb-4">
            <FiImage className="text-accent-400" size={20} />
            <h3 className="font-semibold text-white">About Section Image</h3>
          </div>
          <div className="aspect-square w-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-base-700">
            <img src={images.about} alt="About" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e, 'about')}
              className="hidden"
              id="about-upload"
            />
            <label
              htmlFor="about-upload"
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium cursor-pointer ${uploading.about ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <FiUpload size={16} />
              {uploading.about ? 'Uploading...' : 'Change About Image'}
            </label>
            <button
              onClick={() => handleReset('about')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm font-medium"
            >
              <FiTrash2 size={16} />
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
