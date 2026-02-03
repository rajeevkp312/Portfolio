import { motion } from 'framer-motion'

export default function SkillCard({ name, Icon, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft transition hover:shadow-[0_25px_60px_-30px_rgba(34,211,238,0.35)]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-14 w-14 items-center justify-center rounded-xl bg-base-800"
      >
        <Icon className={`h-7 w-7 ${color ?? 'text-white/90'}`} />
      </motion.div>
      <span className="mt-2 text-xs font-semibold tracking-wider text-white/80">
        {name.toUpperCase()}
      </span>
    </motion.div>
  )
}
