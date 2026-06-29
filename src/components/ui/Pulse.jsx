/**
 * Heartbeat/EKG pulse line from the Figma hero ("One ⩘ platform.").
 * Inline SVG so it inherits `currentColor` and scales crisply.
 */
export default function Pulse({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 129 73"
      fill="none"
      role="presentation"
      aria-hidden="true"
    >
      <path
        d="M2 37.7147H34.7381L43.6667 22.2499L50.2027 46.6429L62.1648 2.00006L70.4524 70.4524L79.381 25.8096L82.3571 37.7143H127"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
