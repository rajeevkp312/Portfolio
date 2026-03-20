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
