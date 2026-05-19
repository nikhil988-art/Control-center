import { useState } from 'react'
import TopNav from './components/TopNav'
import Sidebar from './components/Sidebar'
import FilterBar from './components/FilterBar'
import MetricSection from './components/MetricSection'
import MetricSectionExpanded from './components/MetricSectionExpanded'
import FunnelChart from './components/FunnelChart'
import TrendCharts from './components/TrendCharts'
import SegmentTable from './components/SegmentTable'
import CancellationChart, { driverReasons, userReasons } from './components/CancellationChart'
import { A } from './assets'
import { ThemeProvider } from './ThemeContext'

// Metric definitions using exact Figma asset URLs and values
const coreMetrics = [
  {
    iconSrc: A.timerCheck,
    label: 'Completed Rides',
    value: '61.2K',
    changePct: '4.00%',
    changeUp: true,
    sub1: '60.2K vs 57.8K',
    sep: true,
    sub2: 'In Progress: 7.2K',
    sparkSrc: A.sparkGreen1,
    showTooltip: true,
  },
  {
    iconSrc: A.searchIcon,
    label: 'Searches',
    value: '244.4K',
    changePct: '4.00%',
    changeUp: true,
    sub1: '240.5K vs 223.2K',
    sparkSrc: A.sparkGreen2,
  },
  {
    iconSrc: A.conversionIcon,
    label: 'Conversion',
    value: '25.06%',
    changePct: '4.00%',
    changeUp: false,
    sub1: '25.01% vs 25.92%',
    sparkSrc: A.sparkRed,
  },
] as const

const conversionMetrics = [
  {
    iconSrc: A.userIcon,
    label: 'Rider Acceptance',
    value: '61.2K',
    changePct: '4.00%',
    changeUp: true,
    sub1: '60.2K vs 57.8K',
    sep: true,
    sub2: 'In Progress: 7.2K',
    sparkSrc: A.convSpark1,
  },
  {
    iconSrc: A.timerCheck,
    label: 'Driver Acceptance',
    value: '45.95%',
    changePct: '4.00%',
    changeUp: true,
    sub1: '15.19% vs 17.67% Driver Cancelled: 14.2K',
    sparkSrc: A.convSpark2,
  },
  {
    iconSrc: A.conversionIcon,
    label: 'Trip Acceptance',
    value: '14.06%',
    changePct: '4.00%',
    changeUp: false,
    sub1: '15.19% vs 17.67% Driver Cancelled: 14.2K',
    sparkSrc: A.convSpark3,
  },
] as const

const cancellationMetrics = [
  {
    iconSrc: A.cancellationX,
    label: 'Cancellation Rate',
    value: '28.36%',
    changePct: '4.00%',
    changeUp: true,
    sub1: '28.82% vs 33.12%',
    sep: true,
    sub2: 'Cancelled: 26.9K',
    sparkSrc: A.cancelSpark1,
  },
  {
    iconSrc: A.userIconCancel,
    label: 'User Cancellation',
    value: '14.95%',
    changePct: '4.00%',
    changeUp: true,
    sub1: '15.19% vs 17.67%',
    sep: true,
    sub2: 'Driver Cancelled: 14.2K',
    sparkSrc: A.cancelSpark2,
  },
  {
    iconSrc: A.carIcon,
    label: 'Driver Cancellation',
    value: '14.06%',
    changePct: '4.00%',
    changeUp: false,
    sub1: '15.19% vs 17.67% Driver Cancelled: 14.2K',
    sparkSrc: A.cancelSpark3,
  },
] as const

export default function App() {
  const [funnelExpanded, setFunnelExpanded] = useState(false)

  return (
    <ThemeProvider>
    <div className="min-h-screen bg-white dark:bg-[#0f1117]">
      <TopNav />
      <Sidebar />

      <main className="fixed overflow-y-auto bg-[#f4f5f7] dark:bg-[#111827]" style={{ left: 84, top: 74, right: 0, bottom: 0, borderTopLeftRadius: 26, borderBottomLeftRadius: 26 }}>
        {/* Content wrapper matching Figma 1316px content width */}
        <div className="px-5 py-5" style={{ maxWidth: 1400 }}>
          <FilterBar funnelExpanded={funnelExpanded} onToggleFunnel={() => setFunnelExpanded(v => !v)} />

          {/* Core Metrics + Funnel row */}
          <div className="flex gap-5 mb-[38px]">
            {funnelExpanded ? (
              /* Toggle ON: compact MetricSection + funnel */
              <>
                <div className="flex flex-col gap-5" style={{ width: 918, flexShrink: 0 }}>
                  <MetricSection title="Core Metrics" metrics={coreMetrics as any} />
                  <MetricSection title="Conversion Metrics" metrics={conversionMetrics as any} />
                  <MetricSection title="Cancellation Metrics" metrics={cancellationMetrics as any} />
                </div>
                <div className="ml-auto">
                  <FunnelChart />
                </div>
              </>
            ) : (
              /* Toggle OFF: expanded individual cards, no funnel */
              <div className="flex flex-col gap-5 transition-all duration-300" style={{ width: 1316, flexShrink: 0 }}>
                <MetricSectionExpanded title="Core Metrics" metrics={coreMetrics as any} />
                <MetricSectionExpanded title="Conversion Metrics" metrics={conversionMetrics as any} />
                <MetricSectionExpanded title="Cancellation Metrics" metrics={cancellationMetrics as any} />
              </div>
            )}
          </div>

          {/* Trend Charts */}
          <div className="mb-[38px]">
            <TrendCharts />
          </div>

          {/* Summary by Segment */}
          <div className="mb-[38px]">
            <SegmentTable />
          </div>

          {/* Cancellation donut charts */}
          <div className="flex gap-4 pb-[38px]">
            <CancellationChart
              title="Driver Cancellation Reasons"
              total="70,108"
              centerValue="70,108"
              reasons={driverReasons}
            />
            <CancellationChart
              title="User Cancellation Reasons"
              total="74,429"
              centerValue="70,108"
              reasons={userReasons}
            />
          </div>
        </div>
      </main>
    </div>
    </ThemeProvider>
  )
}
