import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiEye, FiEyeOff, FiHome } from 'react-icons/fi'
import { api } from '../utils/api'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await api.postAdmin('/api/auth/login', { email, password })
      const data = await res.json()
      if (!data.ok) {
        setError(data.message || 'Login failed')
        return
      }
      navigate('/admin')
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-900 via-base-800 to-base-900 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded-lg bg-base-800/50 backdrop-blur border border-base-700 shadow-xl space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Admin Login</h2>
        {error && <p className="text-red-400 text-center text-sm">{error}</p>}
        <div>
          <label className="block text-white/80 text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-white/80 text-sm mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded bg-base-700 text-white border border-base-600 focus:border-accent-500 focus:outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-accent-600 hover:bg-accent-500 text-white font-semibold disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <FiHome size={16} />
            Go to Home
          </a>
        </div>
      </form>
    </main>
  )
}
