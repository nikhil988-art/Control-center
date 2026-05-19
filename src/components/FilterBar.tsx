import { useState } from 'react'
import { A } from '../assets'

interface Props {
  funnelExpanded: boolean
  onToggleFunnel: () => void
}

export default function FilterBar({ funnelExpanded, onToggleFunnel }: Props) {
  const [period, setPeriod] = useState<'Period' | 'Cumulative'>('Period')

  return (
    <div className="flex flex-col gap-2 mb-4 w-full">
      {/* Row 1 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">

          {/* Date range */}
          <div className="bg-white dark:bg-[#1a1f2e] flex items-center gap-[6px] h-9 px-4 rounded-[20px] cursor-pointer">
            <img src={A.calendarIcon} alt="" className="w-[14px] h-[14px] flex-shrink-0" />
            <span className="text-[#2c3a50] dark:text-[#94a3b8] text-[12px] font-medium whitespace-nowrap">Apr 07, 2026 00:00</span>
            <span className="text-[#8895a8] text-[11px]">→</span>
            <span className="text-[#2c3a50] dark:text-[#94a3b8] text-[12px] font-medium whitespace-nowrap">Apr 08, 2026 12:33</span>
          </div>

          {/* Compare D-7 */}
          <div className="bg-white dark:bg-[#1a1f2e] flex items-center gap-3 h-9 px-4 rounded-[20px] cursor-pointer">
            <div className="flex items-center gap-[6px]">
              <span className="text-[#2c3a50] dark:text-[#94a3b8] text-[12px] font-medium whitespace-nowrap">Compare D-7</span>
              <img src={A.chevronDown} alt="" className="w-3 h-3" />
            </div>
            <div className="w-0 h-[34px] relative flex-shrink-0">
              <img src={A.separator} alt="" className="absolute inset-0 w-full h-full" />
            </div>
            <span className="text-[#8895a8] text-[12px] font-medium whitespace-nowrap">Mar 31 – Apr 01 (till 12:00)</span>
          </div>

          {/* Period / Cumulative */}
          <div className="bg-white dark:bg-[#1a1f2e] flex items-center h-9 p-1 rounded-[20px]">
            <button
              onClick={() => setPeriod('Period')}
              className={`flex items-center h-full px-3 rounded-[18px] text-[12px] font-medium transition-colors ${
                period === 'Period' ? 'bg-[#f4f5f7] dark:bg-[#2d3748] text-[#2c3a50] dark:text-[#f1f5f9]' : 'text-[#8895a8]'
              }`}
            >
              Period
            </button>
            <button
              onClick={() => setPeriod('Cumulative')}
              className={`flex items-center h-full px-3 rounded-[18px] text-[12px] font-medium transition-colors ${
                period === 'Cumulative' ? 'bg-[#f4f5f7] dark:bg-[#2d3748] text-[#2c3a50] dark:text-[#f1f5f9]' : 'text-[#8895a8]'
              }`}
            >
              Cumulative
            </button>
          </div>

          {/* Auto-refresh */}
          <div className="bg-white dark:bg-[#1a1f2e] flex items-center gap-3 h-9 px-4 rounded-[20px]">
            <img src={A.refreshIcon} alt="" className="w-[14px] h-[14px]" />
            <div className="w-0 h-[34px] relative flex-shrink-0">
              <img src={A.separator} alt="" className="absolute inset-0 w-full h-full" />
            </div>
            <div className="flex items-center gap-[6px]">
              <img src={A.clockFrame} alt="" className="w-4 h-4" />
              <span className="text-[#2c3a50] dark:text-[#94a3b8] text-[12px] font-medium">5m</span>
              <img src={A.chevronDown} alt="" className="w-3 h-3" />
            </div>
            <div className="w-0 h-[34px] relative flex-shrink-0">
              <img src={A.separator} alt="" className="absolute inset-0 w-full h-full" />
            </div>
            <div className="flex items-center gap-[6px]">
              <img src={A.greenDotIcon} alt="" className="w-3 h-3" />
              <span className="text-[#16a34a] text-[11px] font-medium">12:10</span>
              <span className="text-[#8895a8] text-[10px] font-medium">Next in 3:02</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-[#1a1f2e] flex items-center gap-[6px] h-9 px-[10px] rounded-[20px] cursor-pointer">
          <img src={A.filtersIcon} alt="" className="w-[14px] h-[14px]" />
          <span className="text-[#2c3a50] dark:text-[#94a3b8] text-[12px] font-medium">Filters</span>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex items-center" style={{ gap: 8 }}>
        <div className="bg-white dark:bg-[#1a1f2e] flex items-center gap-3 h-9 px-4 rounded-[19px] cursor-pointer">
          <span className="text-[#2c3a50] dark:text-[#94a3b8] text-[12px] font-medium whitespace-nowrap">Searches with Retries</span>
          <img src={A.chevronDown} alt="" className="w-3 h-3" />
        </div>

        {/* Funnel View toggle */}
        <div className="bg-white dark:bg-[#1a1f2e] flex items-center gap-[8px] h-9 px-4 rounded-[19px]">
          <span className="text-[#2c3a50] dark:text-[#94a3b8] text-[12px] font-medium whitespace-nowrap">Funnel View</span>
          <button
            onClick={onToggleFunnel}
            className="relative flex-shrink-0 focus:outline-none"
            style={{ width: 36, height: 20 }}
            aria-label="Toggle funnel view"
          >
            <span
              className="block w-full h-full rounded-full transition-colors duration-200"
              style={{ backgroundColor: funnelExpanded ? '#6d1fe8' : '#d1d5db' }}
            />
            <span
              className="absolute top-[2px] block w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
              style={{ transform: funnelExpanded ? 'translateX(18px)' : 'translateX(2px)' }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
