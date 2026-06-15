import { useEffect, useState } from 'react'
import styles from './Nav.module.css'

const links = [
  { href: '#shows', label: 'Shows' },
  { href: '#family', label: 'The Family' },
  { href: '#why', label: 'For Parents' },
  { href: '#newsletter', label: 'Newsletter' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} aria-label="Secret Garden TV home">
          <span className={styles.mark} aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <path
                d="M16 29C16 20 9 18 5 18c0 7 5 11 11 11Zm0 0c0-9 7-11 11-11 0 7-5 11-11 11Zm0-1c0-10 0-16 0-25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className={styles.wordmark}>
            Secret&nbsp;Garden<span className={styles.tv}>TV</span>
          </span>
        </a>

        <nav className={styles.links} aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#newsletter" className={`btn btn--primary ${styles.cta}`}>
            Join the garden
          </a>
          <button
            className={styles.burger}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${styles.burgerLine} ${open ? styles.b1 : ''}`} />
            <span className={`${styles.burgerLine} ${open ? styles.b2 : ''}`} />
            <span className={`${styles.burgerLine} ${open ? styles.b3 : ''}`} />
          </button>
        </div>
      </div>

      <div className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`} aria-hidden={!open}>
        <nav className={styles.sheetLinks} aria-label="Mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="#newsletter"
            className={`btn btn--primary ${styles.sheetCta}`}
            onClick={() => setOpen(false)}
          >
            Join the garden
          </a>
        </nav>
      </div>
    </header>
  )
}
