import { useMemo, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { container, fadeInLeft, fadeInRight, fadeInUp, inViewStagger } from '../animations/presets'
import ElectricBorder from './ElectricBorder'
import VariableProximity from './VariableProximity'
import { api } from '../utils/api'

// About Me: strictly resume-derived content with scroll-triggered motion
export default function AboutSection() {
  const headingRef = useRef(null)
  const [profileData, setProfileData] = useState({ about: '/profile1.jpg', updatedAt: '' })

  // Helper to add cache-busting query param for images
  const imageSrc = useMemo(() => {
    const url = profileData.about || '/profile1.jpg'
    if (url.startsWith('data:')) return url
    const separator = url.includes('?') ? '&' : '?'
    return profileData.updatedAt ? `${url}${separator}_t=${profileData.updatedAt}` : url
  }, [profileData])

  useEffect(() => {
    async function loadImage() {
      try {
        const res = await api.get('/api/profile')
        if (res.ok) {
          const data = await res.json()
          setProfileData({
            about: data.about || '/profile1.jpg',
            updatedAt: data.updatedAt || ''
          })
        }
      } catch (e) {
        console.error('Failed to load about profile image', e)
      }
    }
    loadImage()
  }, [])
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mb-12 text-center"
      >
        <div ref={headingRef} className="flex justify-center">
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <VariableProximity
              label="About Me"
              className="inline-block"
              fromFontVariationSettings="'wght' 600, 'opsz' 14"
              toFontVariationSettings="'wght' 900, 'opsz' 36"
              containerRef={headingRef}
              radius={100}
              falloff="exponential"
            />
          </motion.h2>
        </div>
        <motion.p variants={fadeInUp} className="mt-2 text-white/70 max-w-2xl mx-auto">
          MERN Stack Developer with AI & ML foundation
        </motion.p>
        {/* Animated underline */}
        <motion.div
          variants={fadeInUp}
          className="mx-auto mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-accent-700 to-accent-500"
        />
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: profile image with gentle float animation and electric border */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInLeft}
          className="flex justify-center"
        >
          <motion.div
            aria-label="Profile Image"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ElectricBorder color="#809fff" speed={3} chaos={0.02} thickness={2} borderRadius={16} style={{ borderRadius: 16 }}>
              <img
                src={imageSrc}
                alt="Rajeev Kumar Pandit profile"
                className="h-56 w-56 sm:h-64 sm:w-64 rounded-[16px] object-cover"
                loading="eager"
              />
            </ElectricBorder>
          </motion.div>
        </motion.div>

        {/* Right: resume-derived story with staggered reveal */}
        <motion.div
          variants={inViewStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-4"
        >
          {/* Academic background (AIML) */}
          <motion.p variants={fadeInRight} className="text-white/80 leading-relaxed">
            I am pursuing a <span className="font-semibold text-white">B.Tech in Artificial Intelligence & Machine Learning</span> at the Institute of Technology & Management, Gorakhpur. This foundation informs how I approach systems, data, and problem solving.
          </motion.p>
          {/* MERN expertise + backend focus */}
          <motion.p variants={fadeInRight} className="text-white/80 leading-relaxed">
            My core stack is <span className="font-semibold text-white">MERN</span>—React.js, Node.js, Express.js, and MongoDB—styled with Tailwind CSS. I focus on <span className="font-medium">scalable backend systems, REST APIs, and JWT-based authentication</span>, and I build production-ready interfaces with clean, reusable components.
          </motion.p>
          {/* Real-time + growth mindset */}
          <motion.p variants={fadeInRight} className="text-white/80 leading-relaxed">
            I enjoy <span className="font-medium">real-time features</span> with Socket.IO and thrive in <span className="font-medium">hackathons</span> and competitive problem solving—aiming to ship reliable software and keep improving through hands-on projects.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
