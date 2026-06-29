import type { CSSProperties } from 'react'

export const editableRootStyle = {
  // Reference-matched "studio" system: a warm off-white canvas, crisp white
  // cards, near-black "ink" panels for hero/CTA/footer, and a confident
  // lime-green accent. The accent stays readable both as text on light and as a
  // fill with white text; a brighter "lime" highlight is reserved for the dark
  // panels where it pops. One palette change cascades site-wide.
  '--slot4-page-bg': '#f4f3ec',
  '--slot4-page-text': '#14160c',
  '--slot4-panel-bg': '#eceadf',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#5c5e4e',
  '--slot4-soft-muted-text': '#8b8c7b',
  '--slot4-accent': '#4d7c0f',
  '--slot4-accent-fill': '#4d7c0f',
  '--slot4-accent-soft': '#eef6d6',
  '--slot4-on-accent': '#ffffff',
  // Bright chartreuse highlight — used only on dark "ink" surfaces.
  '--slot4-lime': '#c8f24e',
  '--slot4-on-lime': '#14160c',
  // Near-black warm "ink" — the brand's signature dark surface.
  '--slot4-ink': '#15170d',
  '--slot4-ink-2': '#0d0e07',
  '--slot4-ink-soft': '#23261a',
  '--slot4-on-ink': '#ffffff',
  '--slot4-on-ink-muted': '#bcbeac',
  '--slot4-dark-bg': '#0d0e07',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#eceadf',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f4f3ec',
  '--slot4-lavender': '#ffffff',
  '--slot4-gray': '#eceadf',
  '--slot4-body-gradient': 'none',
  '--editable-page-bg': '#f4f3ec',
  '--editable-page-text': '#14160c',
  '--editable-container': '1300px',
  '--editable-border': '#e4e2d5',
  '--editable-nav-bg': '#ffffff',
  '--editable-nav-text': '#14160c',
  '--editable-nav-active': '#4d7c0f',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#4d7c0f',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#ffffff',
  '--editable-footer-bg': '#0d0e07',
  '--editable-footer-text': '#ffffff',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  limeBg: 'bg-[var(--slot4-lime)]',
  limeText: 'text-[var(--slot4-lime)]',
  onLimeText: 'text-[var(--slot4-on-lime)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  inkBg: 'bg-[var(--slot4-ink)]',
  inkText: 'text-[var(--slot4-on-ink)]',
  inkMutedText: 'text-[var(--slot4-on-ink-muted)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_1px_3px_rgba(0,0,0,0.08)]',
  shadowStrong: 'shadow-[0_4px_18px_rgba(0,0,0,0.12)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[140px] shrink-0 snap-start sm:w-[160px]',
  },
  type: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]',
    heroTitle: 'text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.02em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-xl border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-bold tracking-[0.01em] text-[var(--slot4-on-accent)] transition duration-200 hover:brightness-95 active:scale-[0.98]`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-bold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-200 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] active:scale-[0.98]`,
    accent: `inline-flex items-center justify-center gap-2 rounded-lg ${editablePalette.accentBg} px-6 py-3 text-sm font-bold text-[var(--slot4-on-accent)] transition duration-200 hover:brightness-95 active:scale-[0.98]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the MysteryCoder reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
