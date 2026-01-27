'use client'

import { useState, useEffect } from 'react'
import { MatakuliahData } from '@/app/types/Matakuliah'

interface FormModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: MatakuliahData) => void
    editData?: MatakuliahData | null
    loading?: boolean
    dosenOptions: { id: number; nama: string }[]
    ruangOptions: { id: number; kode: string }[]
}

export default function FormModal({
    isOpen,
    onClose,
    onSubmit,
    editData,
    loading,
    dosenOptions,
    ruangOptions,
}: FormModalProps) {
    const [formData, setFormData] = useState<any>({
        kodeMatkul: '',
        namaMatkul: '',
        prodi: '',
        jamMulai: '',
        jamAkhir: '',
        dosenId: '',
        ruangId: '',
    })

    useEffect(() => {
        if (editData) {
            setFormData(editData)
        } else {
            setFormData({
                kodeMatkul: '',
                namaMatkul: '',
                prodi: '',
                jamMulai: '',
                jamAkhir: '',
                dosenId: '',
                ruangId: '',
            })
        }
    }, [editData, isOpen])

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFormData((prev: any) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        onSubmit(formData)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="
          absolute inset-0
          bg-black/40
          backdrop-blur-sm
          transition-opacity
          animate-fadeIn
        "
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="
          relative
          bg-white
          rounded-2xl
          shadow-2xl
          max-w-2xl
          w-full
          mx-4
          max-h-[90vh]
          overflow-y-auto
          transform
          animate-popup
        "
            >
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            {editData ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah Baru'}
                        </h2>
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="text-gray-400 hover:text-gray-600 transition"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        {/* Kode Matkul */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kode Mata Kuliah <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="kodeMatkul"
                                value={formData.kodeMatkul}
                                onChange={handleChange}
                                disabled={loading}
                                placeholder="Contoh: IF101"
                                className="
                  w-full px-4 py-2.5 rounded-lg border
                  text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition border-gray-300
                "
                            />
                        </div>

                        {/* Nama */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Mata Kuliah <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="namaMatkul"
                                value={formData.namaMatkul}
                                onChange={handleChange}
                                disabled={loading}
                                placeholder="Masukkan nama mata kuliah"
                                className="
                  w-full px-4 py-2.5 rounded-lg border
                  text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition border-gray-300
                "
                            />
                        </div>

                        {/* Prodi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Program Studi <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="prodi"
                                value={formData.prodi}
                                onChange={handleChange}
                                disabled={loading}
                                placeholder="Teknik Informatika"
                                className="
                  w-full px-4 py-2.5 rounded-lg border
                  text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition border-gray-300
                "
                            />
                        </div>

                        {/* Jam */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Jam Mulai <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="time"
                                    name="jamMulai"
                                    value={formData.jamMulai}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="
                    w-full px-4 py-2.5 rounded-lg border
                    text-gray-900 bg-white appearance-none
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transition border-gray-300
                  "
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Jam Akhir <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="time"
                                    name="jamAkhir"
                                    value={formData.jamAkhir}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="
                    w-full px-4 py-2.5 rounded-lg border
                    text-gray-900 bg-white appearance-none
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transition border-gray-300
                  "
                                />
                            </div>
                        </div>

                        {/* Dosen */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Dosen Pengampu <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="dosenId"
                                value={formData.dosenId}
                                onChange={handleChange}
                                disabled={loading}
                                className="
                  w-full px-4 py-2.5 rounded-lg border
                  text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition border-gray-300
                "
                            >
                                <option value="">Pilih Dosen</option>
                                {dosenOptions.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.nama}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Ruang */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ruang <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="ruangId"
                                value={formData.ruangId}
                                onChange={handleChange}
                                disabled={loading}
                                className="
                  w-full px-4 py-2.5 rounded-lg border
                  text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition border-gray-300
                "
                            >
                                <option value="">Pilih Ruang</option>
                                {ruangOptions.map((r) => (
                                    <option key={r.id} value={r.id}>
                                        {r.kode}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-6">
                            <button
                                onClick={onClose}
                                disabled={loading}
                                className="
                  flex-1 px-4 py-3 rounded-lg
                  border border-gray-300 text-gray-700
                  hover:bg-gray-100 transition
                  disabled:opacity-50
                "
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="
                  flex-1 px-4 py-3 rounded-lg
                  bg-blue-600 text-white
                  hover:bg-blue-700 transition
                  font-medium
                  disabled:opacity-50
                  flex items-center justify-center gap-2
                "
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Menyimpan...
                                    </>
                                ) : editData ? (
                                    'Update'
                                ) : (
                                    'Simpan'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
