import { motion } from 'framer-motion'
import TimelineItem from './TimelineItem'
import { inViewStagger } from '../animations/presets'

// Timeline renders a list of items with staggered in-view reveal
export default function Timeline({ items = [] }) {
  return (
    <motion.ul
      variants={inViewStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="relative space-y-6"
    >
      {items.map((item, idx) => (
        <TimelineItem key={idx} item={item} index={idx} />
      ))}
    </motion.ul>
  )
}
