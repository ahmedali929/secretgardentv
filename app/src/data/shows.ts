export type Show = {
  id: string
  title: string
  trademark?: boolean
  tag: string
  blurb: string
  image: string
  accent: string
  ink: string
  status: 'streaming' | 'growing'
}

export const shows: Show[] = [
  {
    id: 'allah-secret-signs',
    title: "Allah's Secret Signs",
    trademark: true,
    tag: 'The science show for Muslims',
    blurb:
      'Baba and Ali hunt for the signs of Allah hidden inside seeds, stars, and tiny creatures. Real science, read as wonder.',
    image: 'shows/allah-secret-signs.jpg',
    accent: 'var(--sprout-300)',
    ink: 'var(--canopy-900)',
    status: 'streaming',
  },
  {
    id: 'nurheart-fables',
    title: 'Nurheart Fables',
    trademark: true,
    tag: 'Tiny adventures, timeless wisdom',
    blurb:
      'Bite-size fables where a small choice grows into a big lesson about honesty, patience, and a soft heart.',
    image: 'shows/nurheart-fables.jpg',
    accent: 'var(--bloom-400)',
    ink: 'oklch(0.32 0.09 28)',
    status: 'streaming',
  },
  {
    id: 'babagha-sadiqi',
    title: 'Babagha Sadiqi',
    trademark: true,
    tag: 'Fly into the world of Arabic',
    blurb:
      'Babagha the parrot turns first Arabic words into songs you cannot stop humming. Letters, sounds, and a lot of flapping.',
    image: 'shows/babagha-sadiqi.jpg',
    accent: 'var(--leaf-500)',
    ink: 'oklch(0.99 0.01 150)',
    status: 'streaming',
  },
  {
    id: 'toy-box-stories',
    title: 'Toy Box Stories',
    trademark: true,
    tag: 'Following the Sunnah with toys',
    blurb:
      'When the lights go out, the toy box comes alive and acts out the manners of the Prophet ﷺ, one small kindness at a time.',
    image: 'shows/toy-box-stories.jpg',
    accent: 'var(--honey-400)',
    ink: 'oklch(0.32 0.06 70)',
    status: 'growing',
  },
  {
    id: 'quran-safari',
    title: "Qur'an Safari with Taha Tiger",
    trademark: true,
    tag: 'A world of Qur’anic prayers',
    blurb:
      'Taha Tiger leads a safari through the garden, collecting the little duas that fit every moment of a child’s day.',
    image: 'shows/quran-safari.jpg',
    accent: 'var(--sky-200)',
    ink: 'oklch(0.3 0.06 230)',
    status: 'growing',
  },
]
