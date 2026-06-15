import { useReveal } from '../lib/motion'
import styles from './Mission.module.css'

const plants = [
  { label: 'Good character', sub: 'Akhlaq that sticks' },
  { label: 'First Arabic', sub: 'Words, letters, songs' },
  { label: "Qur'an & dua", sub: 'For everyday moments' },
  { label: 'Real wonder', sub: 'Science, nature, awe' },
]

export default function Mission() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className={styles.mission} ref={ref} aria-labelledby="mission-h">
      <div className={`shell ${styles.inner}`}>
        <p className={`${styles.kicker} reveal`}>The Secret Garden idea</p>
        <h2 id="mission-h" className={`${styles.statement} reveal`} data-reveal-delay="80">
          Every child is born with a garden inside them. We make the stories that help it grow.
        </h2>
        <p className={`${styles.lead} reveal`} data-reveal-delay="160">
          Secret Garden TV is an independent Islamic animation studio. No filler, no preachy
          lectures. Just characters kids fall for, and lessons that take root because the show is
          actually good.
        </p>

        <ul className={styles.plants}>
          {plants.map((p, i) => (
            <li
              key={p.label}
              className={`${styles.plant} reveal`}
              data-reveal-delay={200 + i * 90}
            >
              <span className={styles.plantIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path
                    d="M12 22V11M12 11c0-3-2-5-6-5 0 4 2 5 6 5Zm0-1c0-3 2-6 6-6 0 4-2 6-6 6Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={styles.plantText}>
                <strong>{p.label}</strong>
                <span>{p.sub}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
