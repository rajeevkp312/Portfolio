import { motion } from 'framer-motion'
import { fadeInUp } from '../animations/presets'

// Single timeline card with glassmorphism and hover micro-interaction
export default function TimelineItem({ item, index }) {
  return (
    <motion.li
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      className="relative pl-8 md:pl-10"
    >
      {/* Vertical line */}
      <span className="absolute left-[10px] top-0 bottom-0 w-px bg-white/10 md:left-3" aria-hidden />

      {/* Node */}
      <span
        className="absolute left-2 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full bg-gradient-to-br from-accent-600 to-accent-500 shadow-soft md:left-3"
        aria-hidden
      />

      <div className="glass-card p-4 md:p-5">
        <div className="flex items-center gap-3 text-white/70 text-xs md:text-sm">
          <span className="font-semibold text-white/80">{item.year}</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>{item.phase}</span>
        </div>
        <h4 className="mt-2 text-base md:text-lg font-semibold tracking-tight">{item.title}</h4>
        <p className="mt-1 text-white/70 text-sm md:text-base leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.li>
  )
}
