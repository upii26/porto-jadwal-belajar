// Sidebar.tsx
'use client'

import { useRouter, usePathname } from 'next/navigation'

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    { icon: '🏠', label: 'Home', path: '/dashboard' },
    { icon: '🧑‍🎓', label: 'Mahasiswa', path: '/mahasiswa' },
    { icon: '📊', label: 'Analytics', path: '/analytics' },
    { icon: '✉️', label: 'Messages', path: '/messages' },
    { icon: '📸', label: 'Media', path: '/media' },
    { icon: '📅', label: 'Calendar', path: '/calendar' },
    { icon: '👥', label: 'Users', path: '/users' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ]

  const handleMenuClick = (path: string) => {
    router.push(path)
  }

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-gray-200 flex flex-col items-start py-6 px-4 transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-32'
      }`}
    >
      {/* Menu Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gray-800 text-white rounded-xl flex items-center justify-center hover:bg-gray-700 transition mb-4"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Menu Items */}
      <div className="flex-1 flex flex-col space-y-2 w-full">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path
          
          return (
            <button
              key={index}
              onClick={() => handleMenuClick(item.path)}
              className={`h-16 rounded-xl flex items-center transition-all text-2xl ${
                isOpen ? 'w-full px-4 justify-start' : 'w-16 justify-center'
              } ${
                isActive
                  ? 'bg-white shadow-md' 
                  : 'bg-transparent hover:bg-white hover:shadow-sm'
              }`}
            >
              <span>{item.icon}</span>
              {isOpen && (
                <span className={`ml-3 text-base font-medium ${
                  isActive ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}