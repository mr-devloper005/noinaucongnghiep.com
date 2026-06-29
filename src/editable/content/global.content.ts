import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Curated bookmarks & collections',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Curated bookmarks & collections',
    primaryLinks: [
      { label: 'Bookmarks', href: '/sbm' },
      { label: 'Search', href: '/search' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse bookmarks', href: '/sbm' },
      secondary: { label: 'Contact', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Save it. Curate it. Discover it.',
    description:
      'A calmer home for the links worth keeping — curated bookmarks, themed collections, and reference resources, all in one place to save and rediscover.',
    newsletterTitle: 'Get the weekly curation',
    newsletterCopy: 'A short digest of the best new resources, tools, and collections — straight to your inbox.',
    columns: [
      {
        title: 'Discover',
        links: [
          { label: 'All bookmarks', href: '/sbm' },
          { label: 'Search resources', href: '/search' },
          { label: 'Save a link', href: '/create' },
        ],
      },
      {
        title: 'Platform',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Sign in', href: '/login' },
        ],
      },
    ],
    bottomNote: 'Built for clean discovery and connected curation.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Saved',
  },
} as const
