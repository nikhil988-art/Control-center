export function makeSparkline(base: number, n = 20) {
  return Array.from({ length: n }, (_, i) => ({
    v: base + (Math.sin(i * 0.5) * base * 0.08) + (Math.random() * base * 0.04),
  }))
}

// Core Metrics sparklines
export const ridesSparkGreen = makeSparkline(60)
export const searchesSparkGreen = makeSparkline(240)
export const conversionSparkRed = makeSparkline(25)

// Conversion Metrics sparklines
export const riderAcceptanceSparkGreen = makeSparkline(60)
export const driverAcceptanceSparkGreen = makeSparkline(45)
export const tripAcceptanceSparkRed = makeSparkline(14)

// Cancellation Metrics sparklines
export const cancellationRateSparkRed = makeSparkline(28)
export const userCancellationSparkRed = makeSparkline(14)
export const driverCancellationSparkRed = makeSparkline(14)

// Trend chart data (multi-city, hourly)
const hours = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00']
export const trendData = hours.map((time, i) => ({
  time,
  bangalore: Math.round(1000 + Math.sin(i * 0.9) * 6000 + i * 1200),
  kolkata: Math.round(800 + Math.sin(i * 0.6 + 1) * 3000 + i * 400),
  delhi: Math.round(200 + Math.sin(i * 0.8 + 0.5) * 1500 + i * 200),
  chennai: Math.round(600 + Math.sin(i * 0.7 + 2) * 2000 + i * 300),
}))

export const segmentData = [
  {
    city: 'Total',
    completed: '109.9K', completedDelta: '+2.41%', completedPct: '82.4K',
    rides: '466.8K', ridesDelta: '+3.71%', ridesPct: '307.4K',
    searches: '23.54%', searchesDelta: '▼0.34pp', searchesPct: '',
    conv: '69.97%', convDelta: '+0.42%', convPct: '',
    ra: '48.88%', raDelta: '▼2.42%', raPct: '',
    da: '69.69%', daDelta: '+2.81pp', daPct: '',
    ta: '30.31%', taDelta: '', taPct: '',
    cancel: '32.65%', cancelDelta: '', cancelPct: '',
    rider: '15.00%', riderDelta: '', riderPct: '15.24%',
  },
  {
    city: 'Total',
    completed: '109.9K', completedDelta: '+2.41%', completedPct: '82.4K',
    rides: '466.8K', ridesDelta: '+3.71%', ridesPct: '307.4K',
    searches: '23.54%', searchesDelta: '▼1.17%', searchesPct: '',
    conv: '69.97%', convDelta: '+5.43%', convPct: '',
    ra: '48.88%', raDelta: '▼1.06%', raPct: '',
    da: '69.69%', daDelta: '+1.48pp', daPct: '',
    ta: '30.31%', taDelta: '', taPct: '',
    cancel: '2.81pp', cancelDelta: '', cancelPct: '',
    rider: '15.00%', riderDelta: '', riderPct: '1.50p',
  },
  {
    city: 'Total',
    completed: '108.0K', completedDelta: '+3.41%', completedPct: '83.4K',
    rides: '466.8K', ridesDelta: '+3.71%', ridesPct: '307.4K',
    searches: '23.54%', searchesDelta: '▲5.75%', searchesPct: '',
    conv: '69.97%', convDelta: '+0.42%', convPct: '',
    ra: '48.88%', raDelta: '▼2.42%', raPct: '',
    da: '69.69%', daDelta: '+2.81pp', daPct: '',
    ta: '30.31%', taDelta: '', taPct: '',
    cancel: '2.81pp', cancelDelta: '', cancelPct: '',
    rider: '15.00%', riderDelta: '', riderPct: '1.50p',
  },
  {
    city: 'Total',
    completed: '108.0K', completedDelta: '+3.41%', completedPct: '83.4K',
    rides: '466.8K', ridesDelta: '+3.71%', ridesPct: '307.4K',
    searches: '23.54%', searchesDelta: '▲5.75%', searchesPct: '',
    conv: '69.97%', convDelta: '+0.42%', convPct: '',
    ra: '48.88%', raDelta: '▼2.42%', raPct: '',
    da: '69.69%', daDelta: '+2.81pp', daPct: '',
    ta: '30.31%', taDelta: '', taPct: '',
    cancel: '2.81pp', cancelDelta: '', cancelPct: '',
    rider: '15.00%', riderDelta: '', riderPct: '1.50p',
  },
  {
    city: 'Total',
    completed: '108.0K', completedDelta: '+3.41%', completedPct: '83.4K',
    rides: '466.8K', ridesDelta: '+3.71%', ridesPct: '307.4K',
    searches: '23.54%', searchesDelta: '▲5.75%', searchesPct: '',
    conv: '69.97%', convDelta: '+0.42%', convPct: '',
    ra: '48.88%', raDelta: '▼2.42%', raPct: '',
    da: '69.69%', daDelta: '+2.81pp', daPct: '',
    ta: '30.31%', taDelta: '', taPct: '',
    cancel: '2.81pp', cancelDelta: '', cancelPct: '',
    rider: '15.00%', riderDelta: '', riderPct: '1.50p',
  },
  {
    city: 'Total',
    completed: '108.0K', completedDelta: '+3.41%', completedPct: '83.4K',
    rides: '466.8K', ridesDelta: '+3.71%', ridesPct: '307.4K',
    searches: '23.54%', searchesDelta: '▲5.75%', searchesPct: '',
    conv: '69.97%', convDelta: '+0.42%', convPct: '',
    ra: '48.88%', raDelta: '▼2.42%', raPct: '',
    da: '69.69%', daDelta: '+2.81pp', daPct: '',
    ta: '30.31%', taDelta: '', taPct: '',
    cancel: '2.81pp', cancelDelta: '', cancelPct: '',
    rider: '15.00%', riderDelta: '', riderPct: '1.50p',
  },
]

export const driverCancellationReasons = [
  { label: 'TRAFFIC_JAM', value: 17919, pct: 40, color: '#7C3AED' },
  { label: 'PICKUP_TOO_FAR', value: 15244, pct: 14, color: '#A78BFA' },
  { label: 'CUSTOMER_NOT_PICKING_CALL', value: 12192, pct: 12, color: '#C4B5FD' },
  { label: 'OTHER', value: 9577, pct: 9, color: '#DDD6FE' },
  { label: 'CUSTOMER_NO_SHOW', value: 7958, pct: 9, color: '#EDE9FE' },
  { label: 'VEHICLE_ISSUE', value: 7218, pct: 2, color: '#6D28D9' },
]

export const userCancellationReasons = [
  { label: 'CHANGE_DRIVER', value: 24836, pct: 40, color: '#7C3AED' },
  { label: 'WAIT_TIME_TOO_LONG', value: 21355, pct: 14, color: '#A78BFA' },
  { label: 'DRIVER_NOT_MOVING', value: 8034, pct: 12, color: '#C4B5FD' },
  { label: 'GOT_ANOTHER_RIDE', value: 7470, pct: 9, color: '#DDD6FE' },
  { label: 'WRONG_PICKUP_LOCATION', value: 6396, pct: 9, color: '#EDE9FE' },
  { label: 'OTHER', value: 6338, pct: 2, color: '#6D28D9' },
]
