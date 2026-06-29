import logoLockup from '@/assets/icons/logo-lockup-white.png'

/**
 * Site footer (Figma node 362:4003 group). The deep navy from the CTA dome above
 * continues here unbroken (#011138 — no seam, no partition), and a black,
 * rounded-top card (Rectangle 136) sits on it slightly inset, so thin navy
 * strips show at its edges. The heartbeat / ECG line (node 355:3692) caps the
 * card, its spikes poking up into the navy. Four link columns split by vertical
 * rules, then the copyright line and the white logo lockup. Static.
 */
const COLUMNS = [
  {
    title: 'Product',
    links: [
      'AI Capabilities',
      'Features',
      'Scheduling*',
      'Charting*',
      'Billing & RCM*',
      'Engagement*',
      'Patient Portal*',
      'Telehealth*',
      'Reporting*',
      'Integrations*',
      'Groups & Franchise*',
    ],
  },
  {
    title: 'Specialties',
    links: ['Chiropractic', 'Mental Health', 'Nutrition', 'Integrative Med', 'Pricing'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Contact', 'Careers', 'Integrative Med'],
  },
  {
    title: 'Trust & Legal',
    links: [
      'Security & Trust',
      'HIPAA Statement',
      'Privacy Policy',
      'Terms of Service',
      'Cookie Policy',
    ],
  },
]

// Heartbeat / ECG trace that caps the card, edge to edge. Baseline at y=B in a
// viewBox of height H, with five clean QRS clusters — a small lead-in bump, one
// tall sharp R spike, then a sharp S dip below the baseline, back to flat. The
// fill is the card's black silhouette below the trace; the stroke is the bright
// ECG line. Long flat baseline between clusters.
const H = 74
const B = 50
const FILL = '#0c0c0f'
const CENTERS = [160, 420, 680, 940, 1200]
const cluster = (cx) =>
  `L${cx - 16},${B} L${cx - 10},${B - 8} L${cx - 5},${B} L${cx},6 L${cx + 6},${B + 16} L${cx + 12},${B}`
const TRACE_PATH = `M0,${B} ${CENTERS.map((cx) => cluster(cx)).join(' ')} L1320,${B}`
const FILL_PATH = `M0,${H} L0,${B} ${CENTERS.map((cx) => cluster(cx)).join(' ')} L1320,${B} L1320,${H} Z`

export default function Footer() {
  return (
    <footer className="relative bg-[#011138] pt-10 text-white [overflow-x:clip] md:pt-12">
      {/* Full-bleed black card, square top — the heartbeat IS the top edge,
          spanning edge to edge, so there's no rounded "lid" / ring. */}
      <div
        className="relative"
        style={{ background: 'linear-gradient(180deg, #0c0c0f 0%, #0a0a0c 45%, #060608 100%)' }}
      >
        {/* Heartbeat cap on the card's top edge, spikes poking into the navy above */}
        <svg
          aria-hidden="true"
          viewBox={`0 0 1320 ${H}`}
          preserveAspectRatio="none"
          className="absolute bottom-full left-0 right-0 h-12 w-full md:h-16"
        >
          <path d={FILL_PATH} fill={FILL} />
          <path
            d={TRACE_PATH}
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="container-px pt-14 pb-12 md:pt-16">
          {/* Link columns: 2-up on mobile → 4-up on desktop, divided by rules */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {COLUMNS.map((col, i) => (
              <div
                key={col.title}
                className={`flex flex-col gap-3 px-0 lg:px-8 ${
                  i > 0 ? 'lg:border-l lg:border-white/12' : ''
                }`}
              >
                <h2 className="mb-1 font-display text-lg text-white">{col.title}</h2>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link} className="flex items-center gap-2">
                      {link.endsWith('*') && (
                        <span aria-hidden="true" className="text-white/40">
                          •
                        </span>
                      )}
                      <a
                        href="#"
                        className="text-fluid-sm text-white/65 transition-colors duration-200 hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Bottom row: copyright (left) + logo lockup (right) */}
          <div className="mt-12 flex flex-col-reverse items-center gap-8 sm:flex-row sm:items-end sm:justify-between md:mt-16">
            <p className="text-fluid-sm text-white/55">© 2026 KURALOGIQ. All rights reserved.</p>
            <img
              src={logoLockup}
              alt="Kuralogiq — premium practice management & EHR"
              width={340}
              height={115}
              loading="lazy"
              decoding="async"
              className="h-12 w-auto md:h-16"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
