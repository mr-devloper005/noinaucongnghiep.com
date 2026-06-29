'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Bookmark, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: Bookmark,
}

const fieldClass = 'rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3 text-sm font-medium text-[var(--slot4-page-text)] outline-none transition placeholder:text-[var(--slot4-muted-text)] focus:border-[var(--slot4-accent)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  // Curation workspace — never offers the hidden profile task.
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'sbm') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="px-3 py-5 sm:px-5 sm:py-8">
          <section className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] shadow-[0_24px_70px_rgba(11,26,77,0.10)] sm:rounded-[2.5rem] md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-[var(--slot4-ink)] text-[var(--slot4-on-ink)]">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--slot4-lime)]/20 blur-[100px]" />
              <Lock className="relative h-20 w-20 opacity-80" />
            </div>
            <div className="self-center p-8 sm:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{pagesContent.create.locked.badge}</p>
              <h1 className="editable-display mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-[var(--slot4-muted-text)]">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-bold text-white transition hover:brightness-95">Sign in <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-6 py-3 text-sm font-bold transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">Create account</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{pagesContent.create.hero.badge}</p>
            <h1 className="editable-display mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl">{pagesContent.create.hero.title}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--slot4-muted-text)]">{pagesContent.create.hero.description}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {enabledTasks.map((item) => {
                const Icon = taskIcon[item.key] || FileText
                const active = item.key === task
                return (
                  <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`rounded-2xl border p-4 text-left transition ${active ? 'border-transparent bg-[var(--slot4-ink)] text-[var(--slot4-on-ink)]' : 'border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]/40'}`}>
                    <Icon className={`h-5 w-5 ${active ? 'text-[var(--slot4-lime)]' : 'text-[var(--slot4-accent)]'}`} />
                    <span className="mt-3 block text-sm font-bold">{item.label}</span>
                    <span className={`mt-1 block text-xs ${active ? 'text-[var(--slot4-on-ink-muted)]' : 'text-[var(--slot4-muted-text)]'}`}>{item.description}</span>
                  </button>
                )
              })}
            </div>
          </aside>

          <form onSubmit={submit} className="rounded-[1.75rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_18px_50px_rgba(11,26,77,0.07)] sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">Save {activeTask?.label || 'resource'}</p>
                <h2 className="editable-display mt-1 text-2xl font-bold tracking-[-0.02em]">{pagesContent.create.formTitle}</h2>
              </div>
              <span className="rounded-full bg-[var(--slot4-panel-bg)] px-4 py-2 text-xs font-bold">{session.name}</span>
            </div>

            <div className="mt-6 grid gap-4">
              <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Resource title" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Topic or category" />
                <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Resource URL" />
              </div>
              <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Preview image URL" />
              <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short note — why is this worth saving?" required />
              <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Notes, details, or description" required />
            </div>

            {created ? (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                <p className="flex items-center gap-2 text-sm font-bold"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                <p className="mt-1 text-sm opacity-80">{created.title}</p>
              </div>
            ) : null}

            <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 text-sm font-bold text-white transition hover:brightness-95 active:scale-[0.99]">
              <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
            </button>
          </form>
        </div>
      </main>
    </EditableSiteShell>
  )
}
