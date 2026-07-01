import { Link, useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { cn } from '@/lib/utils'
import logoPill from '@/assets/icons/logo-pill.png'

/**
 * Brand logo. Default: the complete Figma logo lockup (rounded pill + KURALOGIQ
 * wordmark + pulse mark + tagline) as a single image — no clipping wrapper, so
 * nothing crops. `bare` renders a plain text wordmark (used in the footer).
 *
 * Clicking the logo while already on its target route smooth-scrolls to the top
 * (a same-route <Link> doesn't change the pathname, so ScrollToTop won't fire).
 */
export default function Logo({ className, bare = false, to = '/' }) {
  const lenis = useLenis()
  const { pathname } = useLocation()

  const handleClick = () => {
    if (pathname === to) lenis?.scrollTo(0, { duration: 1.2 })
  }

  if (bare) {
    return (
      <Link
        to={to}
        onClick={handleClick}
        className={cn('text-white', className)}
        aria-label="Kuralogiq home"
      >
        <span className="font-display font-medium uppercase tracking-[0.18em]">Kuralogiq</span>
      </Link>
    )
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      aria-label="Kuralogiq home"
      className={cn('inline-flex', className)}
    >
      <img
        src={logoPill}
        alt="Kuralogiq"
        width={764}
        height={192}
        className="h-11 w-auto rounded-full md:h-12"
      />
    </Link>
  )
}
