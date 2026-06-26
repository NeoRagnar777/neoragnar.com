import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GlitchText } from '@/components/ui/GlitchText'

type Props = {
  onComplete: () => void
}

type BootLine = {
  text: string
  /** marks the [WITHHELD] token to be coloured */
  withheld?: boolean
}

const BOOT_LINES: BootLine[] = [
  { text: '> initializing neoragnar.kernel ...ok' },
  { text: '> mounting /forge ...ok' },
  { text: '> loading disciplines [6] ...ok' },
  { text: '> establishing build signal 777 ...ok' },
  { text: '> decrypting operator identity ... [WITHHELD]', withheld: true },
  { text: '> ready.' },
]

const LINE_DELAY = 320
const COUNT_DURATION = 2600
const FLASH_DURATION = 420

/**
 * Full-screen boot overlay. Types a terminal log, counts 000→100 over a rAF,
 * fills a progress bar, flashes the wordmark, then calls onComplete() exactly
 * once (guarded against StrictMode double-mount).
 */
export function BootLoader({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [count, setCount] = useState(0)
  const [flash, setFlash] = useState(false)
  const [exiting, setExiting] = useState(false)
  const doneRef = useRef(false)

  // sequential reveal of boot log lines
  useEffect(() => {
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setVisibleLines((v) => Math.min(v + 1, BOOT_LINES.length))
      if (i >= BOOT_LINES.length) window.clearInterval(id)
    }, LINE_DELAY)
    return () => window.clearInterval(id)
  }, [])

  // rAF-driven 000→100 counter
  useEffect(() => {
    let raf = 0
    let start = 0
    const tick = (time: number) => {
      if (!start) start = time
      const progress = Math.min((time - start) / COUNT_DURATION, 1)
      setCount(Math.round(progress * 100))
      if (progress < 1) {
        raf = window.requestAnimationFrame(tick)
      }
    }
    raf = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(raf)
  }, [])

  // on reaching 100: flash the wordmark, then complete once
  useEffect(() => {
    if (count < 100 || doneRef.current) return
    doneRef.current = true
    setFlash(true)
    let exitTimer = 0
    const flashTimer = window.setTimeout(() => {
      setExiting(true)
      exitTimer = window.setTimeout(onComplete, 360)
    }, FLASH_DURATION)
    return () => {
      window.clearTimeout(flashTimer)
      window.clearTimeout(exitTimer)
    }
  }, [count, onComplete])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="scanlines fixed inset-0 z-[9999] overflow-hidden bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <div className="cyber-grid absolute inset-0 opacity-30" />

          {/* top-left label */}
          <div className="absolute left-6 top-6 font-mono text-xs uppercase tracking-[0.3em] text-muted">
            NEORAGNAR // BOOT
          </div>

          {/* center-left boot log */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 font-mono text-sm md:left-12">
            <div className="space-y-1.5">
              {BOOT_LINES.slice(0, visibleLines).map((line, idx) => {
                const isLast = idx === BOOT_LINES.length - 1
                return (
                  <motion.p
                    key={line.text}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className={isLast ? 'text-forge' : 'text-muted'}
                  >
                    {line.withheld ? (
                      <>
                        {line.text.replace(' [WITHHELD]', ' ')}
                        <span className="text-ember">[WITHHELD]</span>
                      </>
                    ) : (
                      line.text
                    )}
                  </motion.p>
                )
              })}
            </div>
          </div>

          {/* big counter bottom-right */}
          <div className="absolute bottom-10 right-6 font-display text-7xl tabular-nums text-text md:bottom-12 md:right-12 md:text-9xl">
            {String(count).padStart(3, '0')}
          </div>

          {/* center wordmark flash */}
          <AnimatePresence>
            {flash && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <GlitchText
                  text="NEORAGNAR"
                  trigger="always"
                  className="font-display text-5xl tracking-tight md:text-7xl"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* bottom progress bar */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] w-full bg-stroke/50">
            <div
              className="accent-gradient h-full w-full origin-left"
              style={{
                transform: `scaleX(${count / 100})`,
                boxShadow: '0 0 12px rgba(76, 201, 240, 0.7)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
