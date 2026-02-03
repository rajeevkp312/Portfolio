import Skill from '../models/Skill.js'

export async function listSkills(_req, res) {
  try {
    const skills = await Skill.find().sort({ category: 1, level: -1 })
    res.json(skills)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch skills' })
  }
}

export async function createSkill(req, res) {
  try {
    const skill = await Skill.create(req.body)
    res.status(201).json(skill)
  } catch (err) {
    res.status(400).json({ message: 'Failed to create skill', error: err.message })
  }
}
