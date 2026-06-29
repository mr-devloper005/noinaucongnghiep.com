import Link from 'next/link'
import { ArrowUpRight, Bookmark, Globe, Search, Sparkles, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableReveal } from '@/editable/components/EditableReveal'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

/* ------------------------------ data helpers ----------------------------- */
function contentOf(post?: SitePost | null) {
  return post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = contentOf(post)
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}…` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = contentOf(post)
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function rawDomain(post?: SitePost | null) {
  const content = contentOf(post)
  const url =
    (typeof content.website === 'string' && content.website) ||
    (typeof content.url === 'string' && content.url) ||
    (typeof content.link === 'string' && content.link) ||
    ''
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '')
}

function domainOf(post?: SitePost | null) {
  return rawDomain(post) || `${SITE_CONFIG.domain}`
}

function faviconFor(domain: string) {
  return domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64` : ''
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

// Topics derived from real post categories/tags, with curated fallbacks so the
// section always reads well even on a sparse feed.
function deriveTopics(posts: SitePost[], max = 8) {
  const counts = new Map<string, number>()
  for (const post of posts) {
    const cat = categoryOf(post)
    if (cat) counts.set(cat, (counts.get(cat) || 0) + 1)
  }
  const derived = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))
  const fallback = ['Design', 'Development', 'Productivity', 'Marketing', 'Tools', 'Inspiration', 'Reading', 'Reference']
    .map((name) => ({ name, count: 0 }))
  const merged = [...derived]
  for (const item of fallback) {
    if (merged.length >= max) break
    if (!merged.some((m) => m.name.toLowerCase() === item.name.toLowerCase())) merged.push(item)
  }
  return merged.slice(0, max)
}

