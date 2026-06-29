'use client'

import { Bookmark, Mail, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/components/EditableReveal'

// Curation-focused contact lanes — kept on-theme for a bookmarking platform.
const lanes = [
  { icon: Bookmark, title: 'Suggest a resource', body: 'Found a link, tool, or reference worth saving? Tell us and we will add it to the right collection.' },
  { icon: Sparkles, title: 'Partner on a collection', body: 'Coordinate curated boards, themed shelves, and reference programs together.' },
  { icon: Mail, title: 'Curator support', body: 'Questions about organizing collections, topics, or your saved library? We can help.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <EditableReveal as="div">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="editable-display mt-4 text-4xl font-bold tracking-[-0.02em] sm:text-5xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
            <a href={`mailto:inbox@${SITE_CONFIG.domain}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]">
              
            </a>
            <div className="mt-8 grid gap-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(11,26,77,0.08)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                    <lane.icon className="h-5 w-5" />
                  </span>
                  <h2 className="editable-display mt-4 text-lg font-bold tracking-[-0.01em]">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{lane.body}</p>
                </div>
              ))}
            </div>
          </EditableReveal>

          <EditableReveal as="div" className="rounded-[1.75rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_18px_50px_rgba(11,26,77,0.07)] sm:p-9">
            <h2 className="editable-display text-2xl font-bold tracking-[-0.01em]">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </EditableReveal>
        </section>
      </main>
    </EditableSiteShell>
  )
}
