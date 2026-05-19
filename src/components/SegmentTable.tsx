import { useState, useMemo } from 'react'
import { A } from '../assets'

type Row = {
  city: string
  completed: string; completedDelta: string; completedSub: string
  rides: string; ridesDelta: string; ridesSub: string
  searches: string; searchesDelta: string; searchesSub: string
  conv: string; convDelta: string; convSub: string
  ra: string; raDelta: string; raSub: string
  da: string; daDelta: string; daSub: string
  ta: string; taDelta: string; taSub: string
  cancel: string; cancelDelta: string; cancelSub: string
  rider: string; riderDelta: string; riderSub: string
}

// Compute heatmap background from a delta string like "▲ 3.71%" or "▼ 0.34pp"
function getBg(delta: string): string {
  if (!delta) return 'white'
  const isUp = delta.startsWith('▲')
  const isDown = delta.startsWith('▼')
  const val = parseFloat(delta.replace(/[^0-9.]/g, '')) || 0
  if (isUp) {
    if (val >= 5)  return '#86efac'   // strong green
    if (val >= 2)  return '#bbf7d0'   // medium green
    return '#dcfce7'                  // light green
  }
  if (isDown) {
    if (val >= 3)  return '#fca5a5'   // strong red
    if (val >= 1)  return '#fecaca'   // medium red
    return '#fee2e2'                  // light red
  }
  if (val > 0)     return '#fef9c3'   // yellow/neutral
  return 'white'
}

const allRows: Row[] = [
  {
    city: 'Bangalore',
    completed: '109.9K', completedDelta: '▲ 2.41%', completedSub: '82.4K',
    rides: '100.00%', ridesDelta: '', ridesSub: '100.00%',
    searches: '466.8K', searchesDelta: '▲ 3.71%', searchesSub: '307.4K',
    conv: '23.54%', convDelta: '▼ 0.34pp', convSub: '26.81%',
    ra: '69.97%', raDelta: '▲ 0.42%', raSub: '77.21%',
    da: '48.88%', daDelta: '▼ 2.42%', daSub: '51.55%',
    ta: '69.69%', taDelta: '▲ 2.81pp', taSub: '67.35%',
    cancel: '30.31%', cancelDelta: '2.81pp', cancelSub: '32.65%',
    rider: '15.00%', riderDelta: '▲ 1.22pp', riderSub: '15.24%',
  },
  {
    city: 'Mumbai',
    completed: '109.9K', completedDelta: '▲ 2.41%', completedSub: '82.4K',
    rides: '100.00%', ridesDelta: '', ridesSub: '100.00%',
    searches: '466.8K', searchesDelta: '▲ 3.71%', searchesSub: '307.4K',
    conv: '23.54%', convDelta: '▲ 5.43%', convSub: '26.81%',
    ra: '69.97%', raDelta: '▲ 0.42%', raSub: '77.21%',
    da: '48.88%', daDelta: '▼ 1.06%', daSub: '51.55%',
    ta: '69.69%', taDelta: '▲ 1.48pp', taSub: '67.35%',
    cancel: '30.31%', cancelDelta: '▼ 0.80pp', cancelSub: '32.65%',
    rider: '15.00%', riderDelta: '▲ 1.22pp', riderSub: '15.24%',
  },
  {
    city: 'Delhi',
    completed: '108.0K', completedDelta: '▲ 3.41%', completedSub: '83.4K',
    rides: '100.00%', ridesDelta: '', ridesSub: '100.00%',
    searches: '466.8K', searchesDelta: '▲ 3.71%', searchesSub: '307.4K',
    conv: '23.54%', convDelta: '▼ 0.34pp', convSub: '26.81%',
    ra: '69.97%', raDelta: '▲ 0.42%', raSub: '77.21%',
    da: '48.88%', daDelta: '▼ 4.10%', daSub: '51.55%',
    ta: '69.69%', taDelta: '▲ 2.81pp', taSub: '67.35%',
    cancel: '30.31%', cancelDelta: '▼ 1.22pp', cancelSub: '32.65%',
    rider: '15.00%', riderDelta: '▲ 1.22pp', riderSub: '15.24%',
  },
  {
    city: 'Chennai',
    completed: '108.0K', completedDelta: '▲ 3.41%', completedSub: '83.4K',
    rides: '100.00%', ridesDelta: '', ridesSub: '100.00%',
    searches: '466.8K', searchesDelta: '▲ 3.71%', searchesSub: '307.4K',
    conv: '23.54%', convDelta: '▲ 2.30pp', convSub: '26.81%',
    ra: '69.97%', raDelta: '▼ 0.80%', raSub: '77.21%',
    da: '48.88%', daDelta: '▼ 1.50%', daSub: '51.55%',
    ta: '69.69%', taDelta: '▲ 0.70pp', taSub: '67.35%',
    cancel: '30.31%', cancelDelta: '▲ 0.50pp', cancelSub: '32.65%',
    rider: '15.00%', riderDelta: '▼ 0.80pp', riderSub: '15.24%',
  },
  {
    city: 'Kolkata',
    completed: '108.0K', completedDelta: '▲ 3.41%', completedSub: '83.4K',
    rides: '100.00%', ridesDelta: '', ridesSub: '100.00%',
    searches: '466.8K', searchesDelta: '▲ 3.71%', searchesSub: '307.4K',
    conv: '23.54%', convDelta: '▼ 1.20pp', convSub: '26.81%',
    ra: '69.97%', raDelta: '▲ 3.50%', raSub: '77.21%',
    da: '48.88%', daDelta: '▼ 0.90%', daSub: '51.55%',
    ta: '69.69%', taDelta: '▲ 5.20pp', taSub: '67.35%',
    cancel: '30.31%', cancelDelta: '▼ 2.10pp', cancelSub: '32.65%',
    rider: '15.00%', riderDelta: '▲ 1.22pp', riderSub: '15.24%',
  },
  {
    city: 'Hyderabad',
    completed: '108.0K', completedDelta: '▲ 3.41%', completedSub: '83.4K',
    rides: '100.00%', ridesDelta: '', ridesSub: '100.00%',
    searches: '466.8K', searchesDelta: '▲ 3.71%', searchesSub: '307.4K',
    conv: '23.54%', convDelta: '▼ 0.80pp', convSub: '26.81%',
    ra: '69.97%', raDelta: '▲ 0.50%', raSub: '77.21%',
    da: '48.88%', daDelta: '▲ 3.80%', daSub: '51.55%',
    ta: '69.69%', taDelta: '▼ 1.10pp', taSub: '67.35%',
    cancel: '30.31%', cancelDelta: '▲ 0.90pp', cancelSub: '32.65%',
    rider: '15.00%', riderDelta: '▲ 2.50pp', riderSub: '15.24%',
  },
]

