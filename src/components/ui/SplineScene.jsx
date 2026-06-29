import { Suspense, lazy } from 'react'

// Spline runtime is heavy (3D) — lazy-load so it never touches the initial chunk.
const Spline = lazy(() => import('@splinetool/react-spline'))

/**
 * Interactive 3D Spline scene. Pass a `scene` .splinecode URL.
 * Rendered only inside its section and code-split via React.lazy (perf budget).
 */
export default function SplineScene({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
