import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HEADER_LINKS } from '@/constants/site'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'
import Button from '@/components/ui/Button'

/**
 * Floating glassmorphic header (Figma: white/20 + backdrop-blur pill).
 * Desktop: logo · center links · Sign In / Book a Demo.
 * Mobile: logo · Book a Demo · menu toggle → full-screen overlay.
 */
export default function Header() {
  const [open, setOpen] = useState(false)

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', open)
    return () => document.documentElement.classList.remove('lenis-stopped')
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4">
      <div className="container-px">
        <div className="flex items-center justify-between gap-4 rounded-full border border-white/40 bg-white/20 p-2 pl-3 backdrop-blur-xl md:p-2.5 md:pl-4">
          <Logo />

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {HEADER_LINKS.map((link) =>
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="font-display text-base text-ink transition-opacity hover:opacity-60"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-display text-base text-ink transition-opacity hover:opacity-60"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="outline" href="#signin" className="px-5 py-3 text-base">
              Sign In
            </Button>
            <Button href="#demo" className="px-5 py-3 text-base">
              Book a Demo
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex size-11 items-center justify-center rounded-full border border-ink/20 md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={cn(
                  'absolute left-0 top-0 h-0.5 w-full bg-ink transition-transform duration-300',
                  open && 'translate-y-[5px] rotate-45'
                )}
              />
              <span
                className={cn(
                  'absolute bottom-0 left-0 h-0.5 w-full bg-ink transition-transform duration-300',
                  open && '-translate-y-[5px] -rotate-45'
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 -z-10 flex flex-col justify-center gap-2 bg-paper px-6 transition-opacity duration-300 md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        {HEADER_LINKS.map((link) =>
          link.to ? (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className="font-display text-4xl text-ink"
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl text-ink"
            >
              {link.label}
            </a>
          )
        )}
        <div className="mt-8 flex flex-col gap-3">
          <Button variant="outline" href="#signin" onClick={() => setOpen(false)}>
            Sign In
          </Button>
          <Button href="#demo" onClick={() => setOpen(false)}>
            Book a Demo
          </Button>
        </div>
      </div>
    </header>
  )
}
