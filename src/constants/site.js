// Central site config + navigation. Single source of truth for routes & meta.

export const SITE = {
  name: 'Kuralogiq',
  url: import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173',
  description: 'Kuralogiq — crafted with motion.',
}

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

// Marketing header links. "AI" is a dedicated route; the rest anchor to
// homepage sections.
export const HEADER_LINKS = [
  { label: 'AI', to: '/ai' },
  { label: 'Features', href: '#features' },
  { label: 'Specialties', href: '#specialties' },
  { label: 'Pricing', href: '#pricing' },
]
