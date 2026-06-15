import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion'
import styles from './Hero.module.css'

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const parrot = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // --- Load-in choreography ---
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(`.${styles.line} > span`, {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
      })
        .from(
          `.${styles.tag}, .${styles.sub}, .${styles.ctas} > *`,
          { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 },
          '-=0.5',
        )
        .from(
          `.${styles.cast} img`,
          { yPercent: 18, opacity: 0, duration: 1.1, stagger: 0.14, ease: 'power2.out' },
          '-=0.9',
        )
        .from(`.${styles.cue}`, { opacity: 0, duration: 0.6 }, '-=0.2')

      // --- Mouse parallax ---
      const layers = gsap.utils.toArray<HTMLElement>(`.${styles.par}`)
      const setters = layers.map((l) => ({
        x: gsap.quickTo(l, 'x', { duration: 0.8, ease: 'power3' }),
        y: gsap.quickTo(l, 'y', { duration: 0.8, ease: 'power3' }),
        depth: Number(l.dataset.depth ?? 1),
      }))
      const onMove = (e: PointerEvent) => {
        const rx = (e.clientX / window.innerWidth - 0.5) * 2
        const ry = (e.clientY / window.innerHeight - 0.5) * 2
        setters.forEach((s) => {
          s.x(rx * 26 * s.depth)
          s.y(ry * 16 * s.depth)
        })
      }
      window.addEventListener('pointermove', onMove)

      // --- Scroll parallax: layers drift up at different speeds ---
      layers.forEach((l) => {
        const depth = Number(l.dataset.depth ?? 1)
        gsap.to(l, {
          yPercent: -12 * depth,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        })
      })

      // --- Babagha's flight loop ---
      if (parrot.current) {
        gsap.set(parrot.current, { xPercent: -50, yPercent: -50 })
        gsap
          .timeline({ repeat: -1, defaults: { ease: 'sine.inOut' } })
          .fromTo(
            parrot.current,
            { left: '-12%', top: '34%', rotation: 6, scale: 0.9 },
            { left: '30%', top: '22%', rotation: -4, scale: 1, duration: 5 },
          )
          .to(parrot.current, { left: '64%', top: '40%', rotation: 8, scale: 0.78, duration: 5 })
          .to(parrot.current, { left: '108%', top: '26%', rotation: -6, scale: 0.9, duration: 5 })
          .set(parrot.current, { left: '-12%' })

        gsap.to(parrot.current, {
          y: '+=14',
          duration: 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }

      return () => window.removeEventListener('pointermove', onMove)
    }, el)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((s) => s.kill())
    }
  }, [])

  return (
    <section className={styles.hero} id="top" ref={root}>
      {/* Sky + sun */}
      <div className={styles.sky} aria-hidden="true">
        <div className={styles.sun} />
        <div className={styles.haze} />
      </div>

      {/* Far rolling hills */}
      <svg
        className={`${styles.hills} ${styles.par}`}
        data-depth="0.3"
        viewBox="0 0 1440 420"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <path
          d="M0 260C220 180 360 210 560 250s420 120 700 60 180-120 180-120V420H0Z"
          fill="var(--leaf-600)"
          opacity="0.55"
        />
        <path
          d="M0 320C260 250 420 300 680 300s500-90 760-40V420H0Z"
          fill="var(--canopy-700)"
          opacity="0.75"
        />
      </svg>

      {/* Mid treeline */}
      <svg
        className={`${styles.trees} ${styles.par}`}
        data-depth="0.6"
        viewBox="0 0 1440 380"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <g fill="var(--canopy-800)">
          <circle cx="120" cy="250" r="150" />
          <circle cx="300" cy="290" r="120" />
          <circle cx="1320" cy="250" r="160" />
          <circle cx="1140" cy="300" r="120" />
          <circle cx="720" cy="330" r="130" />
        </g>
        <rect y="320" width="1440" height="80" fill="var(--canopy-800)" />
      </svg>

      {/* Floating pollen */}
      <div className={styles.pollen} aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      {/* Babagha in flight */}
      <img
        ref={parrot}
        className={styles.parrot}
        src="characters/babagha.png"
        alt="Babagha, the green parrot, in flight"
      />

      {/* Copy */}
      <div className={`${styles.content} shell`}>
        <span className={`seed-tag ${styles.tag}`}>
          <span className="seed-tag__dot" /> A new Islamic kids&rsquo; studio
        </span>
        <h1 className={styles.title}>
          <span className={styles.line}>
            <span>Where learning</span>
          </span>
          <span className={styles.line}>
            <span>
              feels like <em className={styles.play}>play</em>
            </span>
          </span>
        </h1>
        <p className={styles.sub}>
          Secret Garden TV makes animated shows that plant character, Arabic, and faith in
          little hearts. Stories you&rsquo;ll trust, that kids actually want to rewatch.
        </p>
        <div className={styles.ctas}>
          <a href="#shows" className="btn btn--primary">
            Explore the shows
          </a>
          <a href="#newsletter" className="btn btn--leaf">
            Get early access
          </a>
        </div>
      </div>

      {/* Cast */}
      <div className={`${styles.cast} ${styles.par}`} data-depth="0.15" aria-hidden="false">
        <img className={styles.baba} src="characters/baba.png" alt="Baba, the father" />
        <img className={styles.grandma} src="characters/grandma.png" alt="Grandma" />
        <img className={styles.ali} src="characters/ali.png" alt="Ali, a curious young boy" />
      </div>

      {/* Foreground foliage */}
      <svg
        className={`${styles.frondLeft} ${styles.par}`}
        data-depth="1.4"
        viewBox="0 0 360 420"
        aria-hidden="true"
      >
        <g fill="var(--canopy-900)">
          <path d="M-20 440C40 300 30 160 150 70c-40 130-10 250 30 370Z" />
          <path d="M-40 440C-10 320 60 250 180 220c-90 60-110 150-120 220Z" opacity="0.85" />
        </g>
      </svg>
      <svg
        className={`${styles.frondRight} ${styles.par}`}
        data-depth="1.4"
        viewBox="0 0 360 420"
        aria-hidden="true"
      >
        <g fill="var(--canopy-900)">
          <path d="M380 440C320 300 330 160 210 70c40 130 10 250-30 370Z" />
          <path d="M400 440C370 320 300 250 180 220c90 60 110 150 120 220Z" opacity="0.85" />
        </g>
      </svg>

      {/* Ground */}
      <div className={styles.ground} aria-hidden="true" />

      <a href="#shows" className={styles.cue} aria-label="Scroll to shows">
        <span>Wander in</span>
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path
            d="M12 5v14m0 0l-6-6m6 6l6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  )
}
