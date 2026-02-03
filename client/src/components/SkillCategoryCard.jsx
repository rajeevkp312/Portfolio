import { motion } from 'framer-motion'
import { fadeInUp, inViewStagger } from '../animations/presets'
import SkillItem from './SkillItem'

// Category card: glass container with header and list of skills
export default function SkillCategoryCard({ title, skills = [], iconMode = false }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="glass-card rounded-2xl p-6 transition hover:shadow-[0_25px_60px_-30px_rgba(34,211,238,0.35)]"
    >
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <motion.ul
        variants={inViewStagger}
        className={`mt-4 grid ${iconMode ? 'grid-cols-4 sm:grid-cols-6 place-items-center' : 'grid-cols-1 sm:grid-cols-2'} gap-2`}
      >
        {skills.map((s) => (
          <SkillItem key={s} label={s} variant={iconMode ? 'logo' : undefined} />
        ))}
      </motion.ul>
    </motion.div>
  )
}
