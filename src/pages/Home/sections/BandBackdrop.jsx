/**
 * BandBackdrop — the single Figma backdrop for the page's dark stretch
 * (FrontDesk → Security): light → orange sunrise → black → green sunrise →
 * light. Rendered inline so its SVG filters / plus-lighter blends paint
 * reliably (CSS background-image rasterization drops them). Stretched with
 * preserveAspectRatio="none" so its three colour zones scale to the actual
 * combined height of the sections it sits behind.
 *
 * TOP_PAD adds empty (#f5f5f5 page-bg) space ABOVE the artwork inside the
 * viewBox, which pushes the whole colour band DOWN while keeping the light
 * bottom anchored at the section's end. This avoids the seam lines that a
 * translate-y would cause (it never exposes the SVG's top/bottom edges).
 * Increase TOP_PAD to move the band further down, decrease to move it up.
 */
const ART_H = 5692
const TOP_PAD = 900

export default function BandBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      viewBox={`0 0 1728 ${ART_H + TOP_PAD}`}
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_558_109)" transform={`translate(0 ${TOP_PAD})`}>
        <rect width="1728" height="5692" fill="#F5F5F5" />
        <rect x="-19" y="3028" width="1745" height="1500" fill="#010101" />
        <g filter="url(#filter0_f_558_109)">
          <rect x="-169" y="2107" width="2064" height="1081" fill="black" />
        </g>
        <g filter="url(#filter1_f_558_109)">
          <path d="M-168 1668H1909V279H-168V1668Z" fill="url(#paint0_radial_558_109)" />
        </g>
        <g filter="url(#filter2_f_558_109)" style={{ mixBlendMode: 'plus-lighter' }}>
          <ellipse
            cx="186.606"
            cy="342.787"
            rx="186.606"
            ry="342.787"
            transform="matrix(0.977602 0.210464 0.210464 -0.977602 -277 1054.45)"
            fill="white"
          />
        </g>
        <g filter="url(#filter3_f_558_109)" style={{ mixBlendMode: 'plus-lighter' }}>
          <ellipse
            cx="1762.57"
            cy="758.617"
            rx="186.606"
            ry="342.787"
            transform="rotate(167.85 1762.57 758.617)"
            fill="white"
          />
        </g>
        {/* Top white glow band removed: with the backdrop translated down its
            top edge is exposed mid-page, and this band made that edge brighter
            than the #f5f5f5 page bg → visible seam line. Base rect (#F5F5F5)
            now meets the page bg seamlessly.
        <g filter="url(#filter4_f_558_109)" style={{ mixBlendMode: 'plus-lighter' }}>
          <path d="M-231 238H1909V0H-231V238Z" fill="white" />
        </g> */}
        <g filter="url(#filter5_f_558_109)">
          <path d="M-168 4212H1909V5601H-168V4212Z" fill="url(#paint1_radial_558_109)" />
        </g>
        <g filter="url(#filter6_f_558_109)" style={{ mixBlendMode: 'plus-lighter' }}>
          <ellipse
            cx="-22.4294"
            cy="5121.38"
            rx="186.606"
            ry="342.787"
            transform="rotate(-12.1496 -22.4294 5121.38)"
            fill="white"
          />
        </g>
        <g filter="url(#filter7_f_558_109)" style={{ mixBlendMode: 'plus-lighter' }}>
          <ellipse
            cx="186.606"
            cy="342.787"
            rx="186.606"
            ry="342.787"
            transform="matrix(-0.977602 -0.210464 -0.210464 0.977602 2017.14 4825.55)"
            fill="white"
          />
        </g>
        {/* Bottom white glow band removed: it brightened the backdrop's bottom
            edge past the #f5f5f5 page bg, creating a seam with the next section
            (TakeTheDemo, which is bg-paper #f5f5f5). Base rect (#F5F5F5) now
            meets it seamlessly.
        <g filter="url(#filter8_f_558_109)" style={{ mixBlendMode: 'plus-lighter' }}>
          <path d="M-231 5454H1909V5692H-231V5454Z" fill="white" />
        </g> */}
        <g filter="url(#filter9_f_558_109)">
          <ellipse cx="925" cy="1667.5" rx="458" ry="439.5" fill="url(#paint2_linear_558_109)" />
        </g>
        <g filter="url(#filter10_f_558_109)">
          <ellipse cx="298" cy="1939" rx="744" ry="497" fill="url(#paint3_linear_558_109)" />
        </g>
        <g filter="url(#filter11_f_558_109)">
          <ellipse
            cx="744"
            cy="497"
            rx="744"
            ry="497"
            transform="matrix(1 0 0 -1 -446 4438)"
            fill="url(#paint4_linear_558_109)"
          />
        </g>
        <g filter="url(#filter12_f_558_109)">
          <ellipse cx="1429" cy="1939" rx="744" ry="497" fill="url(#paint5_linear_558_109)" />
        </g>
        <g filter="url(#filter13_f_558_109)">
          <ellipse
            cx="744"
            cy="497"
            rx="744"
            ry="497"
            transform="matrix(1 0 0 -1 685 4438)"
            fill="url(#paint6_linear_558_109)"
          />
        </g>
        <g filter="url(#filter14_f_558_109)">
          <ellipse cx="925" cy="2044" rx="744" ry="497" fill="url(#paint7_linear_558_109)" />
        </g>
        <g filter="url(#filter15_f_558_109)">
          <ellipse
            cx="744"
            cy="497"
            rx="744"
            ry="497"
            transform="matrix(1 0 0 -1 181 4333)"
            fill="url(#paint8_linear_558_109)"
          />
        </g>
        {/* Bottom fade: the white side-glows (filter6/7) brighten Security's
            bottom to full white right up to the section edge, which doesn't
            match the #f5f5f5 page → seam. Drawn last, this forces the band's
            bottom slice to resolve to #f5f5f5 (sits BEHIND the cards, so only
            the empty area below them is affected). */}
        <rect x="-200" y="5150" width="2200" height="542" fill="url(#paintBottomFade_558_109)" />
      </g>
      <defs>
        <linearGradient
          id="paintBottomFade_558_109"
          x1="0"
          y1="5150"
          x2="0"
          y2="5650"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F5F5F5" stopOpacity="0" />
          <stop offset="1" stopColor="#F5F5F5" />
        </linearGradient>
        <filter
          id="filter0_f_558_109"
          x="-389"
          y="1887"
          width="2504"
          height="1521"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="110" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter1_f_558_109"
          x="-276"
          y="171"
          width="2293"
          height="1605"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="54" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter2_f_558_109"
          x="-798.656"
          y="-158.818"
          width="1552.45"
          height="1834.87"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="290" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter3_f_558_109"
          x="986.344"
          y="-158.818"
          width="1552.45"
          height="1834.87"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="290" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter4_f_558_109"
          x="-739"
          y="-508"
          width="3156"
          height="1254"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="254" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter5_f_558_109"
          x="-276"
          y="4104"
          width="2293"
          height="1605"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="54" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter6_f_558_109"
          x="-798.656"
          y="4203.95"
          width="1552.45"
          height="1834.87"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="290" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter7_f_558_109"
          x="986.344"
          y="4203.95"
          width="1552.45"
          height="1834.87"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="290" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter8_f_558_109"
          x="-739"
          y="4946"
          width="3156"
          height="1254"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="254" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter9_f_558_109"
          x="119"
          y="880"
          width="1612"
          height="1575"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="174" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter10_f_558_109"
          x="-706"
          y="1182"
          width="2008"
          height="1514"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="130" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter11_f_558_109"
          x="-706"
          y="3184"
          width="2008"
          height="1514"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="130" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter12_f_558_109"
          x="425"
          y="1182"
          width="2008"
          height="1514"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="130" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter13_f_558_109"
          x="425"
          y="3184"
          width="2008"
          height="1514"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="130" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter14_f_558_109"
          x="-79"
          y="1287"
          width="2008"
          height="1514"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="130" result="effect1_foregroundBlur_558_109" />
        </filter>
        <filter
          id="filter15_f_558_109"
          x="-79"
          y="3079"
          width="2008"
          height="1514"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="130" result="effect1_foregroundBlur_558_109" />
        </filter>
        <radialGradient
          id="paint0_radial_558_109"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(845.987 1668) rotate(-90) scale(1265.77 3609.34)"
        >
          <stop stopColor="#822D00" />
          <stop offset="0.232092" stopColor="#CF4800" />
          <stop offset="0.443647" stopColor="#F77300" />
          <stop offset="0.585349" stopColor="#FF9100" />
          <stop offset="0.727051" stopColor="#FCCF3D" />
          {/* Final stop snapped from Figma's #F2F7F9 to the page bg #F5F5F5 so
              the band's light end matches the page exactly (no bluish seam). */}
          <stop offset="1" stopColor="#F5F5F5" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_558_109"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(845.987 4212) rotate(90) scale(1265.77 3609.34)"
        >
          <stop stopColor="#003818" />
          <stop offset="0.232092" stopColor="#008B66" />
          <stop offset="0.443647" stopColor="#00F798" />
          <stop offset="0.585349" stopColor="#00FFA6" />
          <stop offset="0.727051" stopColor="#3DFCC6" />
          {/* Final stop snapped from Figma's #F2F7F9 to the page bg #F5F5F5 so
              the cyan finish matches the next section exactly (no bluish seam). */}
          <stop offset="1" stopColor="#F5F5F5" />
        </radialGradient>
        <linearGradient
          id="paint2_linear_558_109"
          x1="925"
          y1="1228"
          x2="925"
          y2="2107"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4A1A00" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_558_109"
          x1="298"
          y1="1442"
          x2="298"
          y2="2436"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4A1A00" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_558_109"
          x1="744"
          y1="0"
          x2="744"
          y2="994"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#065537" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_558_109"
          x1="1429"
          y1="1442"
          x2="1429"
          y2="2436"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4A1A00" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_558_109"
          x1="744"
          y1="0"
          x2="744"
          y2="994"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#065537" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_558_109"
          x1="925"
          y1="1547"
          x2="925"
          y2="2541"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4A1A00" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_558_109"
          x1="744"
          y1="0"
          x2="744"
          y2="994"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#065537" />
          <stop offset="1" />
        </linearGradient>
        <clipPath id="clip0_558_109">
          <rect width="1728" height="5692" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
