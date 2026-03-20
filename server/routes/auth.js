import { Router } from 'express'
import requireAdmin from '../middleware/requireAdmin.js'
import { changePassword, ensureAdminSeeded, login, logout, me } from '../controllers/authController.js'

const router = Router()

router.post('/seed', ensureAdminSeeded)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', requireAdmin, me)
router.post('/change-password', requireAdmin, changePassword)

export default router
