import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from './cn'

type Variant = 'solid' | 'outline' | 'ghost'
type Size = 'sm' | 'md'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: Variant
  size?: Size
  arrow?: boolean
  className?: string
  /** external link target */
  external?: boolean
}

const sizes: Record<Size, string> = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
}

const surfaces: Record<Variant, string> = {
  solid: 'bg-text text-bg group-hover/btn:bg-bg group-hover/btn:text-text backdrop-blur-md',
  outline: 'border border-stroke bg-bg/40 text-text group-hover/btn:border-transparent backdrop-blur-md',
  ghost: 'text-muted hover:text-text',
}

/**
 * Pill button with an animated gradient ring revealed on hover. `solid` is the
 * primary CTA, `outline` the secondary, `ghost` for nav-like actions. Renders
 * an <a> when `href` is set, otherwise a <button>.
 */
export function SignalButton({
  children,
  href,
  onClick,
  variant = 'solid',
  size = 'md',
  arrow = false,
  className,
  external = false,
}: Props) {
  const content = (
    <span className="relative inline-flex rounded-full transition-transform duration-300 group-hover/btn:scale-[1.03] group-active/btn:scale-95">
      {variant !== 'ghost' && (
        <span className="accent-gradient animate-gradient absolute -inset-px rounded-full bg-[length:200%_200%] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
      )}
      <span
        className={cn(
          'relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full font-medium transition-colors duration-300',
          sizes[size],
          surfaces[variant],
        )}
      >
        {children}
        {arrow && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        )}
      </span>
    </span>
  )

  const wrapperClass = cn('group/btn relative inline-flex rounded-full', className)

  if (href) {
    return (
      <a href={href} className={wrapperClass} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={wrapperClass}>
      {content}
    </button>
  )
}
