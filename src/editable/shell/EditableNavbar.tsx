'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, LogOut, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG, getTaskConfig } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

// Public navigation — focused on the essential pages. No profile items, no raw
// task-archive links. "Bookmarks" routes to the live SBM archive dynamically.
function usePublicNav() {
  return useMemo(() => {
    const bookmarks = getTaskConfig('sbm')?.route || '/sbm'
    return [
      { label: 'Home', href: '/' },
      { label: 'Bookmarks', href: bookmarks },
      { label: 'Search', href: '/search' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ]
  }, [])
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = usePublicNav()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50">
      <div className={`px-3 transition-all duration-500 sm:px-5 ${scrolled ? 'pt-2.5' : 'pt-3.5 sm:pt-5'}`}>
        <nav
          className={`mx-auto flex w-full max-w-[var(--editable-container)] items-center gap-4 rounded-full border border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/95 px-3 backdrop-blur-xl transition-all duration-500 sm:px-5 ${
            scrolled ? 'h-14 shadow-[0_10px_30px_rgba(11,26,77,0.10)]' : 'h-16 shadow-[0_14px_44px_rgba(11,26,77,0.08)]'
          }`}
        >
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--slot4-ink)] transition group-hover:scale-105">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
            </span>
            <span className="editable-display max-w-[180px] truncate text-[1.05rem] font-bold tracking-[-0.01em] text-[var(--slot4-page-text)]">
              {SITE_CONFIG.name}
            </span>
          </Link>

          <div className="mx-auto hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative rounded-full px-4 py-2 text-[13px] font-bold uppercase tracking-[0.12em] transition ${
                    active
                      ? 'text-[var(--slot4-page-text)]'
                      : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-[var(--slot4-accent)] transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              )
            })}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:ml-0">
            <Link
              href="/search"
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--slot4-muted-text)] transition hover:bg-[var(--slot4-panel-bg)] hover:text-[var(--slot4-page-text)]"
            >
              <Search className="h-[18px] w-[18px]" />
            </Link>

            {session ? (
              <>
                <span className="hidden max-w-[140px] truncate rounded-full bg-[var(--slot4-panel-bg)] px-3.5 py-2 text-sm font-semibold text-[var(--slot4-page-text)] sm:inline-block">
                  {session.name}
                </span>
                <Link
                  href="/create"
                  className="hidden items-center gap-1.5 rounded-full bg-[var(--slot4-ink)] px-4 py-2.5 text-sm font-semibold text-[var(--slot4-on-ink)] transition hover:opacity-90 sm:inline-flex"
                >
                  <PlusCircle className="h-4 w-4" /> Create
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="hidden items-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)] sm:inline-flex"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)] sm:inline-flex"
                >
                  <LogIn className="h-4 w-4" /> Sign in
                </Link>
                <Link
                  href="/signup"
                  className="hidden items-center gap-1.5 rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-95 active:scale-[0.98] sm:inline-flex"
                >
                  <UserPlus className="h-4 w-4" /> Sign up
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-panel-bg)] lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {open ? (
        <div className="px-3 pt-2 lg:hidden">
          <div className="mx-auto w-full max-w-[var(--editable-container)] rounded-3xl border border-[var(--editable-border)] bg-[var(--editable-nav-bg)] p-4 shadow-[0_18px_50px_rgba(11,26,77,0.12)]">
            <div className="grid gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? 'bg-[var(--slot4-panel-bg)] text-[var(--slot4-accent)]'
                        : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-panel-bg)] hover:text-[var(--slot4-page-text)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-[var(--editable-border)] pt-3">
              {session ? (
                <>
                  <span className="rounded-full bg-[var(--slot4-panel-bg)] px-4 py-2.5 text-sm font-semibold">{session.name}</span>
                  <Link href="/create" onClick={() => setOpen(false)} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-ink)] px-4 py-2.5 text-sm font-semibold text-[var(--slot4-on-ink)]">
                    <PlusCircle className="h-4 w-4" /> Create
                  </Link>
                  <button type="button" onClick={() => { logout(); setOpen(false) }} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--editable-border)] px-4 py-2.5 text-sm font-semibold text-[var(--slot4-muted-text)]">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--editable-border)] px-4 py-2.5 text-sm font-semibold">
                    <LogIn className="h-4 w-4" /> Sign in
                  </Link>
                  <Link href="/signup" onClick={() => setOpen(false)} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-on-accent)]">
                    <UserPlus className="h-4 w-4" /> Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
