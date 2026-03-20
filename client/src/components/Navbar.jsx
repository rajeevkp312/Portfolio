import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { FiMenu, FiX, FiLogIn } from 'react-icons/fi'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 8)
  })

  const navLinks = [
    { href: '#about', label: 'About', delay: 0.05 },
    { href: '#education', label: 'Education', delay: 0.1 },
    { href: '#internship', label: 'Internship', delay: 0.15 },
    { href: '#projects', label: 'Projects', delay: 0.2 },
    { href: '#skills', label: 'Skills', delay: 0.25 },
    { href: '#achievements', label: 'Achievements', delay: 0.3 },
    { href: '#contact', label: 'Contact', delay: 0.35 },
  ]

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
              className="h-8 w-8 rounded-lg object-cover"
              loading="eager"
            />
            <span className="font-medium tracking-tight text-[13px] sm:text-[15px] block">Rajeev Kumar Pandit</span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: link.delay }}
                className="nav-link text-sm lg:text-base"
                href={link.href}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium transition-colors"
              >
                <FiLogIn size={16} />
                Login
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/admin/login"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium transition-colors"
            >
              <FiLogIn size={14} />
              <span className="hidden sm:inline">Login</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  )
}
