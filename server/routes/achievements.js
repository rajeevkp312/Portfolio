import { Router } from 'express'
import {
  listAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../controllers/achievementsController.js'
import requireAdmin from '../middleware/requireAdmin.js'

const router = Router()

router.get('/', listAchievements)
router.post('/', requireAdmin, createAchievement)
router.put('/:id', requireAdmin, updateAchievement)
router.delete('/:id', requireAdmin, deleteAchievement)

export default router
