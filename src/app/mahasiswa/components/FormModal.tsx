'use client'

import { useState, useEffect } from 'react'
import { validateEmail, validateNIM } from '../handlers/Validation'

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  editData?: any
  loading?: boolean
}

export default function FormModal({ isOpen, onClose, onSubmit, editData, loading }: FormModalProps) {
  const [formData, setFormData] = useState({
    nim: '',
    nama: '',
    prodi: '',
    gender: '',
    email: '',
    status: 'Aktif'
  })
  const [errors, setErrors] = useState<any>({})

  useEffect(() => {
    if (editData) {
      setFormData(editData)
    } else {
      setFormData({
        nim: '',
        nama: '',
        prodi: '',
        gender: '',
        email: '',
        status: 'Aktif'
      })
    }
  }, [editData, isOpen])

  const prodiOptions = [
    'Teknik Informatika',
    'Sistem Informasi',
    'Teknik Komputer',
    'Manajemen Informatika'
  ]

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: any = {}
    
    if (!formData.nim) newErrors.nim = 'NIM harus diisi'
    else if (!validateNIM(formData.nim)) newErrors.nim = 'Format NIM tidak valid'
    
    if (!formData.nama) newErrors.nama = 'Nama harus diisi'
    if (!formData.prodi) newErrors.prodi = 'Program Studi harus dipilih'
    if (!formData.gender) newErrors.gender = 'Jenis Kelamin harus dipilih'
    
    if (!formData.email) newErrors.email = 'Email harus diisi'
    else if (!validateEmail(formData.email)) newErrors.email = 'Format email tidak valid'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
    }
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
              {editData ? "Edit Mahasiswa" : "Tambah Mahasiswa Baru"}
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
            {/* NIM */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NIM <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nim"
                value={formData.nim}
                onChange={handleChange}
                disabled={loading}
                placeholder="Masukkan NIM"
                className={`
                  w-full px-4 py-2.5 rounded-lg border
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition
                  ${errors.nim ? "border-red-500" : "border-gray-300"}
                `}
              />
              {errors.nim && (
                <p className="mt-1 text-sm text-red-500">{errors.nim}</p>
              )}
            </div>
  
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                disabled={loading}
                placeholder="Masukkan nama lengkap"
                className={`
                  w-full px-4 py-2.5 rounded-lg border
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition
                  ${errors.nama ? "border-red-500" : "border-gray-300"}
                `}
              />
              {errors.nama && (
                <p className="mt-1 text-sm text-red-500">{errors.nama}</p>
              )}
            </div>
  
            {/* Prodi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Program Studi <span className="text-red-500">*</span>
              </label>
              <select
                name="prodi"
                value={formData.prodi}
                onChange={handleChange}
                disabled={loading}
                className={`
                  w-full px-4 py-2.5 rounded-lg border
                  text-gray-800
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition
                  ${errors.prodi ? "border-red-500" : "border-gray-300"}
                `}
              >
                <option value="">Pilih Program Studi</option>
                {prodiOptions.map((prodi) => (
                  <option key={prodi} value={prodi}>
                    {prodi}
                  </option>
                ))}
              </select>
              {errors.prodi && (
                <p className="mt-1 text-sm text-red-500">{errors.prodi}</p>
              )}
            </div>
  
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                {["Laki-laki", "Perempuan"].map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-2 text-gray-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    {g}
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
              )}
            </div>
  
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                placeholder="contoh@email.com"
                className={`
                  w-full px-4 py-2.5 rounded-lg border
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition
                  ${errors.email ? "border-red-500" : "border-gray-300"}
                `}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
  
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={loading}
                className="
                  w-full px-4 py-2.5 rounded-lg border border-gray-300
                  text-gray-800
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition
                "
              >
                <option value="Aktif">Aktif</option>
                <option value="Cuti">Cuti</option>
                <option value="Alumni">Alumni</option>
                <option value="Non-Aktif">Non-Aktif</option>
              </select>
            </div>
  
            {/* Action */}
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
                  "Update"
                ) : (
                  "Simpan"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
}