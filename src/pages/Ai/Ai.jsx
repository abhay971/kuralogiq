import HeroBackdrop from '@/pages/Ai/sections/HeroBackdrop'
import AiHero from '@/pages/Ai/sections/AiHero'
import Workflows from '@/pages/Ai/sections/Workflows'
import Documenting from '@/pages/Ai/sections/Documenting'
import AppointmentPrepared from '@/pages/Ai/sections/AppointmentPrepared'
import Claims from '@/pages/Ai/sections/Claims'
import RiskSignals from '@/pages/Ai/sections/RiskSignals'
import PracticeAi from '@/pages/Ai/sections/PracticeAi'
import Accountable from '@/pages/Ai/sections/Accountable'
import BuiltForHealthcare from '@/pages/Ai/sections/BuiltForHealthcare'
import Faq from '@/pages/Ai/sections/Faq'
import AiFinalCta from '@/pages/Ai/sections/AiFinalCta'

/**
 * Ai — the "AI that assists. Clinicians who decide." page (Figma node 461:2906),
 * composed of one section component per Figma block, in page order. The closing
 * CTA's blue dome blends straight into the footer's navy.
 */
export default function Ai() {
  return (
    <>
      {/* Shared Figma gradient (light headline → deep navy badges) behind the
          hero + workflows band. Each section is transparent so it shows through;
          the band ends on a clean navy edge that meets the light section below. */}
      <div className="relative overflow-x-clip">
        <HeroBackdrop />
        <AiHero />
        <Workflows />
      </div>

      <Documenting />
      <AppointmentPrepared />
      <Claims />
      <RiskSignals />
      <PracticeAi />
      <Accountable />
      <BuiltForHealthcare />
      <Faq />
      <AiFinalCta />
    </>
  )
}