const PAGE_SIZE = 6

type SortKey = keyof Row | null

function Cell({
  val, delta, sub, colorize, firstRow, lastCol,
}: {
  val: string; delta: string; sub?: string
  colorize?: boolean; firstRow?: boolean; lastCol?: boolean
}) {
  const isGreen = delta.startsWith('▲')
  const isRed   = delta.startsWith('▼')
  const bg = colorize ? getBg(delta) : 'white'
  return (
    <td className="px-4 py-0 h-[78px]" style={{
      minWidth: 120,
      backgroundColor: bg,
      borderRight: lastCol ? undefined : '4px solid #f6f6f6',
      borderBottom: '4px solid #f6f6f6',
      borderTop: firstRow ? '4px solid #f6f6f6' : undefined,
    }}>
      <div className="flex flex-col gap-px items-start w-full">
        <p className="text-[#1c2332] text-[13px] font-semibold leading-5">{val}</p>
        {delta && (
          <p className={`text-[11px] font-normal leading-5 ${isGreen ? 'text-[#16a34a]' : isRed ? 'text-[#ef4444]' : 'text-[#5f7087]'}`}>
            {delta}
          </p>
        )}
        {sub && <p className="text-[#5f7087] text-[11px] font-normal leading-5">{sub}</p>}
      </div>
    </td>
  )
}

const headerKeys: { label: string; key: SortKey }[] = [
  { label: 'City',          key: 'city'      },
  { label: 'Completed ↑',  key: 'completed'  },
  { label: 'Ride Traffic ↑', key: 'rides'    },
  { label: 'Searches ↑',   key: 'searches'   },
  { label: 'Conv. % ↑',    key: 'conv'       },
  { label: 'RA. % ↑',      key: 'ra'         },
  { label: 'DA. % ↑',      key: 'da'         },
  { label: 'TA. % ↑',      key: 'ta'         },
  { label: 'Cancel ↑',     key: 'cancel'     },
  { label: 'Rider% ↑',     key: 'rider'      },
]

