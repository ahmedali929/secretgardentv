import { useReveal } from '../lib/motion'
import { shows } from '../data/shows'
import { links } from '../data/links'
import styles from './Shows.module.css'

export default function Shows() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className={styles.shows} id="shows" ref={ref} aria-labelledby="shows-h">
      <div className={`shell ${styles.head}`}>
        <span className={`seed-tag ${styles.tag} reveal`}>
          <span className="seed-tag__dot" /> The lineup
        </span>
        <h2 id="shows-h" className={`${styles.title} reveal`} data-reveal-delay="80">
          Five shows, one garden
        </h2>
        <p className={`${styles.intro} reveal`} data-reveal-delay="140">
          Each one is its own little world with its own characters, all growing in the same soil of
          faith and good character.
        </p>
      </div>

      <div className={`shell ${styles.list}`}>
        {shows.map((show, i) => (
          <article
            key={show.id}
            className={`${styles.row} reveal`}
            data-reveal-delay={i % 2 === 0 ? 0 : 60}
          >
            <a
              className={styles.media}
              href={links.youtube}
              target="_blank"
              rel="noreferrer"
              style={{ '--accent': show.accent } as React.CSSProperties}
            >
              <span className={styles.mediaGlow} aria-hidden="true" />
              <img src={show.image} alt={`${show.title} — title card`} loading="lazy" />
              <span className={styles.playBadge} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26">
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </span>
            </a>

            <div className={styles.body}>
              <span
                className={`${styles.status} ${
                  show.status === 'streaming' ? styles.streaming : styles.growing
                }`}
              >
                {show.status === 'streaming' ? 'Now streaming' : 'Growing now'}
              </span>
              <h3 className={styles.showTitle}>
                {show.title}
                {show.trademark && <sup className={styles.tm}>™</sup>}
              </h3>
              <p className={styles.showTag}>{show.tag}</p>
              <p className={styles.blurb}>{show.blurb}</p>
              {show.status === 'streaming' ? (
                <a className={styles.link} href={links.youtube} target="_blank" rel="noreferrer">
                  Watch on YouTube
                  <Arrow />
                </a>
              ) : (
                <a className={styles.link} href="#newsletter">
                  Get notified at launch
                  <Arrow />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className={styles.arrow} aria-hidden="true">
      <path
        d="M5 12h14m0 0l-6-6m6 6l-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
