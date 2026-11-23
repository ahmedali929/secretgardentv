const pages = {
  index: ['Explore Secret Garden TV, an Islamic educational media organization creating faith-centered stories and shows for children.'],
  about: ['Learn about the mission, educational approach, and team behind Secret Garden TV for Kids.'],
  program: ['Explore Secret Garden TV shows about science, Arabic, Qur’anic prayers, character, and the Sunnah.'],
  'allah-secret-signs': ['Explore Allah’s Secret Signs, a science series that helps children discover signs of Allah in nature.'],
  'babagha-sadiqi': ['Discover Babagha Sadiqi, an Arabic-learning adventure for children.'],
  'nurheart-fables': ['Explore Nurheart Fables, an animated series about character and timeless wisdom.'],
  'quran-safari': ['Explore Qur’an Safari with Taha Tiger and discover Qur’anic prayers through stories.'],
  'toy-box-stories': ['Explore Toy Box Stories, a series for children about following the Sunnah through play.'],
  blog: ['Read Secret Garden TV articles about Islamic learning, parenting, and character development.'],
  'blog-teaching-adab-everyday-moments': ['Explore ways to teach adab through everyday moments with children.', 'article'],
  'blog-raising-purposeful-children': ['Read about raising purposeful children in a noisy world.', 'article'],
  faq: ['Find answers about Secret Garden TV, its programs, and how families can watch or support the shows.'],
  donate: ['Support Secret Garden TV’s educational programming for children and learn how donations are used.'],
  'blog-detail': ['A Secret Garden TV blog template.', 'article', false],
  'blog-test': ['No blog posts yet — new stories are sprouting soon. Join the SGTV newsletter to get the first read.', 'website', false],
  landingpage: ['An alternate introduction to Secret Garden TV for Kids.', 'website', false],
};

export const legacyPages = Object.fromEntries(Object.entries(pages).map(
  ([slug, [description, type = 'website', inSitemap = true]]) => [slug, {
    slug,
    description,
    type,
    inSitemap,
    canonicalPath: slug === 'index' ? '/' : `/${slug}.html`,
  }],
));
