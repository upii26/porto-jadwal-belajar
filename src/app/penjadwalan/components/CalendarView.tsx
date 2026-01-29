'use client'

import { useState } from 'react'
import { JadwalData } from '@/app/types/Penjadwalan'
import JadwalDetailModal from './JadwalDetailModal'
import { PRODI_COLOR } from '../utils/ProdiColor'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOURS = Array.from({ length: 11 }, (_, i) => i + 7)

interface Props {
  data: JadwalData[]
  prodiOptions: string[]
}

export default function WeeklyCalendar({ data, prodiOptions }: Props) {
  const [selectedProdi, setSelectedProdi] = useState('')
  const [selectedJadwal, setSelectedJadwal] = useState<JadwalData | null>(null)

  const filtered = selectedProdi
    ? data.filter(d => d.prodi === selectedProdi)
    : data

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Jadwal Mingguan
          </h2>

          <select
            value={selectedProdi}
            onChange={e => setSelectedProdi(e.target.value)}
            className="px-4 py-2.5 border rounded-lg text-gray-900"
          >
            <option value="">Semua Prodi</option>
            {prodiOptions.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto">
          <div
            className="grid"
            style={{ gridTemplateColumns: '80px repeat(6, 1fr)' }}
          >
            <div />
            {DAYS.map(d => (
              <div
                key={d}
                className="text-center font-semibold text-gray-900 py-2 border-b"
              >
                {d}
              </div>
            ))}

            {HOURS.map(hour => (
              <>
                <div className="py-6 text-sm text-gray-700 border-b">
                  {hour}.00
                </div>

                {DAYS.map(day => {
                  const events = filtered.filter(
                    e =>
                      e.hari === day &&
                      e.jamMulai <= hour &&
                      e.jamAkhir > hour
                  )

                  return (
                    <div key={day + hour} className="border-b border-l px-2 py-1">
                      {events.map(ev => {
                        const color =
                          PRODI_COLOR[ev.prodi] ??
                          { bg: 'bg-gray-50', border: 'border-gray-500' }

                        return (
                          <div
                            key={ev.id}
                            onClick={() => setSelectedJadwal(ev)}
                            className={`
                              ${color.bg}
                              border-l-4 ${color.border}
                              rounded-md
                              p-2
                              mb-1
                              cursor-pointer
                              hover:shadow
                              transition
                              text-xs text-gray-900
                            `}
                          >
                            <div className="font-semibold">
                              {ev.matkul}
                            </div>
                            <div>{ev.dosen}</div>
                            <div>{ev.ruang}</div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <JadwalDetailModal
        data={selectedJadwal}
        onClose={() => setSelectedJadwal(null)}
      />
    </>
  )
}
