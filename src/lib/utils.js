/**
 * Tiny className joiner. Filters falsy values so you can do:
 *   cn('btn', isActive && 'btn--active', className)
 * Keep it dependency-free; upgrade to clsx + tailwind-merge only if needed.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
