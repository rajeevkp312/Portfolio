import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { container, fadeInUp, inViewStagger } from '../animations/presets'
import SkillCard from './SkillCard'
import VariableProximity from './VariableProximity'
import { api } from '../utils/api'

import { skillCategories as staticCategories } from './skillsData'

// Technical Skills section: dynamic data with original styling
export default function SkillsSection() {
  const headingRef = useRef(null)
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSkills() {
      try {
        const res = await api.get('/api/skills')
        const data = await res.json()
        
        // Find metadata (Icon, Color) from static skillsData
        const allStaticItems = staticCategories.flatMap(cat => cat.items)
        const enriched = data.map(s => {
          const meta = allStaticItems.find(item => item.name.toLowerCase() === s.name.toLowerCase())
          return {
            ...s,
            Icon: meta?.Icon || null,
            color: meta?.color || 'text-white'
          }
        })
        setSkills(enriched)
      } catch (e) {
        console.error('Failed to load skills', e)
      } finally {
        setLoading(false)
      }
    }
    loadSkills()
  }, [])

  // Group enriched skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  const categoryOrder = [
    'Web & Frontend',
    'Backend & Database',
    'Programming Languages',
    'Data / Computer Vision',
    'Tools & Systems',
  ]

  const itemOrderByCategory = {
    'Web & Frontend': ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Bootstrap'],
    'Backend & Database': ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Authentication', 'Socket.IO'],
    'Programming Languages': ['C', 'Java', 'Python'],
    'Data / Computer Vision': ['OpenCV', 'NumPy', 'Matplotlib'],
    'Tools & Systems': ['Git', 'GitHub', 'VS Code', 'IntelliJ', 'MySQL', 'Operating Systems'],
  }

  if (loading && skills.length === 0) return null

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="mb-10 text-center"
      >
        <div ref={headingRef} className="flex justify-center">
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <VariableProximity
              label="Technical Skills"
              className="inline-block"
              fromFontVariationSettings="'wght' 600, 'opsz' 14"
              toFontVariationSettings="'wght' 900, 'opsz' 32"
              containerRef={headingRef}
              radius={90}
              falloff="exponential"
            />
          </motion.h2>
        </div>
        <motion.p variants={fadeInUp} className="mt-2 text-white/70">
          Strong MERN foundation with real-world backend and system knowledge
        </motion.p>
        <motion.div variants={fadeInUp} className="mx-auto mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-accent-700 to-accent-500" />
      </motion.div>

      {/* Categories */}
      <div className="space-y-10">
        {categoryOrder
          .filter((cat) => (groupedSkills[cat] || []).length > 0)
          .map((category) => {
            const order = itemOrderByCategory[category] || []
            const items = (groupedSkills[category] || []).slice().sort((a, b) => {
              const ai = order.findIndex((n) => n.toLowerCase() === a.name.toLowerCase())
              const bi = order.findIndex((n) => n.toLowerCase() === b.name.toLowerCase())
              const ax = ai === -1 ? 999 : ai
              const bx = bi === -1 ? 999 : bi
              if (ax !== bx) return ax - bx
              return a.name.localeCompare(b.name)
            })

            return (
              <div key={category}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">{category}</h3>
                <motion.div
                  variants={inViewStagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                >
                  {items.map((s) => (
                    <motion.div key={s._id || s.name} variants={fadeInUp}>
                      <SkillCard name={s.name} Icon={s.Icon} color={s.color} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )
          })}
      </div>
    </section>
  )
}
