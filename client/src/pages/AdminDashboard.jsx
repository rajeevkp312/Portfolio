import { useEffect, useMemo, useState } from 'react'
import { useNavigate, Link, Routes, Route, useLocation } from 'react-router-dom'
import { api } from '../utils/api'
import ProjectsAdmin from '../components/admin/ProjectsAdmin'
import SkillsAdmin from '../components/admin/SkillsAdmin'
import AchievementsAdmin from '../components/admin/AchievementsAdmin'
import EducationAdmin from '../components/admin/EducationAdmin'
import InternshipAdmin from '../components/admin/InternshipAdmin'
import ContactsAdmin from '../components/admin/ContactsAdmin'
import ResumeAdmin from '../components/admin/ResumeAdmin'
import ProfileAdmin from '../components/admin/ProfileAdmin'
import { FiMenu, FiX, FiLogOut, FiHome } from 'react-icons/fi'

function AdminLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = useMemo(
    () => [
      { label: 'Overview', to: '/admin' },
      { label: 'Projects', to: '/admin/projects' },
      { label: 'Skills', to: '/admin/skills' },
      { label: 'Achievements', to: '/admin/achievements' },
      { label: 'Education', to: '/admin/education' },
      { label: 'Internship', to: '/admin/internship' },
      { label: 'Contacts', to: '/admin/contacts' },
      { label: 'Resume', to: '/admin/resume' },
      { label: 'Profile', to: '/admin/profile' },
    ],
    []
  )

  const handleLogout = async () => {
    await api.postAdmin('/api/auth/logout', {})
    navigate('/admin/login')
  }

  const isActive = (to) => {
    if (to === '/admin') return location.pathname === '/admin' || location.pathname === '/admin/'
    return location.pathname.startsWith(to)
  }

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-900 via-base-800 to-base-900 text-white">
      <div className="sticky top-0 z-20 border-b border-base-700 bg-base-800/50 backdrop-blur md:hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-base-800/60 border border-base-700 hover:border-accent-500"
            aria-label="Open admin menu"
          >
            <FiMenu size={18} />
          </button>
          <Link to="/admin" className="text-base font-bold">Admin Dashboard</Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-600/20 border border-red-600/30 hover:bg-red-600/30 text-red-200"
            aria-label="Logout"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </div>

      <div className="md:flex">
        <div className="hidden md:flex md:sticky md:top-0 md:h-screen md:w-72 md:flex-col md:border-r md:border-base-700 md:bg-base-800/40 md:backdrop-blur">
          <div className="px-6 py-5 border-b border-base-700">
            <Link to="/admin" className="text-xl font-bold">Admin Dashboard</Link>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block px-3 py-2 rounded-lg text-sm border transition-colors ${
                    isActive(item.to)
                      ? 'bg-accent-600/15 border-accent-500 text-white'
                      : 'bg-transparent border-transparent text-white/70 hover:text-white hover:bg-base-800/60 hover:border-base-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="/"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm border border-base-700 text-white/70 hover:text-white hover:bg-base-800/60 hover:border-base-700 transition-colors"
              >
                <FiHome size={16} />
                Go to Home
              </a>
            </div>
          </div>
          <div className="p-4 border-t border-base-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-200 text-sm font-medium"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <div className="flex-1">
          <main className="p-4 sm:p-6 max-w-7xl mx-auto">{children}</main>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={closeSidebar}
            aria-label="Close admin menu"
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-base-900 border-r border-base-700 shadow-2xl">
            <div className="px-4 py-3 border-b border-base-700 flex items-center justify-between">
              <Link onClick={closeSidebar} to="/admin" className="text-base font-bold">
                Admin Dashboard
              </Link>
              <button
                type="button"
                onClick={closeSidebar}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-base-800/60 border border-base-700 hover:border-accent-500"
                aria-label="Close admin menu"
              >
                <FiX size={18} />
              </button>
            </div>
            <div className="px-3 py-4 space-y-1 overflow-y-auto h-[calc(100%-124px)]">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeSidebar}
                  className={`block px-3 py-2 rounded-lg text-sm border transition-colors ${
                    isActive(item.to)
                      ? 'bg-accent-600/15 border-accent-500 text-white'
                      : 'bg-transparent border-transparent text-white/70 hover:text-white hover:bg-base-800/60 hover:border-base-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="/"
                onClick={closeSidebar}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm border border-base-700 text-white/70 hover:text-white hover:bg-base-800/60 hover:border-base-700 transition-colors"
              >
                <FiHome size={16} />
                Go to Home
              </a>
            </div>
            <div className="p-4 border-t border-base-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-200 text-sm font-medium"
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Overview() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    achievements: 0,
    education: 0,
    internship: 0,
    contacts: 0,
  })

  useEffect(() => {
    async function loadStats() {
      try {
        const [projects, skills, achievements, education, internship, contacts] = await Promise.all([
          api.get('/api/projects').then(r => r.json()).catch(() => []),
          api.get('/api/skills').then(r => r.json()).catch(() => []),
          api.get('/api/achievements').then(r => r.json()).catch(() => []),
          api.get('/api/education').then(r => r.json()).catch(() => []),
          api.get('/api/internship').then(r => r.json()).catch(() => []),
          api.getAdmin('/api/admin/contacts').then(r => r.json()).catch(() => []),
        ])
        setStats({
          projects: projects?.length || 0,
          skills: skills?.length || 0,
          achievements: achievements?.length || 0,
          education: education?.length || 0,
          internship: internship?.length || 0,
          contacts: contacts?.length || 0,
        })
      } catch (e) {
        console.error(e)
      }
    }
    loadStats()
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Projects" value={stats.projects} to="/admin/projects" />
        <StatCard label="Skills" value={stats.skills} to="/admin/skills" />
        <StatCard label="Achievements" value={stats.achievements} to="/admin/achievements" />
        <StatCard label="Education" value={stats.education} to="/admin/education" />
        <StatCard label="Internship" value={stats.internship} to="/admin/internship" />
        <StatCard label="Contact Messages" value={stats.contacts} to="/admin/contacts" />
      </div>
    </div>
  )
}

function StatCard({ label, value, to }) {
  return (
    <Link
      to={to}
      className="p-6 rounded-lg bg-base-800/50 border border-base-700 hover:border-accent-500 transition-colors"
    >
      <p className="text-white/60 text-sm">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </Link>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await api.getAdmin('/api/auth/me')
        if (!res.ok) {
          navigate('/admin/login')
          return
        }
        const data = await res.json()
        if (!data.isAdmin) {
          navigate('/admin/login')
          return
        }
        setLoading(false)
      } catch (e) {
        navigate('/admin/login')
      }
    }
    checkAuth()
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/60 bg-base-900">
        Checking session...
      </div>
    )
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/projects" element={<ProjectsAdmin />} />
        <Route path="/skills" element={<SkillsAdmin />} />
        <Route path="/achievements" element={<AchievementsAdmin />} />
        <Route path="/education" element={<EducationAdmin />} />
        <Route path="/internship" element={<InternshipAdmin />} />
        <Route path="/contacts" element={<ContactsAdmin />} />
        <Route path="/resume" element={<ResumeAdmin />} />
        <Route path="/profile" element={<ProfileAdmin />} />
      </Routes>
    </AdminLayout>
  )
}
