import SiteConfig from '../models/SiteConfig.js'
import fs from 'fs'

export async function getResume(req, res) {
  try {
    const config = await SiteConfig.findOne({ key: 'resume' })
    if (!config || !config.value?.data) {
      // Return 200 with null instead of 404 to avoid console errors on first load
      return res.json(null)
    }
    res.json({
      url: '/api/resume/file',
      filename: config.value.filename || 'resume',
      contentType: config.value.contentType || 'application/octet-stream',
      updatedAt: config.updatedAt,
    })
  } catch (err) {
    console.error('getResume error:', err)
    res.status(500).json({ message: 'Failed to fetch resume' })
  }
}

export async function getResumeFile(req, res) {
  try {
    const config = await SiteConfig.findOne({ key: 'resume' })
    if (!config || !config.value?.data) {
      return res.status(404).json({ message: 'Resume not found' })
    }

    const base64 = config.value.data
    const contentType = config.value.contentType || 'application/octet-stream'
    const filename = config.value.filename || 'resume'

    const buffer = Buffer.from(base64, 'base64')
    res.setHeader('Content-Type', contentType)
    res.setHeader('Content-Length', buffer.length)
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    return res.status(200).send(buffer)
  } catch (err) {
    console.error('getResumeFile error:', err)
    res.status(500).json({ message: 'Failed to download resume' })
  }
}

export async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const fileData = fs.readFileSync(req.file.path)
    const base64 = fileData.toString('base64')

    await SiteConfig.findOneAndUpdate(
      { key: 'resume' },
      {
        key: 'resume',
        value: {
          data: base64,
          filename: req.file.originalname,
          contentType: req.file.mimetype,
          size: req.file.size,
        },
      },
      { upsert: true, new: true }
    )

    // Delete local temp file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }

    res.json({ ok: true, url: '/api/resume/file' })
  } catch (err) {
    console.error('uploadResume detailed error:', err)
    res.status(500).json({ message: 'Failed to upload resume', error: err.message })
  }
}

export async function deleteResume(req, res) {
  try {
    await SiteConfig.findOneAndDelete({ key: 'resume' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete resume' })
  }
}
