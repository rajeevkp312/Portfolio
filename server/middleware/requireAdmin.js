import jwt from 'jsonwebtoken'

export default function requireAdmin(req, res, next) {
  try {
    const token = req.cookies?.admin_token
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    if (!payload?.adminId) return res.status(401).json({ message: 'Unauthorized' })

    req.admin = { id: payload.adminId, email: payload.email }
    return next()
  } catch (_err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
