import { useEffect, useState } from 'react'
import { GITHUB_USER, REPO_FALLBACK } from './content'
import type { Repo } from './types'

type GithubApiRepo = {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  homepage: string | null
  topics?: string[]
  updated_at: string
  fork: boolean
}

type State = {
  repos: Repo[]
  loading: boolean
  source: 'live' | 'fallback'
}

function normalise(r: GithubApiRepo): Repo {
  return {
    name: r.name,
    description: r.description,
    language: r.language,
    stars: r.stargazers_count,
    forks: r.forks_count,
    url: r.html_url,
    homepage: r.homepage,
    topics: r.topics ?? [],
    updated: r.updated_at,
    fork: r.fork,
  }
}

/**
 * Fetches the real public repos for the pseudonymous account. The GitHub REST
 * API allows unauthenticated reads (rate-limited), so this works straight from
 * the browser. If it fails, we fall back to a baked-in snapshot so the section
 * is never empty.
 */
export function useGithubRepos(): State {
  const [state, setState] = useState<State>({
    repos: REPO_FALLBACK,
    loading: true,
    source: 'fallback',
  })

  useEffect(() => {
    let alive = true
    const controller = new AbortController()

    async function run() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
          { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } },
        )
        if (!res.ok) throw new Error(`github ${res.status}`)
        const data: GithubApiRepo[] = await res.json()
        if (!alive) return
        const repos = data
          .map(normalise)
          .sort((a, b) => b.stars - a.stars || +new Date(b.updated) - +new Date(a.updated))
        setState({
          repos: repos.length ? repos : REPO_FALLBACK,
          loading: false,
          source: repos.length ? 'live' : 'fallback',
        })
      } catch {
        if (!alive) return
        setState({ repos: REPO_FALLBACK, loading: false, source: 'fallback' })
      }
    }

    run()
    return () => {
      alive = false
      controller.abort()
    }
  }, [])

  return state
}
