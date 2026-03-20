import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../../utils/api'
import { FiUpload, FiTrash2, FiImage, FiUser } from 'react-icons/fi'
import Cropper from 'react-easy-crop'

export default function ProfileAdmin() {
  const [images, setImages] = useState({ hero: null, about: null })
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState({ hero: false, about: false })

  const [cropOpen, setCropOpen] = useState(false)
  const [cropKey, setCropKey] = useState('hero')
  const [sourceImageUrl, setSourceImageUrl] = useState('')
  const [sourceFileName, setSourceFileName] = useState('image.jpg')
  const [sourceMime, setSourceMime] = useState('image/jpeg')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

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

  const onCropComplete = useCallback((_croppedArea, pixels) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const readFileAsDataUrl = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result || ''))
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }, [])

  const createImage = useCallback((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }, [])

  const getCroppedBlob = useCallback(async (imageSrc, pixelCrop, mimeType) => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas not supported')

    canvas.width = Math.max(1, Math.floor(pixelCrop.width))
    canvas.height = Math.max(1, Math.floor(pixelCrop.height))

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      canvas.width,
      canvas.height
    )

    return await new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Failed to crop image'))
          resolve(blob)
        },
        mimeType || 'image/jpeg',
        0.92
      )
    })
  }, [createImage])

  const closeCrop = useCallback(() => {
    setCropOpen(false)
    setSourceImageUrl('')
    setCroppedAreaPixels(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
  }, [])

  const baseUrl = useMemo(() => import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', [])

  async function uploadCropped(fileOrBlob, key) {
    setUploading(prev => ({ ...prev, [key]: true }))
    const formData = new FormData()
    formData.append('image', fileOrBlob)

    try {
      const res = await fetch(`${baseUrl}/api/profile/${key}`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      if (res.ok) {
        const data = await res.json()
        setImages(prev => ({ ...prev, [key]: data.url }))
      } else {
        alert('Upload failed')
      }
    } catch (e) {
      alert('Upload failed')
    } finally {
      setUploading(prev => ({ ...prev, [key]: false }))
    }
  }

  async function handleUpload(e, key) {
    const file = e.target.files[0]
    if (!file) return
    try {
      const dataUrl = await readFileAsDataUrl(file)
      setCropKey(key)
      setSourceImageUrl(dataUrl)
      setSourceFileName(file.name || 'image.jpg')
      setSourceMime(file.type || 'image/jpeg')
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setCroppedAreaPixels(null)
      setCropOpen(true)
    } catch (err) {
      alert('Failed to read image')
    } finally {
      e.target.value = ''
    }
  }

  const confirmCropAndUpload = useCallback(async () => {
    if (!croppedAreaPixels || !sourceImageUrl) return
    try {
      const blob = await getCroppedBlob(sourceImageUrl, croppedAreaPixels, sourceMime)
      const file = new File([blob], sourceFileName, { type: blob.type || sourceMime })
      closeCrop()
      await uploadCropped(file, cropKey)
    } catch (e) {
      alert('Crop failed')
    }
  }, [closeCrop, cropKey, croppedAreaPixels, getCroppedBlob, sourceFileName, sourceImageUrl, sourceMime])

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

      {cropOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-2xl rounded-xl border border-base-700 bg-base-900 shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-base-700 flex items-center justify-between">
              <h3 className="font-semibold text-white">Crop Image</h3>
              <button
                type="button"
                onClick={closeCrop}
                className="px-3 py-1.5 rounded-lg bg-base-800/60 border border-base-700 text-white/80 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div className="relative w-full h-[380px] bg-black">
              <Cropper
                image={sourceImageUrl}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Zoom</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeCrop}
                  className="px-4 py-2 rounded-lg bg-base-800/60 border border-base-700 text-white/80 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmCropAndUpload}
                  className="px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white font-medium"
                >
                  Crop & Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
