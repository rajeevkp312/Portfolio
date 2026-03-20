import ContactMessage from '../models/ContactMessage.js'

export async function submitMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body || {}

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Name, email, subject and message are required.' })
    }

    const clean = (s = '', max = 255) => String(s).trim().replace(/\s+/g, ' ').replace(/[<>]/g, '').slice(0, max)
    const isEmail = (e) => /^(?:[a-zA-Z0-9_'^&\-+.])+(?:\.(?:[a-zA-Z0-9_'^&\-+.])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(e)

    const data = {
      name: clean(name, 100),
      email: clean(email, 120).toLowerCase(),
      subject: clean(subject, 150),
      message: clean(message, 2000),
    }

    if (!isEmail(data.email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' })
    }

    const doc = await ContactMessage.create(data)

    try {
      const formspreeEndpoint = 'https://formspree.io/f/xnjgrjkp'
      const forwardRes = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      })

      if (!forwardRes.ok) {
        let errText = ''
        try {
          errText = await forwardRes.text()
        } catch (e) {
          errText = ''
        }
        console.error('❌ Formspree forward failed:', forwardRes.status, errText)
      }
    } catch (forwardErr) {
      console.error('❌ Formspree forward error:', forwardErr)
    }

    res.status(201).json({ success: true, id: doc._id })
  } catch (err) {
    res.status(400).json({ message: 'Failed to submit message', error: err.message })
  }
}
