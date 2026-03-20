import Internship from '../models/Internship.js'

export async function listInternships(req, res) {
  try {
    const internships = await Internship.find().sort({ order: 1, createdAt: -1 })
    res.json(internships)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch internships' })
  }
}

export async function createInternship(req, res) {
  try {
    const internship = await Internship.create(req.body)
    res.status(201).json(internship)
  } catch (err) {
    res.status(400).json({ message: 'Failed to create internship', error: err.message })
  }
}

export async function updateInternship(req, res) {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!internship) return res.status(404).json({ message: 'Internship not found' })
    res.json(internship)
  } catch (err) {
    res.status(400).json({ message: 'Failed to update internship', error: err.message })
  }
}

export async function deleteInternship(req, res) {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id)
    if (!internship) return res.status(404).json({ message: 'Internship not found' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete internship' })
  }
}
