import { useMemo, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { container, fadeInUp } from '../animations/presets'
import ElectricBorder from '../components/ElectricBorder'
import VariableProximity from '../components/VariableProximity'
import { api, API_BASE } from '../utils/api'

export default function Home() {
  const name = 'Rajeev Kumar Pandit'
  const subtitle = 'MERN Stack Developer | AI & ML Undergraduate | Problem Solver'
  const intro = 'Building scalable full-stack applications with modern web technologies.'
  const containerRef = useRef(null)
  const [resumeUrl, setResumeUrl] = useState('/resume/RajeevPandit.pdf') // Default fallback
  const [profileData, setProfileData] = useState({ hero: '/images/profile.jpg', about: '/profile1.jpg', updatedAt: '' })

  const resumeHref = useMemo(() => {
    if (!resumeUrl) return ''
    if (resumeUrl.startsWith('http://') || resumeUrl.startsWith('https://')) return resumeUrl
    if (resumeUrl.startsWith('/api/')) return `${API_BASE}${resumeUrl}`
    return resumeUrl
  }, [resumeUrl])

  // Helper to add cache-busting query param for images
  const imageSrc = useMemo(() => {
    const url = profileData.hero || '/images/profile.jpg'
    if (url.startsWith('data:')) return url
    const separator = url.includes('?') ? '&' : '?'
    return profileData.updatedAt ? `${url}${separator}_t=${profileData.updatedAt}` : url
  }, [profileData])

  useEffect(() => {
    async function loadData() {
      try {
        const [resumeRes, profileRes] = await Promise.all([
          api.get('/api/resume'),
          api.get('/api/profile')
        ])

        if (resumeRes.ok) {
          const data = await resumeRes.json()
          if (data && data.url) setResumeUrl(data.url)
        }

        if (profileRes.ok) {
          const data = await profileRes.json()
          setProfileData({
            hero: data.hero || '/images/profile.jpg',
            about: data.about || '/profile1.jpg',
            updatedAt: data.updatedAt || ''
          })
        }
      } catch (e) {
        console.error('Failed to load home data', e)
      }
    }
    loadData()
  }, [])

  return (
    <main id="home" className="relative overflow-hidden">
      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col items-center justify-center px-4 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-8"
        >
          {/* Profile image with ElectricBorder */}
          <motion.div variants={fadeInUp} className="relative">
            <ElectricBorder color="#7df9ff" speed={1} chaos={0.12} borderRadius={9999} style={{ borderRadius: 9999 }}>
              <img
                src={imageSrc}
                alt={name}
                className="h-28 w-28 sm:h-32 sm:w-32 rounded-full shadow-xl object-cover"
              />
            </ElectricBorder>
          </motion.div>

          {/* Glass hero card */}
          <motion.div variants={fadeInUp} className="glass-card max-w-3xl px-8 py-10">
            {/* Name with VariableProximity effect (no mid-word breaks) */}
            <div ref={containerRef} className="w-full">
              <motion.h1
                aria-label={name}
                className="mb-2 font-bold tracking-tight leading-tight text-[clamp(1.5rem,7vw,3rem)]"
                variants={container}
              >
                <VariableProximity
                  label={name}
                  className="inline-block text-white"
                  fromFontVariationSettings="'wght' 400, 'opsz' 12"
                  toFontVariationSettings="'wght' 800, 'opsz' 32"
                  containerRef={containerRef}
                  radius={80}
                  falloff="exponential"
                />
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="mx-auto max-w-xl text-white/70 text-base sm:text-lg"
            >
              {subtitle}
            </motion.p>

            {/* Short intro line */}
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-2 max-w-xl text-white/70 text-sm sm:text-base"
            >
              {intro}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="btn-primary"
              >
                View Projects
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="btn-secondary"
              >
                Download Resume
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="btn-secondary"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
