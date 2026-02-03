import ContactMessage from '../models/ContactMessage.js'
import nodemailer from 'nodemailer'

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

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO_EMAIL,
      CONTACT_FROM_EMAIL,
    } = process.env

    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && CONTACT_TO_EMAIL) {
      const port = Number(SMTP_PORT)
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })

      const fromAddress = CONTACT_FROM_EMAIL || SMTP_USER
      const replyTo = data.email

      const subjectLine = `Portfolio Contact: ${data.subject}`
      const text = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Subject: ${data.subject}`,
        '',
        data.message,
      ].join('\n')

      try {
        const info = await transporter.sendMail({
          from: fromAddress,
          to: CONTACT_TO_EMAIL,
          replyTo,
          subject: subjectLine,
          text,
        })
        console.log('✅ Email sent via nodemailer:', info.messageId)
      } catch (mailErr) {
        console.error('❌ Nodemailer error:', mailErr)
        // Optional fallback to 587 STARTTLS if 465 fails
        if (port === 465) {
          console.log('🔄 Retrying with port 587 STARTTLS...')
          const fallbackTransporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
          })
          try {
            const fallbackInfo = await fallbackTransporter.sendMail({
              from: fromAddress,
              to: CONTACT_TO_EMAIL,
              replyTo,
              subject: subjectLine,
              text,
            })
            console.log('✅ Email sent via fallback 587:', fallbackInfo.messageId)
          } catch (fallbackErr) {
            console.error('❌ Fallback 587 also failed:', fallbackErr)
          }
        }
      }
    } else {
      console.warn('⚠️ SMTP env vars missing; email not sent.')
    }

    res.status(201).json({ success: true, id: doc._id })
  } catch (err) {
    res.status(400).json({ message: 'Failed to submit message', error: err.message })
  }
}
