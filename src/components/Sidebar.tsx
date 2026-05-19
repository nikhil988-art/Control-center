import { useState } from 'react'

const icons = [
  <svg key={0} width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="10" y="1" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="1" y="10" width="7" height="7" rx="1.5" fill="currentColor"/><rect x="10" y="10" width="7" height="7" rx="1.5" fill="currentColor"/></svg>,
  <svg key={1} width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 13l4-4 3 3 4-5 3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key={2} width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 2l6 2 4-2v12l-4 2-6-2-4 2V4l4-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  <svg key={3} width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M1 16c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 4c1.7 0 3 1.3 3 3M14 11c2 .5 3 2 3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key={4} width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l2-4h8l2 4v4H3V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="5.5" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12.5" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.5"/></svg>,
  <svg key={5} width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.05 3.05l1.41 1.41M13.54 13.54l1.41 1.41M3.05 14.95l1.41-1.41M13.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
]

const labels = ['Dashboard', 'Analytics', 'Map', 'Users', 'Vehicles', 'Settings']

export default function Sidebar() {
  const [active, setActive] = useState(0)

  return (
    <aside className="fixed left-0 top-[74px] h-[calc(100vh-74px)] w-[84px] bg-white dark:bg-[#0f1117] z-20 flex flex-col items-center pt-5 gap-1">
      {icons.map((icon, i) => (
        <button
          key={i}
          title={labels[i]}
          onClick={() => setActive(i)}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
            i === active
              ? 'bg-[#ede9fe] dark:bg-[#2d1f5e] text-[#6d1fe8]'
              : 'text-[#8895a8] dark:text-[#475569] hover:bg-[#f4f5f7] dark:hover:bg-[#1e2130] hover:text-[#2c3a50] dark:hover:text-[#94a3b8]'
          }`}
        >
          {icon}
        </button>
      ))}
    </aside>
  )
}
