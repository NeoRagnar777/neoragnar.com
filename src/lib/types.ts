/* Shared types for the NeoRagnar build signal. */

export type NavLink = {
  label: string
  href: string
}

export type SocialLink = {
  label: string
  href: string
  handle: string
  icon: 'github' | 'twitter' | 'mail' | 'terminal'
}

export type BuildDiscipline = {
  id: string
  /** lucide-react icon name */
  icon: string
  title: string
  blurb: string
  tags: string[]
  /** tailwind span helpers for the bento grid */
  span?: string
  accent: 'signal' | 'forge' | 'violet' | 'ember' | 'gold'
}

export type Stat = {
  value: string
  label: string
  sub?: string
}

export type ManifestoLine = {
  k: string
  v: string
}

/** Shape we normalise GitHub's REST response into. */
export type Repo = {
  name: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  url: string
  homepage: string | null
  topics: string[]
  updated: string
  fork: boolean
}
