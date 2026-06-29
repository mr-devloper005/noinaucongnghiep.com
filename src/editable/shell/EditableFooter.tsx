'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Mail, Send } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const [subscribed, setSubscribed] = useState(false)
  const footer = globalContent.footer

  // Curated columns only — no profile links, no raw task-archive nav.
  const platformLinks = [
    ['About', '/about'],
    ['Contact', '/contact'],
    ...(session ? [['Create', '/create']] : [['Sign in', '/login'], ['Sign up', '/signup']]),
  ] as const

  const onSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="px-3 pb-4 sm:px-5">
      <div className="mx-auto w-full max-w-[var(--editable-container)] overflow-hidden rounded-[2rem] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
        {/* Oversized brand wordmark band */}
        <div className="flex flex-col gap-6 border-b border-white/10 px-6 py-12 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-16">
          <h2 className="editable-display max-w-full break-words text-5xl font-extrabold uppercase leading-[0.85] tracking-[-0.04em] sm:text-7xl lg:text-8xl">{SITE_CONFIG.name}</h2>
          <p className="max-w-xs text-sm font-bold uppercase tracking-[0.16em] text-[var(--slot4-on-ink-muted)] lg:text-right">{footer.tagline}</p>
        </div>
        <div className="grid gap-12 px-6 py-12 sm:px-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr] lg:px-12 lg:py-16">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
             
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
              
              <span className="editable-display text-xl font-bold tracking-[-0.01em]">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--slot4-on-ink-muted)]">{footer.description}</p>
            <a
              href={`mailto:inbox@${SITE_CONFIG.domain}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[var(--slot4-accent)]"
            >
              
            </a>
          </div>

          {/* Link columns */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-on-ink-muted)]">{footer.columns[0].title}</h3>
            <div className="mt-5 grid gap-3">
              {footer.columns[0].links.map((link) => (
                <Link key={link.href} href={link.href} className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition hover:text-white">
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--slot4-on-ink-muted)]">Platform</h3>
            <div className="mt-5 grid gap-3">
              {platformLinks.map(([label, href]) => (
                <Link key={href} href={href} className="text-sm font-medium text-white/85 transition hover:text-white">{label}</Link>
              ))}
              {session ? (
                <button type="button" onClick={logout} className="text-left text-sm font-medium text-white/85 transition hover:text-white">Logout</button>
              ) : null}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="editable-display text-lg font-bold tracking-[-0.01em]">{footer.newsletterTitle}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--slot4-on-ink-muted)]">{footer.newsletterCopy}</p>
            {subscribed ? (
              <p className="mt-5 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white">You’re on the list — thanks for joining.</p>
            ) : (
              <form onSubmit={onSubscribe} className="mt-5 flex items-center gap-2 rounded-full bg-white p-1.5 pl-4">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
                />
                <button type="submit" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--slot4-accent)] px-4 py-2.5 text-sm font-bold text-[var(--slot4-on-accent)] transition hover:brightness-95">
                  <Send className="h-4 w-4" /> Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-6 text-xs font-medium text-[var(--slot4-on-ink-muted)] sm:flex-row sm:px-10 lg:px-12">
          <p>© {year} {SITE_CONFIG.name}. All rights reserved.</p>
          <p>{footer.bottomNote}</p>
        </div>
      </div>
    </footer>
  )
}
