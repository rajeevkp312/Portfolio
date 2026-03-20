import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import projectsRouter from './routes/projects.js'
import skillsRouter from './routes/skills.js'
import contactRouter from './routes/contact.js'
import authRouter from './routes/auth.js'
import achievementsRouter from './routes/achievements.js'
import educationRouter from './routes/education.js'
import internshipRouter from './routes/internship.js'
import contactsAdminRouter from './routes/contactsAdmin.js'
import resumeRouter from './routes/resume.js'
import seedRouter from './routes/seed.js'
import profileRouter from './routes/profile.js'

dotenv.config()

const app = express()

const allowedFromEnv = (process.env.ALLOWED_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)
const allowedOrigins = ['http://localhost:5173', ...allowedFromEnv]

const corsOptions = {
  origin: function (origin, callback) {
    // allow server-to-server / health checks
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    console.log('Blocked by CORS:', origin)
    return callback(null, false)
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(cookieParser())
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'portfolio-api' })
})

app.use('/api/projects', projectsRouter)
app.use('/api/skills', skillsRouter)
app.use('/api/contact', contactRouter)
app.use('/api/auth', authRouter)
app.use('/api/achievements', achievementsRouter)
app.use('/api/education', educationRouter)
app.use('/api/internship', internshipRouter)
app.use('/api/admin/contacts', contactsAdminRouter)
app.use('/api/seed-data', seedRouter)
app.use('/api/resume', resumeRouter)
app.use('/api/profile', profileRouter)

const PORT = process.env.PORT || 5001

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
