import { lazy } from 'react'

/**
 * Route table. Pages are lazy-loaded so each route ships its own JS chunk —
 * the homepage never pays for the Work/About/Contact code up front.
 */
const Home = lazy(() => import('@/pages/Home/Home.jsx'))
const Work = lazy(() => import('@/pages/Work/Work.jsx'))
const About = lazy(() => import('@/pages/About/About.jsx'))
const Contact = lazy(() => import('@/pages/Contact/Contact.jsx'))
const NotFound = lazy(() => import('@/pages/NotFound/NotFound.jsx'))

export const routes = [
  { path: '/', element: <Home />, label: 'Home' },
  { path: '/work', element: <Work />, label: 'Work' },
  { path: '/about', element: <About />, label: 'About' },
  { path: '/contact', element: <Contact />, label: 'Contact' },
  { path: '*', element: <NotFound />, label: 'Not found' },
]
