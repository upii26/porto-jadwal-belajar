'use client'

import { useState } from 'react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  const menuItems = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '🚩', label: 'Reports', active: false },
    { icon: '📊', label: 'Analytics', active: false },
    { icon: '✉️', label: 'Messages', active: false },
    { icon: '📸', label: 'Media', active: false },
    { icon: '📅', label: 'Calendar', active: false },
    { icon: '👥', label: 'Users', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-32 bg-gray-200 flex flex-col items-center py-6 space-y-4">
      {/* Menu Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gray-800 text-white rounded-xl flex items-center justify-center hover:bg-gray-700 transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Search */}
      <button className="w-16 h-16 bg-white rounded-xl flex items-center justify-center hover:bg-gray-50 transition shadow-sm">
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Menu Items */}
      <div className="flex-1 flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-16 h-16 rounded-xl flex items-center justify-center transition text-2xl ${
              item.active 
                ? 'bg-white shadow-md' 
                : 'bg-transparent hover:bg-white hover:shadow-sm'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  )
}