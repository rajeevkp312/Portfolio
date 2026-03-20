import { useEffect, useState } from 'react'
import { useNavigate, Link, Routes, Route } from 'react-router-dom'
import { api } from '../utils/api'
import ProjectsAdmin from '../components/admin/ProjectsAdmin'
import SkillsAdmin from '../components/admin/SkillsAdmin'
import AchievementsAdmin from '../components/admin/AchievementsAdmin'
import EducationAdmin from '../components/admin/EducationAdmin'
import InternshipAdmin from '../components/admin/InternshipAdmin'
import ContactsAdmin from '../components/admin/ContactsAdmin'
import ResumeAdmin from '../components/admin/ResumeAdmin'

function AdminLayout({ children }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await api.postAdmin('/api/auth/logout', {})
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-900 via-base-800 to-base-900 text-white">
      <nav className="border-b border-base-700 bg-base-800/50 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-6 overflow-x-auto">
          <Link to="/admin" className="text-xl font-bold whitespace-nowrap">Admin Dashboard</Link>
          <div className="flex gap-4 text-sm whitespace-nowrap pb-1">
            <Link to="/admin" className="hover:text-accent-400">Overview</Link>
            <Link to="/admin/projects" className="hover:text-accent-400">Projects</Link>
            <Link to="/admin/skills" className="hover:text-accent-400">Skills</Link>
            <Link to="/admin/achievements" className="hover:text-accent-400">Achievements</Link>
            <Link to="/admin/education" className="hover:text-accent-400">Education</Link>
            <Link to="/admin/internship" className="hover:text-accent-400">Internship</Link>
            <Link to="/admin/contacts" className="hover:text-accent-400">Contacts</Link>
            <Link to="/admin/resume" className="hover:text-accent-400">Resume</Link>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-sm font-medium ml-4"
        >
          Logout
        </button>
      </nav>
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
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
      </Routes>
    </AdminLayout>
  )
}
