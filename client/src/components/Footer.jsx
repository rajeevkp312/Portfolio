import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa'

export default function Footer() {
  const { scrollY } = useScroll()
  const [showBackToTop, setShowBackToTop] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setShowBackToTop(latest > 300)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/rajeevkp312' },
    { Icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rajeev-kumar-pandit-a72977280/' },
    { Icon: FaEnvelope, label: 'Email', href: 'mailto:rajeevkumarpandit2002@gmail.com' },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-base-900 via-base-800 to-base-900 border-t border-white/10">
      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gradient-to-br from-accent-600 to-accent-500 shadow-soft hover:shadow-[0_20px_50px_-20px_rgba(34,211,238,0.45)] transition"
        >
          <FaArrowUp className="w-4 h-4 text-base-900" />
        </motion.button>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6 text-center">
          {/* Name and Tagline */}
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">Rajeev Kumar Pandit</h3>
            <p className="mt-2 text-white/70 text-sm sm:text-base max-w-2xl">
              Building scalable web apps with MERN & AI‑driven solutions
            </p>
          </div>

          {/* Social Links */}
          <nav className="flex items-center gap-6">
            {socialLinks.map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 transition hover:border-accent-600/40 hover:bg-accent-600/10"
              >
                <Icon className="w-5 h-5 text-white/90" />
              </motion.a>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Copyright */}
          <p className="text-white/50 text-xs sm:text-sm">
            © 2026 Rajeev Kumar Pandit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
