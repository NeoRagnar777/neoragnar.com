import { Star, GitFork, ArrowUpRight, Circle } from 'lucide-react'
import { CONTACT } from '@/lib/content'
import type { Repo } from '@/lib/types'
import { useGithubRepos } from '@/lib/useGithubRepos'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SignalButton } from '@/components/ui/SignalButton'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/components/ui/cn'

/** Language → dot colour. Falls back to muted. */
const LANG_DOT: Record<string, string> = {
  TypeScript: 'bg-signal',
  JavaScript: 'bg-gold',
  Python: 'bg-forge',
  Rust: 'bg-ember',
}

/** Tiny relative-time formatter: "3d ago", "2mo ago", etc. */
function relativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''
  const diff = Math.max(0, Date.now() - then)
  const sec = Math.floor(diff / 1000)
  const min = Math.floor(sec / 60)
  const hr = Math.floor(min / 60)
  const day = Math.floor(hr / 24)
  const mo = Math.floor(day / 30)
  const yr = Math.floor(day / 365)
  if (yr >= 1) return `${yr}y ago`
  if (mo >= 1) return `${mo}mo ago`
  if (day >= 1) return `${day}d ago`
  if (hr >= 1) return `${hr}h ago`
  if (min >= 1) return `${min}m ago`
  return 'just now'
}

function RepoCard({ repo }: { repo: Repo }) {
  const dot = (repo.language && LANG_DOT[repo.language]) || 'bg-muted'
  return (
    <a
      href={repo.homepage || repo.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-stroke bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-signal/40"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="truncate font-mono text-sm text-signal">
          <span className="text-faint">~/</span>
          {repo.name}
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text" />
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
        {repo.description || <span className="font-mono text-faint">// no description</span>}
      </p>

      {repo.topics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-stroke px-2 py-0.5 font-mono text-[10px] text-faint"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 font-mono text-xs text-muted">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span className={cn('h-2.5 w-2.5 rounded-full', dot)} />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5" />
          {repo.stars}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" />
          {repo.forks}
        </span>
        {repo.updated && <span className="ml-auto text-faint">{relativeTime(repo.updated)}</span>}
      </div>
    </a>
  )
}

function SkeletonCard() {
  return (
    <div className="flex h-full animate-pulse flex-col rounded-2xl border border-stroke bg-surface p-6">
      <div className="h-4 w-1/2 rounded bg-stroke" />
      <div className="mt-4 h-3 w-full rounded bg-stroke/70" />
      <div className="mt-2 h-3 w-4/5 rounded bg-stroke/70" />
      <div className="mt-auto flex gap-3 pt-6">
        <div className="h-3 w-16 rounded bg-stroke" />
        <div className="h-3 w-10 rounded bg-stroke" />
      </div>
    </div>
  )
}

function GhostCard() {
  return (
    <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-stroke bg-surface/40 p-6 font-mono text-sm">
      <span className="text-forge">$ git push --more</span>
      <p className="mt-3 leading-relaxed text-muted">
        more builds surfacing soon — private until they&apos;re ready.
      </p>
    </div>
  )
}

export function Builds() {
  const { repos, loading, source } = useGithubRepos()

  return (
    <section id="builds" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <SectionHeading
          eyebrow="LIVE FROM GITHUB"
          title="Selected {builds}"
          subtitle="Public work, straight from the source. Most builds ship private first."
          action={
            <SignalButton href={CONTACT.github} external size="sm" arrow>
              All repositories
            </SignalButton>
          }
        />

        <Reveal delay={0.1}>
          <div className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-muted">
            <span
              className={cn(
                'animate-pulse-dot h-2 w-2 rounded-full',
                source === 'live' ? 'bg-forge' : 'bg-gold',
              )}
            />
            {source === 'live' ? (
              <span>// streaming live from github.com/NeoRagnar777</span>
            ) : (
              <span>// cached snapshot</span>
            )}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              {repos.map((repo, i) => (
                <Reveal key={repo.url} delay={i * 0.06}>
                  <RepoCard repo={repo} />
                </Reveal>
              ))}
              <Reveal delay={repos.length * 0.06}>
                <GhostCard />
              </Reveal>
            </>
          )}
        </div>

        {/* keep Circle in use as a subtle decorative footer marker */}
        <div className="mt-8 flex items-center justify-center gap-2 font-mono text-[11px] text-faint">
          <Circle className="h-2 w-2 fill-current" />
          end of public stream
        </div>
      </div>
    </section>
  )
}
