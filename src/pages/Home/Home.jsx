import Hero from '@/pages/Home/sections/Hero'
import BandBackdrop from '@/pages/Home/sections/BandBackdrop'
import NoSalesCall from '@/pages/Home/sections/NoSalesCall'
import Specialties from '@/pages/Home/sections/Specialties'
import AiAssist from '@/pages/Home/sections/AiAssist'
import AiReviewable from '@/pages/Home/sections/AiReviewable'
import FinishNote from '@/pages/Home/sections/FinishNote'
import FrontDesk from '@/pages/Home/sections/FrontDesk'
import Patients from '@/pages/Home/sections/Patients'
import LiveDemo from '@/pages/Home/sections/LiveDemo'
import MultiLocation from '@/pages/Home/sections/MultiLocation'
import Security from '@/pages/Home/sections/Security'
import TakeTheDemo from '@/pages/Home/sections/TakeTheDemo'
import FinalCta from '@/pages/Home/sections/FinalCta'

/**
 * Home — composed of section components, one per Figma section, in page order.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <NoSalesCall />
      <Specialties />
      <AiAssist />
      <AiReviewable />
      <FinishNote />

      {/* Shared Figma backdrop for the dark stretch (light → orange → black →
          green → light). Stretched to the combined height of these 5 sections;
          each section's own background is transparent so this shows through. */}
      <div className="relative">
        <BandBackdrop />
        <FrontDesk />
        <Patients />
        <LiveDemo />
        <MultiLocation />
        <Security />
      </div>

      <TakeTheDemo />
      <FinalCta />
    </>
  )
}
