import { useRef } from 'react'
import { motion } from 'framer-motion'
import { container, fadeInUp } from '../animations/presets'
import VariableProximity from './VariableProximity'

// Internship: featured card with emphasized entrance and hover glow
export default function InternshipCard() {
  const headingRef = useRef(null)
  const internships = [
    {
      company: 'Softpro India Computer Technologies Pvt. Ltd.',
      role: 'MERN Stack Intern',
      duration: '60 Days',
      highlights: ['REST APIs', 'Authentication', 'Database design', 'Backend logic'],
      grade: 'A+ Grade'
    }
  ]

  return (
    <section id="internship" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10 text-center">
        <div ref={headingRef} className="flex justify-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <VariableProximity
              label="Internship"
              className="inline-block"
              fromFontVariationSettings="'wght' 600, 'opsz' 14"
              toFontVariationSettings="'wght' 900, 'opsz' 32"
              containerRef={headingRef}
              radius={90}
              falloff="exponential"
            />
          </h2>
        </div>
        <p className="mt-2 text-white/70">Professional training and impact</p>
        <div className="mx-auto mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-accent-700 to-accent-500" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1"
      >
        {internships.map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            className="p-[1px] rounded-2xl bg-gradient-to-br from-accent-700/60 to-accent-500/30"
          >
            {/* Inner card with glass effect */}
            <motion.div
              whileHover={{ boxShadow: '0 20px 50px -20px rgba(34,211,238,0.45)' }}
              className="glass-card rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-white/80">{item.company}</p>
                  <p className="text-white/60 text-sm">{item.duration}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-700 to-accent-500 px-3 py-1 text-xs font-semibold text-base-900 shadow-soft">
                  {item.grade}
                </span>
              </div>

              {/* Highlights */}
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/80">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-600" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
