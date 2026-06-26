import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { NAV_LINKS } from '@/lib/content'
import { cn } from '@/components/ui/cn'

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''))

/**
 * Fixed floating pill nav. Tracks scroll for an elevated state and uses a
 * single IntersectionObserver to highlight the in-view section. Link group is
 * hidden below sm: to stay compact on mobile.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(SECTION_IDS[0])

  // elevate the pill once scrolled past the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // highlight the section currently in view
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <nav
        className={cn(
          'glass inline-flex items-center rounded-full border border-white/10 px-2 py-2 transition-shadow duration-300',
          scrolled && 'border-signal/30 shadow-lg shadow-black/30',
        )}
      >
        {/* logo */}
        <a
          href="#hero"
          className="accent-gradient group/logo grid h-9 w-9 place-items-center rounded-full p-px transition-transform duration-300 hover:scale-110"
          aria-label="NeoRagnar — home"
        >
          <span className="grid h-full w-full place-items-center rounded-full bg-bg font-display text-[12px] leading-none transition-colors duration-300 group-hover/logo:bg-bg/70">
            NR
          </span>
        </a>

        {/* divider */}
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* links */}
        <div className="hidden items-center sm:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs transition-colors sm:px-4 sm:py-2 sm:text-sm',
                  isActive
                    ? 'bg-stroke/50 text-text'
                    : 'text-muted hover:bg-stroke/50 hover:text-text',
                )}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* divider */}
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* get in touch */}
        <a href="#contact" className="group/cta relative ml-1 inline-flex rounded-full">
          <span className="accent-gradient absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover/cta:opacity-100" />
          <span className="relative z-10 inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-xs text-text sm:px-4 sm:py-2 sm:text-sm">
            Get in touch
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </span>
        </a>
      </nav>
    </header>
  )
}
