import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import EducationTimeline from './components/EducationTimeline'
import InternshipCard from './components/InternshipCard'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import AchievementsSection from './components/AchievementsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import Particles from './components/Particles'
import { api } from './utils/api'

function Portfolio() {
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Home />
      </AnimatePresence>
      <AboutSection />
      <EducationTimeline />
      <InternshipCard />
      <ProjectsSection />
      <SkillsSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </>
  )
}

export default function App() {
  useEffect(() => {
    let alive = true

    async function setDynamicFavicon() {
      try {
        const res = await api.get('/api/profile')
        if (!res.ok) return
        const data = await res.json()
        const hero = data?.hero
        if (!hero) return

        const link = document.getElementById('dynamic-favicon')
        if (!link) return

        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          if (!alive) return
          try {
            const canvas = document.createElement('canvas')
            const size = 64
            canvas.width = size
            canvas.height = size
            const ctx = canvas.getContext('2d')
            if (!ctx) return
            ctx.clearRect(0, 0, size, size)

            const r = size / 2
            ctx.save()
            ctx.beginPath()
            ctx.arc(r, r, r, 0, Math.PI * 2)
            ctx.closePath()
            ctx.clip()
            ctx.drawImage(img, 0, 0, size, size)
            ctx.restore()

            link.setAttribute('type', 'image/png')
            link.setAttribute('href', canvas.toDataURL('image/png'))
          } catch (e) {
            // ignore
          }
        }

        const src = hero.startsWith('data:') ? hero : `${hero}${hero.includes('?') ? '&' : '?'}_t=${Date.now()}`
        img.src = src
      } catch (e) {
        // ignore
      }
    }

    setDynamicFavicon()
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-900 via-base-800 to-base-900 relative overflow-hidden">
      {/* Global Particles background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>
      {/* Foreground content */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  )
}
