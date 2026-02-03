import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import projectsRouter from './routes/projects.js'
import skillsRouter from './routes/skills.js'
import contactRouter from './routes/contact.js'

dotenv.config()

const app = express()

app.use(cors({ origin: ['http://localhost:5173'], credentials: false }))
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'portfolio-api' })
})

app.use('/api/projects', projectsRouter)
app.use('/api/skills', skillsRouter)
app.use('/api/contact', contactRouter)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
