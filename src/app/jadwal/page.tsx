'use client'

import { useState } from 'react'
import Sidebar from '../header/components/Sidebar'
import Header from '../header/components/Header'
import DataTable from './components/DataTables'
import FormModal from './components/FormModals'
import DeleteConfirm from './components/DeleteConfirm'
import { JadwalData } from '@/app/types/Jadwal'
import {
  validateDosenConflict,
  validateRuangConflict,
} from './handlers/Validation'

// ===== DUMMY MASTER DATA =====
const matkulOptions = [
  { id: 1, nama: 'Algoritma & Pemrograman' },
  { id: 2, nama: 'Basis Data' },
]

const dosenOptions = [
  { id: 1, nama: 'Dr. Budi Hartono, M.Kom' },
  { id: 2, nama: 'Prof. Siti Aminah, Ph.D' },
]

const ruangOptions = [
  { id: 1, kode: 'R101' },
  { id: 2, kode: 'LAB01' },
]

const mahasiswaOptions = [
  { id: 1, nama: 'Andi Saputra' },
  { id: 2, nama: 'Siti Rahma' },
  { id: 3, nama: 'Budi Santoso' },
]

export default function JadwalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // ===== DATA JADWAL (DUMMY AWAL) =====
  const [data, setData] = useState<JadwalData[]>([
    {
      id: 1,
      matkulId: 1,
      dosenId: 1,
      ruangId: 1,
      mahasiswaIds: [1, 2],
      hari: 'Senin',
      jamMulai: '08:00',
      jamAkhir: '10:00',
    },
  ])

  const [editData, setEditData] = useState<JadwalData | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // ===== ACTIONS =====
  const handleAdd = () => {
    setEditData(null)
    setModalOpen(true)
  }

  const handleEdit = (item: JadwalData) => {
    setEditData(item)
    setModalOpen(true)
  }

  const handleSubmit = (formData: JadwalData) => {
    // 🔥 VALIDASI BENTROK DOSEN
    if (validateDosenConflict(formData, data)) {
      alert('Bentrok jadwal dosen!')
      return
    }

    // 🔥 VALIDASI BENTROK RUANG
    if (validateRuangConflict(formData, data)) {
      alert('Bentrok jadwal ruangan!')
      return
    }

    setLoading(true)

    setTimeout(() => {
      if (editData) {
        setData(prev =>
          prev.map(item =>
            item.id === editData.id ? { ...editData, ...formData } : item
          )
        )
      } else {
        setData(prev => [
          ...prev,
          { ...formData, id: prev.length + 1 },
        ])
      }

      setModalOpen(false)
      setEditData(null)
      setLoading(false)
    }, 500)
  }

  const handleDeleteClick = (id: number) => {
    setDeleteId(id)
    setDeleteOpen(true)
  }

  const handleDeleteConfirm = () => {
    setData(prev => prev.filter(item => item.id !== deleteId))
    setDeleteId(null)
    setDeleteOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className={`flex-1 transition-all ${sidebarOpen ? 'ml-64' : 'ml-32'}`}>
        <Header />

        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Penjadwalan
              </h1>
              <p className="text-gray-800">
                Kelola jadwal perkuliahan
              </p>
            </div>

            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              + Tambah Jadwal
            </button>
          </div>

          <DataTable
            data={data}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            matkulOptions={matkulOptions}
            dosenOptions={dosenOptions}
            ruangOptions={ruangOptions}
          />
        </div>
      </div>

      <FormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        editData={editData}
        loading={loading}
        matkulOptions={matkulOptions}
        dosenOptions={dosenOptions}
        ruangOptions={ruangOptions}
        mahasiswaOptions={mahasiswaOptions}
      />

      <DeleteConfirm
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={loading}
      />
    </div>
  )
}
