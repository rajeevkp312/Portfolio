import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { container, fadeInUp, inViewStagger } from '../animations/presets'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import VariableProximity from './VariableProximity'

// Projects section: resume-only data, animated grid, modal details
export default function ProjectsSection() {
  const headingRef = useRef(null)
  const projects = [
    {
      id: 'gst-calculator',
      title: 'GST Calculator (Django REST + Streamlit)',
      subtitle: 'Dynamic GST calculator with Django REST API and Streamlit UI',
      stack: ['Python', 'Django 5', 'Django REST Framework', 'Streamlit', 'SQLite', 'CORS'],
      features: [
        'Dynamic GST categories stored in database',
        'Inclusive and exclusive price calculations',
        'Examples per GST slab in UI',
        'Clean Streamlit interface with category dropdown and toggle',
        'REST endpoints for listing rates and calculation',
      ],
      problem:
        'Provide accurate GST computation for multiple categories with both inclusive and exclusive price flows, surfaced via a simple web UI and a clean REST API.',
      architecture: [
        'Django + DRF backend (rates listing, calculation endpoint)',
        'Streamlit frontend consuming API',
        'GstRate model + seed command for slabs',
        'SQLite for dev (pluggable to other DBs)',
      ],
      liveUrl: 'https://gst-calculator-rkp.streamlit.app/',
      repoUrl: 'https://github.com/rajeevkp312/GST-Calculator',
    },
    {
      id: 'healthnexus',
      title: 'HealthNexus – Full-Stack Healthcare Management System',
      subtitle: 'Healthcare portals with secure authentication and role-based access',
      stack: ['MERN', 'JWT', 'Email OTP', 'Vercel', 'Render'],
      features: [
        'Admin, Doctor, Patient portals',
        'JWT-based role authentication',
        'Email OTP verification',
        'Secure CRUD operations',
      ],
      deployment: { frontend: 'Vercel', backend: 'Render' },
      liveUrl: 'healthnexusapp.vercel.app',
      repoUrl: 'https://github.com/rajeevkp312/Health-Nexus',
      problem:
        'Provide role-specific healthcare portals with secure authentication and operations across admin, doctor, and patient workflows.',
      architecture: ['MERN', 'JWT roles', 'Email OTP', 'Secure CRUD', 'Vercel + Render'],
    },
    {
      id: 'realtime-chat',
      title: 'Real-Time Chat Application',
      subtitle: 'Cross-platform chat with real-time messaging and presence',
      stack: ['React Native (Expo)', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT'],
      features: [
        '1:1 real-time messaging',
        'JWT authentication',
        'Online/offline status',
        'Typing indicators',
        'Read receipts',
        'Persistent message storage',
      ],
      problem:
        'Enable reliable, authenticated 1:1 messaging with presence, typing, and delivery state in real-time.',
      architecture: ['React Native + Node/Express', 'MongoDB', 'Socket.IO realtime', 'JWT auth'],
      repoUrl: 'https://github.com/rajeevkp312/Chat_application',
    },
    {
      id: 'news-portal',
      title: 'News Portal (MERN Stack)',
      subtitle: 'Content platform with role-based access and admin management',
      stack: ['MERN', 'Role-based Access', 'Responsive UI'],
      features: [
        'Authentication',
        'Role-based access',
        'Admin-controlled content management',
        'Blogs, news ticker, user reviews',
        'Responsive UI',
      ],
      problem:
        'Publish and manage news/blog content with role-based access and an admin-controlled workflow.',
      architecture: ['MERN', 'Auth + RBAC', 'Admin CMS', 'Responsive UI'],
      repoUrl: 'https://github.com/rajeevkp312/NEWS-WEBSITE',
    },
  ]

  const [openProject, setOpenProject] = useState(null)

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
