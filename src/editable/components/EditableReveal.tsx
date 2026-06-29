'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

/*
  Premium scroll-reveal wrapper.

  Renders its children immediately (server + client) so content is ALWAYS in the
  DOM and visible. On mount it flags `.reveal-ready` on <html>, which lets the
  CSS in editable-global.css hide tagged elements until an IntersectionObserver
  adds `.is-visible`. If JS never runs, `.reveal-ready` is never set and
  everything stays visible — the animation is purely additive.
*/

let readyFlagged = false

function flagReady() {
  if (readyFlagged || typeof document === 'undefined') return
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  document.documentElement.classList.add('reveal-ready')
  readyFlagged = true
}

type RevealProps = {
  children: ReactNode
  className?: string
  /** stagger direct children instead of the block as a whole */
  stagger?: boolean
  as?: ElementType
}

export function EditableReveal({ children, className = '', stagger = false, as }: RevealProps) {
  const Tag = (as || 'div') as ElementType
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    flagReady()
    const node = ref.current
    if (!node) return
    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`${stagger ? 'reveal-stagger' : 'reveal'} ${className}`}>
      {children}
    </Tag>
  )
}
