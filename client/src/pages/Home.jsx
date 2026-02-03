import { useRef } from 'react'
import { motion } from 'framer-motion'
import { container, fadeInUp } from '../animations/presets'
import ElectricBorder from '../components/ElectricBorder'
import VariableProximity from '../components/VariableProximity'

export default function Home() {
  const name = 'Rajeev Kumar Pandit'
  const subtitle = 'MERN Stack Developer | AI & ML Undergraduate | Problem Solver'
  const intro = 'Building scalable full-stack applications with modern web technologies.'
  const containerRef = useRef(null)

  return (
    <main id="home" className="relative overflow-hidden">
      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col items-center justify-center px-4 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-8"
        >
          {/* Profile image with ElectricBorder */}
          <motion.div variants={fadeInUp} className="relative">
            <ElectricBorder color="#7df9ff" speed={1} chaos={0.12} borderRadius={9999} style={{ borderRadius: 9999 }}>
              <img
                src="/images/profile.jpg"
                alt={name}
                className="h-28 w-28 sm:h-32 sm:w-32 rounded-full shadow-xl object-cover"
              />
            </ElectricBorder>
          </motion.div>

          {/* Glass hero card */}
          <motion.div variants={fadeInUp} className="glass-card max-w-3xl px-8 py-10">
            {/* Name with VariableProximity effect (no mid-word breaks) */}
            <div ref={containerRef} className="w-full">
              <motion.h1
                aria-label={name}
                className="mb-3 font-extrabold tracking-tight leading-tight text-[clamp(1.75rem,8vw,3.75rem)] sm:text-[clamp(2rem,6vw,4.25rem)]"
                variants={container}
              >
                <VariableProximity
                  label={name}
                  className="inline-block text-white"
                  fromFontVariationSettings="'wght' 500, 'opsz' 12"
                  toFontVariationSettings="'wght' 900, 'opsz' 36"
                  containerRef={containerRef}
                  radius={100}
                  falloff="exponential"
                />
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="mx-auto max-w-xl text-white/70 text-base sm:text-lg"
            >
              {subtitle}
            </motion.p>

            {/* Short intro line */}
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-2 max-w-xl text-white/70 text-sm sm:text-base"
            >
              {intro}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="btn-primary"
              >
                View Projects
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="/resume/RajeevPandit.pdf"
                download
                className="btn-secondary"
              >
                Download Resume
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="btn-secondary"
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
