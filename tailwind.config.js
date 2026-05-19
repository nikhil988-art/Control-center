/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        'primary-light': '#8B5CF6',
        'primary-bg': '#EDE9FE',
        'green-trend': '#10B981',
        'red-trend': '#EF4444',
        surface: '#F8F8FA',
        border: '#E5E7EB',
        muted: '#6B7280',
        faint: '#9CA3AF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
