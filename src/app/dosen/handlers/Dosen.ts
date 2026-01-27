import { DosenData } from "@/app/types/Dosen"


// Base URL API (sesuaikan dengan backend Anda)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Helper function untuk handle response
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }))
    throw new Error(error.message || 'Something went wrong')
  }
  return response.json()
}

// GET - Ambil semua data dosen
export const getAllDosen = async (): Promise<DosenData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/dosen`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    })
    return handleResponse(response)
  } catch (error) {
    console.error('Error fetching dosen:', error)
    throw error
  }
}

// GET - Ambil data dosen by ID
export const getDosenById = async (id: number): Promise<DosenData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/dosen/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return handleResponse(response)
  } catch (error) {
    console.error('Error fetching dosen by ID:', error)
    throw error
  }
}

// POST - Tambah dosen baru
export const createDosen = async (data: DosenData): Promise<DosenData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/dosen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
    return handleResponse(response)
  } catch (error) {
    console.error('Error creating dosen:', error)
    throw error
  }
}

// PUT - Update dosen
export const updateDosen = async (id: number, data: DosenData): Promise<DosenData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/dosen/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    })
    return handleResponse(response)
  } catch (error) {
    console.error('Error updating dosen:', error)
    throw error
  }
}

// DELETE - Hapus dosen
export const deleteDosen = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/dosen/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    })
    return handleResponse(response)
  } catch (error) {
    console.error('Error deleting dosen:', error)
    throw error
  }
}
