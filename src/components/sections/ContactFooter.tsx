import { ArrowUp } from 'lucide-react'
import {
  CONTACT,
  DOMAIN,
  HANDLE,
  HANDLE_FULL,
  SOCIALS,
} from '@/lib/content'
import { SignalButton } from '@/components/ui/SignalButton'
import { BrandIcon } from '@/components/ui/BrandIcon'

const MARQUEE_WORDS = [
  'BUILD EVERYTHING',
  'SIGN IT 777',
  'SHIP FROM THE SHADOWS',
]

/** One seamless half of the marquee — rendered twice for the -50% loop. */
function MarqueeRun() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {MARQUEE_WORDS.map((word, i) => (
        <span key={`${word}-${i}`} className="flex items-center">
          <span
            className={
              i % 2 === 0
                ? 'text-text'
                : 'text-transparent [-webkit-text-stroke:1px_var(--color-muted)]'
            }
          >
            {word}
          </span>
          <span className="mx-6 text-signal/60 md:mx-10">—</span>
        </span>
      ))}
    </div>
  )
}

export function ContactFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden pb-10 pt-20 md:pt-28">
      {/* full-bleed scrolling marquee */}
      <div className="mask-fade-x overflow-hidden border-y border-stroke/60 py-5">
        <div className="animate-marquee flex w-max font-display text-4xl uppercase tracking-tight md:text-6xl">
          <MarqueeRun />
          <MarqueeRun />
        </div>
      </div>

      {/* main CTA */}
      <div className="relative z-10 mx-auto mt-16 max-w-2xl px-6 text-center md:px-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal">
          // OPEN A CHANNEL
        </span>
        <h2 className="mt-5 font-display text-3xl leading-[1.05] tracking-tight text-text md:text-5xl">
          Let&apos;s build something the world doesn&apos;t know you have yet.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
          No pitch deck required. Bring the idea, I bring the build — start to ship,
          signed 777, identity yours to keep.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <SignalButton href={`mailto:${CONTACT.email}`} variant="solid" arrow>
            {CONTACT.email}
          </SignalButton>
          <SignalButton href={CONTACT.github} external variant="outline">
            GitHub ↗
          </SignalButton>
        </div>

        {/* availability status */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-stroke bg-surface/50 px-4 py-2 font-mono text-xs text-muted">
          <span className="animate-pulse-dot h-2 w-2 rounded-full bg-forge" />
          Available for builds — pseudonymous engagements welcome
        </div>

        {/* social row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-signal"
            >
              <BrandIcon name={s.icon} className="h-4 w-4" />
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* giant faint watermark behind the footer bar */}
      <span
        aria-hidden
        className="mask-fade-y pointer-events-none absolute bottom-0 left-1/2 -z-0 -translate-x-1/2 translate-y-1/4 select-none font-display text-[24vw] font-bold uppercase leading-none text-transparent [-webkit-text-stroke:1px_var(--color-stroke)]"
      >
        NEORAGNAR
      </span>

      {/* footer bar */}
      <div className="relative z-10 mx-auto mt-20 max-w-[1200px] px-6 md:px-10">
        <div className="border-t border-stroke pt-6">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <p className="font-mono text-xs text-faint">
              © {new Date().getFullYear()} {HANDLE} — pseudonymous by design
            </p>
            <p className="font-mono text-xs text-faint">
              {HANDLE_FULL} · {DOMAIN}
            </p>
            <a
              href="#hero"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-signal"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
