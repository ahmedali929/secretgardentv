import { links } from '../data/links'
import styles from './Footer.module.css'

const nav = [
  { href: '#shows', label: 'Shows' },
  { href: '#family', label: 'The Family' },
  { href: '#why', label: 'For Parents' },
  { href: '#newsletter', label: 'Newsletter' },
]

const social = [
  { href: links.youtube, label: 'YouTube' },
  { href: links.instagram, label: 'Instagram' },
  { href: links.tiktok, label: 'TikTok' },
  { href: links.facebook, label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.top}`}>
        <div className={styles.brandCol}>
          <a href="#top" className={styles.brand}>
            <span className={styles.mark} aria-hidden="true">
              <svg viewBox="0 0 32 32" width="26" height="26">
                <path
                  d="M16 29C16 20 9 18 5 18c0 7 5 11 11 11Zm0 0c0-9 7-11 11-11 0 7-5 11-11 11Zm0-1c0-10 0-16 0-25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            Secret Garden TV
          </a>
          <p className={styles.tagline}>
            Building a brighter future for Muslim children, one story at a time.
          </p>
          <a className={styles.email} href={`mailto:${links.email}`}>
            {links.email}
          </a>
        </div>

        <nav className={styles.col} aria-label="Footer">
          <h4 className={styles.colTitle}>Explore</h4>
          {nav.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <nav className={styles.col} aria-label="Social">
          <h4 className={styles.colTitle}>Follow along</h4>
          {social.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className={`shell ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} Secret Garden TV. All rights reserved.</p>
        <p>Made with care for little hearts.</p>
      </div>
    </footer>
  )
}
