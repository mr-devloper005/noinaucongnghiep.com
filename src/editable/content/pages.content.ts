import { slot4BrandConfig } from '@/editable/theme/brand.config'

const brand = slot4BrandConfig.siteName

export const pagesContent = {
  home: {
    metadata: {
      title: 'Curated bookmarks, collections, and resources',
      description: 'Save the links worth keeping and discover hand-picked resources, tools, and references through curated collections.',
      openGraphTitle: 'Curated bookmarks, collections, and resources',
      openGraphDescription: 'Discover curated bookmarks, themed collections, and reference resources in one calmer place to save and rediscover.',
      keywords: ['social bookmarking', 'curated collections', 'saved links', 'resource library', 'content discovery'],
    },
    hero: {
      badge: 'Curated bookmarks & collections',
      title: ['Save the links', 'worth keeping.'],
      description: 'A calmer home for resources, tools, and references — curate themed collections, save what matters, and rediscover the best of the web.',
      primaryCta: { label: 'Browse bookmarks', href: '/sbm' },
      secondaryCta: { label: 'Save a link', href: '/create' },
      searchPlaceholder: 'Search bookmarks, resources, topics…',
      focusLabel: 'Focus',
      featureCardBadge: 'fresh saves',
      featureCardTitle: 'The newest saves shape what you discover first.',
      featureCardDescription: 'Recently curated resources stay at the center of the experience so the best links always surface quickly.',
    },
    intro: {
      badge: 'Why curate here',
      title: 'Built for saving, organizing, and rediscovering the best links.',
      paragraphs: [
        'Instead of losing great resources in scattered tabs and bookmarks bars, this platform keeps them organized into clean, themed collections you can actually browse.',
        'Every saved link carries its source, a short note, and a topic — so a collection reads like a curated shelf, not a pile of URLs.',
        'Whether you start from a topic, a collection, or a search, you can keep discovering related resources without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Curated collections that group resources by topic and intent.',
        'Source, domain, and notes on every saved bookmark.',
        'Discovery surfaces for what is popular and freshly saved.',
        'Fast, readable browsing built to make exploring effortless.',
      ],
      primaryLink: { label: 'Browse bookmarks', href: '/sbm' },
      secondaryLink: { label: 'Search resources', href: '/search' },
    },
    cta: {
      badge: 'Start curating',
      title: 'Found a resource worth keeping? Save it to the library.',
      description: 'Add a link, give it a topic and a short note, and it becomes part of a collection others can discover.',
      primaryCta: { label: 'Save a link', href: '/create' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest saves in this collection.',
    },
  },
  about: {
    badge: 'Our Story',
    title: 'A calmer way to keep and rediscover great links.',
    description: `${brand} is built to make saving, curating, and discovering resources feel like one clean, connected experience.`,
    paragraphs: [
      'Great links get lost — buried in tabs, scattered across bookmark bars, forgotten in chats. We wanted a place where the resources worth keeping stay organized and easy to return to.',
      'Every bookmark here carries its source, a topic, and a short note, so collections read like curated shelves. Start from a topic, a collection, or a search and keep discovering without losing your place.',
    ],
    values: [
      {
        title: 'Curation first',
        description: 'We prioritize clean collections, clear topics, and useful notes so every saved link earns its place.',
      },
      {
        title: 'Connected discovery',
        description: 'Topics, collections, and resources stay linked, so finding the next useful thing feels effortless.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'Clean navigation, honest sources, and a fast reading rhythm help you find what you need faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${brand}`,
    title: 'Suggest a resource, partner on a collection, or just say hello.',
    description: 'Tell us what you want to save, curate, or feature. We will route it to the right shelf instead of forcing every request into one generic bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search resources',
      description: 'Search curated bookmarks, collections, topics, and resources across the library.',
    },
    hero: {
      badge: 'Search the library',
      title: 'Find the resource you saved — or the one you didn’t know you needed.',
      description: 'Search by keyword, topic, or collection to surface curated bookmarks and references from across the platform.',
      placeholder: 'Search by keyword, topic, source, or title',
    },
    resultsTitle: 'Latest curated resources',
  },
  create: {
    metadata: {
      title: 'Save a link',
      description: 'Save and curate a new bookmark for the library.',
    },
    locked: {
      badge: 'Curator access',
      title: 'Sign in to save a link.',
      description: 'Use your account to open the curation workspace and add bookmarks, notes, and topics to the library.',
    },
    hero: {
      badge: 'Curation workspace',
      title: 'Save a link to the library.',
      description: 'Add the resource URL, give it a topic, and write a short note — it becomes part of a collection others can discover.',
    },
    formTitle: 'Bookmark details',
    submitLabel: 'Save to library',
    successTitle: 'Bookmark saved successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Sign in to your curation workspace.',
      badge: 'Member access',
      title: 'Welcome back to your library.',
      description: 'Sign in to keep saving links, manage your collections, and curate resources from your account.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then sign in.',
      success: 'Signed in. Redirecting…',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your curation account.',
      badge: 'Curator access',
      title: 'Create your account and start curating.',
      description: 'Create an account to open the curation workspace, save bookmarks, and build collections worth sharing.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created. Redirecting…',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested resources',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
