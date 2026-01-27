'use client'

import { useState } from 'react'
import Sidebar from "../header/components/Sidebar"
import Header from "../header/components/Header"
import DataTable from "./components/DataTables"
import FormModal from "./components/FormModal"
import DeleteConfirm from "./components/DeleteConfirm"
import { MatakuliahData } from '@/app/types/Matakuliah'

// dummy dosen
const dummyDosen = [
    { id: 1, nama: 'Dr. Budi Hartono, M.Kom' },
    { id: 2, nama: 'Prof. Siti Aminah, Ph.D' },
]

// dummy ruang
const dummyRuang = [
    { id: 1, kode: 'R101' },
    { id: 2, kode: 'LAB01' },
]

export default function MatakuliahPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState<MatakuliahData[]>([
        {
            id: 1,
            kodeMatkul: 'IF101',
            namaMatkul: 'Algoritma dan Pemrograman',
            prodi: 'Teknik Informatika',
            jamMulai: '08:00',
            jamAkhir: '10:00',
            dosenId: 1,
            ruangId: 1,
        },
        {
            id: 2,
            kodeMatkul: 'SI202',
            namaMatkul: 'Basis Data',
            prodi: 'Sistem Informasi',
            jamMulai: '10:00',
            jamAkhir: '12:00',
            dosenId: 2,
            ruangId: 2,
        },
        {
            id: 3,
            kodeMatkul: 'TI303',
            namaMatkul: 'Jaringan Komputer',
            prodi: 'Teknik Informatika',
            jamMulai: '13:00',
            jamAkhir: '15:00',
            dosenId: 1,
            ruangId: 1,
        },
    ])

    const [editData, setEditData] = useState<MatakuliahData | null>(null)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const handleAdd = () => {
        setEditData(null)
        setModalOpen(true)
    }

    const handleEdit = (item: MatakuliahData) => {
        setEditData(item)
        setModalOpen(true)
    }

    const handleSubmit = (formData: MatakuliahData) => {
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
        }, 600)
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
                                Data Mata Kuliah
                            </h1>
                            <p className="text-gray-800">
                                Kelola data mata kuliah
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
                            + Tambah Mata Kuliah
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
                dosenOptions={dummyDosen}
                ruangOptions={dummyRuang}
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
