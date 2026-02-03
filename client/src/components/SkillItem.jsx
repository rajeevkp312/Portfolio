import { motion } from 'framer-motion'
import { fadeInUp } from '../animations/presets'

// Single skill pill with hover micro-interaction and subtle dot indicators
export default function SkillItem({ label, variant }) {
  const LangIcon = ({ name }) => {
    const common = 'h-6 w-6'
    switch (name) {
      case 'C':
        return (
          <svg viewBox="0 0 128 128" className={common} aria-label="C">
            <path fill="#283593" d="M64 10L10 37v54l54 27 54-27V37z"/>
            <path fill="#FFF" d="M84.7 48.6A28 28 0 1064 92a27.7 27.7 0 0020.7-9.4l-10-7.8A14 14 0 1164 50a14 14 0 0110.7 5.2z"/>
          </svg>
        )
      case 'Java':
        return (
          <svg viewBox="0 0 128 128" className={common} aria-label="Java">
            <path fill="#f44336" d="M64 14c18 18-18 22 0 40-34-10 18-22 0-40z"/>
            <path fill="#1976d2" d="M32 90c20 8 44 8 64 0-6 8-58 8-64 0z"/>
            <path fill="#1976d2" d="M40 78c16 6 32 6 48 0-8 6-40 6-48 0z"/>
          </svg>
        )
      case 'Python':
        return (
          <svg viewBox="0 0 128 128" className={common} aria-label="Python">
            <path fill="#3776AB" d="M63 16c-20 0-19 12-19 12v12h19v4H34S16 45 16 63s14 27 14 27h12V78s0-14 19-14h9c19 0 19-14 19-14V28S83 16 63 16z"/>
            <circle cx="50" cy="28" r="4" fill="#fff"/>
            <path fill="#FFD43B" d="M65 112c20 0 19-12 19-12V88H65v-4h29s18 0 18-18-14-27-14-27H86v12s0 14-19 14h-9c-19 0-19 14-19 14v19s0 12 20 12z"/>
            <circle cx="78" cy="100" r="4" fill="#fff"/>
          </svg>
        )
      case 'JavaScript':
        return (
          <svg viewBox="0 0 128 128" className={common} aria-label="JavaScript">
            <path fill="#f7df1e" d="M16 16h96v96H16z"/>
            <path d="M76 98l8-5c1 3 3 5 7 5 4 0 6-2 6-6V64h10v28c0 10-6 16-16 16-9 0-14-5-15-10zm-32 1l8-5c1 4 3 7 8 7 4 0 7-2 7-9V64h10v29c0 11-6 17-18 17-10 0-15-6-15-11z"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <motion.li
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      className={
        variant === 'logo'
          ? 'group flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-3 transition shadow-soft hover:border-accent-600/40'
          : 'group flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 transition shadow-soft hover:border-accent-600/40'
      }
    >
      {variant === 'logo' ? (
        <div className="flex items-center justify-center">
          <LangIcon name={label} />
        </div>
      ) : (
        <span className="font-medium">{label}</span>
      )}

      {/* Optional progress visualization: neutral dot indicators animate in once */}
      {variant === 'logo' ? null : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
          className="ml-3 hidden sm:flex items-center gap-1"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-white/15 transition-colors group-hover:bg-accent-600/70"
            />
          ))}
        </motion.div>
      )}
    </motion.li>
  )
}
