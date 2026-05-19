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

// Column positions within the 878px inner card (918px outer − 40px margins)
// 3 equal columns of 292px each, separated by 1px dividers at x=292 and x=585
const COL = [
  { contentLeft: 20,  sparkLeft: 20,  sparkW: 252 },
  { contentLeft: 313, sparkLeft: 313, sparkW: 252 },
  { contentLeft: 606, sparkLeft: 606, sparkW: 252 },
]

function MetricCol({
  m, col,
}: {
  m: Metric
  col: { contentLeft: number; sparkLeft: number; sparkW: number }
}) {
  const [sparkPos, setSparkPos] = useState<{ x: number; y: number } | null>(null)

  return (
    <>
      {/* Content group: icon + label + value + sub */}
      <div
        className="absolute flex flex-col gap-[16px] items-start"
        style={{ left: col.contentLeft, top: 20, right: 0 }}
      >
        {/* Icon + label */}
        <div className="flex gap-[14px] items-center shrink-0">
          <img src={m.iconSrc} alt="" className="shrink-0" style={{ width: 24, height: 24 }} />
          <span className="text-[#5c6a77] text-[14px] font-medium leading-normal">{m.label}</span>
        </div>

        {/* Value + change */}
        <div className="flex flex-col gap-[8px] items-start w-full">
          <div className="flex gap-[8px] items-center shrink-0">
            <span className="text-[#1c2332] text-[30px] font-semibold leading-none whitespace-nowrap">{m.value}</span>
            <div className="flex h-[24px] items-end justify-center shrink-0">
              <span className={`text-[10px] font-semibold leading-normal ${m.changeUp ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                {m.changeUp ? '▲ ' : '▼ '}{m.changePct}
              </span>
            </div>
          </div>

          {/* Sub text */}
          <div className="flex gap-[6px] items-start shrink-0 flex-wrap">
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
        </div>
      </div>

      {/* Sparkline — exact Figma position: top=156, height=50 within inner card */}
      <div
        className="absolute"
        style={{ left: col.sparkLeft, top: 156, width: col.sparkW, height: 50 }}
        onMouseMove={e => setSparkPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setSparkPos(null)}
      >
        <div className="absolute inset-[0_-0.19%_0_-0.2%]">
          <img src={m.sparkSrc} alt="" className="block max-w-none w-full h-full" />
        </div>
      </div>

      {/* Hover tooltip — fixed position to escape overflow-hidden containers */}
      {sparkPos !== null && (
        <div
          className="fixed bg-[#181d28] rounded-[6px] overflow-hidden pointer-events-none z-50"
          style={{ left: sparkPos.x - 50, top: sparkPos.y - 66, width: 101, height: 49 }}
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
    </>
  )
}

export default function MetricSection({ title, metrics }: Props) {
  return (
    <div className="bg-white relative rounded-[20px] overflow-hidden" style={{ height: 298, width: 918 }}>

      {/* Title row — left:20, top:14 */}
      <div className="absolute flex gap-[8px] items-center" style={{ left: 20, top: 14 }}>
        <span className="text-[#262b30] text-[18px] font-semibold leading-normal whitespace-nowrap">{title}</span>
        <img src={A.downloadIcon} alt="" className="shrink-0 cursor-pointer hover:opacity-70 transition-opacity" style={{ width: 24, height: 24 }} />
      </div>

      {/* Inner card — left:20, top:52, width:878, height:226 */}
      <div
        className="absolute bg-[#f9f9f9] rounded-[18px] overflow-hidden"
        style={{ left: 20, top: 52, width: 878, height: 226 }}
      >
        {/* Vertical separator 1 — left:292 */}
        <div className="absolute flex items-center justify-center" style={{ left: 292, top: 20, width: 0, height: 186 }}>
          <div className="flex-none rotate-90">
            <div className="h-0 relative" style={{ width: 186 }}>
              <div className="absolute" style={{ top: -1, bottom: 0, left: 0, right: 0 }}>
                <img src={A.lineV} alt="" className="block max-w-none w-full h-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Vertical separator 2 — left:585 */}
        <div className="absolute flex items-center justify-center" style={{ left: 585, top: 20, width: 0, height: 186 }}>
          <div className="flex-none rotate-90">
            <div className="h-0 relative" style={{ width: 186 }}>
              <div className="absolute" style={{ top: -1, bottom: 0, left: 0, right: 0 }}>
                <img src={A.lineV} alt="" className="block max-w-none w-full h-full" />
              </div>
            </div>
          </div>
        </div>

        {/* 3 columns */}
        <MetricCol m={metrics[0]} col={COL[0]} />
        <MetricCol m={metrics[1]} col={COL[1]} />
        <MetricCol m={metrics[2]} col={COL[2]} />
      </div>
    </div>
  )
}
