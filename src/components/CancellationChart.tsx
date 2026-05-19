import { useState } from 'react'
import { A } from '../assets'

interface Reason {
  color: string
  label: string
  value: string
  pctLabel: string
  pctTop: number
  pctLeft: number
  pctBg: string
  pctTextColor: string
}

interface Props {
  title: string
  total: string
  centerValue: string
  reasons: Reason[]
}

export default function CancellationChart({ title, total, centerValue, reasons }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <div className="bg-white flex flex-col gap-6 p-5 rounded-[12px] flex-1">
      <div className="flex items-start justify-between whitespace-nowrap">
        <p className="text-[#1c2332] text-[14px] font-semibold">{title}</p>
        <div className="bg-[#f8f9fc] flex items-center gap-[6px] px-[10px] py-[6px] rounded-[6px]">
          <span className="text-[#5f7087] text-[12px] font-normal">Total: </span>
          <span className="text-[#1c2332] text-[12px] font-bold">{total}</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative overflow-hidden flex-shrink-0" style={{ width: 293, height: 200 }}>
          <div className="absolute flex items-center justify-center"
            style={{ left: 42.85, top: -17.15, width: 225.29, height: 225.29 }}>
            <div className="flex-none" style={{ transform: 'scaleY(-1) rotate(162.13deg)' }}>
              <div className="relative" style={{ width: 179, height: 179 }}>
                <img src={A.donutSvg} alt="" className="absolute inset-0 block w-full h-full max-w-none" />
              </div>
            </div>
          </div>

          {reasons.map((r, i) => (
            <div
              key={i}
              className="absolute overflow-hidden rounded-[5px] flex items-center justify-center transition-transform cursor-pointer"
              style={{
                background: r.pctBg,
                height: 16,
                width: 26,
                left: r.pctLeft,
                top: r.pctTop,
                transform: hoveredIdx === i ? 'scale(1.2)' : 'scale(1)',
                opacity: hoveredIdx !== null && hoveredIdx !== i ? 0.5 : 1,
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <span className="text-[10px] font-bold" style={{ color: r.pctTextColor }}>{r.pctLabel}</span>
            </div>
          ))}

          <p className="absolute text-black text-[14px] font-normal" style={{ fontFamily: 'monospace', left: 129, top: 91, whiteSpace: 'nowrap' }}>
            {centerValue}
          </p>
        </div>

        <div className="flex flex-col gap-5 flex-1 min-w-0">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="flex items-center gap-[6px] cursor-pointer rounded-[6px] px-1 -mx-1 transition-colors"
              style={{ backgroundColor: hoveredIdx === i ? '#f8f5ff' : 'transparent' }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                className="rounded-[6px] flex-shrink-0 transition-transform"
                style={{
                  background: r.color,
                  width: 13,
                  height: 10,
                  transform: hoveredIdx === i ? 'scale(1.3)' : 'scale(1)',
                }}
              />
              <span
                className="text-[12px] font-normal whitespace-nowrap transition-colors"
                style={{ color: hoveredIdx === i ? '#1c2332' : '#5f7087' }}
              >
                {r.label}:
              </span>
              <span className="text-[#1c2332] text-[12px] font-semibold whitespace-nowrap">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// pctBg matches the actual arc segment color at each badge position (from the SVG)
// color matches pctBg so swatch and badge are visually identical
export const driverReasons: Reason[] = [
  { color: '#6d28d9', label: 'TRAFFIC_JAM',               value: '17,919', pctLabel: '40%', pctTop: 6,   pctLeft: 214, pctBg: '#6d28d9', pctTextColor: 'white'   },
  { color: '#c4b5fd', label: 'PICKUP_TOO_FAR',            value: '15,244', pctLabel: '2%',  pctTop: 51,  pctLeft: 38,  pctBg: '#c4b5fd', pctTextColor: '#5B21B6' },
  { color: '#7c3aed', label: 'CUSTOMER_NOT_PICKING_CALL', value: '12,192', pctLabel: '14%', pctTop: 105, pctLeft: 33,  pctBg: '#7c3aed', pctTextColor: 'white'   },
  { color: '#fb7185', label: 'OTHER',                     value: '9,577',  pctLabel: '9%',  pctTop: 142, pctLeft: 46,  pctBg: '#fb7185', pctTextColor: 'white'   },
  { color: '#f59e0b', label: 'CUSTOMER_NO_SHOW',          value: '7,958',  pctLabel: '9%',  pctTop: 171, pctLeft: 74,  pctBg: '#f59e0b', pctTextColor: 'white'   },
  { color: '#818cf8', label: 'VEHICLE_ISSUE',             value: '7,218',  pctLabel: '12%', pctTop: 149, pctLeft: 231, pctBg: '#818cf8', pctTextColor: 'white'   },
]

export const userReasons: Reason[] = [
  { color: '#6d28d9', label: 'CHANGE_DRIVER',          value: '24,836', pctLabel: '40%', pctTop: 6,   pctLeft: 214, pctBg: '#6d28d9', pctTextColor: 'white'   },
  { color: '#c4b5fd', label: 'WAIT_TIME_TOO_LONG',     value: '21,355', pctLabel: '2%',  pctTop: 51,  pctLeft: 38,  pctBg: '#c4b5fd', pctTextColor: '#5B21B6' },
  { color: '#7c3aed', label: 'DRIVER_NOT_MOVING',      value: '8,034',  pctLabel: '14%', pctTop: 105, pctLeft: 33,  pctBg: '#7c3aed', pctTextColor: 'white'   },
  { color: '#fb7185', label: 'GOT_ANOTHER_RIDE',       value: '7,470',  pctLabel: '9%',  pctTop: 142, pctLeft: 46,  pctBg: '#fb7185', pctTextColor: 'white'   },
  { color: '#f59e0b', label: 'WRONG_PICKUP_LOCATION',  value: '6,396',  pctLabel: '9%',  pctTop: 171, pctLeft: 74,  pctBg: '#f59e0b', pctTextColor: 'white'   },
  { color: '#818cf8', label: 'OTHER',                  value: '6,338',  pctLabel: '12%', pctTop: 149, pctLeft: 231, pctBg: '#818cf8', pctTextColor: 'white'   },
]
