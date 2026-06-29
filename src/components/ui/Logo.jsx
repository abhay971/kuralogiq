import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import logoPill from '@/assets/icons/logo-pill.png'

/**
 * Brand logo. Default: the complete Figma logo lockup (rounded pill + KURALOGIQ
 * wordmark + pulse mark + tagline) as a single image — no clipping wrapper, so
 * nothing crops. `bare` renders a plain text wordmark (used in the footer).
 */
export default function Logo({ className, bare = false, to = '/' }) {
  if (bare) {
    return (
      <Link to={to} className={cn('text-white', className)} aria-label="Kuralogiq home">
        <span className="font-display font-medium uppercase tracking-[0.18em]">Kuralogiq</span>
      </Link>
    )
  }

  return (
    <Link to={to} aria-label="Kuralogiq home" className={cn('inline-flex', className)}>
      <img
        src={logoPill}
        alt="Kuralogiq"
        width={764}
        height={192}
        className="h-12 w-auto rounded-full md:h-14"
      />
    </Link>
  )
}
