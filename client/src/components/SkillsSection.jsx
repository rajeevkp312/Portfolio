import { useRef } from 'react'
import { motion } from 'framer-motion'
import { container, fadeInUp, inViewStagger } from '../animations/presets'
import { skillCategories } from './skillsData'
import SkillCard from './SkillCard'
import VariableProximity from './VariableProximity'

// Technical Skills section: dark icon grid with staggered animations
export default function SkillsSection() {
  const headingRef = useRef(null)
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
        {skillCategories.map((cat) => (
          <div key={cat.title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">{cat.title}</h3>
            <motion.div
              variants={inViewStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
              {cat.items.map((s) => (
                <motion.div key={s.name} variants={fadeInUp}>
                  <SkillCard name={s.name} Icon={s.Icon} color={s.color} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
