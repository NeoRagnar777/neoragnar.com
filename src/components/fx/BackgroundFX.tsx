import { useEffect, useRef } from 'react'

/* glyphs for the digital rain: katakana + binary + a few code symbols */
const GLYPHS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ01<>/{};*=+#'

/**
 * Fixed full-viewport background. A subtle cyan "digital rain" on a <canvas>,
 * layered under a faint grid + radial vignettes so foreground text stays
 * readable. Respects prefers-reduced-motion (renders one static frame).
 */
export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fontSize = 16
    let columns = 0
    let drops: number[] = []
    let dpr = 1

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      columns = Math.ceil(window.innerWidth / fontSize)
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * window.innerHeight) / fontSize),
      )
      ctx.font = `${fontSize}px 'JetBrains Mono', ui-monospace, monospace`
      ctx.textBaseline = 'top'
    }

    const pick = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

    const drawFrame = () => {
      // fade previous frame to create trails
      ctx.fillStyle = 'rgba(5, 6, 10, 0.12)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      for (let i = 0; i < columns; i++) {
        const x = i * fontSize
        const y = drops[i] * fontSize
        // leading glyph slightly brighter / white
        ctx.fillStyle = 'rgba(220, 245, 255, 0.55)'
        ctx.fillText(pick(), x, y)
        // trailing glyph in faint cyan just above
        ctx.fillStyle = 'rgba(76, 201, 240, 0.45)'
        ctx.fillText(pick(), x, y - fontSize)

        if (y > window.innerHeight && Math.random() > 0.975) {
          drops[i] = 0
        } else {
          drops[i] += 1
        }
      }
    }

    setup()

    if (reduced) {
      // single static frame, no animation loop
      ctx.fillStyle = 'rgba(5, 6, 10, 1)'
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      drawFrame()
      return
    }

    let raf = 0
    let last = 0
    const interval = 1000 / 24 // cap ~24fps

    const loop = (time: number) => {
      raf = window.requestAnimationFrame(loop)
      if (time - last < interval) return
      last = time
      drawFrame()
    }
    raf = window.requestAnimationFrame(loop)

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(setup, 150)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-25" />
      <div className="cyber-grid absolute inset-0 opacity-40" />
      {/* top cyan glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 40% at 50% 0%, rgba(76, 201, 240, 0.10), transparent 70%)',
        }}
      />
      {/* overall vignette darkening toward edges + top/bottom fade for the rain */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 50%, transparent 45%, rgba(5, 6, 10, 0.85) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5, 6, 10, 0.9) 0%, transparent 22%, transparent 78%, rgba(5, 6, 10, 0.95) 100%)',
        }}
      />
    </div>
  )
}
