import { Router } from 'express'
import {
  listMessages,
  deleteMessage,
  markAsRead,
} from '../controllers/contactsAdminController.js'
import requireAdmin from '../middleware/requireAdmin.js'

const router = Router()

router.get('/', requireAdmin, listMessages)
router.delete('/:id', requireAdmin, deleteMessage)
router.patch('/:id/read', requireAdmin, markAsRead)

export default router
