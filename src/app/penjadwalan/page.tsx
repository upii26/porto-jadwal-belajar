'use client'

import Sidebar from '../header/components/Sidebar'
import Header from '../header/components/Header'
import WeeklyCalendar from './components/CalendarView'
import { JadwalData } from '@/app/types/Penjadwalan'
import { useState } from 'react'

const dummyJadwal: JadwalData[] = [
  {
    id: 1,
    hari: 'Mon',
    jamMulai: 8,
    jamAkhir: 10,
    matkul: 'Algoritma',
    dosen: 'Dr. Budi',
    ruang: 'R101',
    prodi: 'Teknik Informatika',
  },
  {
    id: 2,
    hari: 'Wed',
    jamMulai: 9,
    jamAkhir: 11,
    matkul: 'Basis Data',
    dosen: 'Prof. Siti',
    ruang: 'LAB01',
    prodi: 'Sistem Informasi',
  },
]

export default function JadwalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-32'}`}>
        <Header />

        <div className="p-8">
          <WeeklyCalendar
            data={dummyJadwal}
            prodiOptions={[
              'Teknik Informatika',
              'Sistem Informasi',
            ]}
          />
        </div>
      </div>
    </div>
  )
}
