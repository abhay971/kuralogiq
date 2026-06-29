import { useEffect, useRef } from 'react'

/**
 * ShaderBackground — full-bleed animated WebGL2 fragment-shader background
 * (fiery nebula "clouds" by Matthias Hurrle / @atzedent), adapted to plain JS.
 *
 * Drop it behind hero content with `absolute inset-0`. It is performance-aware:
 * caps DPR, pauses the render loop when the tab is hidden or the canvas scrolls
 * offscreen, respects `prefers-reduced-motion` (renders a single static frame),
 * and disposes the GL program + listeners on unmount.
 */

const VERTEX_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

const FRAGMENT_SRC = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
    float d=1., t=.0;
    for (float i=.0; i<3.; i++) {
        float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
        t=mix(t,d,a);
        d=a;
        p*=2./(i+1.);
    }
    return t;
}
void main(void) {
    vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
    vec3 col=vec3(0);
    float bg=clouds(vec2(st.x+T*.5,-st.y));
    uv*=1.-.3*(sin(T*.2)*.5+.5);
    for (float i=1.; i<12.; i++) {
        uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
        vec2 p=uv;
        float d=length(p);
        col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
        float b=noise(i+p+bg*1.731);
        col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
        col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
    }
    O=vec4(col,1);
}`

/** Minimal WebGL2 single-pass fragment-shader renderer. */
class ShaderRenderer {
  constructor(canvas) {
    this.canvas = canvas
    this.gl = canvas.getContext('webgl2', { antialias: false, alpha: false })
    this.program = null
    this.buffer = null
    this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1]
  }

  compile(type, source) {
    const gl = this.gl
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    }
    return shader
  }

  setup() {
    const gl = this.gl
    const vs = this.compile(gl.VERTEX_SHADER, VERTEX_SRC)
    const fs = this.compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC)
    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
    }
    this.program = program
    this.vs = vs
    this.fs = fs

    this.buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    this.uResolution = gl.getUniformLocation(program, 'resolution')
    this.uTime = gl.getUniformLocation(program, 'time')
  }

  resize(scale) {
    const gl = this.gl
    gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale)
  }

  render(now = 0) {
    const gl = this.gl
    if (!this.program || gl.isContextLost()) return
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(this.program)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.uniform2f(this.uResolution, this.canvas.width, this.canvas.height)
    gl.uniform1f(this.uTime, now * 1e-3)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  dispose() {
    const gl = this.gl
    if (gl.isContextLost()) return
    if (this.program) {
      if (this.vs) gl.deleteShader(this.vs)
      if (this.fs) gl.deleteShader(this.fs)
      gl.deleteProgram(this.program)
    }
    if (this.buffer) gl.deleteBuffer(this.buffer)
    // NOTE: do NOT call WEBGL_lose_context.loseContext() here. The browser
    // returns the *same* context for a given canvas+type, so losing it would
    // permanently break any remount (e.g. React StrictMode's mount→cleanup→
    // mount in dev). The context is reclaimed when the canvas is GC'd.
  }
}

export default function ShaderBackground({ className = '', reduceMotion = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new ShaderRenderer(canvas)
    if (!renderer.gl) return // WebGL2 unsupported — leave the black bg fallback
    renderer.setup()

    // Cap DPR for fill-rate: a heavy fragment shader does not need full retina.
    const dpr = Math.min(1.5, Math.max(1, 0.5 * window.devicePixelRatio))

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      renderer.resize(dpr)
    }
    resize()

    let frameId = null
    let running = false

    const loop = (now) => {
      renderer.render(now)
      frameId = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reduceMotion) return
      running = true
      frameId = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      if (frameId) cancelAnimationFrame(frameId)
      frameId = null
    }

    if (reduceMotion) {
      // Single static frame — no continuous animation.
      renderer.render(0)
    } else {
      start()
    }

    // Pause when the tab is hidden (saves battery / GPU).
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    // Pause when the hero scrolls out of view.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    )
    observer.observe(canvas)

    window.addEventListener('resize', resize)

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      observer.disconnect()
      renderer.dispose()
    }
  }, [reduceMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ background: 'black' }}
    />
  )
}
