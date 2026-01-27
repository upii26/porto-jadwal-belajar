'use client'

import { useState } from 'react'
import { JadwalData } from '@/app/types/Jadwal'

interface Props {
    data: JadwalData[]
    onEdit: (data: JadwalData) => void
    onDelete: (id: number) => void
    matkulOptions: { id: number; nama: string }[]
    dosenOptions: { id: number; nama: string }[]
    ruangOptions: { id: number; kode: string }[]
}

export default function DataTable({
    data,
    onEdit,
    onDelete,
    matkulOptions,
    dosenOptions,
    ruangOptions,
}: Props) {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const getMatkul = (id: number) =>
        matkulOptions.find(m => m.id === id)?.nama || '-'

    const getDosen = (id: number) =>
        dosenOptions.find(d => d.id === id)?.nama || '-'

    const getRuang = (id: number) =>
        ruangOptions.find(r => r.id === id)?.kode || '-'

    const filteredData = data.filter(item =>
        getMatkul(item.matkulId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getDosen(item.dosenId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.hari.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = filteredData.slice(startIndex, endIndex)

    return (
        <div className="bg-white rounded-xl shadow-sm">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        Daftar Jadwal
                    </h2>
                </div>

                {/* Search */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Cari jadwal..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="
                w-full
                pl-10 pr-4 py-2
                rounded-lg
                border border-gray-300
                bg-white
                text-gray-900
                placeholder-gray-400
                focus:ring-2 focus:ring-blue-500
                focus:border-transparent
                transition
              "
                        />
                        <svg
                            className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            {[
                                'No',
                                'Mata Kuliah',
                                'Dosen',
                                'Ruang',
                                'Hari',
                                'Jam',
                                'Aksi',
                            ].map(h => (
                                <th
                                    key={h}
                                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentData.length > 0 ? (
                            currentData.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {startIndex + index + 1}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {getMatkul(item.matkulId)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {getDosen(item.dosenId)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {getRuang(item.ruangId)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {item.hari}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {item.jamMulai} - {item.jamAkhir}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex gap-2">
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
                                    colSpan={7}
                                    className="px-6 py-8 text-center text-gray-900 font-medium"
                                >
                                    Tidak ada data jadwal
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-900">
                    Menampilkan {filteredData.length === 0 ? 0 : startIndex + 1} -{' '}
                    {Math.min(endIndex, filteredData.length)} dari {filteredData.length} data
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
