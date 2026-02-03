import { Router } from 'express'
import { listSkills, createSkill } from '../controllers/skillsController.js'

const router = Router()

router.get('/', listSkills)
router.post('/', createSkill)

export default router
