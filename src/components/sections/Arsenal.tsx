import type { ComponentType } from 'react'
import { Smartphone, Globe, Layers, Puzzle, Wrench, Bot } from 'lucide-react'
import { DISCIPLINES } from '@/lib/content'
import type { BuildDiscipline } from '@/lib/types'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SignalButton } from '@/components/ui/SignalButton'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/components/ui/cn'

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Smartphone,
  Globe,
  Layers,
  Puzzle,
  Wrench,
  Bot,
}

/** Maps the accent union to concrete tailwind colour names. */
const ACCENTS: Record<BuildDiscipline['accent'], { text: string; from: string; dot: string; border: string }> = {
  signal: { text: 'text-signal', from: 'from-signal/20', dot: 'bg-signal', border: 'group-hover:border-signal/40' },
  forge: { text: 'text-forge', from: 'from-forge/20', dot: 'bg-forge', border: 'group-hover:border-forge/40' },
  violet: { text: 'text-signal-3', from: 'from-signal-3/20', dot: 'bg-signal-3', border: 'group-hover:border-signal-3/40' },
  ember: { text: 'text-ember', from: 'from-ember/20', dot: 'bg-ember', border: 'group-hover:border-ember/40' },
  gold: { text: 'text-gold', from: 'from-gold/20', dot: 'bg-gold', border: 'group-hover:border-gold/40' },
}

export function Arsenal() {
  return (
    <section id="arsenal" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <SectionHeading
          eyebrow="THE FORGE"
          title="What {I build}"
          subtitle="Idea to production, solo — across every surface software runs on."
          action={
            <SignalButton href="#builds" size="sm" arrow>
              See the builds
            </SignalButton>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {DISCIPLINES.map((d, i) => {
            const Icon = ICONS[d.icon] ?? Layers
            const accent = ACCENTS[d.accent]
            return (
              <Reveal
                key={d.id}
                delay={i * 0.06}
                className={cn(d.span ?? 'md:col-span-4')}
              >
                <article
                  className={cn(
                    'group relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-3xl border border-stroke bg-surface p-6 transition-all duration-300 hover:-translate-y-1 md:p-8',
                    accent.border,
                  )}
                >
                  {/* radial accent glow on hover */}
                  <div
                    className={cn(
                      'pointer-events-none absolute -inset-px bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100',
                      accent.from,
                    )}
                  />
                  {/* halftone texture on hover */}
                  <div className="halftone pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 [mask-image:radial-gradient(circle_at_top_right,#000,transparent_70%)] group-hover:opacity-[0.04]" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div
                      className={cn(
                        'inline-flex h-12 w-12 items-center justify-center rounded-xl border border-stroke bg-bg',
                        accent.text,
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 font-display text-xl tracking-tight text-text md:text-2xl">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{d.blurb}</p>

                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {d.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 rounded-full border border-stroke px-2.5 py-1 font-mono text-[11px] text-faint"
                        >
                          <span className={cn('h-1.5 w-1.5 rounded-full', accent.dot)} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
