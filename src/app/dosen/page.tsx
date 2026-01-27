'use client'

import { useState, useEffect } from 'react'
import Sidebar from "../header/components/Sidebar"
import Header from "../header/components/Header"
import DataTable from "./components/DataTables"
import FormModal from "./components/FormModal"
import DeleteConfirm from "./components/DeleteConfirm"
import { 
  getAllDosen, 
  createDosen, 
  updateDosen, 
  deleteDosen 
} from "./handlers/Dosen"
import { DosenData } from '@/app/types/Dosen'




export default function DosenPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editData, setEditData] = useState<DosenData | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [dosenList, setDosenList] = useState<DosenData[]>([
    {
      id: 1,
      noDosen: "D001",
      nama: "Dr. Budi Hartono, M.Kom",
      email: "budi.hartono@university.ac.id",
      prodi: "Teknik Informatika",
      status: "Aktif"
    },
    {
      id: 2,
      noDosen: "D002",
      nama: "Prof. Siti Aminah, Ph.D",
      email: "siti.aminah@university.ac.id",
      prodi: "Sistem Informasi",
      status: "Aktif"
    },
    {
      id: 3,
      noDosen: "D003",
      nama: "Drs. Ahmad Fauzi, M.T",
      email: "ahmad.fauzi@university.ac.id",
      prodi: "Teknik Komputer",
      status: "Aktif"
    },
    {
      id: 4,
      noDosen: "D004",
      nama: "Dr. Rina Kusuma, M.Sc",
      email: "rina.kusuma@university.ac.id",
      prodi: "Manajemen Informatika",
      status: "Cuti"
    },
    {
      id: 5,
      noDosen: "D005",
      nama: "Ir. Teguh Prasetyo, M.Kom",
      email: "teguh.prasetyo@university.ac.id",
      prodi: "Teknik Informatika",
      status: "Aktif"
    },
  ])
  const [loading, setLoading] = useState(false)

  // Fetch data saat component mount (saat ini pakai dummy data)
  useEffect(() => {
    // fetchDosen() // Uncomment saat backend ready
  }, [])

  const fetchDosen = async () => {
    setLoading(true)
    try {
      const data = await getAllDosen()
      setDosenList(data)
    } catch (error) {
      console.error('Error fetching dosen:', error)
      alert('Gagal memuat data dosen')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (formData: DosenData) => {
    setLoading(true)
    try {
      if (editData) {
        // Update existing dosen (untuk sekarang update local state)
        const updatedList = dosenList.map(d => 
          d.id === editData.id ? { ...editData, ...formData } : d
        )
        setDosenList(updatedList)
        
        // Uncomment saat backend ready:
        // await updateDosen(editData.id!, formData)
        
        alert('Data dosen berhasil diupdate')
      } else {
        // Create new dosen (untuk sekarang tambah ke local state)
        const newId = dosenList.length > 0 ? Math.max(...dosenList.map(d => d.id!)) + 1 : 1
        setDosenList([...dosenList, {  ...formData }])
        
        // Uncomment saat backend ready:
        // await createDosen(formData)
        
        alert('Data dosen berhasil ditambahkan')
      }
      
      setModalOpen(false)
      setEditData(null)
    } catch (error) {
      console.error('Error saving dosen:', error)
      alert('Gagal menyimpan data dosen')
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
      // Delete dari local state (untuk sekarang)
      setDosenList(dosenList.filter(d => d.id !== deleteId))
      
      // Uncomment saat backend ready:
      // await deleteDosen(deleteId!)
      
      alert('Data dosen berhasil dihapus')
      setDeleteModalOpen(false)
      setDeleteId(null)
    } catch (error) {
      console.error('Error deleting dosen:', error)
      alert('Gagal menghapus data dosen')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (dosen: DosenData) => {
    setEditData(dosen)
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Dosen</h1>
              <p className="text-gray-600">Kelola data dosen dengan mudah</p>
            </div>
            <button
              onClick={handleAddNew}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Dosen
            </button>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          <DataTable 
            data={dosenList} 
            onDelete={handleDeleteClick}
            onEdit={handleEdit}
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
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setDeleteId(null)
        }}
        onConfirm={handleDeleteConfirm}
        loading={loading}
      />
    </div>
  )
}