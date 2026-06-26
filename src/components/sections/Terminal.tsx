import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import {
  CONTACT,
  DISCIPLINES,
  SOCIALS,
  TERMINAL_BIO,
  TERMINAL_SKILLS,
} from '@/lib/content'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/components/ui/cn'

/* --------------------------------------------------------------------------
   Lines are a tagged union — `kind` drives how each row is rendered.
   `tone` lets system/output lines pick an accent colour without an enum.
   -------------------------------------------------------------------------- */
type LineKind = 'input' | 'output' | 'system'
type LineTone = 'default' | 'ember' | 'forge' | 'signal' | 'gradient'

type Line = {
  kind: LineKind
  text: string
  tone?: LineTone
}

const out = (text: string, tone: LineTone = 'default'): Line => ({ kind: 'output', text, tone })
const sys = (text: string, tone: LineTone = 'default'): Line => ({ kind: 'system', text, tone })

const PROMPT = 'visitor@neoragnar:~$'

const BANNER: Line[] = [
  sys('  ┌───────────────────────────────────────────┐', 'signal'),
  sys('  │   N E O R A G N A R   //   forge shell 777  │', 'signal'),
  sys('  └───────────────────────────────────────────┘', 'signal'),
  out(''),
  ...TERMINAL_BIO.map((l) => out(l)),
  out(''),
  sys("type 'help' to list commands.", 'forge'),
]

/* Command registry — keeps `help` output and the parser in sync. */
const COMMANDS: { name: string; desc: string }[] = [
  { name: 'help', desc: 'list available commands' },
  { name: 'whoami', desc: 'who is at this shell' },
  { name: 'about', desc: 'print the operator bio' },
  { name: 'skills', desc: 'the stack i build with' },
  { name: 'builds', desc: 'what i ship (disciplines)' },
  { name: 'github', desc: 'open the live repos' },
  { name: 'social', desc: 'channels & contact' },
  { name: 'date', desc: 'current system time' },
  { name: 'echo <text>', desc: 'print text back' },
  { name: 'ls', desc: 'list the forge' },
  { name: 'banner', desc: 'reprint the header' },
  { name: 'clear', desc: 'wipe the screen' },
  { name: 'exit', desc: 'attempt to leave' },
]

const QUICK_CHIPS = ['help', 'about', 'skills', 'builds', 'social', '777']

