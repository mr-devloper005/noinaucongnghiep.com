import type { Metadata } from 'next'
import Link from 'next/link'
import { Bookmark, Check } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Sign in', description: pagesContent.auth.login.metadataDescription })
}

const perks = ['Save links into themed collections', 'Pick up where you left off', 'Discover what others are curating']

export default function LoginPage() {
  const copy = pagesContent.auth.login
  return (
    <EditableSiteShell>
      <main className="px-3 py-5 sm:px-5 sm:py-8">
        <section className="mx-auto grid w-full max-w-[var(--editable-container)] overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] shadow-[0_24px_70px_rgba(11,26,77,0.10)] sm:rounded-[2.5rem] lg:grid-cols-2">
          {/* Promo */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-[var(--slot4-ink)] p-12 text-[var(--slot4-on-ink)] lg:flex">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--slot4-lime)]/20 blur-[110px]" />
            <div className="relative inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Bookmark className="h-5 w-5 text-[var(--slot4-lime)]" /></span>
              <span className="editable-display text-lg font-bold">{SITE_CONFIG.name}</span>
            </div>
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-lime)]">{copy.badge}</p>
              <h1 className="editable-display mt-4 text-4xl font-extrabold leading-[1.06] tracking-[-0.03em]">{copy.title}</h1>
              <p className="mt-4 max-w-md text-base leading-7 text-[var(--slot4-on-ink-muted)]">{copy.description}</p>
              <ul className="mt-8 space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-white/90">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--slot4-lime)]/20 text-[var(--slot4-lime)]"><Check className="h-3.5 w-3.5" /></span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <h2 className="editable-display text-2xl font-bold tracking-[-0.01em]">{copy.formTitle}</h2>
            <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Welcome back to {SITE_CONFIG.name}.</p>
            <EditableLocalLoginForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">New here? <Link href="/signup" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{copy.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
