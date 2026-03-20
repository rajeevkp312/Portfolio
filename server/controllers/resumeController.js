import { v2 as cloudinary } from 'cloudinary'
import SiteConfig from '../models/SiteConfig.js'
import fs from 'fs'

// Configure Cloudinary from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function getResume(req, res) {
  try {
    const config = await SiteConfig.findOne({ key: 'resume' })
    if (!config || !config.value?.url) {
      // Return 200 with null instead of 404 to avoid console errors on first load
      return res.json(null)
    }
    res.json({ url: config.value.url, publicId: config.value.publicId })
  } catch (err) {
    console.error('getResume error:', err)
    res.status(500).json({ message: 'Failed to fetch resume' })
  }
}

export async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    console.log('Uploading file to Cloudinary:', req.file.path)

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio/resume',
      resource_type: 'raw',
      public_id: `resume_${Date.now()}`,
    })

    console.log('Cloudinary upload successful:', result.secure_url)

    // Delete old resume if exists
    const existing = await SiteConfig.findOne({ key: 'resume' })
    if (existing?.value?.publicId) {
      try {
        await cloudinary.uploader.destroy(existing.value.publicId, { resource_type: 'raw' })
      } catch (e) {
        console.error('Failed to delete old resume from Cloudinary:', e)
      }
    }

    // Save new resume URL to Atlas
    const updated = await SiteConfig.findOneAndUpdate(
      { key: 'resume' },
      { key: 'resume', value: { url: result.secure_url, publicId: result.public_id } },
      { upsert: true, new: true }
    )

    console.log('Atlas config updated:', updated)

    // Delete local temp file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    res.json({ ok: true, url: result.secure_url })
  } catch (err) {
    console.error('uploadResume detailed error:', err)
    res.status(500).json({ message: 'Failed to upload resume', error: err.message })
  }
}

export async function deleteResume(req, res) {
  try {
    const existing = await SiteConfig.findOne({ key: 'resume' })
    if (existing?.value?.publicId) {
      try {
        await cloudinary.uploader.destroy(existing.value.publicId, { resource_type: 'raw' })
      } catch (e) {
        console.error('Failed to delete from Cloudinary:', e)
      }
    }

    await SiteConfig.findOneAndDelete({ key: 'resume' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete resume' })
  }
}
