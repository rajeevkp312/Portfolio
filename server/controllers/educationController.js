import Education from '../models/Education.js'

export async function listEducation(req, res) {
  try {
    const education = await Education.find().sort({ order: 1, createdAt: -1 })
    res.json(education)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch education' })
  }
}

export async function createEducation(req, res) {
  try {
    const edu = await Education.create(req.body)
    res.status(201).json(edu)
  } catch (err) {
    res.status(400).json({ message: 'Failed to create education', error: err.message })
  }
}

export async function updateEducation(req, res) {
  try {
    const edu = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!edu) return res.status(404).json({ message: 'Education not found' })
    res.json(edu)
  } catch (err) {
    res.status(400).json({ message: 'Failed to update education', error: err.message })
  }
}

export async function deleteEducation(req, res) {
  try {
    const edu = await Education.findByIdAndDelete(req.params.id)
    if (!edu) return res.status(404).json({ message: 'Education not found' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete education' })
  }
}
