'use client'

import { useState, useEffect } from 'react'
import Sidebar from "../header/components/Sidebar"
import Header from "../header/components/Header"
import DataTable from "./components/DataTables"
import FormModal from "./components/FormModal"
import DeleteConfirm from "./components/DeleteConfirm"
import { RuangData } from "@/app/types/Ruangan";

import { 
  getAllRuang, 
  createRuang, 
  updateRuang, 
  deleteRuang 
} from "./handlers/Ruangan"



export default function RuangPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editData, setEditData] = useState<RuangData | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [ruangList, setRuangList] = useState<RuangData[]>([
    {
      id: 1,
      kodeRuang: "R101",
      hari: "Senin",
      jamAwal: "08:00",
      jamAkhir: "10:00"
    },
    {
      id: 2,
      kodeRuang: "R102",
      hari: "Selasa",
      jamAwal: "10:00",
      jamAkhir: "12:00"
    },
    {
      id: 3,
      kodeRuang: "LAB01",
      hari: "Rabu",
      jamAwal: "13:00",
      jamAkhir: "15:00"
    },
    {
      id: 4,
      kodeRuang: "R201",
      hari: "Kamis",
      jamAwal: "08:00",
      jamAkhir: "10:00"
    },
    {
      id: 5,
      kodeRuang: "AUD01",
      hari: "Jumat",
      jamAwal: "14:00",
      jamAkhir: "16:00"
    },
  ])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // fetchRuang() // Uncomment saat backend ready
  }, [])

  const fetchRuang = async () => {
    setLoading(true)
    try {
      const data = await getAllRuang()
      setRuangList(data)
    } catch (error) {
      console.error('Error fetching ruang:', error)
      alert('Gagal memuat data ruang')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (formData: RuangData) => {
    setLoading(true)
    try {
      if (editData) {
        const updatedList = ruangList.map(r => 
          r.id === editData.id ? { ...editData, ...formData } : r
        )
        setRuangList(updatedList)
        // await updateRuang(editData.id!, formData)
        alert('Data ruang berhasil diupdate')
      } else {
        const newId = ruangList.length > 0 ? Math.max(...ruangList.map(r => r.id!)) + 1 : 1
        setRuangList([...ruangList, { id: newId, ...formData }])
        // await createRuang(formData)
        alert('Data ruang berhasil ditambahkan')
      }
      
      setModalOpen(false)
      setEditData(null)
    } catch (error) {
      console.error('Error saving ruang:', error)
      alert('Gagal menyimpan data ruang')
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
      setRuangList(ruangList.filter(r => r.id !== deleteId))
      // await deleteRuang(deleteId!)
      alert('Data ruang berhasil dihapus')
      setDeleteModalOpen(false)
      setDeleteId(null)
    } catch (error) {
      console.error('Error deleting ruang:', error)
      alert('Gagal menghapus data ruang')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (ruang: RuangData) => {
    setEditData(ruang)
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Ruang</h1>
              <p className="text-gray-600">Kelola jadwal ruang dengan mudah</p>
            </div>
            <button
              onClick={handleAddNew}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Ruang
            </button>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          <DataTable 
            data={ruangList} 
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