/* ------------------------------ shared atoms ----------------------------- */
function SourceMark({ post, size = 'h-10 w-10' }: { post: SitePost; size?: string }) {
  const domain = domainOf(post)
  const favicon = faviconFor(domain)
  return (
    <span className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]`}>
      {favicon ? (
        <img src={favicon} alt="" className="h-5 w-5 object-contain" loading="lazy" />
      ) : (
        <Globe className="h-5 w-5 text-[var(--slot4-accent)]" />
      )}
    </span>
  )
}

// AWSA-style circular arrow badge — rotates on hover.
function ArrowCircle({ className = '', size = 'h-11 w-11' }: { className?: string; size?: string }) {
  return (
    <span className={`flex ${size} shrink-0 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:rotate-45 ${className}`}>
      <ArrowUpRight className="h-[18px] w-[18px]" />
    </span>
  )
}

// AWSA-style pill: label + filled circular arrow that spins on hover.
function ArrowPill({ href, label, tone = 'lime', external = false }: { href: string; label: string; tone?: 'lime' | 'ink' | 'ghost'; external?: boolean }) {
  const tones: Record<string, string> = {
    lime: 'bg-[var(--slot4-lime)] text-[var(--slot4-on-lime)]',
    ink: 'bg-[var(--slot4-page-text)] text-white',
    ghost: 'border border-white/30 text-white',
  }
  const dot: Record<string, string> = {
    lime: 'bg-[var(--slot4-on-lime)] text-[var(--slot4-lime)]',
    ink: 'bg-white text-[var(--slot4-page-text)]',
    ghost: 'bg-white text-[var(--slot4-page-text)]',
  }
  return (
    <Link
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-[13px] font-bold uppercase tracking-[0.12em] transition hover:opacity-95 ${tones[tone]}`}
    >
      {label}
      <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${dot[tone]}`}>
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  )
}

// AWSA section header: a heavy top rule, a numbered eyebrow, an oversized
// uppercase title and an optional intro / action on the right.
function SectionHead({ index, label, title, intro, action }: { index: string; label: string; title: string; intro?: string; action?: { href: string; label: string } }) {
  return (
    <div className="flex flex-col gap-7 border-t-2 border-[var(--slot4-page-text)] pt-7 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--slot4-accent)]">
          <span className="text-[var(--slot4-soft-muted-text)]">({index})</span> {label}
        </span>
        <h2 className="editable-display mt-4 text-balance text-4xl font-extrabold uppercase leading-[0.92] tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]">{title}</h2>
      </div>
      {intro || action ? (
        <div className="max-w-sm sm:pt-1.5">
          {intro ? <p className="text-sm leading-7 text-[var(--slot4-muted-text)]">{intro}</p> : null}
          {action ? (
            <Link href={action.href} className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]">
              {action.label} <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

// Scrolling "trusted by" marquee strip.
function Marquee({ items }: { items: string[] }) {
  if (!items.length) return null
  const row = [...items, ...items]
  return (
    <div className="editable-marquee group relative overflow-hidden border-y-2 border-[var(--slot4-page-text)] py-4">
      <div className="editable-marquee-track flex items-center gap-10 whitespace-nowrap pr-10">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center gap-10 text-base font-extrabold uppercase tracking-[0.06em] text-[var(--slot4-page-text)] sm:text-lg">
            {item}
            <Star className="h-4 w-4 shrink-0 fill-[var(--slot4-accent)] text-[var(--slot4-accent)]" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ================================ HERO =================================== */
export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const featured = pool[0]
  const heroImage = featured ? getEditablePostImage(featured) : ''
  const hero = pagesContent.home.hero
  const heroTitle = hero.title || ['Save the links', 'worth keeping.']
  const topics = deriveTopics(pool, 6)

  const resourceCount = pool.length
  const topicCount = new Set(pool.map((p) => categoryOf(p)).filter(Boolean)).size

  const stats = [
    { value: resourceCount ? `${resourceCount}+` : '500+', label: 'Resources curated' },
    { value: topicCount ? `${topicCount}+` : '40+', label: 'Topics covered' },
    { value: timeSections.length ? `${timeSections.length}` : '3', label: 'Live collections' },
  ]

  // Marquee items: real domains where present, otherwise topic names.
  const marqueeItems = (() => {
    const domains = Array.from(new Set(pool.map((p) => rawDomain(p)).filter(Boolean))).slice(0, 10)
    if (domains.length >= 6) return domains
    return Array.from(new Set([...domains, ...topics.map((t) => t.name)])).slice(0, 10)
  })()

  return (
    <section className="px-3 pt-4 sm:px-5 sm:pt-6">
      <div className="relative mx-auto w-full max-w-[var(--editable-container)] overflow-hidden rounded-[2rem] bg-[var(--slot4-ink)] text-[var(--slot4-on-ink)] sm:rounded-[2.5rem]">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--slot4-lime)]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-white/10 blur-[120px]" />

        <div className="relative grid items-center gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:px-14 lg:py-20">
          <EditableReveal as="div">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-on-ink-muted)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-lime)]" /> {hero.badge}
            </span>
            <h1 className="editable-display mt-6 text-balance text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.035em] sm:text-6xl lg:text-[5.25rem]">
              {heroTitle.map((line, i) => (
                <span key={line} className={i === heroTitle.length - 1 ? 'block text-[var(--slot4-lime)]' : 'block'}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[var(--slot4-on-ink-muted)] sm:text-lg">{hero.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ArrowPill href={hero.primaryCta.href} label={hero.primaryCta.label} tone="lime" />
              <ArrowPill href={hero.secondaryCta.href} label={hero.secondaryCta.label} tone="ghost" />
            </div>

            <form action="/search" className="mt-7 flex w-full max-w-xl items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-[0_18px_50px_rgba(0,0,0,0.3)]">
              <Search className="h-5 w-5 shrink-0 text-[var(--slot4-muted-text)]" />
              <input
                name="q"
                placeholder={hero.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
              />
              <button className="shrink-0 rounded-full bg-[var(--slot4-lime)] px-6 py-2.5 text-sm font-bold text-[var(--slot4-on-lime)] transition hover:brightness-95">
                Search
              </button>
            </form>
          </EditableReveal>

          {/* Featured bookmark visual */}
          <EditableReveal as="div" className="relative">
            {featured ? (
              <Link
                href={postHref(primaryTask, featured, primaryRoute)}
                className="group block overflow-hidden rounded-[1.75rem] bg-white text-[var(--slot4-page-text)] shadow-[0_30px_80px_rgba(0,0,0,0.4)] transition duration-500 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
                  {heroImage ? (
                    <img src={heroImage} alt={featured.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  ) : null}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-lime)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-on-lime)]">
                    <Bookmark className="h-3.5 w-3.5" /> Featured
                  </span>
                </div>
                <div className="flex items-start gap-3 p-5">
                  <SourceMark post={featured} />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{domainOf(featured)}</p>
                    <h3 className="mt-1 line-clamp-2 text-lg font-bold leading-snug tracking-[-0.01em]">{featured.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(featured, 110)}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-[1.75rem] bg-white/5 p-10 text-center text-[var(--slot4-on-ink-muted)]">
                <Bookmark className="mx-auto h-10 w-10 text-[var(--slot4-lime)]" />
                <p className="mt-4 text-sm">Freshly curated bookmarks will appear here.</p>
              </div>
            )}
          </EditableReveal>
        </div>

        {/* Stats band — oversized numbers */}
        <div className="relative border-t border-white/10 px-6 py-7 sm:px-10 lg:px-14">
          <div className="grid grid-cols-3 gap-4 text-center sm:max-w-2xl sm:text-left">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="editable-display text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">{stat.value}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-on-ink-muted)] sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trusted-by marquee */}
      <div className="mx-auto mt-10 w-full max-w-[var(--editable-container)] sm:mt-14">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  )
}

/* ============== BROWSE BY TOPIC — AWSA numbered service rows ============== */
export function EditableStoryRail({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const topics = deriveTopics(pool, 7)
  if (!topics.length) return null

  return (
    <section className={`${container} py-16 sm:py-24`}>
      <EditableReveal as="div">
        <SectionHead
          index="01"
          label="Explore"
          title="Browse by topic"
          intro="Jump straight into the collections you care about — curated links grouped by theme, intent and source."
          action={{ href: primaryRoute, label: 'All bookmarks' }}
        />
      </EditableReveal>

      <EditableReveal as="div" stagger className="mt-10">
        {topics.map((topic, index) => (
          <Link
            key={topic.name}
            href={`${primaryRoute}?category=${encodeURIComponent(topic.name.toLowerCase())}`}
            className="group flex items-center justify-between gap-6 border-b border-[var(--editable-border)] py-6 sm:py-8"
          >
            <div className="flex min-w-0 items-baseline gap-5 sm:gap-9">
              <span className="editable-display shrink-0 text-sm font-bold text-[var(--slot4-soft-muted-text)] sm:text-base">{String(index + 1).padStart(2, '0')}</span>
              <span className="editable-display truncate text-3xl font-extrabold uppercase tracking-[-0.02em] text-[var(--slot4-page-text)] transition duration-300 group-hover:text-[var(--slot4-accent)] sm:text-5xl">
                {topic.name}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-5">
              <span className="hidden text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)] sm:block">
                {topic.count ? `${topic.count} saved` : 'Collection'}
              </span>
              <ArrowCircle className="text-[var(--slot4-page-text)] group-hover:border-[var(--slot4-accent)] group-hover:bg-[var(--slot4-accent)] group-hover:text-white" />
            </div>
          </Link>
        ))}
      </EditableReveal>
    </section>
  )
}

/* =========== FEATURED COLLECTIONS — AWSA project cards + popular ========== */
function ProjectCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const category = categoryOf(post) || 'Collection'
  return (
    <Link href={href} className="group relative block overflow-hidden rounded-[1.5rem] bg-[var(--slot4-media-bg)]">
      <div className="aspect-[4/3] overflow-hidden">
        {image ? <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : null}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(13,14,7,0.86))]" />
      <span className="absolute left-5 top-5 rounded-full bg-[var(--slot4-lime)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-on-lime)]">{category}</span>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">{domainOf(post)}</p>
          <h3 className="editable-display mt-1.5 line-clamp-2 text-2xl font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-white sm:text-3xl">{post.title}</h3>
        </div>
        <ArrowCircle className="border-white/40 text-white group-hover:border-white group-hover:bg-white group-hover:text-[var(--slot4-page-text)]" />
      </div>
    </Link>
  )
}

function PopularRow({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex items-center gap-4 border-b border-[var(--editable-border)] py-4 transition">
      <span className="editable-display w-8 shrink-0 text-lg font-extrabold text-[var(--slot4-soft-muted-text)]">{String(index + 1).padStart(2, '0')}</span>
      <SourceMark post={post} size="h-10 w-10" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--slot4-accent)]">{domainOf(post)}</p>
        <h3 className="mt-0.5 line-clamp-1 font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--slot4-muted-text)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--slot4-accent)]" />
    </Link>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  if (!pool.length) return null
  const projects = pool.slice(0, 2)
  const popular = pool.slice(2, 8)

  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`${container} py-16 sm:py-24`}>
        <EditableReveal as="div">
          <SectionHead
            index="02"
            label="Featured"
            title="The resources everyone’s saving"
            intro="Hand-picked collections and the links curators are returning to most this week."
            action={{ href: primaryRoute, label: 'See all' }}
          />
        </EditableReveal>

        <EditableReveal as="div" stagger className="mt-10 grid gap-6 lg:grid-cols-2">
          {projects.map((post) => (
            <ProjectCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </EditableReveal>

        {popular.length ? (
          <div className="mt-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Popular this week</p>
            <EditableReveal as="div" stagger className="mt-4 grid gap-x-10 border-t border-[var(--slot4-page-text)] sm:grid-cols-2">
              {popular.map((post, index) => (
                <PopularRow key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </EditableReveal>
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* =================== BOOKMARK CARD GRID (time sections) =================== */
function BookmarkCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_22px_50px_rgba(20,22,12,0.12)]"
    >
      <div className="flex items-start gap-3">
        <SourceMark post={post} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-[var(--slot4-accent)]">{domainOf(post)}</p>
          {category ? <span className="mt-1 inline-block rounded-full bg-[var(--slot4-panel-bg)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--slot4-muted-text)]">{category}</span> : null}
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--slot4-soft-muted-text)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--slot4-accent)]" />
      </div>
      <h3 className="editable-display mt-4 line-clamp-2 text-lg font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 130)}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--slot4-accent)]">
        Open resource <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'Latest saves' },
  browse: { eyebrow: 'Deep collection', title: 'Browse the library' },
  index: { eyebrow: 'Evergreen', title: 'From the archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={index % 2 === 0 ? '' : 'bg-[var(--slot4-surface-bg)]'}>
            <div className={`${container} py-16 sm:py-24`}>
              <EditableReveal as="div">
                <SectionHead
                  index={String(index + 3).padStart(2, '0')}
                  label={copy.eyebrow}
                  title={copy.title}
                  action={{ href: section.href || primaryRoute, label: 'See all' }}
                />
              </EditableReveal>
              <EditableReveal as="div" stagger className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post) => (
                  <BookmarkCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
                ))}
              </EditableReveal>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ================================= CTA ================================== */
export function EditableHomeCta() {
  const cta = pagesContent.home.cta
  return (
    <section id="get-app" className="scroll-mt-24 px-3 py-10 sm:px-5 sm:py-14">
      <div className="relative mx-auto w-full max-w-[var(--editable-container)] overflow-hidden rounded-[2rem] bg-[var(--slot4-ink)] px-6 py-16 text-center text-[var(--slot4-on-ink)] sm:rounded-[2.5rem] sm:px-10 sm:py-24">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[var(--slot4-lime)]/20 blur-[110px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-[110px]" />
        <EditableReveal as="div" className="relative mx-auto flex max-w-3xl flex-col items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-on-ink-muted)]">
            <Bookmark className="h-3.5 w-3.5 text-[var(--slot4-lime)]" /> {cta.badge}
          </span>
          <h2 className="editable-display mt-6 text-balance text-4xl font-extrabold uppercase leading-[0.92] tracking-[-0.03em] sm:text-5xl lg:text-6xl">{cta.title}</h2>
          <p className="mt-5 max-w-xl text-base text-[var(--slot4-on-ink-muted)] sm:text-lg">{cta.description}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ArrowPill href={cta.primaryCta.href} label={cta.primaryCta.label} tone="lime" />
            <ArrowPill href={cta.secondaryCta.href} label={cta.secondaryCta.label} tone="ghost" />
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}
