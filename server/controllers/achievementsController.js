import Achievement from '../models/Achievement.js'

export async function listAchievements(req, res) {
  try {
    const achievements = await Achievement.find().sort({ order: 1, createdAt: -1 })
    res.json(achievements)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch achievements' })
  }
}

export async function createAchievement(req, res) {
  try {
    const achievement = await Achievement.create(req.body)
    res.status(201).json(achievement)
  } catch (err) {
    res.status(400).json({ message: 'Failed to create achievement', error: err.message })
  }
}

export async function updateAchievement(req, res) {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!achievement) return res.status(404).json({ message: 'Achievement not found' })
    res.json(achievement)
  } catch (err) {
    res.status(400).json({ message: 'Failed to update achievement', error: err.message })
  }
}

export async function deleteAchievement(req, res) {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id)
    if (!achievement) return res.status(404).json({ message: 'Achievement not found' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete achievement' })
  }
}
