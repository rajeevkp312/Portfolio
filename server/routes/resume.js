import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import {
  getResume,
  getResumeFile,
  uploadResume,
  deleteResume,
} from '../controllers/resumeController.js'
import requireAdmin from '../middleware/requireAdmin.js'

const router = Router()

// Ensure uploads directory exists
const uploadDir = 'uploads'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Multer setup for file upload with proper filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

// Public - get resume URL
router.get('/', getResume)

// Public - download resume file
router.get('/file', getResumeFile)

// Admin only
router.post('/', requireAdmin, upload.single('resume'), uploadResume)
router.delete('/', requireAdmin, deleteResume)

export default router
