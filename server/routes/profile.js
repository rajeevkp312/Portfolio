import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import { getProfileImages, updateProfileImage, deleteProfileImage } from '../controllers/profileController.js'
import requireAdmin from '../middleware/requireAdmin.js'

const router = Router()

const uploadDir = 'uploads'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const upload = multer({ dest: uploadDir })

router.get('/', getProfileImages)
router.post('/:key', requireAdmin, upload.single('image'), updateProfileImage)
router.delete('/:key', requireAdmin, deleteProfileImage)

export default router
