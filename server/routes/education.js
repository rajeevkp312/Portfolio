import { Router } from 'express'
import {
  listEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController.js'
import requireAdmin from '../middleware/requireAdmin.js'

const router = Router()

router.get('/', listEducation)
router.post('/', requireAdmin, createEducation)
router.put('/:id', requireAdmin, updateEducation)
router.delete('/:id', requireAdmin, deleteEducation)

export default router
