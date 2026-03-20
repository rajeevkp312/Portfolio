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

export async function updateProject(req, res) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!project) return res.status(404).json({ message: 'Project not found' })
    res.json(project)
  } catch (err) {
    res.status(400).json({ message: 'Failed to update project', error: err.message })
  }
}

export async function deleteProject(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ message: 'Project not found' })
    res.json({ message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project', error: err.message })
  }
}
