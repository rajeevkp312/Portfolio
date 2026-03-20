import { Router } from 'express'
import { seedInitialData } from '../controllers/seedController.js'

const router = Router()

router.post('/', seedInitialData)

export default router
