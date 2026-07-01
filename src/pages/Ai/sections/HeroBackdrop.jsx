/**
 * HeroBackdrop — the Figma gradient behind the /ai hero + workflows band
 * (node 639:143). Light at the top (blends with the page bg behind the
 * headline) → blue → deep navy #001138 at the bottom (behind the trust badges),
 * with soft white plus-lighter glows. Inlined so its filters / blend modes
 * paint reliably, and stretched (preserveAspectRatio="none") to fill the
 * combined height of the two sections it sits behind.
 */
export default function HeroBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      width="1728"
      height="1696"
      viewBox="0 0 1728 1696"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_639_143)">
        <rect width="1728" height="1696" transform="matrix(1 0 0 -1 0 1696)" fill="#F5F5F5" />
        <path d="M-174 1771H1903V382H-174V1771Z" fill="url(#paint0_linear_639_143)" />
        <g filter="url(#filter0_f_639_143)" style={{ mixBlendMode: 'plus-lighter' }}>
          <ellipse
            cx="186.606"
            cy="342.787"
            rx="186.606"
            ry="342.787"
            transform="matrix(0.977602 0.210464 0.210464 -0.977602 -283 1157.45)"
            fill="white"
          />
        </g>
        <g filter="url(#filter1_f_639_143)" style={{ mixBlendMode: 'plus-lighter' }}>
          <ellipse
            cx="1756.57"
            cy="861.617"
            rx="186.606"
            ry="342.787"
            transform="rotate(167.85 1756.57 861.617)"
            fill="white"
          />
        </g>
        <g filter="url(#filter2_f_639_143)" style={{ mixBlendMode: 'plus-lighter' }}>
          <path d="M-237 341H1903V103H-237V341Z" fill="white" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_639_143"
          x="-804.656"
          y="-55.8176"
          width="1552.45"
          height="1834.87"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="290" result="effect1_foregroundBlur_639_143" />
        </filter>
        <filter
          id="filter1_f_639_143"
          x="980.344"
          y="-55.8176"
          width="1552.45"
          height="1834.87"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="290" result="effect1_foregroundBlur_639_143" />
        </filter>
        <filter
          id="filter2_f_639_143"
          x="-745"
          y="-405"
          width="3156"
          height="1254"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="254" result="effect1_foregroundBlur_639_143" />
        </filter>
        <linearGradient
          id="paint0_linear_639_143"
          x1="864.5"
          y1="1771"
          x2="865.256"
          y2="382"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#001138" />
          <stop offset="0.232092" stopColor="#002D8B" />
          <stop offset="0.443647" stopColor="#004FF7" />
          <stop offset="0.585349" stopColor="#008BFF" />
          <stop offset="0.727051" stopColor="#3DC3FC" />
          {/* Snapped from Figma's #F2F7F9 to the page bg #F5F5F5 so the light top
              matches the page exactly (no bluish seam behind the headline). */}
          <stop offset="1" stopColor="#F5F5F5" />
        </linearGradient>
        <clipPath id="clip0_639_143">
          <rect width="1728" height="1696" fill="white" transform="matrix(1 0 0 -1 0 1696)" />
        </clipPath>
      </defs>
    </svg>
  )
}
