import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 8)
  })

  return (
    <header
      className={
        `sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'bg-gray-900/80 backdrop-blur-md border-white/10'
            : 'bg-transparent border-transparent'
        }`
      }
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.a
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            href="#home"
            className="flex items-center gap-2"
          >
            <img
              src="/logo.jpg"
              alt="Rajeev Kumar Pandit logo"
              className="h-7 w-7 rounded-lg object-cover"
              loading="eager"
            />
            <span className="font-semibold tracking-tight">Rajeev Kumar Pandit</span>
          </motion.a>
          <nav className="hidden md:flex items-center gap-8">
            <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="nav-link" href="#about">About</motion.a>
            <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="nav-link" href="#education">Education</motion.a>
            <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="nav-link" href="#internship">Internship</motion.a>
            <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="nav-link" href="#projects">Projects</motion.a>
            <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="nav-link" href="#skills">Skills</motion.a>
            <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="nav-link" href="#achievements">Achievements</motion.a>
            <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="nav-link" href="#contact">Contact</motion.a>
          </nav>
        </div>
      </div>
    </header>
  )
}
