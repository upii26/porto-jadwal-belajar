'use client'

import { useState } from 'react'
import Link from "next/link";

interface Student {
  id: number
  name: string
  email: string
  nim: string
  jurusan: string
  ipk: string
  status: 'active' | 'inactive'
}

export default function ListSiswa() {
  // Data dummy - lebih dari 10 untuk test pagination
  const [students] = useState<Student[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', nim: '2021001', jurusan: 'Informatika', ipk: '3.85', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', nim: '2021002', jurusan: 'Sistem Informasi', ipk: '3.92', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', nim: '2021003', jurusan: 'Teknik Komputer', ipk: '3.67', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', nim: '2021004', jurusan: 'Informatika', ipk: '3.78', status: 'active' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', nim: '2021005', jurusan: 'Sistem Informasi', ipk: '3.45', status: 'active' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', nim: '2021006', jurusan: 'Informatika', ipk: '3.91', status: 'active' },
    { id: 7, name: 'Edward Norton', email: 'edward@example.com', nim: '2021007', jurusan: 'Teknik Komputer', ipk: '3.55', status: 'active' },
    { id: 8, name: 'Fiona Apple', email: 'fiona@example.com', nim: '2021008', jurusan: 'Sistem Informasi', ipk: '3.88', status: 'active' },
    { id: 9, name: 'George Martin', email: 'george@example.com', nim: '2021009', jurusan: 'Informatika', ipk: '3.72', status: 'inactive' },
    { id: 10, name: 'Helen Keller', email: 'helen@example.com', nim: '2021010', jurusan: 'Teknik Komputer', ipk: '3.65', status: 'active' },
    { id: 11, name: 'Ian McKellen', email: 'ian@example.com', nim: '2021011', jurusan: 'Informatika', ipk: '3.80', status: 'active' },
    { id: 12, name: 'Julia Roberts', email: 'julia@example.com', nim: '2021012', jurusan: 'Sistem Informasi', ipk: '3.93', status: 'active' },
    { id: 13, name: 'Kevin Hart', email: 'kevin@example.com', nim: '2021013', jurusan: 'Teknik Komputer', ipk: '3.58', status: 'active' },
    { id: 14, name: 'Laura Dern', email: 'laura@example.com', nim: '2021014', jurusan: 'Informatika', ipk: '3.87', status: 'inactive' },
    { id: 15, name: 'Michael Jordan', email: 'michael@example.com', nim: '2021015', jurusan: 'Sistem Informasi', ipk: '3.76', status: 'active' },
    { id: 16, name: 'Nancy Drew', email: 'nancy@example.com', nim: '2021016', jurusan: 'Informatika', ipk: '3.84', status: 'active' },
    { id: 17, name: 'Oscar Wilde', email: 'oscar@example.com', nim: '2021017', jurusan: 'Teknik Komputer', ipk: '3.69', status: 'active' },
    { id: 18, name: 'Patricia Clarkson', email: 'patricia@example.com', nim: '2021018', jurusan: 'Sistem Informasi', ipk: '3.95', status: 'active' },
    { id: 19, name: 'Quincy Jones', email: 'quincy@example.com', nim: '2021019', jurusan: 'Informatika', ipk: '3.77', status: 'active' },
    { id: 20, name: 'Rachel Green', email: 'rachel@example.com', nim: '2021020', jurusan: 'Sistem Informasi', ipk: '3.82', status: 'active' },
    { id: 21, name: 'Samuel Jackson', email: 'samuel@example.com', nim: '2021021', jurusan: 'Teknik Komputer', ipk: '3.71', status: 'inactive' },
    { id: 22, name: 'Tina Fey', email: 'tina@example.com', nim: '2021022', jurusan: 'Informatika', ipk: '3.89', status: 'active' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: keyof Student | ''; direction: 'asc' | 'desc' | '' }>({
    key: '',
    direction: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10) // Jumlah item per halaman

  // Filter students berdasarkan search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nim.includes(searchTerm) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.jurusan.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  // Pagination logic
  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentStudents = sortedStudents.slice(indexOfFirstItem, indexOfLastItem)

  // Handle sort
  const handleSort = (key: keyof Student) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    })
  }

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle next/previous
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">List Mahasiswa</h2>
          <div className="flex items-center space-x-2">
          
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, NIM, email, or jurusan..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1) // Reset ke halaman 1 saat search
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Nama</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                  </svg>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('nim')}
              >
                <div className="flex items-center space-x-1">
                  <span>NIM</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                  </svg>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('jurusan')}
              >
                <div className="flex items-center space-x-1">
                  <span>Jurusan</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                  </svg>
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('ipk')}
              >
                <div className="flex items-center space-x-1">
                  <span>IPK</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                  </svg>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-700">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.nim}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.jurusan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {student.ipk}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${student.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                    }`}>
                    {student.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
          <span className="font-medium">{Math.min(indexOfLastItem, sortedStudents.length)}</span> of{' '}
          <span className="font-medium">{sortedStudents.length}</span> results
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-500">...</span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page as number)}
                className={`px-3 py-1 rounded-lg text-sm transition ${currentPage === page
                    ? 'bg-gray-800 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {page}
              </button>
            )
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}