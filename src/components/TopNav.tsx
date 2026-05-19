import { A } from '../assets'
import { useTheme } from '../ThemeContext'

export default function TopNav() {
  const { theme, toggle } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 h-[74px] bg-white dark:bg-[#0f1117] z-30 flex items-center" style={{ paddingLeft: 24, paddingRight: 24 }}>
      {/* Logo */}
      <div className="w-9 h-9 flex-shrink-0">
        <img src={A.movingTech} alt="Moving Tech" className="w-full h-full object-contain" />
      </div>

      {/* User greeting */}
      <div className="flex flex-col leading-none gap-[3px]" style={{ marginLeft: 24 }}>
        <span className="font-normal text-[12px] text-[#8895a8] dark:text-[#64748b]">Hello</span>
        <span className="font-semibold text-[16px] text-[#1a2332] dark:text-[#f1f5f9]">Nikhil Kumar</span>
      </div>

      <div className="flex-1" />

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Saved Views */}
        <div className="bg-[#f4f5f7] dark:bg-[#1e2130] flex gap-[6px] h-9 items-center px-[15px] rounded-[20px] cursor-pointer hover:bg-[#ede9fe] dark:hover:bg-[#2d1f5e] transition-colors">
          <img src={A.savedViewsIcon} alt="" className="w-[14px] h-[14px] dark:opacity-70" />
          <span className="font-normal text-[12px] text-[#2c3a50] dark:text-[#94a3b8]">Saved Views</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-[60px] flex items-center justify-center cursor-pointer hover:bg-[#f4f5f7] dark:hover:bg-[#1e2130] transition-colors"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5c6a77" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>

          {/* Avatar NK */}
          <div className="w-9 h-9 bg-[#6d1fe8] rounded-[24px] flex items-center justify-center cursor-pointer">
            <span className="font-semibold text-[13px] text-white">NK</span>
          </div>
        </div>
      </div>
    </header>
  )
}
