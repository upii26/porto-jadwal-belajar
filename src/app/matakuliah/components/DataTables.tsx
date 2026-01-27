'use client'

import { useState } from 'react'
import { MatakuliahData } from '@/app/types/Matakuliah'

interface Props {
  data: MatakuliahData[]
  onEdit: (data: MatakuliahData) => void
  onDelete: (id: number) => void
}

export default function DataTable({ data, onEdit, onDelete }: Props) {
  const [search, setSearch] = useState('')

  const filtered = data.filter(item =>
    item.kodeMatkul.toLowerCase().includes(search.toLowerCase()) ||
    item.namaMatkul.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Daftar Mata Kuliah
        </h2>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari mata kuliah..."
          className="
            w-full
            px-4 py-2.5
            border border-gray-300
            rounded-lg
            bg-white
            text-gray-900
            placeholder-gray-400
            focus:ring-2 focus:ring-blue-500
          "
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['No', 'Kode', 'Nama', 'Prodi', 'Jam', 'Aksi'].map(h => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filtered.length ? (
              filtered.map((item, i) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{i + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.kodeMatkul}</td>
                  <td className="px-6 py-4 text-gray-900">{item.namaMatkul}</td>
                  <td className="px-6 py-4 text-gray-900">{item.prodi}</td>
                  <td className="px-6 py-4 text-gray-900">
                    {item.jamMulai} - {item.jamAkhir}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                    <button
                            onClick={() => onEdit(item)}
                            className="text-green-600 hover:text-green-800 transition"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                     <button
                            onClick={() => onDelete(item.id)}
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-gray-800 font-medium"
                >
                  Tidak ada data mata kuliah
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
