'use client'

import { useState, useEffect } from 'react'
import Sidebar from "../header/components/Sidebar"
import Header from "../header/components/Header"
import DataTable from "./components/DataTable"
import FormModal from "./components/FormModal"
import DeleteConfirm from "./components/DeleteConfirm"
import {
  getAllMahasiswa,
  createMahasiswa,
  updateMahasiswa,
  deleteMahasiswa
} from "./handlers/Mahasiswa"
import { MahasiswaData } from '@/app/types/Mahasiswa'



export default function MahasiswaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editData, setEditData] = useState<MahasiswaData | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [mahasiswaList, setMahasiswaList] = useState<MahasiswaData[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch data saat component mount
  useEffect(() => {
    fetchMahasiswa()
  }, [])

  const fetchMahasiswa = async () => {
    setLoading(true)
    try {
      const data = await getAllMahasiswa()
      setMahasiswaList(data)
    } catch (error) {
      console.error('Error fetching mahasiswa:', error)
      alert('Gagal memuat data mahasiswa')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (formData: MahasiswaData) => {
    setLoading(true)
    try {
      if (editData) {
        // Update existing mahasiswa
        await updateMahasiswa(editData.id!, formData)
        alert('Data mahasiswa berhasil diupdate')
      } else {
        // Create new mahasiswa
        await createMahasiswa(formData)
        alert('Data mahasiswa berhasil ditambahkan')
      }

      // Refresh data
      await fetchMahasiswa()
      setModalOpen(false)
      setEditData(null)
    } catch (error) {
      console.error('Error saving mahasiswa:', error)
      alert('Gagal menyimpan data mahasiswa')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (id: number) => {
    setDeleteId(id)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    setLoading(true)
    try {
      await deleteMahasiswa(deleteId!)
      alert('Data mahasiswa berhasil dihapus')

      // Refresh data
      await fetchMahasiswa()
      setDeleteModalOpen(false)
      setDeleteId(null)
    } catch (error) {
      console.error('Error deleting mahasiswa:', error)
      alert('Gagal menghapus data mahasiswa')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (mahasiswa: MahasiswaData) => {
    setEditData(mahasiswa)
    setModalOpen(true)
  }

  const handleAddNew = () => {
    setEditData(null)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-32'}`}>
        <Header />

        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Mahasiswa</h1>
              <p className="text-gray-600">Kelola data mahasiswa dengan mudah</p>
            </div>
            <button onClick={handleAddNew} disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Mahasiswa
            </button>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div
                className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent">
              </div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          <DataTable data={mahasiswaList} onDelete={handleDeleteClick} onEdit={handleEdit} />
        </div>
      </div>

      <FormModal isOpen={modalOpen} onClose={() => {
        setModalOpen(false)
        setEditData(null)
      }}
        onSubmit={handleSubmit}
        editData={editData}
        loading={loading}
      />

      <DeleteConfirm isOpen={deleteModalOpen} onClose={() => {
        setDeleteModalOpen(false)
        setDeleteId(null)
      }}
        onConfirm={handleDeleteConfirm}
        loading={loading}
      />
    </div>
  )
}