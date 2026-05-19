import { A } from '../assets'

export default function FunnelChart() {
  return (
    <div className="bg-white relative rounded-[20px] overflow-hidden" style={{ width: 378, height: 933, flexShrink: 0 }}>
      {/* Title */}
      <p className="absolute font-semibold text-[18px] text-[#262b30] top-[14px] whitespace-nowrap"
        style={{ left: '50%', transform: 'translateX(-50%)' }}>
        Core Metrics Funnel
      </p>

      {/* Gray background panel — 338px wide, 20px margins each side */}
      <div className="absolute bg-[#f9f9f9] rounded-[12px]"
        style={{ left: 20, top: 50, width: 338, height: 863 }} />

      {/* Funnel SVG (rotated -90deg) — compressed width, centered in gray panel */}
      <div className="absolute flex items-center justify-center"
        style={{ left: 59, top: 50, width: 260, height: 863 }}>
        <div className="-rotate-90 flex-none">
          <div className="relative" style={{ width: 863, height: 260 }}>
            <img src={A.funnelSvg} alt="" className="absolute inset-0 w-full h-full block max-w-none" />
          </div>
        </div>
      </div>

      {/* Divider line 1 (Searches / Rides Accepted) */}
      <div className="absolute h-0" style={{ left: 20, top: 397, width: 338 }}>
        <div className="absolute" style={{ top: -7, bottom: 0, left: 0, right: 0 }}>
          <img src={A.funnelLine1} alt="" className="block w-full h-full max-w-none" />
        </div>
      </div>

      {/* Divider line 2 (Rides Accepted / Rides Completed) */}
      <div className="absolute h-0" style={{ left: 0, top: 637, width: 378 }}>
        <div className="absolute" style={{ top: -7, bottom: 0, left: 0, right: 0 }}>
          <img src={A.funnelLine2} alt="" className="block w-full h-full max-w-none" />
        </div>
      </div>

      {/* Rotated Y-axis labels */}
      <div className="absolute flex items-center justify-center" style={{ left: 40, top: 192, width: 19, height: 72 }}>
        <div className="-rotate-90 flex-none">
          <p className="font-semibold text-[12px] text-black whitespace-nowrap">Searches</p>
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ left: 40, top: 456, width: 19, height: 121 }}>
        <div className="-rotate-90 flex-none">
          <p className="font-semibold text-[12px] text-black whitespace-nowrap">Rides Accepted</p>
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ left: 40, top: 709, width: 19, height: 131 }}>
        <div className="-rotate-90 flex-none">
          <p className="font-semibold text-[12px] text-black whitespace-nowrap">Rides Completed</p>
        </div>
      </div>

      {/* Value badges — centered horizontally */}
      <div className="absolute bg-[#262b30] flex items-center justify-center px-[10px] py-[10px] rounded-[40px]"
        style={{ left: '50%', top: 209, transform: 'translateX(-50%)' }}>
        <span className="text-white text-[14px] font-semibold whitespace-nowrap">1,46,789</span>
      </div>
      <div className="absolute bg-[#262b30] flex items-center justify-center px-[10px] py-[10px] rounded-[40px]"
        style={{ left: '50%', top: 498, transform: 'translateX(-50%)' }}>
        <span className="text-white text-[14px] font-semibold whitespace-nowrap">34,280</span>
      </div>
      <div className="absolute bg-[#262b30] flex items-center justify-center px-[10px] py-[10px] rounded-[40px]"
        style={{ left: '50%', top: 756, transform: 'translateX(-50%)' }}>
        <span className="text-white text-[14px] font-semibold whitespace-nowrap">34,000</span>
      </div>
    </div>
  )
}
