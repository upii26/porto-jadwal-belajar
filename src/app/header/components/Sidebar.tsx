'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [openMaster, setOpenMaster] = useState(true)

  const handleMenuClick = (path: string) => {
    router.push(path)
  }

  const isMasterActive =
    pathname.startsWith('/mahasiswa') ||
    pathname.startsWith('/dosen')

  return (
    <div
      className={`
        fixed left-0 top-0 h-full z-50
        bg-gray-200
        flex flex-col items-center
        py-6
        transition-all duration-300
        ${isOpen ? 'w-64 px-4' : 'w-20'}
      `}
    >
      {/* TOGGLE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
    w-16 h-16 mb-6
    bg-gray-800 text-white
    rounded-xl
    flex items-center justify-center
    hover:bg-gray-700 transition
    self-start
  "
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>


      {/* MENU */}
      <div className="flex-1 flex flex-col space-y-2 w-full">
        {/* DASHBOARD */}
        <SidebarItem
          icon="🏠"
          label="Dashboard"
          isOpen={isOpen}
          isActive={pathname === '/dashboard'}
          onClick={() => handleMenuClick('/dashboard')}
        />



        {/* MENU LAIN */}
        {/* <SidebarItem
          icon="📚"
          label="Prodi"
          isOpen={isOpen}
          isActive={pathname === '/prodi'}
          onClick={() => handleMenuClick('/prodi')}
        /> */}

        <SidebarItem
          icon="⏰"
          label="Jadwal"
          isOpen={isOpen}
          isActive={pathname === '/jadwal'}
          onClick={() => handleMenuClick('/jadwal')}
        />
        <SidebarItem
          icon="🗓️"
          label="Penjadwalan"
          isOpen={isOpen}
          isActive={pathname === '/penjadwalan'}
          onClick={() => handleMenuClick('/penjadwalan')}
        />

        {/* MASTER DATA */}
        <div className="w-full">
          <button
            onClick={() => setOpenMaster(!openMaster)}
            className={`
              h-16 rounded-xl
              flex items-center transition-all
              ${isOpen ? 'w-full px-4 justify-start' : 'w-16 mx-auto justify-center'}
              ${isMasterActive ? 'bg-white shadow-md' : 'hover:bg-white hover:shadow-sm'}
            `}
          >
            <span className="flex items-center justify-center w-8 h-8 text-2xl">
              📂
            </span>

            {isOpen && (
              <>
                <span className="ml-3 text-base font-medium text-gray-900">
                  Master Data
                </span>
                <span className="ml-auto text-sm">
                  {openMaster ? '▾' : '▸'}
                </span>
              </>
            )}
          </button>

          {/* DROPDOWN */}
          {isOpen && openMaster && (
            <div className="mt-2 w-full pl-12 space-y-2">
              <SubItem
                label="Mahasiswa"
                active={pathname.startsWith('/mahasiswa')}
                onClick={() => handleMenuClick('/mahasiswa')}
              />
              <SubItem
                label="Dosen"
                active={pathname.startsWith('/dosen')}
                onClick={() => handleMenuClick('/dosen')}
              />
              <SubItem
                label="Ruangan"
                active={pathname.startsWith('/ruangan')}
                onClick={() => handleMenuClick('/ruangan')}
              />
              <SubItem
                label="Matakuliah"
                active={pathname.startsWith('/matakuliah')}
                onClick={() => handleMenuClick('/matakuliah')}
              />
              <SubItem
                label="Prodi"
                active={pathname.startsWith('/prodi')}
                onClick={() => handleMenuClick('/prodi')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ================= COMPONENTS ================= */

function SidebarItem({
  icon,
  label,
  isOpen,
  isActive,
  onClick,
}: {
  icon: string
  label: string
  isOpen: boolean
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        h-16 rounded-xl
        flex items-center transition-all
        ${isOpen ? 'w-full px-4 justify-start' : 'w-16 mx-auto justify-center'}
        ${isActive ? 'bg-white shadow-md' : 'hover:bg-white hover:shadow-sm'}
      `}
    >
      <span className="flex items-center justify-center w-8 h-8 text-2xl">
        {icon}
      </span>

      {isOpen && (
        <span
          className={`ml-3 text-base font-medium ${isActive ? 'text-gray-900' : 'text-gray-700'
            }`}
        >
          {label}
        </span>
      )}
    </button>
  )
}

function SubItem({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left
        px-4 py-2 rounded-lg text-sm transition
        ${active
          ? 'bg-blue-100 text-blue-700 font-medium'
          : 'text-gray-700 hover:bg-gray-100'}
      `}
    >
      {label}
    </button>
  )
}
