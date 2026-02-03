import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { container, fadeInUp, inViewStagger } from '../animations/presets'
import useContactForm from '../hooks/useContactForm'
import VariableProximity from './VariableProximity'

function Field({ label, name, type = 'text', textarea = false, value, onChange }) {
  const [focused, setFocused] = useState(false)

  return (
    <motion.div
      variants={fadeInUp}
      animate={{ scale: focused ? 1.005 : 1 }}
      className={`text-left`}
    >
      <label htmlFor={name} className="block text-sm font-medium text-white/80 mb-1">
        {label}
      </label>
      <div className={`rounded-xl border ${focused ? 'border-accent-500/50 ring-2 ring-accent-600/30' : 'border-white/10'} bg-white/5 transition-all shadow-soft`}
      >
        {textarea ? (
          <textarea
            id={name}
            name={name}
            rows={5}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full rounded-xl bg-transparent px-4 py-3 text-white placeholder-white/50 focus:outline-none"
            placeholder={label}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full rounded-xl bg-transparent px-4 py-3 text-white placeholder-white/50 focus:outline-none"
            placeholder={label}
          />
        )}
      </div>
    </motion.div>
  )
}

export default function ContactSection() {
  const headingRef = useRef(null)
  const { values, loading, success, error, onChange, submit } = useContactForm()
  const email = 'rajeevkumarpandit2002@gmail.com'
  const github = import.meta.env.VITE_GITHUB_URL || 'https://github.com/rajeevkp312'
  const linkedin = import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/rajeev-kumar-pandit-a72977280/'

  const onSubmit = async (e) => {
    e.preventDefault()
    await submit()
  }

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
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
              label="Contact Me"
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
          Let’s connect and build something impactful
        </motion.p>
        <motion.div variants={fadeInUp} className="mx-auto mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-accent-700 to-accent-500" />
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
            <Field label="Name" name="name" value={values.name} onChange={onChange} />
            <Field label="Email" name="email" type="email" value={values.email} onChange={onChange} />
            <Field label="Subject" name="subject" value={values.subject} onChange={onChange} />
            <Field label="Message" name="message" textarea value={values.message} onChange={onChange} />

            {/* Feedback */}
            <div className="min-h-[24px]">
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-400">
                  {error}
                </motion.p>
              )}
              {success && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-green-400">
                  {success}
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              disabled={loading}
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              {loading && (
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  className="inline-block h-4 w-4 rounded-full border-2 border-base-900 border-t-transparent"
                />
              )}
              {loading ? 'Sending...' : 'Submit'}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact details */}
        <motion.div
          variants={inViewStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-4"
        >
          <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white/80">Email</h3>
            <a className="mt-1 block text-white/90 hover:text-white" href={`mailto:${email}`}>{email}</a>
          </motion.div>
          <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white/80">GitHub</h3>
            <a className="mt-1 block text-white/90 hover:text-white" target="_blank" rel="noopener noreferrer" href={github}>{github === '#' ? 'Add your GitHub URL' : github}</a>
          </motion.div>
          <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-white/80">LinkedIn</h3>
            <a className="mt-1 block text-white/90 hover:text-white" target="_blank" rel="noopener noreferrer" href={linkedin}>{linkedin === '#' ? 'Add your LinkedIn URL' : linkedin}</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
