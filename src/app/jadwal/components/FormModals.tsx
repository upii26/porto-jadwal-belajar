'use client'

import { useState, useEffect } from 'react'
import { JadwalData } from '@/app/types/Jadwal'

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: JadwalData) => void
  editData?: JadwalData | null
  loading?: boolean
  matkulOptions: { id: number; nama: string }[]
  dosenOptions: { id: number; nama: string }[]
  ruangOptions: { id: number; kode: string }[]
  mahasiswaOptions: { id: number; nama: string }[]
}

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  editData,
  loading,
  matkulOptions,
  dosenOptions,
  ruangOptions,
  mahasiswaOptions,
}: FormModalProps) {

  // ✅ SEMUA HOOK HARUS DI SINI (TOP LEVEL)
  const [formData, setFormData] = useState<JadwalData>({
    id: 0,
    matkulId: 0,
    dosenId: 0,
    ruangId: 0,
    mahasiswaIds: [],
    hari: '',
    jamMulai: '',
    jamAkhir: '',
  })

  const [mahasiswaOpen, setMahasiswaOpen] = useState(false)

  useEffect(() => {
    if (editData) {
      setFormData(editData)
    } else {
      setFormData({
        id: 0,
        matkulId: 0,
        dosenId: 0,
        ruangId: 0,
        mahasiswaIds: [],
        hari: '',
        jamMulai: '',
        jamAkhir: '',
      })
    }
  }, [editData, isOpen])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const toggleMahasiswa = (id: number) => {
    setFormData(prev => ({
      ...prev,
      mahasiswaIds: prev.mahasiswaIds.includes(id)
        ? prev.mahasiswaIds.filter(mid => mid !== id)
        : [...prev.mahasiswaIds, id],
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-popup">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {editData ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}
            </h2>
            <button
              onClick={onClose}
              disabled={loading}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Mata Kuliah */}
            <select
              name="matkulId"
              value={formData.matkulId}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg"
            >
              <option value={0}>Pilih Mata Kuliah</option>
              {matkulOptions.map(m => (
                <option key={m.id} value={m.id}>{m.nama}</option>
              ))}
            </select>

            {/* Dosen */}
            <select
              name="dosenId"
              value={formData.dosenId}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg"
            >
              <option value={0}>Pilih Dosen</option>
              {dosenOptions.map(d => (
                <option key={d.id} value={d.id}>{d.nama}</option>
              ))}
            </select>

            {/* Ruang */}
            <select
              name="ruangId"
              value={formData.ruangId}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg"
            >
              <option value={0}>Pilih Ruang</option>
              {ruangOptions.map(r => (
                <option key={r.id} value={r.id}>{r.kode}</option>
              ))}
            </select>

            {/* 🔥 Mahasiswa Multi Select DROPDOWN */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMahasiswaOpen(!mahasiswaOpen)}
                className="w-full px-4 py-2.5 border rounded-lg text-left flex justify-between"
              >
                {formData.mahasiswaIds.length
                  ? mahasiswaOptions
                      .filter(m => formData.mahasiswaIds.includes(m.id))
                      .map(m => m.nama)
                      .join(', ')
                  : 'Pilih Mahasiswa'}
                <span>▾</span>
              </button>

              {mahasiswaOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {mahasiswaOptions.map(m => (
                    <label
                      key={m.id}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.mahasiswaIds.includes(m.id)}
                        onChange={() => toggleMahasiswa(m.id)}
                      />
                      {m.nama}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Hari */}
            <select
              name="hari"
              value={formData.hari}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border rounded-lg"
            >
              <option value="">Pilih Hari</option>
              {['Senin','Selasa','Rabu','Kamis','Jumat'].map(h => (
                <option key={h}>{h}</option>
              ))}
            </select>

            {/* Jam */}
            <div className="grid grid-cols-2 gap-4">
              <input type="time" name="jamMulai" value={formData.jamMulai} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-lg" />
              <input type="time" name="jamAkhir" value={formData.jamAkhir} onChange={handleChange} className="w-full px-4 py-2.5 border rounded-lg" />
            </div>

            {/* Action */}
            <div className="flex gap-3 pt-6">
              <button onClick={onClose} className="flex-1 border rounded-lg py-3">
                Batal
              </button>
              <button onClick={() => onSubmit(formData)} className="flex-1 bg-blue-600 text-white rounded-lg py-3">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
