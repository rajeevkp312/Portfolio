import ContactMessage from '../models/ContactMessage.js'

export async function listMessages(req, res) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages' })
  }
}

export async function deleteMessage(req, res) {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id)
    if (!message) return res.status(404).json({ message: 'Message not found' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete message' })
  }
}

export async function markAsRead(req, res) {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    )
    if (!message) return res.status(404).json({ message: 'Message not found' })
    res.json(message)
  } catch (err) {
    res.status(400).json({ message: 'Failed to update message' })
  }
}
