import { Router } from 'express'
import {
  listInternships,
  createInternship,
  updateInternship,
  deleteInternship,
} from '../controllers/internshipController.js'
import requireAdmin from '../middleware/requireAdmin.js'

const router = Router()

router.get('/', listInternships)
router.post('/', requireAdmin, createInternship)
router.put('/:id', requireAdmin, updateInternship)
router.delete('/:id', requireAdmin, deleteInternship)

export default router
