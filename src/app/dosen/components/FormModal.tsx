'use client'

import { useState, useEffect } from 'react'
import { MatakuliahData } from '@/app/types/Matakuliah'

interface Props {
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
}: Props) {
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
    if (editData) setFormData(editData)
  }, [editData])

  if (!isOpen) return null

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 animate-popup">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {editData ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah'}
        </h2>

        <div className="space-y-4">
          {['kodeMatkul', 'namaMatkul', 'prodi'].map(name => (
            <input
              key={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={name}
              className="w-full px-4 py-2.5 border rounded-lg text-gray-900"
            />
          ))}

          <div className="grid grid-cols-2 gap-4">
            <input type="time" name="jamMulai" onChange={handleChange} className="w-full px-4 py-2.5 border rounded-lg" />
            <input type="time" name="jamAkhir" onChange={handleChange} className="w-full px-4 py-2.5 border rounded-lg" />
          </div>

          <select name="dosenId" onChange={handleChange} className="w-full px-4 py-2.5 border rounded-lg">
            <option value="">Pilih Dosen</option>
            {dosenOptions.map(d => <option key={d.id} value={d.id}>{d.nama}</option>)}
          </select>

          <select name="ruangId" onChange={handleChange} className="w-full px-4 py-2.5 border rounded-lg">
            <option value="">Pilih Ruang</option>
            {ruangOptions.map(r => <option key={r.id} value={r.id}>{r.kode}</option>)}
          </select>

          <div className="flex gap-3 pt-6">
            <button onClick={onClose} className="flex-1 border rounded-lg py-3">
              Batal
            </button>
            <button
              onClick={() => onSubmit(formData)}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white rounded-lg py-3"
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
