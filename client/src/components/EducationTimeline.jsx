import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { inViewStagger, fadeInUp } from '../animations/presets'
import VariableProximity from './VariableProximity'
import { api } from '../utils/api'

// Education timeline: dynamic data from API
export default function EducationTimeline() {
  const headingRef = useRef(null)
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEducation() {
      try {
        const res = await api.get('/api/education')
        const data = await res.json()
        setEducation(data)
      } catch (e) {
        console.error('Failed to load education', e)
      } finally {
        setLoading(false)
      }
    }
    loadEducation()
  }, [])

  if (loading && education.length === 0) return null

  return (
    <section id="education" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10 text-center">
        <div ref={headingRef} className="flex justify-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <VariableProximity
              label="Education"
              className="inline-block"
              fromFontVariationSettings="'wght' 600, 'opsz' 14"
              toFontVariationSettings="'wght' 900, 'opsz' 32"
              containerRef={headingRef}
              radius={90}
              falloff="exponential"
            />
          </h2>
        </div>
        <p className="mt-2 text-white/70">Academic background and milestones</p>
        <div className="mx-auto mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-accent-700 to-accent-500" />
      </div>

      {/* Vertical timeline list with staggered animation on scroll */}
      <motion.ul
        variants={inViewStagger}
        initial="show"
        className="relative space-y-6"
      >
        {/* Vertical line backbone */}
        <span className="absolute left-[10px] top-0 bottom-0 w-px bg-white/10 md:left-3" aria-hidden />

        {education.map((item, idx) => (
          <motion.li
            key={item._id || idx}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            className="relative pl-8 md:pl-10"
          >
            {/* Node */}
            <span
              className="absolute left-2 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full bg-gradient-to-br from-accent-600 to-accent-500 shadow-soft md:left-3"
              aria-hidden
            />

            <div className="glass-card p-4 md:p-5">
              <div className="flex flex-wrap items-center gap-3 text-white/70 text-xs md:text-sm">
                <span className="font-semibold text-white/80">{item.yearRange}</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>{item.institution}</span>
              </div>
              <h4 className="mt-2 text-base md:text-lg font-semibold tracking-tight">{item.degree}</h4>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
