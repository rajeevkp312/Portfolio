import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import AdminUser from '../models/AdminUser.js'

function getCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production'
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }
}

export async function ensureAdminSeeded(req, res) {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD || ''

  if (!email || !password) {
    return res.status(400).json({ message: 'ADMIN_EMAIL and ADMIN_PASSWORD must be set' })
  }

  const existing = await AdminUser.findOne({ email })
  if (existing) {
    return res.json({ ok: true, seeded: false })
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await AdminUser.create({ email, passwordHash })
  return res.json({ ok: true, seeded: true })
}

export async function login(req, res) {
  const email = (req.body?.email || '').trim().toLowerCase()
  const password = req.body?.password || ''

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const admin = await AdminUser.findOne({ email })
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const ok = await bcrypt.compare(password, admin.passwordHash)
  if (!ok) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ adminId: admin._id.toString(), email: admin.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

  res.cookie('admin_token', token, getCookieOptions())
  return res.json({ ok: true })
}

export async function logout(_req, res) {
  const isProd = process.env.NODE_ENV === 'production'
  res.clearCookie('admin_token', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  })
  return res.json({ ok: true })
}

export async function me(req, res) {
  return res.json({ isAdmin: true, admin: { id: req.admin.id, email: req.admin.email } })
}

export async function changePassword(req, res) {
  const currentPassword = req.body?.currentPassword || ''
  const newPassword = req.body?.newPassword || ''

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'currentPassword and newPassword are required' })
  }

  const admin = await AdminUser.findById(req.admin.id)
  if (!admin) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const ok = await bcrypt.compare(currentPassword, admin.passwordHash)
  if (!ok) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  admin.passwordHash = await bcrypt.hash(newPassword, 12)
  await admin.save()

  return res.json({ ok: true })
}
