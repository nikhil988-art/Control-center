import { useState } from 'react'
import { A } from '../assets'

const groupTabs = [
  'Overall ( No Breakdown )',
  'City', 'State', 'BPP Merchant',
  'Vehicle Category', 'Service Tier', 'Trip Tag',
  'Search Repeat Type', 'Trip Distance × Pickup Distance',
]

const timeTabs = ['10 Min', 'Hourly', 'Daily', 'Weekly', 'Monthly']

const availableMetrics = ['Searches', 'Completed Rides', 'Conversion %', 'Cancellation Rate', 'Driver Acceptance']

export default function TrendCharts() {
  const [activeGroup, setActiveGroup] = useState('Overall ( No Breakdown )')
  const [activeTime, setActiveTime] = useState('10 Min')
  const [activeMetrics, setActiveMetrics] = useState(['Searches', 'Completed Rides'])
  const [showMetricPicker, setShowMetricPicker] = useState(false)
  const [legendVisible, setLegendVisible] = useState(true)
  const [hoverX, setHoverX] = useState<number | null>(null)
  const [hoverY, setHoverY] = useState<number | null>(null)

  function removeMetric(m: string) {
    setActiveMetrics(prev => prev.filter(x => x !== m))
  }

  function toggleMetric(m: string) {
    setActiveMetrics(prev =>
      prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]
    )
  }

  return (
    <div className="flex flex-col gap-[18px] w-full">
      <div className="flex items-center gap-2">
        <span className="text-[#262b30] text-[18px] font-semibold whitespace-nowrap">Trend Charts</span>
        <img src={A.downloadIcon} alt="" className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity" />
      </div>

      <div className="relative">
        {/* Group tabs — folder-tab style, no container background */}
        <div className="flex items-end w-full relative z-10 gap-[20px]" style={{ height: 42 }}>
          {groupTabs.map((tab) => {
            const isActive = activeGroup === tab
            return (
              <div key={tab} className="flex items-end relative h-full">
                <button
                  onClick={() => setActiveGroup(tab)}
                  className={`flex-1 flex items-center justify-center px-[10px] text-[12px] whitespace-nowrap transition-all min-w-0 ${
                    isActive
                      ? 'bg-white text-[#1c2332] font-semibold h-full px-[16px]'
                      : 'text-[#8895a8] font-medium hover:text-[#2c3a50] h-[34px] px-[4px]'
                  }`}
                  style={isActive ? { borderRadius: '12px 12px 0 0' } : {}}
                >
                  {tab}
                </button>


              </div>
            )
          })}
        </div>

        <div className="bg-white overflow-hidden relative"
          style={{
            height: 497,
            borderRadius: activeGroup === groupTabs[0]
              ? '0 24px 24px 24px'
              : activeGroup === groupTabs[groupTabs.length - 1]
              ? '24px 24px 24px 0'
              : '24px 24px 24px 24px'
          }}>

          <div className="absolute flex items-center gap-[14px] left-[20px] top-[20px]">
            <div className="flex items-center gap-[2px]">
              {timeTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTime(tab)}
                  className={`flex items-center justify-center h-[30px] px-[12px] rounded-[20px] text-[12px] whitespace-nowrap transition-colors ${
                    activeTime === tab
                      ? 'bg-[#f4f5f7] text-[#2c3a50] font-semibold'
                      : 'text-[#8895a8] font-medium hover:text-[#2c3a50]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-[6px] cursor-pointer hover:opacity-70 transition-opacity">
              <span className="text-[#2c3a50] text-[12px] font-semibold whitespace-nowrap">No Comparison</span>
              <img src={A.arrowDown2} alt="" className="w-4 h-4" />
            </div>
          </div>

          <div className="absolute flex items-center gap-[10px] right-[20px] top-[80px]">
            {activeMetrics.map(m => (
              <div
                key={m}
                className="bg-[#ede9fe] border border-[#c4b5fd] flex items-center gap-[6px] h-[28px] px-[10px] rounded-[36px] overflow-hidden text-[#4338ca] text-[11px] font-medium"
              >
                <span>{m}</span>
                <button
                  onClick={() => removeMetric(m)}
                  className="font-normal hover:text-[#6d1fe8] transition-colors leading-none"
                  title={`Remove ${m}`}
                >
                  x
                </button>
              </div>
            ))}

            <div className="relative">
              <button
                onClick={() => setShowMetricPicker(v => !v)}
                className="bg-[#f4f5f7] flex items-center justify-center h-[28px] px-[10px] rounded-[36px] text-[#2c3a50] text-[11px] font-medium hover:bg-[#ede9fe] transition-colors"
              >
                + Add Metric
              </button>
              {showMetricPicker && (
                <div className="absolute right-0 top-[34px] bg-white rounded-[12px] shadow-lg border border-[#e5e7eb] py-2 z-50 min-w-[180px]">
                  {availableMetrics.map(m => (
                    <button
                      key={m}
                      onClick={() => toggleMetric(m)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-[12px] text-[#2c3a50] hover:bg-[#f4f5f7] transition-colors text-left"
                    >
                      <span
                        className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                        style={{
                          borderColor: '#6d1fe8',
                          backgroundColor: activeMetrics.includes(m) ? '#6d1fe8' : 'transparent',
                        }}
                      />
                      {m}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowMetricPicker(false)}
                    className="w-full px-4 py-2 text-[11px] text-[#8895a8] hover:bg-[#f4f5f7] transition-colors text-left border-t border-[#f4f5f7] mt-1"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="absolute h-0" style={{ left: '50%', top: 68, width: 1276, transform: 'translateX(-50%)' }}>
            <div className="absolute" style={{ top: -1, bottom: 0, left: 0, right: 0 }}>
              <img src={A.trendHLine} alt="" className="block w-full h-full max-w-none" />
            </div>
          </div>

          <div className="absolute flex items-center gap-[10px]" style={{ right: 20, top: 24 }}>
            <div className="bg-[#f4f5f7] flex items-center gap-1 h-[28px] px-[10px] rounded-[20px] cursor-pointer hover:bg-[#ede9fe] transition-colors">
              <span className="text-[#2c3a50] text-[11px] font-medium whitespace-nowrap">Top 3</span>
              <img src={A.dropdownArrow} alt="" className="w-[14px] h-[10px]" />
            </div>
            <div className="bg-[#f4f5f7] flex items-center gap-1 h-[28px] px-[10px] rounded-[20px] cursor-pointer hover:bg-[#ede9fe] transition-colors">
              <span className="text-[#2c3a50] text-[11px] font-medium whitespace-nowrap">City (5)</span>
              <img src={A.dropdownArrow} alt="" className="w-[14px] h-[10px]" />
            </div>
          </div>

          <div
            className="absolute"
            style={{ left: '50%', top: 167, width: 1292, height: 260, transform: 'translateX(-50%)' }}
            onMouseMove={e => {
              const rect = e.currentTarget.getBoundingClientRect()
              setHoverX(e.clientX - rect.left)
              setHoverY(e.clientY - rect.top)
            }}
            onMouseLeave={() => { setHoverX(null); setHoverY(null) }}
          >
            <p className="absolute text-[#1c2332] text-[12px] font-medium left-0 top-[225px] whitespace-nowrap">0</p>
            <p className="absolute text-[#1c2332] text-[12px] font-medium left-0 top-[169px] whitespace-nowrap">3.0K</p>
            <p className="absolute text-[#1c2332] text-[12px] font-medium left-0 top-[113px] whitespace-nowrap">6.0K</p>
            <p className="absolute text-[#1c2332] text-[12px] font-medium left-0 top-[57px] whitespace-nowrap">9.0K</p>
            <p className="absolute text-[#1c2332] text-[12px] font-medium left-0 top-[1px] whitespace-nowrap">12.0K</p>

            {[232, 176, 120, 64, 8].map((y, i) => (
              <div key={i} className="absolute h-0" style={{ left: 46, top: y, width: 1238 }}>
                <div className="absolute" style={{ top: -1, bottom: 0, left: 0, right: 0 }}>
                  <img src={A.trendGrid} alt="" className="block w-full h-full max-w-none" />
                </div>
              </div>
            ))}

            {[
              { x: 61, label: '01:00' },
              { x: 272, label: '03:00' },
              { x: 485, label: '06:00' },
              { x: 698, label: '09:00' },
              { x: 911, label: '12:00' },
              { x: 1122, label: '15:00' },
            ].map(({ x, label }) => (
              <p key={x} className="absolute text-[#1c2332] text-[12px] font-medium whitespace-nowrap" style={{ left: x, top: 238 }}>{label}</p>
            ))}

            <style>{`
              @keyframes drawLine {
                from { clip-path: inset(0 100% 0 0); }
                to   { clip-path: inset(0 0% 0 0); }
              }
            `}</style>

            <div className="absolute" style={{ left: 47, top: 58.31, width: 1233.5, height: 171.886, animation: 'drawLine 2.4s cubic-bezier(.4,0,.2,1) 0.1s both' }}>
              <img src={A.trendBangalore} alt="" className="block w-full h-full max-w-none" />
            </div>
            <div className="absolute" style={{ left: 46.5, top: 168.74, width: 1230, height: 61.614, animation: 'drawLine 2.4s cubic-bezier(.4,0,.2,1) 0.3s both' }}>
              <img src={A.trendKolkata} alt="" className="block w-full h-full max-w-none" />
            </div>
            <div className="absolute" style={{ left: 47, top: 192.79, width: 1233.5, height: 38.004, animation: 'drawLine 2.4s cubic-bezier(.4,0,.2,1) 0.5s both' }}>
              <img src={A.trendDelhi} alt="" className="block w-full h-full max-w-none" />
            </div>
            <div className="absolute" style={{ left: 47, top: 46.86, width: 1234.5, height: 184.134, animation: 'drawLine 2.4s cubic-bezier(.4,0,.2,1) 0.7s both' }}>
              <img src={A.trendChennai} alt="" className="block w-full h-full max-w-none" />
            </div>

            {hoverX !== null && hoverY !== null && (() => {
              const cardW = 110
              const tooltipH = 110
              const tooltipLeft = hoverX + 12 + cardW > 1292 ? hoverX - cardW - 12 : hoverX + 12
              const tooltipTop = hoverY - tooltipH - 10 < 0 ? hoverY + 10 : hoverY - tooltipH - 10
              return (
                <>
                  <div className="absolute top-0 pointer-events-none" style={{ left: hoverX, width: 1, height: 232, background: 'rgba(109,31,232,0.35)' }} />
                  <div
                    className="absolute pointer-events-none bg-white rounded-[10px] shadow-[0px_2px_12px_rgba(0,0,0,0.15)] z-20 px-[10px] py-[10px]"
                    style={{ left: tooltipLeft, top: tooltipTop, width: cardW }}
                  >
                    {[
                      { color: '#4338CA', name: 'Bangalore', val: '12,456' },
                      { color: '#F59E0B', name: 'Kolkata', val: '12,456' },
                      { color: '#DC2626', name: 'Delhi', val: '12,456' },
                      { color: '#FFDF2A', name: 'Chenni', val: '12,456' },
                    ].map(({ color, name, val }, i) => (
                      <div key={i} className="flex items-center gap-[5px] mb-[6px] last:mb-0">
                        <div className="w-[8px] h-[8px] rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                        <div className="flex flex-col leading-none">
                          <span className="text-[#a09f9f] text-[9px] font-semibold whitespace-nowrap">{name}</span>
                          <span className="text-black text-[9px] font-medium whitespace-nowrap mt-[2px]">{val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )
            })()}
          </div>

          {legendVisible && (
            <div className="absolute" style={{ left: 20, top: 457, height: 24, width: 467 }}>
              <div className="absolute top-[7px] w-[10px] h-[10px] rounded-full" style={{ left: 0, backgroundColor: '#4338CA' }} />
              <p className="absolute text-[#1c2332] text-[12px] font-semibold left-[14px] top-[5px] whitespace-nowrap">Bangalore</p>
              <p className="absolute text-[#8895a8] text-[12px] font-normal left-[79px] top-[5px] whitespace-nowrap">85528</p>
              <div className="absolute top-[7px] w-[10px] h-[10px] rounded-full" style={{ left: 144, backgroundColor: '#F59E0B' }} />
              <p className="absolute text-[#1c2332] text-[12px] font-semibold top-[5px]" style={{ left: 158 }}>Kolkata</p>
              <p className="absolute text-[#8895a8] text-[12px] font-normal top-[5px]" style={{ left: 208 }}>15567</p>
              <div className="absolute top-[7px] w-[10px] h-[10px] rounded-full" style={{ left: 271, backgroundColor: '#DC2626' }} />
              <p className="absolute text-[#1c2332] text-[12px] font-semibold top-[5px]" style={{ left: 285 }}>Delhi</p>
              <p className="absolute text-[#8895a8] text-[12px] font-normal top-[5px]" style={{ left: 321 }}>3671</p>
              <div className="absolute flex items-center gap-[4px] top-[5px]" style={{ left: 377 }}>
                <div className="w-[10px] h-[10px] rounded-full flex-shrink-0" style={{ backgroundColor: '#FFDF2A' }} />
                <span className="text-[#1c2332] text-[12px] font-semibold whitespace-nowrap">Chenni</span>
              </div>
              <p className="absolute text-[#8895a8] text-[12px] font-normal top-[5px]" style={{ left: 439 }}>3671</p>
            </div>
          )}

          <button
            onClick={() => setLegendVisible(v => !v)}
            className="absolute text-[#8895a8] text-[11px] font-normal right-[20px] top-[463px] whitespace-nowrap cursor-pointer hover:text-[#2c3a50] transition-colors"
          >
            {legendVisible ? 'Hide Legend' : 'Show Legend'}
          </button>
        </div>
      </div>
    </div>
  )
}
