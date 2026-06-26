import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HERO } from '@/lib/content'
import { GlitchText } from '@/components/ui/GlitchText'
import { SignalButton } from '@/components/ui/SignalButton'

const WORD_INTERVAL = 2000
const ROLE_INTERVAL = 3200

/**
 * Hero / signal section. Staggered framer-motion entrance, a glitchable
 * wordmark, and two rotating word cyclers (buildWords + roles).
 */
export function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % HERO.buildWords.length)
    }, WORD_INTERVAL)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % HERO.roles.length)
    }, ROLE_INTERVAL)
    return () => window.clearInterval(id)
  }, [])

  const stagger = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-28 text-center"
    >
      {/* eyebrow */}
      <motion.p
        {...stagger(0.1)}
        className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-muted"
      >
        <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-forge" />
        {HERO.eyebrow}
      </motion.p>

      {/* name */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
        className="mt-5"
      >
        <GlitchText
          text="NEORAGNAR"
          trigger="hover"
          className="glow-text font-display text-6xl leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[9rem]"
        />
      </motion.div>

      {/* rotating "I build {word}." */}
      <motion.div
        {...stagger(0.3)}
        className="mt-6 flex items-baseline justify-center text-xl sm:text-2xl md:text-3xl"
      >
        <span>I build&nbsp;</span>
        <span className="relative inline-flex min-w-[5ch] justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={HERO.buildWords[wordIndex]}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="text-gradient font-display italic"
            >
              {HERO.buildWords[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
        <span>.</span>
      </motion.div>

      {/* rotating role line */}
      <motion.p
        {...stagger(0.4)}
        className="mt-2 flex items-center justify-center gap-1 font-mono text-xs text-muted sm:text-sm"
      >
        <span>operating as a&nbsp;</span>
        <span className="relative inline-flex min-w-[9ch] justify-start">
          <AnimatePresence mode="wait">
            <motion.span
              key={HERO.roles[roleIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-forge"
            >
              {HERO.roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
        <span>— identity withheld.</span>
      </motion.p>

      {/* description */}
      <motion.p
        {...stagger(0.5)}
        className="mx-auto mt-6 max-w-xl text-sm text-muted md:text-base"
      >
        {HERO.description}
      </motion.p>

      {/* CTAs */}
      <motion.div {...stagger(0.6)} className="mt-7 inline-flex gap-3">
        <SignalButton href={HERO.primaryCta.href} variant="solid" arrow>
          {HERO.primaryCta.label}
        </SignalButton>
        <SignalButton href={HERO.secondaryCta.href} variant="outline">
          {HERO.secondaryCta.label}
        </SignalButton>
      </motion.div>

      {/* status chip */}
      <motion.div
        {...stagger(0.7)}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-stroke bg-surface/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
      >
        <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-forge" />
        build signal: ONLINE
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted">SCROLL</span>
        <span className="relative block h-10 w-px overflow-hidden bg-stroke">
          <span className="accent-gradient animate-scroll-down absolute inset-x-0 top-0 block h-1/2 w-full" />
        </span>
      </motion.div>
    </section>
  )
}
