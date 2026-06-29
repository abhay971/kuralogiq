import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
      <h1 className="font-display text-fluid-xl font-bold">404</h1>
      <Link to="/" className="text-fluid-base underline underline-offset-4 hover:opacity-60">
        Back home
      </Link>
    </section>
  )
}
