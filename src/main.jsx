import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App.jsx'
import '@/animations/gsap' // register GSAP plugins once, app-wide
import '@/index.css'

// Own the scroll position ourselves — stop the browser from restoring the prior
// scroll on reload (which, with Lenis, lands you at the footer). We always start
// at the top (see ScrollToTop).
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
