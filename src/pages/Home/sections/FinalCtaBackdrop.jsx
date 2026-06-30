/**
 * FinalCtaBackdrop — Figma backdrop for the closing CTA: light (top, blends
 * with the section above) → blue → deep navy #001138 (bottom, connects to the
 * footer). Rendered inline so its filters / plus-lighter blends paint reliably,
 * and stretched (preserveAspectRatio="none") to fill the section.
 */
export default function FinalCtaBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      viewBox="0 0 1728 1752"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_558_139)">
        <rect width="1728" height="1752" fill="#F5F5F5" />
        <rect
          width="1737"
          height="1161"
          transform="matrix(1 0 0 -1 -4 1271)"
          fill="url(#paint0_linear_558_139)"
        />
        <g filter="url(#filter0_f_558_139)" style={{ mixBlendMode: 'plus-lighter' }}>
          <ellipse
            cx="186.606"
            cy="342.787"
            rx="186.606"
            ry="342.787"
            transform="matrix(0.977602 0.210464 0.210464 -0.977602 -283 754.452)"
            fill="white"
          />
        </g>
        <g filter="url(#filter1_f_558_139)" style={{ mixBlendMode: 'plus-lighter' }}>
          <ellipse
            cx="1756.57"
            cy="458.617"
            rx="186.606"
            ry="342.787"
            transform="rotate(167.85 1756.57 458.617)"
            fill="white"
          />
        </g>
        {/* Top band kept from the original, but filled with the page bg #F5F5F5
            (normal blend) instead of plus-lighter white — so the top resolves to
            #f5f5f5 and there's no bright seam against the section above. */}
        <g filter="url(#filter2_f_558_139)">
          <rect width="2140" height="238" transform="matrix(1 0 0 -1 -206 238)" fill="#F5F5F5" />
        </g>
        <g filter="url(#filter3_f_558_139)">
          <rect x="-198" y="1101" width="2124" height="651" fill="#001138" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_558_139"
          x="-804.656"
          y="-458.817"
          width="1552.45"
          height="1834.87"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="290" result="effect1_foregroundBlur_558_139" />
        </filter>
        <filter
          id="filter1_f_558_139"
          x="980.344"
          y="-458.817"
          width="1552.45"
          height="1834.87"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="290" result="effect1_foregroundBlur_558_139" />
        </filter>
        <filter
          id="filter2_f_558_139"
          x="-754"
          y="-548"
          width="3236"
          height="1334"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="274" result="effect1_foregroundBlur_558_139" />
        </filter>
        <filter
          id="filter3_f_558_139"
          x="-314"
          y="985"
          width="2356"
          height="883"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="58" result="effect1_foregroundBlur_558_139" />
        </filter>
        <linearGradient
          id="paint0_linear_558_139"
          x1="868.5"
          y1="0"
          x2="869.132"
          y2="1161"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#001138" />
          <stop offset="0.232092" stopColor="#002D8B" />
          <stop offset="0.443647" stopColor="#004FF7" />
          <stop offset="0.585349" stopColor="#008BFF" />
          <stop offset="0.727051" stopColor="#3DC3FC" />
          <stop offset="1" stopColor="#F2F7F9" />
        </linearGradient>
        <clipPath id="clip0_558_139">
          <rect width="1728" height="1752" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
