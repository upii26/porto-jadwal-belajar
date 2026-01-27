'use client'

import { useState, useEffect } from 'react'
import { DosenData } from '@/app/types/Dosen'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: DosenData) => void
  editData?: DosenData | null
  loading?: boolean
}

const INITIAL_FORM: DosenData = {
  id: 0,
  noDosen: '',
  nama: '',
  email: '',
  prodi: '',
  status: 'Aktif',
}

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  editData,
  loading = false,
}: Props) {
  const [formData, setFormData] = useState<DosenData>(INITIAL_FORM)

  useEffect(() => {
    setFormData(editData ?? INITIAL_FORM)
  }, [editData, isOpen])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
        <h2 className="text-2xl font-semibold mb-6">
          {editData ? 'Edit Dosen' : 'Tambah Dosen'}
        </h2>

        <div className="space-y-4">
          <input name="noDosen" value={formData.noDosen} onChange={handleChange} placeholder="No Dosen" className="w-full border rounded-lg px-4 py-2" />
          <input name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama" className="w-full border rounded-lg px-4 py-2" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border rounded-lg px-4 py-2" />
          <input name="prodi" value={formData.prodi} onChange={handleChange} placeholder="Prodi" className="w-full border rounded-lg px-4 py-2" />

          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className="flex-1 border rounded-lg py-2">
              Batal
            </button>
            <button onClick={() => onSubmit(formData)} className="flex-1 bg-blue-600 text-white rounded-lg py-2">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
