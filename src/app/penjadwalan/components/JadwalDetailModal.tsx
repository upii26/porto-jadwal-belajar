// app/jadwal/components/JadwalDetailModal.tsx

import { JadwalData } from '@/app/types/Penjadwalan'

interface Props {
    data: JadwalData | null
    onClose: () => void
}

export default function JadwalDetailModal({ data, onClose }: Props) {
    if (!data) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-popup">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Detail Jadwal
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-3 text-sm text-gray-800">
                    <div>
                        <strong>Mata Kuliah:</strong> {data.matkul}
                    </div>
                    <div>
                        <strong>Dosen:</strong> {data.dosen}
                    </div>
                    <div>
                        <strong>Ruang:</strong> {data.ruang}
                    </div>
                    <div>
                        <strong>Hari:</strong> {data.hari}
                    </div>
                    <div>
                        <strong>Jam:</strong> {data.jamMulai}.00 – {data.jamAkhir}.00
                    </div>
                    <div>
                        <strong>Prodi:</strong>{' '}
                        <span className="text-blue-600 font-medium">
                            {data.prodi}
                        </span>
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    )
}