export default function SegmentTable() {
  const [search, setSearch]       = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [sortKey, setSortKey]     = useState<SortKey>(null)
  const [sortDir, setSortDir]     = useState<'asc' | 'desc'>('asc')
  const [page, setPage]           = useState(0)

  const filtered = useMemo(() => {
    let rows = allRows.filter(r => r.city.toLowerCase().includes(search.toLowerCase()))
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        const av = parseFloat((a[sortKey] as string).replace(/[^0-9.-]/g, '')) || 0
        const bv = parseFloat((b[sortKey] as string).replace(/[^0-9.-]/g, '')) || 0
        return sortDir === 'asc' ? av - bv : bv - av
      })
    }
    return rows
  }, [search, sortKey, sortDir])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const pageRows   = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  function handleSort(key: SortKey) {
    if (key === 'city') return
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(0)
  }

  return (
    <div className="bg-white rounded-[20px] overflow-hidden">
      <div className="relative h-[56px] flex items-center px-5">
        <p className="text-[#1c2332] text-[16px] font-semibold">Summary by Segment</p>
        <div className="ml-auto flex items-center gap-3">
          <div
            className="bg-[#f4f5f7] flex items-center gap-2 h-7 px-3 rounded-[20px] cursor-pointer transition-all"
            style={{ width: showSearch ? 200 : 'auto' }}
            onClick={() => setShowSearch(true)}
          >
            <img src={A.tableSearch} alt="" className="w-[14px] h-[14px] flex-shrink-0" />
            {showSearch ? (
              <input
                autoFocus
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(0) }}
                onBlur={() => { if (!search) setShowSearch(false) }}
                placeholder="Search city..."
                className="bg-transparent text-[#2c3a50] text-[12px] outline-none w-full"
              />
            ) : (
              <span className="text-[#8895a8] text-[12px]">Search Summary Table</span>
            )}
          </div>
          <div className="bg-[#f4f5f7] flex items-center gap-2 h-7 pl-3 pr-[6px] rounded-[20px] cursor-pointer">
            <img src={A.tableSetting} alt="" className="w-[14px] h-[14px]" />
            <span className="text-[#2c3a50] text-[12px]">Settings</span>
            <div className="bg-[#6d1fe8] w-[18px] h-[18px] rounded-[9px] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">2</span>
            </div>
          </div>
          <div className="bg-[#f4f5f7] flex items-center gap-2 h-7 px-3 rounded-[20px] cursor-pointer">
            <img src={A.tableDownload} alt="" className="w-[14px] h-[14px]" />
            <span className="text-[#2c3a50] text-[12px]">Export Table</span>
          </div>
        </div>
      </div>

      <div className="mx-5 mb-5 bg-[#f6f6f6] rounded-[18px] overflow-hidden">
        <p className="text-[#5f7087] text-[14px] font-medium px-[10px] py-[14px]">
          Comparing vs 2 Apr – 2 Apr (prev. period till 16:00:00)
        </p>

        <div className="overflow-x-auto" style={{ paddingLeft: 4, paddingRight: 4 }}>
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {headerKeys.map(({ label, key }) => (
                  <th
                    key={label}
                    onClick={() => handleSort(key)}
                    className={`bg-white px-4 py-3 text-left text-[12px] font-semibold text-[#5f7087] whitespace-nowrap select-none ${key && key !== 'city' ? 'cursor-pointer hover:text-[#2c3a50]' : ''}`}
                  >
                    {label}
                    {sortKey === key && (
                      <span className="ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row, i) => (
                <tr key={i}>
                  {/* City — no heatmap */}
                  <td className="px-4 h-[78px] bg-white" style={{
                    borderRight: '4px solid #f6f6f6',
                    borderBottom: '4px solid #f6f6f6',
                    borderTop: i === 0 ? '4px solid #f6f6f6' : undefined,
                  }}>
                    <span className="text-[#2c3a50] text-[13px] font-medium">{row.city}</span>
                  </td>

                  {/* Volume columns — no heatmap */}
                  <Cell val={row.completed} delta={row.completedDelta} sub={row.completedSub} firstRow={i === 0} />
                  <Cell val={row.rides}     delta={row.ridesDelta}     sub={row.ridesSub}     firstRow={i === 0} />
                  <Cell val={row.searches}  delta={row.searchesDelta}  sub={row.searchesSub}  firstRow={i === 0} />

                  {/* Metric % columns — heatmap on */}
                  <Cell val={row.conv}   delta={row.convDelta}   sub={row.convSub}   colorize firstRow={i === 0} />
                  <Cell val={row.ra}     delta={row.raDelta}     sub={row.raSub}     colorize firstRow={i === 0} />
                  <Cell val={row.da}     delta={row.daDelta}     sub={row.daSub}     colorize firstRow={i === 0} />
                  <Cell val={row.ta}     delta={row.taDelta}     sub={row.taSub}     colorize firstRow={i === 0} />
                  <Cell val={row.cancel} delta={row.cancelDelta} sub={row.cancelSub} colorize firstRow={i === 0} />
                  <Cell val={row.rider}  delta={row.riderDelta}  sub={row.riderSub}  colorize firstRow={i === 0} lastCol />
                </tr>
              ))}
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-[#8895a8] text-[13px]">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-[#5f7087] text-[12px]">
            Showing{' '}
            <span className="text-[#1c2332] font-semibold">
              {page * PAGE_SIZE + 1} – {Math.min((page + 1) * PAGE_SIZE, filtered.length)}
            </span>
            {' · '}of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-7 h-7 flex items-center justify-center rounded-[6px] bg-[#f4f5f7] text-[#8895a8] disabled:opacity-40 hover:bg-[#ede9fe] transition-colors text-[14px]"
            >‹</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-7 h-7 flex items-center justify-center rounded-[6px] text-[12px] font-medium transition-colors ${
                  i === page
                    ? 'bg-[#ede9fe] text-[#6d1fe8] font-semibold border border-[#6d1fe8]'
                    : 'bg-[#f4f5f7] text-[#5f7087] hover:bg-[#ede9fe]'
                }`}
              >{i + 1}</button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="w-7 h-7 flex items-center justify-center rounded-[6px] bg-[#f4f5f7] text-[#8895a8] disabled:opacity-40 hover:bg-[#ede9fe] transition-colors text-[14px]"
            >›</button>
          </div>
        </div>
      </div>
    </div>
  )
}
