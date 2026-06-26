import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from './cn'

type Props = {
  /** small uppercase kicker */
  eyebrow: string
  /** heading text; wrap the emphasised word in {} e.g. "Recent {thoughts}" */
  title: string
  subtitle?: string
  /** optional right-aligned slot (e.g. a button), hidden on mobile */
  action?: ReactNode
  className?: string
  align?: 'left' | 'center'
}

/** Parses "Featured {projects}" into a normal + italic-display emphasis. */
function renderTitle(title: string) {
  const parts = title.split(/(\{[^}]+\})/g).filter(Boolean)
  return parts.map((p, i) =>
    p.startsWith('{') ? (
      <span key={i} className="font-display italic text-gradient">
        {p.slice(1, -1)}
      </span>
    ) : (
      <span key={i}>{p}</span>
    ),
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  className,
  align = 'left',
}: Props) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        'flex w-full gap-6',
        centered ? 'flex-col items-center text-center' : 'flex-col md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <Reveal className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        <div className={cn('flex items-center gap-3', centered && 'justify-center')}>
          <span className="h-px w-8 bg-stroke" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{eyebrow}</span>
        </div>
        <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-text sm:text-5xl md:text-6xl">
          {renderTitle(title)}
        </h2>
        {subtitle && <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">{subtitle}</p>}
      </Reveal>
      {action && <div className="hidden shrink-0 md:block">{action}</div>}
    </div>
  )
}
