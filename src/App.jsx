import { Suspense } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import { routes } from '@/router/routes'
import SmoothScrollProvider from '@/providers/SmoothScrollProvider'
import Layout from '@/components/layout/Layout'
import ScrollToTop from '@/components/transitions/ScrollToTop'
import PageTransition from '@/components/transitions/PageTransition'

export default function App() {
  const element = useRoutes(routes)
  const location = useLocation()

  return (
    <SmoothScrollProvider>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={null}>
          {/* key on pathname so the enter transition replays per route */}
          <PageTransition key={location.pathname}>{element}</PageTransition>
        </Suspense>
      </Layout>
    </SmoothScrollProvider>
  )
}
