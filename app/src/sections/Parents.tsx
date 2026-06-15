import { useReveal } from '../lib/motion'
import styles from './Parents.module.css'

const checks = [
  {
    title: 'Faith-first, never preachy',
    body: 'Values live inside the story, not bolted on at the end as a lesson.',
  },
  {
    title: 'Made by Muslim parents',
    body: 'Written and drawn by people who would happily show it to their own kids.',
  },
  {
    title: 'Calm by design',
    body: 'No ads, no autoplay rabbit holes, no frantic edits. Gentle pacing on purpose.',
  },
  {
    title: 'Actually good telly',
    body: 'Animation and writing your children will choose, not just tolerate.',
  },
]

export default function Parents() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className={styles.parents} id="why" ref={ref} aria-labelledby="why-h">
      <div className={`shell ${styles.grid}`}>
        <div className={styles.left}>
          <span className={`seed-tag ${styles.tag} reveal`}>
            <span className="seed-tag__dot" /> For parents
          </span>
          <h2 id="why-h" className={`${styles.title} reveal`} data-reveal-delay="70">
            Screen time you don&rsquo;t have to hover over
          </h2>
          <p className={`${styles.lead} reveal`} data-reveal-delay="130">
            You already vet everything that reaches their eyes. We build Secret Garden so that, for
            once, you can hand over the remote and relax.
          </p>

          <ul className={styles.checks}>
            {checks.map((c, i) => (
              <li
                key={c.title}
                className={`${styles.check} reveal`}
                data-reveal-delay={180 + i * 80}
              >
                <span className={styles.tick} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      d="M5 13l4 4L19 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>
                  <strong>{c.title}</strong>
                  <span className={styles.checkBody}>{c.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside className={`${styles.gift} reveal`} data-reveal-delay="160">
          <span className={styles.giftEmoji} aria-hidden="true">
            <svg viewBox="0 0 48 48" width="56" height="56">
              <path
                d="M24 44V16M24 16c-2-7-7-10-15-10-1 9 4 14 15 14Zm0 0c2-7 7-10 15-10 1 9-4 14-15 14Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h3 className={styles.giftTitle}>A little welcome gift</h3>
          <p className={styles.giftBody}>
            Print-at-home coloring pages from the garden. Quiet-afternoon approved, crayon-tested.
          </p>
          <a
            className="btn btn--primary"
            href="secret-garden-coloring-book.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Download the coloring book
          </a>
          <p className={styles.giftMeta}>Free PDF · no email required</p>
        </aside>
      </div>
    </section>
  )
}
