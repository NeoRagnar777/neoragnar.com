import { useState } from 'react'
import { cn } from './cn'

type Props = {
  text: string
  className?: string
  /** when to run the RGB-split glitch */
  trigger?: 'hover' | 'always'
}

/**
 * Layered RGB-split glitch. The base layer stays readable; two tinted clones
 * (cyan + ember) jitter via the glitch-shift keyframes defined in index.css.
 */
export function GlitchText({ text, className, trigger = 'hover' }: Props) {
  const [hot, setHot] = useState(trigger === 'always')
  const active = trigger === 'always' || hot

  return (
    <span
      className={cn('relative inline-block', className)}
      onMouseEnter={() => trigger === 'hover' && setHot(true)}
      onMouseLeave={() => trigger === 'hover' && setHot(false)}
      data-text={text}
    >
      <span className="relative z-10">{text}</span>
      {active && (
        <>
          <span
            aria-hidden
            className="animate-glitch-a pointer-events-none absolute inset-0 z-0 text-signal opacity-80 mix-blend-screen select-none"
          >
            {text}
          </span>
          <span
            aria-hidden
            className="animate-glitch-b pointer-events-none absolute inset-0 z-0 text-ember opacity-80 mix-blend-screen select-none"
          >
            {text}
          </span>
        </>
      )}
    </span>
  )
}
