import { Router } from 'express'
import { listProjects, createProject, updateProject, deleteProject } from '../controllers/projectsController.js'
import requireAdmin from '../middleware/requireAdmin.js'

const router = Router()

router.get('/', listProjects)
router.post('/', requireAdmin, createProject)
router.put('/:id', requireAdmin, updateProject)
router.delete('/:id', requireAdmin, deleteProject)

export default router
