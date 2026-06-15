import { useReveal } from '../lib/motion'
import styles from './Family.module.css'

type Member = {
  name: string
  role: string
  line: string
  img: string
  bg: string
  scale?: number
}

const family: Member[] = [
  {
    name: 'Ali',
    role: 'The curious one',
    line: 'Collects more questions than answers, and asks “but why?” about everything.',
    img: 'characters/ali.png',
    bg: 'var(--honey-400)',
  },
  {
    name: 'Baba',
    role: 'The gentle guide',
    line: 'Has a story (and usually a snack) ready for every situation.',
    img: 'characters/baba.png',
    bg: 'var(--leaf-500)',
  },
  {
    name: 'Tata',
    role: 'The wisdom keeper',
    line: 'Turns every chore into a tiny lesson, and every lesson into a hug.',
    img: 'characters/grandma.png',
    bg: 'var(--bloom-400)',
  },
  {
    name: 'Babagha',
    role: 'The noisy parrot',
    line: 'Repeats each new Arabic word until it sticks. Loudly. On a loop.',
    img: 'characters/babagha.png',
    bg: 'var(--sprout-400)',
    scale: 0.78,
  },
]

export default function Family() {
  const ref = useReveal<HTMLElement>()
  return (
    <section className={styles.family} id="family" ref={ref} aria-labelledby="family-h">
      <div className={`shell ${styles.head}`}>
        <span className={`seed-tag ${styles.tag} reveal`}>
          <span className="seed-tag__dot" /> The cast
        </span>
        <h2 id="family-h" className={`${styles.title} reveal`} data-reveal-delay="80">
          Meet the garden family
        </h2>
        <p className={`${styles.intro} reveal`} data-reveal-delay="140">
          The faces your little ones will be quoting at the dinner table by next week.
        </p>
      </div>

      <div className={`shell ${styles.grid}`}>
        {family.map((m, i) => (
          <article
            key={m.name}
            className={`${styles.card} reveal`}
            data-reveal-delay={i * 100}
            style={{ '--bg': m.bg } as React.CSSProperties}
          >
            <div className={styles.stage}>
              <span className={styles.blob} aria-hidden="true" />
              <img
                src={m.img}
                alt={`${m.name}, ${m.role}`}
                className={styles.char}
                style={{ '--scale': m.scale ?? 1 } as React.CSSProperties}
                loading="lazy"
              />
            </div>
            <div className={styles.meta}>
              <h3 className={styles.name}>{m.name}</h3>
              <p className={styles.role}>{m.role}</p>
              <p className={styles.line}>{m.line}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
