import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const overlayVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
}

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { opacity: 0, scale: 0.98, y: 8, transition: { duration: 0.2 } }
}

// Accessible modal with scroll lock and Esc to close
export default function ProjectModal({ open, project, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            onClick={onClose}
            className="absolute inset-0 bg-black/60"
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project?.title}
            variants={dialogVariants}
            className="absolute inset-0 m-auto max-h-[85vh] w-[92vw] max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-base-800 p-6 shadow-soft"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">{project.title}</h3>
                {project.subtitle && <p className="mt-1 text-white/80 text-sm">{project.subtitle}</p>}
              </div>
              <button onClick={onClose} className="nav-link">Close</button>
            </div>

            {/* Content */}
            <div className="mt-6 space-y-6">
              {/* Stack */}
              <div>
                <h4 className="text-sm font-semibold text-white/80">Tech Stack</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/85">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Problem statement (derived from features/domain, no exaggeration) */}
              {project.problem && (
                <div>
                  <h4 className="text-sm font-semibold text-white/80">Problem</h4>
                  <p className="mt-1 text-white/80 text-sm leading-relaxed">{project.problem}</p>
                </div>
              )}

              {/* Key features */}
              <div>
                <h4 className="text-sm font-semibold text-white/80">Key Features</h4>
                <ul className="mt-2 space-y-1 text-white/80 text-sm">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture highlights (strictly from stack/features/deploy info) */}
              {project.architecture?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-white/80">Architecture Highlights</h4>
                  <ul className="mt-2 flex flex-wrap gap-2 text-white/80 text-sm">
                    {project.architecture.map((a, i) => (
                      <li key={i} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1">{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Deployment / Live */}
              {(project.liveUrl || project.deployment) && (
                <div>
                  <h4 className="text-sm font-semibold text-white/80">Deployment</h4>
                  <div className="mt-2 space-y-1 text-white/80 text-sm">
                    {project.deployment?.frontend && <p>Frontend: {project.deployment.frontend}</p>}
                    {project.deployment?.backend && <p>Backend: {project.deployment.backend}</p>}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex px-4 py-2 text-sm"
                      >
                        Open Live Demo
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
