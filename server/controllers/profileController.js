import ProfileImage from '../models/ProfileImage.js'
import fs from 'fs'

export async function getProfileImages(req, res) {
  try {
    const images = await ProfileImage.find()
    const heroImg = images.find(img => img.key === 'hero')
    const aboutImg = images.find(img => img.key === 'about')
    const result = {
      hero: heroImg?.url || '/images/profile.jpg',
      about: aboutImg?.url || '/profile1.jpg',
      updatedAt: heroImg?.updatedAt?.toISOString() || aboutImg?.updatedAt?.toISOString() || Date.now().toString()
    }
    res.json(result)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile images' })
  }
}

export async function updateProfileImage(req, res) {
  try {
    const { key } = req.params
    if (!['hero', 'about'].includes(key)) {
      return res.status(400).json({ message: 'Invalid image key' })
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Read file and convert to Base64
    const fileData = fs.readFileSync(req.file.path)
    const base64Image = `data:${req.file.mimetype};base64,${fileData.toString('base64')}`

    // Save/Update in Atlas (Directly as Base64)
    const updated = await ProfileImage.findOneAndUpdate(
      { key },
      { url: base64Image },
      { upsert: true, new: true }
    )

    // Cleanup local temp file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    res.json({ ok: true, url: updated.url })
  } catch (err) {
    console.error('Profile image update error:', err)
    res.status(500).json({ message: 'Failed to update profile image' })
  }
}

export async function deleteProfileImage(req, res) {
  try {
    const { key } = req.params
    await ProfileImage.findOneAndDelete({ key })
    res.json({ message: 'Profile image reset to default' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to reset profile image' })
  }
}
