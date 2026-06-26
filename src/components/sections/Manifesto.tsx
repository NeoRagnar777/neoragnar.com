import { MANIFESTO, MANIFESTO_INTRO } from '@/lib/content'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/** A withheld field — a redaction bar plus a [REDACTED]/[WITHHELD] tag. */
const REDACTED_FIELDS = [
  { k: 'legal_name', tag: '[REDACTED]', bars: 8 },
  { k: 'location', tag: '[WITHHELD]', bars: 6 },
]

export function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden py-20 md:py-28">
      {/* huge faint watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-1/2 -z-0 -translate-y-1/2 select-none font-display text-[34vw] font-bold leading-none text-stroke/40 md:text-[22rem]"
      >
        777
      </span>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
        <SectionHeading
          eyebrow="WHOIS // OPERATOR"
          title="The {signature}"
          subtitle={MANIFESTO_INTRO}
        />

        <Reveal delay={0.1} className="mt-12">
          <div className="glass overflow-hidden rounded-2xl border border-stroke bg-surface/60 md:rounded-3xl">
            {/* title bar */}
            <div className="flex items-center gap-3 border-b border-stroke bg-surface-2/60 px-4 py-3 md:px-6">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-ember/80" />
                <span className="h-3 w-3 rounded-full bg-gold/80" />
                <span className="h-3 w-3 rounded-full bg-forge/80" />
              </div>
              <span className="font-mono text-xs text-muted">operator.dossier — read only</span>
            </div>

            {/* body */}
            <div className="space-y-3 p-5 font-mono text-sm md:p-8">
              {/* redacted fields up top — implies withheld info */}
              {REDACTED_FIELDS.map((field) => (
                <div
                  key={field.k}
                  className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3"
                >
                  <span className="w-28 shrink-0 uppercase tracking-wide text-signal">
                    {field.k}
                  </span>
                  <span className="hidden text-faint sm:inline">:</span>
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex gap-1" aria-hidden>
                      {Array.from({ length: field.bars }).map((_, i) => (
                        <span key={i} className="h-3.5 w-4 rounded-[3px] bg-text/80" />
                      ))}
                    </span>
                    <span className="text-xs text-ember">{field.tag}</span>
                  </span>
                </div>
              ))}

              <div className="my-1 h-px bg-stroke" />

              {/* the disclosed manifesto lines */}
              {MANIFESTO.map((line, i) => (
                <div
                  key={line.k}
                  className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3"
                >
                  <span
                    className={`w-28 shrink-0 uppercase tracking-wide ${
                      i % 2 === 0 ? 'text-signal' : 'text-forge'
                    }`}
                  >
                    {line.k}
                  </span>
                  <span className="hidden text-faint sm:inline">:</span>
                  <span className="font-sans leading-relaxed text-muted">
                    <span className="text-text">{line.v.split(' ')[0]} </span>
                    {line.v.split(' ').slice(1).join(' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
