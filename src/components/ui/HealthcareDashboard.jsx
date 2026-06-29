/**
 * Lightweight, on-brand Kuralogiq EHR dashboard mock used inside the hero's
 * 3D scroll-tilt card. Pure markup (no image/licensing), dark theme to match
 * the device frame, brand teal/orange accents. Decorative — aria-hidden.
 */

const STATS = [
  { label: "Today's Appointments", value: '24', delta: '+3', accent: 'text-teal-300' },
  { label: 'Active Patients', value: '1,284', delta: '+128', accent: 'text-teal-300' },
  { label: 'Avg. Wait Time', value: '6m', delta: '-2m', accent: 'text-emerald-300' },
  { label: 'Notes Pending', value: '3', delta: 'AI-assisted', accent: 'text-orange-300' },
]

const VISITS = [42, 58, 35, 70, 64, 80, 52]
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const SCHEDULE = [
  { time: '09:00', name: 'Sarah Chen', type: 'Chiropractic · Follow-up', tone: 'bg-orange-400' },
  { time: '09:30', name: 'Marcus Reed', type: 'Mental Health · Intake', tone: 'bg-teal-400' },
  { time: '10:15', name: 'Ava Thompson', type: 'Nutrition · Review', tone: 'bg-yellow-400' },
  { time: '11:00', name: 'Diego Morales', type: 'Integrative · Consult', tone: 'bg-emerald-400' },
]

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.6">
      <path d={d} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function HealthcareDashboard() {
  return (
    <div
      aria-hidden="true"
      className="flex aspect-[16/10] h-full w-full overflow-hidden bg-[#0b0c10] text-left text-[10px] text-white sm:text-xs"
    >
      {/* Sidebar */}
      <aside className="hidden w-12 shrink-0 flex-col items-center gap-5 border-r border-white/5 py-4 sm:flex">
        <div className="size-6 rounded-md bg-grad-teal" />
        {[
          'M3 12l9-9 9 9M5 10v10h14V10',
          'M8 7V3m8 4V3M4 11h16M5 7h14v14H5z',
          'M12 8v8m-4-4h8M4 4h16v16H4z',
          'M4 6h16M4 12h16M4 18h10',
          'M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0',
        ].map((d, i) => (
          <div key={i} className={i === 0 ? 'text-teal-300' : 'text-white/40'}>
            <Icon d={d} />
          </div>
        ))}
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        {/* Topbar */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-base leading-tight sm:text-lg">Good morning, Dr. Patel</p>
            <p className="text-white/45">Here&apos;s your clinic at a glance today.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1.5 text-white/50 md:flex">
              <Icon d="M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14z" />
              <span>Search patients</span>
            </div>
            <div className="size-7 rounded-full bg-grad-orange" />
          </div>
        </div>

        {/* Stat cards */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
              <p className="truncate text-white/45">{s.label}</p>
              <div className="mt-1.5 flex items-end justify-between">
                <span className="font-display text-lg leading-none sm:text-xl">{s.value}</span>
                <span className={`text-[9px] ${s.accent}`}>{s.delta}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart + schedule */}
        <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-1 gap-2.5 lg:grid-cols-5">
          {/* Chart */}
          <div className="flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-3 lg:col-span-3">
            <div className="flex items-center justify-between">
              <p className="text-white/70">Patient Visits</p>
              <span className="rounded-full bg-teal-400/15 px-2 py-0.5 text-[9px] text-teal-300">
                This week
              </span>
            </div>
            <p className="mt-1 font-display text-xl leading-none sm:text-2xl">
              401 <span className="text-[10px] font-sans text-emerald-300">▲ 12%</span>
            </p>
            <div className="mt-auto flex h-28 items-end gap-2 pt-3 sm:h-36">
              {VISITS.map((v, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-md ${i === 5 ? 'bg-grad-orange' : 'bg-grad-teal'}`}
                  style={{ height: `${v}%` }}
                />
              ))}
            </div>
            <div className="mt-1.5 flex gap-2">
              {DAYS.map((d) => (
                <span key={d} className="flex-1 text-center text-[8px] text-white/35">
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-3 lg:col-span-2">
            <p className="text-white/70">Today&apos;s Schedule</p>
            <div className="mt-2 flex flex-col gap-2">
              {SCHEDULE.map((a) => (
                <div key={a.name} className="flex items-center gap-2.5">
                  <span className={`h-7 w-1 rounded-full ${a.tone}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-white/90">{a.name}</p>
                    <p className="truncate text-[9px] text-white/40">{a.type}</p>
                  </div>
                  <span className="shrink-0 text-white/45">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
