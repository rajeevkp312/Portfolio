import Project from '../models/Project.js'

export async function listProjects(req, res) {
  try {
    const projects = await Project.find().sort({ featured: -1, order: 1, createdAt: -1 })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects' })
  }
}

export async function createProject(req, res) {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (err) {
    res.status(400).json({ message: 'Failed to create project', error: err.message })
  }
}
