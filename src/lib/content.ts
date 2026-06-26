import type {
  BuildDiscipline,
  ManifestoLine,
  NavLink,
  Repo,
  SocialLink,
  Stat,
} from './types'

/* ===========================================================================
   IDENTITY
   Pseudonymous on purpose. NeoRagnar is the handle, not the person.
   =========================================================================== */
export const HANDLE = 'NeoRagnar'
export const HANDLE_FULL = 'NeoRagnar777'
export const GITHUB_USER = 'NeoRagnar777'
export const DOMAIN = 'neoragnar.com'

/** Configurable — wire these to real inboxes/handles when ready. */
export const CONTACT = {
  email: `hail@${DOMAIN}`,
  github: `https://github.com/${GITHUB_USER}`,
  twitter: `https://x.com/${GITHUB_USER}`,
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Signal', href: '#hero' },
  { label: 'Forge', href: '#arsenal' },
  { label: 'Builds', href: '#builds' },
  { label: 'Terminal', href: '#terminal' },
]

export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', href: CONTACT.github, handle: `@${GITHUB_USER}`, icon: 'github' },
  { label: 'X', href: CONTACT.twitter, handle: `@${GITHUB_USER}`, icon: 'twitter' },
  { label: 'Mail', href: `mailto:${CONTACT.email}`, handle: CONTACT.email, icon: 'mail' },
]

/* ===========================================================================
   HERO
   =========================================================================== */
export const HERO = {
  eyebrow: 'PSEUDONYMOUS BUILDER // SIGNAL 777',
  /** rotating subjects after "I build" */
  buildWords: ['everything', 'apps', 'websites', 'SaaS', 'extensions', 'tools', 'bots', 'systems'],
  /** rotating role line, like the reference */
  roles: ['builder', 'ghost', 'one-man studio', 'machine'],
  description:
    'No face. No résumé. Just output. I design and ship software end-to-end — apps, websites, SaaS, browser extensions and the quiet little tools that run in the background. This is where the work signs itself.',
  primaryCta: { label: 'Open the Forge', href: '#arsenal' },
  secondaryCta: { label: 'Talk to the terminal', href: '#terminal' },
}

/* ===========================================================================
   MANIFESTO  (anonymous persona, no identity leak)
   =========================================================================== */
export const MANIFESTO_INTRO =
  'A handle, not a name. NeoRagnar is the signature I leave on everything I make — so the work can be public while the person stays private.'

export const MANIFESTO: ManifestoLine[] = [
  { k: 'alias', v: 'NeoRagnar — Neo for the code I read in the dark, Ragnar for the way I raid problems.' },
  { k: 'identity', v: 'Withheld by design. The face lives on another site. This one is pure output.' },
  { k: 'method', v: 'Idea to production, solo. Design, build, ship, repeat — no committee, no drag.' },
  { k: 'surface', v: 'Apps, web, SaaS, extensions, CLIs, bots, automations. If it compiles, I build it.' },
  { k: 'signal', v: '777 — the tag I sign with. If you find it, something I made is running underneath.' },
]

/* ===========================================================================
   THE FORGE — what I build (bento)
   =========================================================================== */
export const DISCIPLINES: BuildDiscipline[] = [
  {
    id: 'apps',
    icon: 'Smartphone',
    title: 'Apps',
    blurb:
      'Native-feeling mobile and desktop apps. Fast, offline-aware, designed down to the haptics.',
    tags: ['React Native', 'Electron', 'Swift', 'PWA'],
    span: 'md:col-span-7',
    accent: 'signal',
  },
  {
    id: 'web',
    icon: 'Globe',
    title: 'Websites',
    blurb: 'Marketing sites, dashboards, web apps. Pixel-tight front-ends with motion that means something.',
    tags: ['React', 'Next', 'Vite', 'Tailwind'],
    span: 'md:col-span-5',
    accent: 'violet',
  },
  {
    id: 'saas',
    icon: 'Layers',
    title: 'SaaS',
    blurb: 'Multi-tenant products with auth, billing, and infra that survives the first thousand users.',
    tags: ['Postgres', 'Stripe', 'Auth', 'Edge'],
    span: 'md:col-span-5',
    accent: 'forge',
  },
  {
    id: 'extensions',
    icon: 'Puzzle',
    title: 'Browser Extensions',
    blurb: 'Chrome and Firefox extensions that bend the web to your will without breaking it.',
    tags: ['MV3', 'Content Scripts', 'WASM'],
    span: 'md:col-span-4',
    accent: 'ember',
  },
  {
    id: 'tools',
    icon: 'Wrench',
    title: 'Dev Tools',
    blurb: 'CLIs, generators, and the unglamorous tooling that quietly saves a team a week.',
    tags: ['Node', 'Rust', 'Go', 'CLI'],
    span: 'md:col-span-4',
    accent: 'gold',
  },
  {
    id: 'automation',
    icon: 'Bot',
    title: 'Bots & Automation',
    blurb: 'Trading bots, scrapers, pipelines and agents that work the shift you would rather skip.',
    tags: ['Python', 'Agents', 'Cron', 'APIs'],
    span: 'md:col-span-4',
    accent: 'signal',
  },
]

/* ===========================================================================
   STATS  (branding + live signal, no fabricated track record)
   =========================================================================== */
export const STATS: Stat[] = [
  { value: '6', label: 'Disciplines', sub: 'app · web · saas · ext · tools · bots' },
  { value: '777', label: 'Signal', sub: 'the tag I sign with' },
  { value: '100%', label: 'Pseudonymous', sub: 'identity withheld by design' },
  { value: '∞', label: 'In the forge', sub: 'always something compiling' },
]

/* ===========================================================================
   GITHUB fallback snapshot — used if the live API is rate-limited / offline.
   Mirrors the real public account at build time.
   =========================================================================== */
export const REPO_FALLBACK: Repo[] = [
  {
    name: 'neoragnar777-site',
    description: 'Pseudonymous NeoRagnar777 portfolio and build signal.',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    url: `https://github.com/${GITHUB_USER}/neoragnar777-site`,
    homepage: `https://${DOMAIN}`,
    topics: ['portfolio', 'react', 'vite'],
    updated: '2026-06-26T02:17:46Z',
    fork: false,
  },
]

/* ===========================================================================
   TERMINAL — static knowledge the in-browser shell can answer from.
   =========================================================================== */
export const TERMINAL_BIO = [
  'NeoRagnar // pseudonymous builder.',
  'Ships apps, websites, SaaS, extensions, tools & automations — solo, end to end.',
  'Identity withheld by design. The work is the signature.',
]

export const TERMINAL_SKILLS = [
  'frontend   react · next · vite · tailwind · framer-motion · typescript',
  'backend    node · postgres · prisma · edge functions · rest/graphql',
  'systems    rust · go · python · cli tooling · automation',
  'product    auth · stripe billing · multi-tenant saas · pwa',
  'extras     chrome/firefox extensions · trading bots · scrapers · agents',
]
