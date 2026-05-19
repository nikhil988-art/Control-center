import { useState } from 'react'
import { A } from '../assets'

interface Metric {
  iconSrc: string
  label: string
  value: string
  changePct: string
  changeUp: boolean
  sub1: string
  sep?: boolean
  sub2?: string
  sparkSrc: string
  showTooltip?: boolean
}

interface Props {
  title: string
  metrics: Metric[]
}

function MetricCol({ m }: { m: Metric }) {
  const [sparkPos, setSparkPos] = useState<{ x: number; y: number } | null>(null)

  return (
    <div className="flex-1 flex flex-col relative min-w-0 overflow-hidden">
      {/* Icon + Label */}
      <div className="flex items-center gap-[14px] px-5 pt-5">
        <img src={m.iconSrc} alt="" className="w-6 h-6 flex-shrink-0" />
        <span className="text-[#5c6a77] text-[14px] font-medium leading-normal">{m.label}</span>
      </div>

      {/* Value + change */}
      <div className="flex items-center gap-2 px-5 pt-3">
        <span className="text-[#1c2332] text-[30px] font-semibold leading-none whitespace-nowrap">{m.value}</span>
        <div className="flex items-end justify-center h-6">
          <span className={`text-[10px] font-semibold leading-normal ${m.changeUp ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
            {m.changeUp ? '▲ ' : '▼ '}{m.changePct}
          </span>
        </div>
      </div>

      {/* Sub text */}
      <div className="flex items-center gap-[6px] px-5 pt-2 pb-0 flex-wrap">
        <span className="text-[#5f7087] text-[10px] leading-normal whitespace-nowrap">{m.sub1}</span>
        {m.sep && m.sub2 && (
          <>
            <div className="relative self-stretch w-0 shrink-0">
              <div className="absolute inset-[0_-0.5px]">
                <img src={A.lineV} alt="" className="block max-w-none w-full h-full" />
              </div>
            </div>
            <span className="text-[#5f7087] text-[10px] leading-normal whitespace-nowrap">{m.sub2}</span>
          </>
        )}
      </div>

      {/* Push sparkline to bottom */}
      <div className="flex-1" />

      {/* Sparkline — with 20px left/right/bottom padding */}
      <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
        <div
          className="relative"
          style={{ height: 50 }}
          onMouseMove={e => setSparkPos({ x: e.clientX, y: e.clientY })}
          onMouseLeave={() => setSparkPos(null)}
        >
        <div className="absolute inset-0">
          <img src={m.sparkSrc} alt="" className="block w-full h-full" />
        </div>

        {/* Hover tooltip — fixed position to escape overflow-hidden containers */}
        {sparkPos !== null && (
          <div
            className="fixed pointer-events-none bg-[#181d28] rounded-[6px] overflow-hidden z-50"
            style={{
              left: sparkPos.x - 50,
              top: sparkPos.y - 66,
              width: 101,
              height: 49,
            }}
          >
            <div className="absolute" style={{ left: 6, top: 25, width: 5, height: 5 }}>
              <img src={A.ellipse7} alt="" className="block w-full h-full" />
            </div>
            <div className="absolute" style={{ left: 6, top: 37, width: 5, height: 5 }}>
              <img src={A.ellipse8} alt="" className="block w-full h-full" />
            </div>
            <p className="absolute text-white text-[9px] font-semibold whitespace-nowrap" style={{ left: 6, top: 6 }}>Apr 14, 2026</p>
            <p className="absolute text-white text-[7px] font-semibold whitespace-nowrap" style={{ left: 16, top: 23 }}>12,345</p>
            <p className="absolute text-white text-[7px] font-semibold whitespace-nowrap" style={{ left: 16, top: 35 }}>2,783</p>
            <p className="absolute text-[#a2b2ca] text-[7px] font-medium whitespace-nowrap" style={{ left: 42, top: 23 }}>Present</p>
            <p className="absolute text-[#a2b2ca] text-[7px] font-medium whitespace-nowrap" style={{ left: 39, top: 35 }}>Past</p>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default function MetricSectionExpanded({ title, metrics }: Props) {
  return (
    <div className="bg-white rounded-[20px] overflow-hidden" style={{ height: 298 }}>
      {/* Title row — same as MetricSection: left:20, top:14 */}
      <div className="flex items-center gap-2" style={{ marginLeft: 20, paddingTop: 14 }}>
        <span className="text-[#262b30] text-[18px] font-semibold leading-normal whitespace-nowrap">{title}</span>
        <img src={A.downloadIcon} alt="" className="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity" />
      </div>

      {/* Inner gray card — same inset (20px margin), same height (226px), same border-radius */}
      <div
        className="flex flex-row bg-[#f9f9f9] rounded-[18px] overflow-hidden"
        style={{ margin: '10px 20px 0', height: 226 }}
      >
        <MetricCol m={metrics[0]} />

        {/* Vertical separator */}
        <div className="self-stretch w-px bg-[#e2e6ea] my-4 flex-shrink-0" />

        <MetricCol m={metrics[1]} />

        {/* Vertical separator */}
        <div className="self-stretch w-px bg-[#e2e6ea] my-4 flex-shrink-0" />

        <MetricCol m={metrics[2]} />
      </div>
    </div>
  )
}
