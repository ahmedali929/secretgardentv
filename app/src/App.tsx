import { useSmoothScroll } from './lib/motion'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Mission from './sections/Mission'
import Shows from './sections/Shows'
import Family from './sections/Family'
import Parents from './sections/Parents'
import Newsletter from './sections/Newsletter'
import Footer from './components/Footer'

export default function App() {
  useSmoothScroll()
  return (
    <>
      <a className="skip-link" href="#shows">
        Skip to content
      </a>
      <Nav />
      <main id="content">
        <Hero />
        <Mission />
        <Shows />
        <Family />
        <Parents />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
