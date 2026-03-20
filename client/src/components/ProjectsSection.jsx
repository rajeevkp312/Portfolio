import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { container, fadeInUp, inViewStagger } from '../animations/presets'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import VariableProximity from './VariableProximity'
import { api } from '../utils/api'

// Projects section: dynamic data from API
export default function ProjectsSection() {
  const headingRef = useRef(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await api.get('/api/projects')
        const data = await res.json()
        const sorted = Array.isArray(data)
          ? data.slice().sort((a, b) => {
            const ao = typeof a.order === 'number' ? a.order : 999
            const bo = typeof b.order === 'number' ? b.order : 999
            if (ao !== bo) return ao - bo
            return (a.title || '').localeCompare(b.title || '')
          })
          : []
        // Map backend schema to ProjectCard/Modal expectation if needed
        const mapped = sorted.map(p => ({
          ...p,
          id: p._id,
          stack: p.tags || [],
          repoUrl: p.githubUrl,
          subtitle: p.description.split('.')[0] + '.',
          features: p.features || [],
          problem: p.problem || '',
          architecture: p.architecture || [],
          deployment: p.deployment || null
        }))
        setProjects(mapped)
      } catch (e) {
        console.error('Failed to load projects', e)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  const [openProject, setOpenProject] = useState(null)

  if (loading && projects.length === 0) return null

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
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
              label="Projects"
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
          Production-ready applications built with MERN and real-time technologies
        </motion.p>
        <motion.div variants={fadeInUp} className="mx-auto mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-accent-700 to-accent-500" />
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={inViewStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={setOpenProject} />
        ))}
      </motion.div>

      {/* Modal */}
      <ProjectModal open={!!openProject} project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  )
}
