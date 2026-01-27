'use client'

import { useState, useEffect } from 'react'
import { ProdiData } from '@/app/types/Prodi'

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProdiData) => void
  editData?: ProdiData | null
  loading?: boolean
}

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  editData,
  loading,
}: FormModalProps) {
  const [formData, setFormData] = useState<ProdiData>({
    id: 0,
    fakultas: '',
    prodi: '',
  })

  useEffect(() => {
    if (editData) {
      setFormData(editData)
    } else {
      setFormData({
        id: 0,
        fakultas: '',
        prodi: '',
      })
    }
  }, [editData, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
              {editData ? 'Edit Program Studi' : 'Tambah Program Studi Baru'}
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
            {/* Fakultas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fakultas <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fakultas"
                value={formData.fakultas}
                onChange={handleChange}
                disabled={loading}
                placeholder="Contoh: Fakultas Teknik"
                className="
                  w-full px-4 py-2.5 rounded-lg border
                  text-gray-800 placeholder-gray-400
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
                type="text"
                name="prodi"
                value={formData.prodi}
                onChange={handleChange}
                disabled={loading}
                placeholder="Contoh: Teknik Informatika"
                className="
                  w-full px-4 py-2.5 rounded-lg border
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition border-gray-300
                "
              />
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