export function Terminal() {
  const [history, setHistory] = useState<Line[]>([])
  const [value, setValue] = useState('')
  // entered commands, navigable with Up/Down. -1 == "live" input.
  const cmdLog = useRef<string[]>([])
  const cursor = useRef(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const booted = useRef(false)

  const push = (lines: Line[]) => setHistory((prev) => [...prev, ...lines])

  // Banner once — guard against StrictMode's double-mount.
  useEffect(() => {
    if (booted.current) return
    booted.current = true
    setHistory(BANNER)
  }, [])

  // Auto-scroll to the newest output.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history])

  function run(raw: string) {
    const trimmed = raw.trim()
    const echo: Line = { kind: 'input', text: raw }

    if (trimmed) {
      cmdLog.current = [...cmdLog.current, trimmed]
      cursor.current = -1
    }

    if (!trimmed) {
      push([echo])
      return
    }

    const [cmdRaw, ...rest] = trimmed.split(/\s+/)
    const cmd = cmdRaw.toLowerCase()
    const args = rest.join(' ')
    const lines: Line[] = [echo]

    switch (cmd) {
      case 'help': {
        lines.push(out('available commands:'))
        for (const c of COMMANDS) {
          lines.push(out(`  ${c.name.padEnd(14)} ${c.desc}`))
        }
        lines.push(out(''))
        lines.push(out('  tip: try `777`, `sudo`, or `cat .secret`.', 'forge'))
        break
      }
      case 'whoami':
        lines.push(out('NeoRagnar — pseudonymous builder. (you, however, are a guest)'))
        break
      case 'about':
      case 'bio':
        for (const l of TERMINAL_BIO) lines.push(out(l))
        break
      case 'skills':
      case 'stack':
        for (const l of TERMINAL_SKILLS) lines.push(out(l, 'signal'))
        break
      case 'builds':
      case 'projects':
        for (const d of DISCIPLINES) {
          lines.push(out(`• ${d.title}`, 'forge'))
          lines.push(out(`    ${d.blurb}`))
        }
        lines.push(out(''))
        lines.push(out('run `github` to see live repos.', 'forge'))
        break
      case 'github':
        lines.push(out(CONTACT.github, 'signal'))
        lines.push(out('opening in a new tab…'))
        window.open(CONTACT.github, '_blank', 'noopener,noreferrer')
        break
      case 'social':
      case 'contact':
        for (const s of SOCIALS) {
          lines.push(out(`${s.label.padEnd(8)} ${s.handle}  →  ${s.href}`))
        }
        lines.push(out(`email    ${CONTACT.email}`))
        break
      case 'clear':
      case 'cls':
        setHistory([])
        return
      case 'banner':
        push([echo, ...BANNER])
        return
      case 'date':
        lines.push(out(new Date().toString()))
        break
      case 'echo':
        lines.push(out(args))
        break
      case 'ls':
        lines.push(out('apps/  web/  saas/  extensions/  tools/  bots/  .secret/', 'signal'))
        break
      case 'sudo':
        lines.push(out("nice try. this operator doesn't grant root to guests. (777)", 'ember'))
        break
      case '777':
        lines.push(out('⟢  build signal locked.  ⟢  777  ⟣', 'gradient'))
        break
      case 'cat': {
        const target = args.toLowerCase()
        if (target === '.secret' || target === 'secret') {
          lines.push(out('[REDACTED] — identity withheld by design.', 'ember'))
        } else if (!target) {
          lines.push(out('cat: missing operand. try `cat .secret`.', 'ember'))
        } else {
          lines.push(out(`cat: ${args}: No such file or directory.`, 'ember'))
        }
        break
      }
      case 'exit':
        lines.push(out("there is no exit. you're already building."))
        break
      default:
        lines.push(out(`command not found: ${cmd}. type 'help'.`, 'ember'))
    }

    push(lines)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      run(value)
      setValue('')
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const log = cmdLog.current
      if (!log.length) return
      const next = cursor.current === -1 ? log.length - 1 : Math.max(0, cursor.current - 1)
      cursor.current = next
      setValue(log[next])
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const log = cmdLog.current
      if (cursor.current === -1) return
      const next = cursor.current + 1
      if (next >= log.length) {
        cursor.current = -1
        setValue('')
      } else {
        cursor.current = next
        setValue(log[next])
      }
    }
  }

  function runChip(cmd: string) {
    run(cmd)
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <section id="terminal" className="relative overflow-hidden py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
        <SectionHeading
          align="center"
          eyebrow="SHELL // GUEST ACCESS"
          title="Talk to the {terminal}"
          subtitle="A real shell. Type a command, hit enter. Start with `help`."
        />

        {/* quick command chips */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          {QUICK_CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => runChip(c)}
              className="rounded-full border border-stroke bg-surface/50 px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-signal hover:text-text"
            >
              {c}
            </button>
          ))}
        </div>

        {/* terminal window */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="scanlines relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-stroke bg-[#070a10]/90 shadow-2xl shadow-black/50 glass"
        >
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-stroke bg-surface px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-ember/80" />
            <span className="h-3 w-3 rounded-full bg-gold/80" />
            <span className="h-3 w-3 rounded-full bg-forge/80" />
            <span className="flex-1 text-center font-mono text-xs text-muted">
              neoragnar@forge: ~
            </span>
            {/* spacer to keep the title visually centred against the dots */}
            <span className="w-[42px]" aria-hidden />
          </div>

          {/* output + input */}
          <div
            ref={scrollRef}
            className="h-[320px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed md:h-[380px]"
          >
            {history.map((line, i) => (
              <OutputLine key={i} line={line} />
            ))}

            {/* live input line */}
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-forge">{PROMPT}</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="terminal input"
                className="flex-1 bg-transparent text-text caret-signal outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const TONE_CLASS: Record<LineTone, string> = {
  default: 'text-muted',
  ember: 'text-ember',
  forge: 'text-forge',
  signal: 'text-signal',
  gradient: 'text-gradient-forge',
}

function OutputLine({ line }: { line: Line }) {
  if (line.kind === 'input') {
    return (
      <div className="flex items-start gap-2">
        <span className="shrink-0 text-forge">{PROMPT}</span>
        <span className="whitespace-pre-wrap break-words text-text">{line.text}</span>
      </div>
    )
  }
  return (
    <div
      className={cn('whitespace-pre-wrap break-words', TONE_CLASS[line.tone ?? 'default'])}
    >
      {line.text || ' '}
    </div>
  )
}
