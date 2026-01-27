'use client'

import { useState } from 'react'
import Sidebar from "../header/components/Sidebar"
import Header from "../header/components/Header"
import DataTable from "./components/DataTables"
import FormModal from "./components/FormModal"
import DeleteConfirm from "./components/DeleteConfirm"
import { ProdiData } from '@/app/types/Prodi'

export default function ProdiPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState<ProdiData[]>([
    { id: 1, fakultas: 'Fakultas Teknik', prodi: 'Teknik Informatika' },
    { id: 2, fakultas: 'Fakultas Teknik', prodi: 'Sistem Informasi' },
    { id: 3, fakultas: 'Fakultas Ilmu Komputer', prodi: 'Teknik Komputer' },
  ])

  const [editData, setEditData] = useState<ProdiData | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const handleAdd = () => {
    setEditData(null)
    setModalOpen(true)
  }

  const handleEdit = (item: ProdiData) => {
    setEditData(item)
    setModalOpen(true)
  }

  const handleSubmit = (formData: ProdiData) => {
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
                Data Program Studi
              </h1>
              <p className="text-gray-800">
                Kelola data fakultas dan program studi
              </p>
            </div>

            <button
              onClick={handleAdd}
              className="
                px-6 py-3
                bg-blue-600 text-white
                rounded-lg
                hover:bg-blue-700
                transition
                font-medium
                flex items-center gap-2
              "
            >
              + Tambah Prodi
            </button>
          </div>

          <DataTable
            data={data}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      <FormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditData(null)
        }}
        onSubmit={handleSubmit}
        editData={editData}
        loading={loading}
      />

      <DeleteConfirm
        isOpen={deleteOpen}
        onClose={() => {
          setDeleteOpen(false)
          setDeleteId(null)
        }}
        onConfirm={handleDeleteConfirm}
        loading={loading}
      />
    </div>
  )
}
