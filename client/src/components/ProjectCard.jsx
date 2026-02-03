import { motion } from 'framer-motion'
import { fadeInUp } from '../animations/presets'

export default function ProjectCard({ project, onOpen }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      className="glass-card rounded-2xl p-6 flex flex-col justify-between transition hover:shadow-[0_25px_60px_-30px_rgba(34,211,238,0.35)]"
    >
      <div>
        <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
        <p className="mt-2 text-white/70 text-sm">{project.subtitle}</p>

        {/* Tech badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/85">
              {s}
            </span>
          ))}
        </div>

        {/* Short feature summary */}
        <ul className="mt-4 space-y-1 text-white/80 text-sm">
          {project.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-600" />
              <span>{f}</span>
            </li>
          ))}
          {project.features.length > 3 && (
            <li className="text-white/60 text-xs">+ more in details</li>
          )}
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-3">
        {project.liveUrl && (
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-4 py-2 text-sm"
          >
            Live Demo
          </motion.a>
        )}
        {project.repoUrl && (
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-4 py-2 text-sm"
          >
            GitHub
          </motion.a>
        )}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onOpen(project)}
          className="btn-secondary px-4 py-2 text-sm"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  )
}
