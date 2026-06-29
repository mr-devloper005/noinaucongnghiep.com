import Link from 'next/link'
import { ArrowRight, Bookmark, Compass, ShieldCheck } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/components/EditableReveal'

const valueIcons = [Bookmark, Compass, ShieldCheck]

export default function AboutPage() {
  const about = pagesContent.about
  return (
    <EditableSiteShell>
      <main>
        {/* Hero */}
        <section className="px-3 pt-4 sm:px-5 sm:pt-6">
          <div className="relative mx-auto w-full max-w-[var(--editable-container)] overflow-hidden rounded-[2rem] bg-[var(--slot4-ink)] px-6 py-14 text-[var(--slot4-on-ink)] sm:rounded-[2.5rem] sm:px-10 sm:py-20 lg:px-14">
            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[var(--slot4-lime)]/20 blur-[120px]" />
            <EditableReveal as="div" className="relative max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-lime)]">
                {about.badge}
              </span>
              <h1 className="editable-display mt-6 text-4xl font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-6xl">{about.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--slot4-on-ink-muted)] sm:text-lg">{about.description}</p>
              <Link href="/sbm" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-lime)] px-6 py-3.5 text-sm font-bold text-[var(--slot4-on-lime)] transition hover:brightness-95">
                Browse bookmarks <ArrowRight className="h-4 w-4" />
              </Link>
            </EditableReveal>
          </div>
        </section>

        {/* Story + values */}
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <EditableReveal as="article" className="rounded-[1.75rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 shadow-[0_18px_50px_rgba(11,26,77,0.06)] lg:p-12">
              <h2 className="editable-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">About {SITE_CONFIG.name}</h2>
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-[var(--slot4-muted-text)]">
                {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </EditableReveal>
            <EditableReveal as="div" stagger className="grid gap-4">
              {about.values.map((value, index) => {
                const Icon = valueIcons[index % valueIcons.length]
                return (
                  <div key={value.title} className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(11,26,77,0.08)]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="editable-display mt-4 text-lg font-bold tracking-[-0.01em]">{value.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{value.description}</p>
                  </div>
                )
              })}
            </EditableReveal>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
