import { useRef } from 'react'
import { motion } from 'framer-motion'
import { container, fadeInUp, inViewStagger } from '../animations/presets'
import VariableProximity from './VariableProximity'
import { FaTrophy, FaCode, FaChessKing, FaBriefcase } from 'react-icons/fa'

export default function AchievementsSection() {
  const headingRef = useRef(null)

  const achievements = [
    {
      icon: FaTrophy,
      title: 'Gorakhpur Mahotsav Hackathon',
      description: 'Core team member of “Invictus Coders”. Built “TraVis” – AI traffic safety & congestion monitoring using OpenCV, YOLO, and DeepSORT.',
      links: [
        { label: 'LinkedIn Post', url: 'https://www.linkedin.com/posts/rajeev-kumar-pandit-a72977280_teamwork-invictuscoders-gorakhpurmahotsav-activity-7416854056377208832-sje1' },
      ],
    },
    {
      icon: FaBriefcase,
      title: 'MERN Stack Internship',
      description: 'Awarded A+ Grade during Summer Internship at Softpro India Computer Technologies Pvt. Ltd. for backend and API development.',
    },
    {
      icon: FaChessKing,
      title: 'Chess.com Blitz Rating 1500',
      description: 'Strategic thinking and consistency demonstrated through competitive online chess.',
      links: [
        { label: 'Chess Profile', url: 'https://www.chess.com/member/RKP0030' },
      ],
    },
    {
      icon: FaCode,
      title: 'AI + Computer Vision Projects',
      description: 'Real-world problem solving with AI/CV exposure, building end-to-end intelligent systems.',
    },
  ]

  return (
    <section id="achievements" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
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
              label="Achievements & Activities"
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
          Hackathons, internships, and competitive highlights
        </motion.p>
        <motion.div variants={fadeInUp} className="mx-auto mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-accent-700 to-accent-500" />
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={inViewStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {achievements.map((item, idx) => {
          const Icon = item.icon
          return (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              className="glass-card p-6 flex flex-col items-start gap-4 transition hover:shadow-[0_25px_60px_-30px_rgba(34,211,238,0.35)]"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-accent-600 to-accent-500 shadow-soft">
                <Icon className="w-6 h-6 text-base-900" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1 text-white/70 text-sm leading-relaxed">{item.description}</p>
                {item.links && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.links.map((link, i) => (
                      <motion.a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/85 transition hover:border-accent-600/40"
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
