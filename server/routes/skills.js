import { Router } from 'express'
import { listSkills, createSkill } from '../controllers/skillsController.js'
import requireAdmin from '../middleware/requireAdmin.js'

const router = Router()

router.get('/', listSkills)
router.post('/', requireAdmin, createSkill)

export default router
