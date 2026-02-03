import { Router } from 'express'
import { submitMessage } from '../controllers/contactController.js'
import rateLimit from 'express-rate-limit'

const router = Router()

const limiter = rateLimit({ windowMs: 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false })

router.post('/', limiter, submitMessage)

export default router
