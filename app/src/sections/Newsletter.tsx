import { useState, type FormEvent } from 'react'
import { useReveal } from '../lib/motion'
import styles from './Newsletter.module.css'

export default function Newsletter() {
  const ref = useReveal<HTMLElement>()
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    // Wire to MailerLite (account 1739117) or your ESP here.
    setDone(true)
  }

  return (
    <section className={styles.cta} id="newsletter" ref={ref} aria-labelledby="cta-h">
      <div className={styles.foliage} aria-hidden="true">
        <span className={styles.f1} />
        <span className={styles.f2} />
      </div>

      <img className={styles.parrot} src="characters/babagha.png" alt="" aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <span className={`seed-tag ${styles.tag} reveal`}>
          <span className="seed-tag__dot" /> Opening soon
        </span>
        <h2 id="cta-h" className={`${styles.title} reveal`} data-reveal-delay="80">
          Be the first through the gate
        </h2>
        <p className={`${styles.sub} reveal`} data-reveal-delay="140">
          New episodes, sneak peeks, and printables land in your inbox before anyone else. One email
          a fortnight, tops.
        </p>

        {done ? (
          <div className={styles.success} role="status">
            <span className={styles.successIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22">
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
            You&rsquo;re in. A seed has been planted, watch your inbox.
          </div>
        ) : (
          <form className={`${styles.form} reveal`} data-reveal-delay="200" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="cta-email">
              Email address
            </label>
            <input
              id="cta-email"
              className={styles.input}
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <button type="submit" className={`btn btn--primary ${styles.submit}`}>
              Join the garden
            </button>
          </form>
        )}
        <p className={`${styles.fine} reveal`} data-reveal-delay="260">
          No spam, ever. Unsubscribe in one tap.
        </p>
      </div>
    </section>
  )
}
