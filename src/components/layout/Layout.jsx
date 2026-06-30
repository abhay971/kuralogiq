import Header from '@/components/layout/Header'
// import Footer from '@/components/layout/Footer'

/**
 * App shell shared across every route: header, page content, footer.
 * The relative wrapper + overflow-clip guards against any decorative element
 * causing horizontal scroll. The flowing page gradient is composed from each
 * section's own background (neighboring sections share boundary colors).
 */
export default function Layout({ children }) {
  return (
    <div className="relative overflow-clip">
      <Header />
      <main id="main" className="relative min-h-screen">
        {children}
      </main>
      {/* <Footer /> temporarily removed while adjusting the FinalCta gradient */}
    </div>
  )
}
