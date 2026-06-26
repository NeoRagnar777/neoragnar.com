import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { STATS } from '@/lib/content'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/components/ui/cn'

/** Matches purely-numeric values, optionally with a trailing %. */
const NUMERIC = /^(\d+)(%?)$/

/** Counts a numeric value up from 0 once `active` flips true. */
function useCountUp(value: string, active: boolean): string {
  const match = value.match(NUMERIC)
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value)

  useEffect(() => {
    if (!match || !active) return
    const target = Number(match[1])
    const suffix = match[2]
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    })
    return () => controls.stop()
  }, [match, active])

  // non-numeric values render statically
  return match ? display : value
}

function StatItem({
  value,
  label,
  sub,
  gradient,
  active,
}: {
  value: string
  label: string
  sub?: string
  gradient: string
  active: boolean
}) {
  const display = useCountUp(value, active)
  return (
    <div className="flex flex-col items-center px-4 py-8 text-center md:px-6 md:py-10">
      <span className={cn('font-display text-5xl tracking-tight md:text-6xl', gradient)}>
        {display}
      </span>
      <span className="mt-3 text-sm text-text">{label}</span>
      {sub && <span className="mt-1 font-mono text-[11px] text-muted">{sub}</span>}
    </div>
  )
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stats" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <div
            ref={ref}
            className="grid grid-cols-2 border-y border-stroke md:grid-cols-4"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  'border-stroke',
                  // vertical dividers between columns
                  i % 2 !== 0 && 'border-l',
                  i >= 2 && 'border-t md:border-t-0',
                  i % 4 !== 0 && 'md:border-l',
                )}
              >
                <StatItem
                  value={stat.value}
                  label={stat.label}
                  sub={stat.sub}
                  gradient={i % 2 === 0 ? 'text-gradient' : 'text-gradient-forge'}
                  active={inView}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
